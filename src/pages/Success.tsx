import { useEffect } from "react";
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

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="rounded-[2rem] bg-white p-10 shadow-sm">
          <h1 className="mb-4 text-4xl font-semibold text-[#7b3327]">
            Payment Successful
          </h1>
          <p className="text-lg leading-8 text-[#6f6159]">
            Thank you for your order. Your payment was completed successfully.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}