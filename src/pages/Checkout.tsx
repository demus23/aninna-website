import { useState } from "react";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, totalItems, totalPrice } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "United Arab Emirates",
    city: "",
    address: "",
    apartment: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [loading, setLoading] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${apiBaseUrl}/api/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: formData,
          items,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      alert(data.error || "Failed to start payment.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while starting payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
            Checkout
          </p>

          <h1 className="mb-6 text-5xl font-semibold leading-tight text-[#7b3327] md:text-6xl">
            Complete Your Order
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-[#6f6159]">
            Enter your shipping details below to continue with your ANINNA order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form
            onSubmit={handlePlaceOrder}
            className="rounded-[2rem] bg-white p-8 shadow-sm md:p-10"
          >
            <h2 className="mb-8 text-3xl font-semibold text-[#7b3327]">
              Shipping Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-[#7b3327]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-[#e8dfd2] bg-[#f8f5ef] px-4 py-3 outline-none focus:border-[#d4a83e]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-[#7b3327]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-[#e8dfd2] bg-[#f8f5ef] px-4 py-3 outline-none focus:border-[#d4a83e]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-[#7b3327]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-[#e8dfd2] bg-[#f8f5ef] px-4 py-3 outline-none focus:border-[#d4a83e]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-[#7b3327]">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e8dfd2] bg-[#f8f5ef] px-4 py-3 outline-none focus:border-[#d4a83e]"
                >
                  <option>United Arab Emirates</option>
                  <option>Saudi Arabia</option>
                  <option>Kuwait</option>
                  <option>Qatar</option>
                  <option>Oman</option>
                  <option>Bahrain</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium text-[#7b3327]">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-[#e8dfd2] bg-[#f8f5ef] px-4 py-3 outline-none focus:border-[#d4a83e]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-[#7b3327]">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-[#e8dfd2] bg-[#f8f5ef] px-4 py-3 outline-none focus:border-[#d4a83e]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-[#7b3327]">
                  Apartment / Building / Landmark
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e8dfd2] bg-[#f8f5ef] px-4 py-3 outline-none focus:border-[#d4a83e]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-[#7b3327]">
                  Delivery Notes
                </label>
                <textarea
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e8dfd2] bg-[#f8f5ef] px-4 py-3 outline-none focus:border-[#d4a83e]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 rounded-full bg-[#7b3327] px-8 py-4 font-semibold text-[#f5c95c] transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Redirecting..." : "Pay Securely"}
            </button>
          </form>

          <div className="h-fit rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-3xl font-semibold text-[#7b3327]">
              Order Summary
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-[#eadfce] pb-4"
                >
                  <div>
                    <p className="font-semibold text-[#7b3327]">{item.name}</p>
                    <p className="text-sm text-[#6f6159]">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    AED {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-[#6f6159]">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex items-center justify-between text-[#6f6159]">
                <span>Subtotal</span>
                <span>AED {totalPrice.toFixed(2)}</span>
              </div>

              <div className="border-t border-[#eadfce] pt-4">
                <div className="flex items-center justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span>AED {totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
