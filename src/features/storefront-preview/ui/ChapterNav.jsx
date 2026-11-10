import HeadphoneImage from "../HeadphoneImage";

// The row of product icons under a page title, as on product-family pages.
// items: { href, label, image?, Icon?, isNew? }
export default function ChapterNav({ label, items }) {
  return (
    <nav className="rx-chapternav" aria-label={label} data-reveal-group="">
      <ul>
        {items.map(({ href, label: text, image, Icon, isNew }) => (
          <li key={href} data-reveal="fade">
            <a href={href}>
              {image ? (
                <HeadphoneImage image={image} decorative />
              ) : (
                <Icon aria-hidden="true" />
              )}
              <span>{text}</span>
              {isNew && (
                <em className="rx-new" aria-hidden="true">
                  New
                </em>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
