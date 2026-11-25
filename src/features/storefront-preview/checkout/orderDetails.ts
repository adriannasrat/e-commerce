export type DeliveryId = "standard" | "express";
export type OrderStatus = "pending" | "paid" | "cancelled";

export interface Order {
  id: number;
  status: OrderStatus;
  placed_at: string;
  paid_at: string | null;
  delivery: DeliveryId;
  delivery_ore: number;
  subtotal_ore: number;
  total_ore: number;
  // Present when the order was just placed and awaits payment.
  checkout_url?: string | null;
  items: { product_id: number; title: string; amount: number; unit_price_ore: number }[];
}

// Shown before the order is placed. The server sets what is actually charged,
// and the order page shows the price it recorded.
export const deliveries: Record<DeliveryId, { title: string; detail: string; priceOre: number; days: [number, number] }> = {
  standard: { title: "Standard delivery", detail: "2–4 working days", priceOre: 0, days: [2, 4] },
  express: { title: "Express delivery", detail: "Next working day", priceOre: 14900, days: [1, 1] },
};

export const deliveryPrice = (ore: number, format: (kronor: number) => string) =>
  ore ? format(ore / 100) : "Free";

export const statusLabel: Record<OrderStatus, string> = {
  pending: "Awaiting payment",
  paid: "Paid",
  cancelled: "Cancelled",
};

export const orderNumber = (id: number) => `RS-${String(id).padStart(6, "0")}`;

const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long" });
export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(date);

function addWorkingDays(from: Date, count: number) {
  const date = new Date(from);
  for (let added = 0; added < count; ) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) added += 1;
  }
  return date;
}

// "19 November", or "20–22 November" when the range stays within a month.
export function arrival(placedAt: Date, delivery: DeliveryId) {
  const [first, last] = deliveries[delivery].days.map((count) => addWorkingDays(placedAt, count));
  if (first.getTime() === last.getTime()) return day.format(first);
  if (first.getMonth() === last.getMonth()) {
    return `${first.getDate()}–${day.format(last)}`;
  }
  return `${day.format(first)} – ${day.format(last)}`;
}

// The steps an order moves through. Preparing and delivered are shown for
// orientation; this demo never ships, so they are never reached.
export function orderStages(status: OrderStatus) {
  const reached = status === "paid" ? 2 : status === "pending" ? 1 : 0;
  return ["Placed", "Paid", "Preparing", "Delivered"].map((label, index) => ({
    label,
    done: index < reached,
  }));
}
