import { useState, useEffect } from "react";

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Remember dismissal for this browser session only
    const dismissed = sessionStorage.getItem("aninna_promo_dismissed");
    if (dismissed) setVisible(false);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("aninna_promo_dismissed", "true");
  };

  if (!visible) return null;

  return (
    <div className="relative bg-[#7b3327] px-4 py-2.5 text-center text-sm font-medium text-[#f5c95c]">
      <span>
        🎉 New here? Get <strong>10% off</strong> your first order with code{" "}
        <strong className="tracking-wide">WELCOME10</strong> at checkout
      </span>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f5c95c]/70 hover:text-[#f5c95c]"
      >
        ✕
      </button>
    </div>
  );
}
