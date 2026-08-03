// src/hooks/useAnalytics.ts
//
// Tracks page views automatically on every route change.
// Without this, Google Analytics only sees the first page load
// in a React single-page app — all other navigation is invisible.
//
// Usage: call useAnalytics() once in App.tsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Extend window type for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    // Send a page_view event on every route change
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname + location.search,
    });
  }, [location]);
}

// Track a custom event (purchase, add_to_cart, etc.)
// Call this from any component:
// trackEvent("add_to_cart", { value: 90, currency: "AED", item_name: "ANINNA Serum" })
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
