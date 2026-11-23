import HeadphoneImage from "../HeadphoneImage";
import type { Cutout } from "../catalogueMedia";
import { formatPrice, products } from "../products";
import type { Order } from "./orderDetails";

interface CatalogueProduct {
  apiId: number;
  finishName: string;
  image: Cutout;
}

// An order's lines as they were bought: picture, name, finish, quantity and
// the price paid. The picture and finish come from the catalogue.
export default function OrderLines({ items }: { items: Order["items"] }) {
  return (
    <ul className="cp-lines">
      {items.map((item) => {
        const product = (products as CatalogueProduct[]).find(
          ({ apiId }) => apiId === item.product_id,
        );
        return (
          <li key={item.product_id}>
            <span className="cp-thumb cp-thumb--large">
              {product && <HeadphoneImage image={product.image} decorative />}
            </span>
            <span className="cp-line">
              <strong>{item.title}</strong>
              <span>
                {product ? `${product.finishName} · ` : ""}Qty {item.amount}
              </span>
            </span>
            <span>{formatPrice((item.unit_price_ore * item.amount) / 100)}</span>
          </li>
        );
      })}
    </ul>
  );
}
