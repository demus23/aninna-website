import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

export default function Returns() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
          Return Policy
        </p>

        <h1 className="mb-8 text-5xl font-semibold leading-tight text-[#7b3327] md:text-6xl">
          Return Policy
        </h1>

        <div className="space-y-8 rounded-[2rem] bg-white p-10 shadow-sm">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Our Commitment
            </h2>
            <p className="leading-8 text-[#6f6159]">
              At ANINNA, we stand behind the quality of every product we ship.
              If you are not completely satisfied with your purchase, we are here
              to help.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Eligibility for Returns
            </h2>
            <p className="leading-8 text-[#6f6159]">
              We accept return requests within 14 days of delivery. To be
              eligible for a return, the product must be unused, in its original
              packaging, and in the same condition as when it was received.
              Products that have been opened or used cannot be returned for
              hygiene reasons, unless they are defective or damaged.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Damaged or Defective Items
            </h2>
            <p className="leading-8 text-[#6f6159]">
              If your order arrives damaged, defective, or incorrect, please
              contact us within 7 days of receiving it. We will arrange a
              replacement or full refund at no additional cost to you. Please
              include a photo of the damage when reaching out.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              How to Request a Return
            </h2>
            <p className="leading-8 text-[#6f6159]">
              To initiate a return, please contact us at hello@aninna.com with
              your order details and reason for return. We will respond within
              24 to 48 hours with instructions on how to proceed. Do not send
              items back without contacting us first.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Refunds
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Once your return is received and inspected, we will notify you of
              the approval or rejection of your refund. Approved refunds will be
              processed to your original payment method within 5 to 10 business
              days, depending on your bank or card provider.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Return Shipping
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Return shipping costs are the responsibility of the customer,
              unless the item is defective or was sent in error. We recommend
              using a trackable shipping method to ensure your return reaches us
              safely. ANINNA is not responsible for items lost in transit during
              a return.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Non-Returnable Items
            </h2>
            <p className="leading-8 text-[#6f6159]">
              For hygiene and safety reasons, opened or used beauty and skincare
              products cannot be returned unless they are faulty. Gift cards and
              promotional items are also non-returnable.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Contact Us
            </h2>
            <p className="leading-8 text-[#6f6159]">
              For any questions about returns or refunds, please reach out at
              hello@aninna.com or via WhatsApp. We aim to respond within 24
              hours and will do our best to resolve any issue quickly.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
