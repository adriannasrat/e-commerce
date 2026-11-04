import { useLayoutEffect } from "react";

// Scroll-triggered entrances, modelled on product-family pages: headings and
// copy rise 30px while fading in, cards follow one after another, icon rows
// fade in sequence and large imagery settles from a slight zoom.
//
// Mark elements with data-reveal="up" | "item" | "fade" | "zoom".
// A container with data-reveal-group reveals all of its marked children
// together when the container enters the viewport, so a horizontal shelf
// animates as one sequence even for cards that start off-screen.
//
// States: pending (hidden, waiting) -> in (transitioning) -> done (own
// transitions restored). Content added later, such as filter results,
// appears immediately: only a page's first render is choreographed.

const LEAD = 300; // first card after a heading, as measured on the reference
const ITEM_STEP = 150;
const FADE_STEP = 50;
const HEAD_STEP = 100;
const MAX_STEPS = 6;
const SETTLE_AFTER = 1500;

const byDomOrder = (a, b) =>
  a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;

export function revealDelays(elements) {
  let heads = 0;
  let items = 0;
  let fades = 0;
  return elements.map((element) => {
    const kind = element.dataset.reveal;
    let delay;
    if (kind === "item" || kind === "zoom") {
      delay = (heads ? LEAD : 0) + Math.min(items, MAX_STEPS) * ITEM_STEP;
      items += 1;
    } else if (kind === "fade") {
      delay = Math.min(fades, MAX_STEPS * 3) * FADE_STEP;
      fades += 1;
    } else {
      delay = Math.min(heads, 3) * HEAD_STEP;
      heads += 1;
    }
    return delay + Number(element.dataset.revealDelay || 0);
  });
}

export default function useReveal(rootRef, routeKey) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const timers = new Set();
    const settle = (element) => {
      element.dataset.revealState = "done";
    };
    const marked = () =>
      [...root.querySelectorAll("[data-reveal]")].filter(
        (element) => element.dataset.revealState !== "done" && element.dataset.revealState !== "in",
      );

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      marked().forEach(settle);
      return undefined;
    }

    const show = (elements) => {
      const ordered = [...elements].sort(byDomOrder);
      revealDelays(ordered).forEach((delay, index) => {
        const element = ordered[index];
        element.style.setProperty("--reveal-delay", `${delay}ms`);
        element.dataset.revealState = "in";
        const timer = setTimeout(() => {
          settle(element);
          timers.delete(timer);
        }, delay + SETTLE_AFTER);
        timers.add(timer);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const batch = [];
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting) return;
          observer.unobserve(target);
          if (target.hasAttribute("data-reveal-group")) {
            batch.push(
              ...[...target.querySelectorAll("[data-reveal]")].filter(
                (child) => child.dataset.revealState === "pending",
              ),
            );
          } else if (target.dataset.revealState === "pending") {
            batch.push(target);
          }
        });
        if (batch.length) show(batch);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    // Hide before paint, then let the observer decide what is on screen.
    marked().forEach((element) => {
      element.dataset.revealState = "pending";
      const group = element.parentElement?.closest("[data-reveal-group]");
      if (!group || !root.contains(group)) observer.observe(element);
    });
    root.querySelectorAll("[data-reveal-group]").forEach((group) => {
      if (group.querySelector('[data-reveal-state="pending"]')) observer.observe(group);
    });

    // Anything added after the page's first render appears as-is.
    const mutations = new MutationObserver((records) => {
      records.forEach(({ addedNodes }) =>
        addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const found = node.matches("[data-reveal]") ? [node] : [];
          found.push(...node.querySelectorAll("[data-reveal]"));
          found.forEach((element) => {
            if (!element.dataset.revealState) settle(element);
          });
        }),
      );
    });
    mutations.observe(root, { childList: true, subtree: true });

    // Keyboard users never wait for an entrance to reach focused content.
    const onFocus = ({ target }) => {
      const pending = target.closest?.('[data-reveal-state="pending"]');
      if (pending) settle(pending);
    };
    root.addEventListener("focusin", onFocus);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      root.removeEventListener("focusin", onFocus);
      timers.forEach(clearTimeout);
      // Elements mid-entrance finish instantly instead of freezing half-way.
      root
        .querySelectorAll('[data-reveal-state="in"]')
        .forEach(settle);
    };
  }, [rootRef, routeKey]);
}
