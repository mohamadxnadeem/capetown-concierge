"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

/**
 * On phones, header dropdowns are rendered in a portal with position: fixed and
 * 12px side margins, so they can never run off either edge of the screen (LTR or RTL).
 * Returns the top offset (px) to use on mobile while open, or null on larger screens.
 */
export function useMobilePanelTop(open: boolean, anchorRef: RefObject<HTMLElement | null>) {
  const [top, setTop] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      if (!window.matchMedia("(max-width: 767px)").matches) {
        setTop(null);
        return;
      }
      const rect = anchorRef.current?.getBoundingClientRect();
      if (rect) setTop(Math.round(rect.bottom + 8));
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [open, anchorRef]);

  return open ? top : null;
}
