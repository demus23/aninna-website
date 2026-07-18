import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <section className="mx-auto max-w-4xl px-6 py-20">
        {/* Main confirmation card */}
        <div className="mb-6 rounded-[2rem] bg-white p-10 text-center shadow-sm">
          {/* Checkmark icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f8f5ef]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7b3327"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
            Order Confirmed
          </p>

          <h1 className="mb-4 text-4xl font-semibold text-[#7b3327]">
            Thank You for Your Order
          </h1>

          <p className="mx-auto max-w-lg text-lg leading-8 text-[#6f6159]">
            Your payment was completed successfully. You'll receive a
            confirmation email shortly at the address you provided.
          </p>
        </div>

        {/* What happens next */}
        <div className="mb-6 rounded-[2rem] bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-[#7b3327]">
            What Happens Next
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5c95c] font-bold text-[#7b3327]">
                1
              </div>
              <div>
                <p className="font-semibold text-[#7b3327]">Order Processing</p>
                <p className="mt-1 text-sm leading-6 text-[#6f6159]">
                  We're preparing your ANINNA serum for dispatch within 1–2
                  business days.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5c95c] font-bold text-[#7b3327]">
                2
              </div>
              <div>
                <p className="font-semibold text-[#7b3327]">Shipping</p>
                <p className="mt-1 text-sm leading-6 text-[#6f6159]">
                  You'll receive a shipping notification once your order is on
                  its way.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5c95c] font-bold text-[#7b3327]">
                3
              </div>
              <div>
                <p className="font-semibold text-[#7b3327]">Enjoy Your Ritual</p>
                <p className="mt-1 text-sm leading-6 text-[#6f6159]">
                  Start your scalp care ritual and feel the difference from your
                  very first use.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help + actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold text-[#7b3327]">
              Questions About Your Order?
            </h3>
            <p className="mb-5 leading-7 text-[#6f6159]">
              Reach us at{" "}
              <a
                href="mailto:aninnacosmetic@gmail.com"
                className="font-medium text-[#7b3327] underline underline-offset-2"
              >
                aninnacosmetic@gmail.com
              </a>{" "}
              or WhatsApp — we usually reply within 24 hours.
            </p>
            <a
              href="https://wa.me/971581368771"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#d4a83e] px-5 py-3 text-sm font-semibold text-[#7b3327] transition hover:bg-[#d4a83e] hover:text-white"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold text-[#7b3327]">
              Share ANINNA
            </h3>
            <p className="mb-5 leading-7 text-[#6f6159]">
              Love what you've ordered? Tell someone about ANINNA.
            </p>
            <a
              href="https://instagram.com/aninnacosmetics"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#7b3327] px-5 py-3 text-sm font-semibold text-[#f5c95c] transition hover:opacity-90"
            >
              @aninnacosmetics on Instagram
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/shop"
            className="inline-block rounded-full border-2 border-[#d4a83e] px-8 py-4 font-semibold text-[#d4a83e] transition hover:bg-[#d4a83e] hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
