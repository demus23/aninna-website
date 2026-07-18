import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
          Privacy Policy
        </p>

        <h1 className="mb-8 text-5xl font-semibold leading-tight text-[#7b3327] md:text-6xl">
          Privacy Policy
        </h1>

        <div className="space-y-8 rounded-[2rem] bg-white p-10 shadow-sm">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Introduction
            </h2>
            <p className="leading-8 text-[#6f6159]">
              ANINNA values your privacy. This Privacy Policy explains how we
              collect, use, and protect your information when you visit our
              website or contact us.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Information We Collect
            </h2>
            <p className="leading-8 text-[#6f6159]">
              We may collect information you provide directly, such as your
              name, email address, and any message you send through our contact
              form. We may also collect basic website usage information to help
              improve our site.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              How We Use Your Information
            </h2>
            <p className="leading-8 text-[#6f6159]">
              We use your information to respond to inquiries, improve our
              website, communicate with you when needed, and support the ANINNA
              customer experience.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Sharing of Information
            </h2>
            <p className="leading-8 text-[#6f6159]">
              We do not sell your personal information. We may share limited
              information with trusted service providers who help us operate the
              website or support customer communication.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Cookies and Analytics
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Our website may use cookies or analytics tools to understand site
              performance and improve user experience.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Your Rights
            </h2>
            <p className="leading-8 text-[#6f6159]">
              You may contact us if you want to access, update, or delete your
              personal information, subject to applicable laws.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#7b3327]">
              Contact
            </h2>
            <p className="leading-8 text-[#6f6159]">
              If you have questions about this Privacy Policy, please contact us
              at aninnacosmetic@gmail.com.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}