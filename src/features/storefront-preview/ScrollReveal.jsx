
// Marks an element for the page's scroll choreography (see ui/useReveal).
// variant: "up" (default) | "item" | "fade" | "zoom"; delay adds extra ms.
export default function ScrollReveal({
  as: Element = "div",
  variant = "up",
  delay,
  children,
  ...props
}) {
  return (
    <Element
      {...props}
      data-reveal={variant}
      data-reveal-delay={delay || undefined}
    >
      {children}
    </Element>
  );
}
