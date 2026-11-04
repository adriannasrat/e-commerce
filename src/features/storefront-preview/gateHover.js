// Touch screens fake :hover on tap and leave it applied until the next tap.
// Move every hover selector into a capability query so only devices that can
// actually hover get hover styles. Touch input still gets :active feedback.
export const HOVER_QUERY = "@media (hover: hover) and (pointer: fine)";

function splitSelectors(selector) {
  const parts = [];
  let depth = 0;
  let current = "";
  for (const char of selector) {
    if (char === "(") depth += 1;
    if (char === ")") depth -= 1;
    if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function gateRule(selector, declarations) {
  if (selector.startsWith("@")) {
    if (selector.startsWith("@keyframes") || selector === HOVER_QUERY) {
      return [{ [selector]: declarations }];
    }
    return [{ [selector]: gateHover(declarations) }];
  }
  if (!selector.includes(":hover")) return [{ [selector]: declarations }];

  const parts = splitSelectors(selector);
  const hover = parts.filter((part) => part.includes(":hover"));
  const rest = parts.filter((part) => !part.includes(":hover"));
  const rules = [];
  if (rest.length) rules.push({ [rest.join(",\n")]: declarations });
  rules.push({ [HOVER_QUERY]: { [hover.join(",\n")]: declarations } });
  return rules;
}

export default function gateHover(styles) {
  if (Array.isArray(styles)) return styles.flatMap((item) => gateHover(item));
  if (!styles || typeof styles !== "object") return styles;
  return Object.entries(styles).flatMap(([selector, value]) =>
    gateRule(selector, value),
  );
}
