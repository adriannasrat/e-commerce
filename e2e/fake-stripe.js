// A small stand-in for Stripe, used only by the end-to-end tests so they run
// without network access or real keys. It answers the three calls the API
// makes, shows a payment page, and on payment sends a signed
// checkout.session.completed event to the API's webhook, as Stripe does. The
// API checks that signature exactly as it checks Stripe's.
const http = require('node:http');
const Stripe = require('stripe');

const port = Number(process.env.FAKE_STRIPE_PORT || 12111);
const webhookUrl = process.env.WEBHOOK_URL;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const signer = new Stripe('sk_test_fake_stripe').webhooks;

const sessions = new Map();
let created = 0;

const json = (res, status, body) => {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
};
const readBody = (req) =>
  new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => resolve(body));
  });

// The API sends line items as form fields such as line_items[0][quantity].
function readLineItems(form) {
  const items = [];
  for (const [key, value] of form) {
    const match = /^line_items\[(\d+)\]\[(.+)\]$/.exec(key);
    if (!match) continue;
    const item = (items[match[1]] ||= {});
    if (match[2] === 'quantity') item.quantity = Number(value);
    if (match[2] === 'price_data][unit_amount') item.unit_amount = Number(value);
    if (match[2] === 'price_data][product_data][name') item.name = value;
  }
  return items.filter(Boolean);
}

async function sendEvent(type, session) {
  const payload = JSON.stringify({
    id: `evt_${type}_${session.id}`,
    type,
    data: { object: { id: session.id, payment_status: session.payment_status, metadata: session.metadata } },
  });
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'stripe-signature': signer.generateTestHeaderString({ payload, secret: webhookSecret }),
      },
      body: payload,
    });
    console.log(`${type} for ${session.id}: webhook answered ${response.status}`);
  } catch (error) {
    // Like Stripe, a failed delivery never stops the payment page.
    console.log(`${type} for ${session.id}: webhook unreachable (${error.cause?.code ?? error.message})`);
  }
}

const page = (session) => {
  const total = session.line_items.reduce((sum, item) => sum + item.quantity * item.unit_amount, 0);
  const rows = session.line_items
    .map((item) => `<li>${item.name} × ${item.quantity}</li>`)
    .join('');
  return `<!doctype html><html lang="en"><meta charset="utf-8"><title>Test payment</title>
<h1>Test payment</h1><ul>${rows}</ul><p>Total ${total / 100} SEK</p>
<form method="post"><button>Pay</button></form>
<p><a href="${session.cancel_url}">Back</a></p></html>`;
};

const server = http.createServer(async (req, res) => {
  const path = new URL(req.url, `http://localhost:${port}`).pathname;
  const api = /^\/v1\/checkout\/sessions(?:\/([\w-]+))?(?:\/(expire))?$/.exec(path);
  const pay = /^\/pay\/([\w-]+)$/.exec(path);

  if (api && req.method === 'POST' && !api[1]) {
    const form = new URLSearchParams(await readBody(req));
    created += 1;
    const sessionId = `cs_test_fake_${created}`;
    const session = {
      id: sessionId,
      object: 'checkout.session',
      status: 'open',
      payment_status: 'unpaid',
      url: `http://localhost:${port}/pay/${sessionId}`,
      success_url: form.get('success_url'),
      cancel_url: form.get('cancel_url'),
      metadata: { order_id: form.get('metadata[order_id]') },
      line_items: readLineItems(form),
    };
    sessions.set(sessionId, session);
    return json(res, 200, session);
  }

  if (api && api[1]) {
    const verb = api[2];
    const session = sessions.get(api[1]);
    if (!session) return json(res, 404, { error: { type: 'invalid_request_error', message: 'No such session' } });
    if (req.method === 'GET' && !verb) return json(res, 200, session);
    if (req.method === 'POST' && verb === 'expire') {
      if (session.status !== 'open') {
        return json(res, 400, { error: { type: 'invalid_request_error', message: 'Session is not open' } });
      }
      session.status = 'expired';
      json(res, 200, session);
      return sendEvent('checkout.session.expired', session);
    }
  }

  if (pay) {
    const session = sessions.get(pay[1]);
    if (!session) return json(res, 404, { error: 'No such session' });
    if (req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'text/html' });
      return res.end(page(session));
    }
    session.status = 'complete';
    session.payment_status = 'paid';
    await sendEvent('checkout.session.completed', session);
    res.writeHead(303, { location: session.success_url });
    return res.end();
  }

  json(res, 404, { error: { message: 'Not handled by the fake Stripe' } });
});

server.listen(port, () => console.log(`Fake Stripe listening on ${port}`));
