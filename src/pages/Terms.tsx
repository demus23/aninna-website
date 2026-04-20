import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
          Terms & Conditions
        </p>

        <h1 className="mb-8 text-5xl font-semibold leading-tight text-[#7b3327] md:text-6xl">
          Terms & Conditions
        </h1>

        <div className="space-y-8 rounded-[2rem] bg-white p-10 shadow-sm">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Acceptance of Terms
            </h2>
            <p className="leading-8 text-[#6f6159]">
              By using the ANINNA website, you agree to these Terms &
              Conditions. If you do not agree, please do not use the website.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Website Use
            </h2>
            <p className="leading-8 text-[#6f6159]">
              You agree to use this website only for lawful purposes and in a
              way that does not harm, disrupt, or interfere with the website or
              other users.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Product Information
            </h2>
            <p className="leading-8 text-[#6f6159]">
              We aim to present product details accurately, but we do not
              guarantee that all descriptions, images, or other content are
              always complete, current, or error-free.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Intellectual Property
            </h2>
            <p className="leading-8 text-[#6f6159]">
              All content on this website, including text, branding, graphics,
              and design, belongs to ANINNA unless otherwise stated and may not
              be copied or used without permission.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Limitation of Liability
            </h2>
            <p className="leading-8 text-[#6f6159]">
              ANINNA is not liable for any damages arising from the use of this
              website, to the extent permitted by applicable law.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Changes to These Terms
            </h2>
            <p className="leading-8 text-[#6f6159]">
              We may update these Terms & Conditions from time to time.
              Continued use of the website means you accept the updated terms.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Contact
            </h2>
            <p className="leading-8 text-[#6f6159]">
              If you have questions about these Terms & Conditions, please
              contact us at hello@aninna.com.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}