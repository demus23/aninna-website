import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

export default function Shipping() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
          Shipping Policy
        </p>

        <h1 className="mb-8 text-5xl font-semibold leading-tight text-[#7b3327] md:text-6xl">
          Shipping Policy
        </h1>

        <div className="space-y-8 rounded-[2rem] bg-white p-10 shadow-sm">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Processing Time
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Orders are processed within 1–2 business days of payment
              confirmation. You will receive an email once your order has been
              dispatched.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Delivery within the UAE
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Standard delivery within the UAE typically takes 2–4 business days
              after dispatch. Express delivery options may be available at
              checkout depending on your location.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              GCC Countries
            </h2>
            <p className="leading-8 text-[#6f6159]">
              We ship to Saudi Arabia, Kuwait, Qatar, Oman, and Bahrain.
              Delivery to GCC countries typically takes 4–7 business days after
              dispatch. Customs or import fees, if applicable, are the
              responsibility of the customer.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Shipping Costs
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Shipping costs are calculated at checkout based on your delivery
              address. We offer free shipping on orders above a certain value —
              please check the checkout page for current thresholds.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Order Tracking
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Once your order is dispatched, you will receive a tracking number
              by email so you can follow your shipment's progress.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Damaged or Lost Orders
            </h2>
            <p className="leading-8 text-[#6f6159]">
              If your order arrives damaged or does not arrive within the
              expected timeframe, please contact us at aninnacosmetic@gmail.com with
              your order details and we will resolve it as quickly as possible.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Contact
            </h2>
            <p className="leading-8 text-[#6f6159]">
              For any shipping enquiries, reach us at aninnacosmetic@gmail.com or via
              WhatsApp. We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
