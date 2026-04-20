import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

export default function Cancel() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="rounded-[2rem] bg-white p-10 shadow-sm">
          <h1 className="mb-4 text-4xl font-semibold text-[#7b3327]">
            Payment Cancelled
          </h1>
          <p className="text-lg leading-8 text-[#6f6159]">
            Your payment was not completed. You can return to checkout and try again.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}