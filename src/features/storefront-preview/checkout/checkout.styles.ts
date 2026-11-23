// The checkout and order pages share one layout. Plain CSS keeps the two
// pages' rules together and readable.
export const checkoutStyles = ` .cp {
	 --cp-radius: var(--rx-radius-card);
	 color: var(--rx-ink);
	 padding: 64px 22px 96px;
}
 .cp h1 {
	 font-size: clamp(32px, 4.4vw, 48px);
	 font-weight: 600;
	 letter-spacing: -0.015em;
	 margin: 0 0 40px;
}
 .cp h2 {
	 font-size: 21px;
	 font-weight: 600;
	 margin: 0;
}
 .cp-primary, .cp-secondary {
	 display: inline-flex;
	 align-items: center;
	 justify-content: center;
	 min-height: 48px;
	 padding: 0 28px;
	 border-radius: 12px;
	 border: 0;
	 font: inherit;
	 font-size: 17px;
	 cursor: pointer;
	 text-decoration: none;
}
 .cp-primary {
	 background: var(--rx-accent);
	 color: #fff !important;
}
 .cp-primary:hover {
	 background: var(--rx-accent-hover);
}
 .cp-secondary {
	 background: var(--rx-gray);
	 color: var(--rx-ink);
}
 .cp-wide {
	 width: 100%;
}
 .cp-link {
	 border: 0;
	 background: none;
	 padding: 0;
	 font: inherit;
	 color: var(--rx-link);
	 cursor: pointer;
}
 .cp-note {
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 gap: 6px;
	 margin: 14px 0 0;
	 font-size: 12px;
	 color: var(--rx-muted);
}
 .cp-note svg {
	 width: 14px;
	 height: 14px;
}
 .cp-signin {
	 max-width: 980px;
	 margin: 0 auto;
}
 .cp-signin-columns {
	 display: grid;
	 grid-template-columns: 1.3fr 1fr;
}
 .cp-signin-account, .cp-signin-demo {
	 display: flex;
	 flex-direction: column;
	 align-items: center;
	 gap: 20px;
	 padding: 24px 48px;
	 text-align: center;
}
 .cp-signin-demo {
	 border-left: 1px solid var(--rx-line);
}
 .cp-signin-demo p {
	 margin: 0;
	 max-width: 30ch;
	 color: var(--rx-muted);
	 font-size: 15px;
}
 .cp-signin-account .cp-link {
	 font-size: 14px;
}
 .cp-message {
	 margin: 0;
	 min-height: 1.5em;
	 max-width: 36ch;
	 font-size: 14px;
	 color: var(--rx-muted);
}
 .cp-field {
	 position: relative;
	 width: 100%;
	 max-width: 420px;
}
 .cp-field input {
	 width: 100%;
	 height: 56px;
	 padding: 0 56px 0 18px;
	 border: 1px solid #86868b;
	 border-radius: 12px;
	 font: inherit;
	 font-size: 17px;
}
 .cp-field input:focus {
	 outline: none;
	 border-color: var(--rx-accent);
	 box-shadow: 0 0 0 3px rgba(184,70,27,.25);
}
 .cp-field button {
	 position: absolute;
	 right: 10px;
	 top: 50%;
	 translate: 0 -50%;
	 width: 32px;
	 height: 32px;
	 border-radius: 50%;
	 border: 1px solid #86868b;
	 background: #fff;
	 color: #6e6e73;
	 display: grid;
	 place-items: center;
	 cursor: pointer;
}
 .cp-field svg {
	 width: 18px;
	 height: 18px;
}
 .cp-checkout {
	 max-width: 1120px;
	 margin: 0 auto;
}
 .cp-checkout-columns {
	 display: grid;
	 grid-template-columns: minmax(0, 1fr) 380px;
	 gap: 48px;
	 align-items: start;
}
 .cp-steps {
	 display: grid;
	 gap: 40px;
}
 .cp-steps section {
	 display: grid;
	 gap: 12px;
	 padding-bottom: 40px;
	 border-bottom: 1px solid var(--rx-line);
}
 .cp-steps section:last-of-type {
	 padding-bottom: 0;
	 border-bottom: 0;
}
 .cp-steps h2 {
	 display: flex;
	 align-items: center;
	 gap: 12px;
	 height: 32px;
	 margin-bottom: 8px;
}
 .cp-steps h2 > span {
	 display: grid;
	 place-items: center;
	 width: 28px;
	 height: 28px;
	 border-radius: 50%;
	 background: var(--rx-ink);
	 color: #fff;
	 font-size: 14px;
}
 .cp-address {
	 display: grid;
	 gap: 2px;
	 padding: 18px 20px;
	 border-radius: 12px;
	 background: var(--rx-gray);
	 font-size: 15px;
}
 .cp-address .cp-link {
	 justify-self: start;
	 margin-top: 8px;
	 font-size: 14px;
}
 .cp-option {
	 display: flex;
	 align-items: center;
	 gap: 14px;
	 padding: 16px 18px;
	 border: 1px solid var(--rx-line);
	 border-radius: 12px;
	 cursor: pointer;
	 font-size: 15px;
}
 .cp-option:has(input:checked) {
	 border-color: var(--rx-ink);
	 box-shadow: 0 0 0 1px var(--rx-ink);
}
 .cp-option input {
	 accent-color: var(--rx-accent);
	 width: 18px;
	 height: 18px;
	 margin: 0;
}
 .cp-option > span:not(.cp-option-aside) {
	 display: grid;
	 gap: 2px;
	 flex: 1;
}
 .cp-option > span > span {
	 color: var(--rx-muted);
	 font-size: 13px;
}
 .cp-option-aside {
	 font-weight: 600;
}
 .cp-test-card {
	 margin: 0;
	 padding: 14px 18px;
	 border-radius: 12px;
	 background: #fbe9e1;
	 color: var(--rx-ink);
	 font-size: 14px;
	 line-height: 1.5;
}
 .cp-test-card strong {
	 font-variant-numeric: tabular-nums;
	 white-space: nowrap;
}
/* Starts level with the address box: the step heading (32px), its margin (8px) and the gap (12px) above it. */
 .cp-summary {
	 margin-top: 52px;
	 position: sticky;
	 top: 76px;
	 padding: 28px;
	 border-radius: var(--cp-radius);
	 background: var(--rx-gray);
}
 .cp-summary ul, .cp-lines {
	 list-style: none;
	 margin: 20px 0;
	 padding: 0;
	 display: grid;
	 gap: 16px;
}
 .cp-summary li, .cp-lines li {
	 display: grid;
	 grid-template-columns: auto 1fr auto;
	 gap: 14px;
	 align-items: center;
	 font-size: 15px;
}
 .cp-thumb {
	 display: grid;
	 place-items: center;
	 width: 64px;
	 height: 64px;
	 border-radius: 12px;
	 background: #fff;
}
 .cp-thumb svg {
	 width: 52px;
	 height: 52px;
}
 .cp-thumb--large {
	 width: 88px;
	 height: 88px;
	 background: var(--rx-gray);
}
 .cp-thumb--large svg {
	 width: 72px;
	 height: 72px;
}
 .cp-line {
	 display: grid;
	 gap: 2px;
}
 .cp-line > span {
	 color: var(--rx-muted);
	 font-size: 13px;
}
 .cp dl {
	 margin: 0 0 20px;
	 padding-top: 16px;
	 border-top: 1px solid var(--rx-line);
	 display: grid;
	 gap: 8px;
	 font-size: 15px;
}
 .cp dl > div {
	 display: flex;
	 justify-content: space-between;
}
 .cp dd {
	 margin: 0;
}
 .cp .cp-total {
	 padding-top: 8px;
	 font-size: 19px;
	 font-weight: 600;
}
 .cp-placed {
	 max-width: 720px;
	 margin: 0 auto;
	 padding-top: 24px;
	 text-align: center;
}
 .cp-placed h1 {
	 margin-bottom: 12px;
}
 .cp-placed-lead {
	 margin: 0 0 32px;
	 font-size: 17px;
	 color: var(--rx-muted);
}
 .cp-placed-lead strong {
	 color: var(--rx-ink);
}
 .cp-progress {
	 list-style: none;
	 display: grid;
	 grid-template-columns: repeat(4, 1fr);
	 margin: 0 0 40px;
	 padding: 0;
	 font-size: 13px;
	 color: var(--rx-muted);
}
 .cp-progress li {
	 position: relative;
	 display: grid;
	 justify-items: center;
	 gap: 8px;
}
 .cp-progress li::before {
	 content: "";
	 position: absolute;
	 top: 6px;
	 right: 50%;
	 width: 100%;
	 height: 2px;
	 background: var(--rx-line);
	 z-index: 0;
}
 .cp-progress li:first-of-type::before {
	 display: none;
}
 .cp-progress li[data-done=true] {
	 color: var(--rx-ink);
	 font-weight: 600;
}
 .cp-progress li[data-done=true]::before {
	 background: var(--rx-accent);
}
 .cp-progress .cp-dot {
	 position: relative;
	 z-index: 1;
	 width: 14px;
	 height: 14px;
	 border-radius: 50%;
	 background: #fff;
	 border: 2px solid var(--rx-line);
}
 .cp-progress li[data-done=true] .cp-dot {
	 background: var(--rx-accent);
	 border-color: var(--rx-accent);
}
 .cp-placed-card {
	 padding: 28px;
	 border: 1px solid var(--rx-line);
	 border-radius: var(--cp-radius);
	 text-align: left;
}
 .cp-placed-delivery {
	 display: flex;
	 align-items: center;
	 gap: 14px;
	 padding-bottom: 20px;
	 border-bottom: 1px solid var(--rx-line);
	 font-size: 15px;
}
 .cp-placed-delivery > span:not(.cp-status) {
	 display: grid;
	 gap: 2px;
	 flex: 1;
}
 .cp-placed-delivery > span > span {
	 color: var(--rx-muted);
	 font-size: 13px;
}
 .cp-status {
	 padding: 4px 10px;
	 border-radius: 999px;
	 background: #fbe9e1;
	 color: var(--rx-accent-hover);
	 font-size: 12px;
	 font-weight: 600;
}
 .cp-placed-card dl {
	 margin-bottom: 0;
}
 .cp-placed-actions {
	 display: flex;
	 justify-content: center;
	 gap: 12px;
	 margin-top: 32px;
}
 @media (max-width: 833px) {
	 .cp-signin-columns, .cp-checkout-columns {
		 grid-template-columns: 1fr;
	}
	 .cp-signin-account, .cp-signin-demo {
		 padding: 24px 0;
	}
	 .cp-signin-demo {
		 border-left: 0;
		 border-top: 1px solid var(--rx-line);
	}
	 .cp-summary {
		 position: static;
		 margin-top: 0;
	}
	 .cp-placed-actions {
		 flex-direction: column;
	}
}
 .cp-option:has(input:disabled) {
	 cursor: default;
	 opacity: 0.55;
}
 .cp-signin-account form {
	 display: contents;
}
 .cp-field + .cp-field {
	 margin-top: -8px;
}
 .cp-empty {
	 max-width: 640px;
	 margin: 0 auto;
	 text-align: center;
}
 .cp-empty p {
	 color: var(--rx-muted);
	 font-size: 17px;
	 margin: 0 0 24px;
}
 .cp [role=alert] {
	 margin: 12px 0 0;
	 color: #b42318;
	 font-size: 14px;
	 text-align: center;
}
 .cp h1:focus {
	 outline: none;
}
 .cp-placed-payment {
	 margin-top: 32px;
}
 .cp-payment-actions {
	 display: grid;
	 grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	 gap: 12px;
	 max-width: 480px;
	 margin-inline: auto;
}
 .cp-payment-hint {
	 margin: 12px 0 0;
	 color: var(--rx-muted);
	 font-size: 13px;
	 text-align: center;
}
 .cp.cp-waiting {
	 max-width: 720px;
	 margin: 0 auto 40px;
	 padding: 28px 24px;
	 border: 1px solid var(--rx-line);
	 border-radius: var(--cp-radius);
	 text-align: center;
}
 .cp-waiting h2 {
	 margin-bottom: 8px;
}
 .cp-waiting > p {
	 margin: 0 0 20px;
	 color: var(--rx-muted);
	 font-size: 15px;
}
 .cp-waiting .cp-lines {
	 margin: 0 0 24px;
	 text-align: left;
}
 .cp-waiting a {
	 color: var(--rx-link);
}
 `;
