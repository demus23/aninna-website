// src/components/layout/ScrollToTop.tsx
// Automatically scrolls to the top of the page on every route change.
// This fixes the issue where navigating via footer/nav links keeps
// the scroll position from the previous page.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
