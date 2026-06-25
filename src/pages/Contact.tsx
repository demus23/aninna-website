import { useState } from "react";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
            Contact
          </p>

          <h1 className="mb-6 text-5xl font-semibold leading-tight text-[#7b3327] md:text-6xl">
            We’d Love to Hear From You
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-[#6f6159]">
            Whether you have questions about ANINNA, your order, or your scalp
            care routine, we are here to help.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
              Get in Touch
            </p>

            <h2 className="mb-6 text-3xl font-semibold text-[#7b3327]">
              Contact Information
            </h2>

            <div className="space-y-5 text-[#6f6159]">
              <div>
                <p className="font-semibold text-[#7b3327]">Email</p>
                <p>hello@aninna.com</p>
              </div>

              <div>
                <p className="font-semibold text-[#7b3327]">Instagram</p>
                <p>@aninnabeauty</p>
              </div>

              <div>
                <p className="font-semibold text-[#7b3327]">Response Time</p>
                <p>We usually reply within 24 to 48 hours.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-10 shadow-sm">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
              Send a Message
            </p>

            <h2 className="mb-6 text-3xl font-semibold text-[#7b3327]">
              Contact Form
            </h2>

            {status === "success" ? (
              <div className="rounded-2xl bg-green-50 p-6 text-green-800">
                Thanks for reaching out — we'll get back to you within 24 to 48
                hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block font-medium text-[#7b3327]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
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
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-[#e8dfd2] bg-[#f8f5ef] px-4 py-3 outline-none focus:border-[#d4a83e]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-[#7b3327]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    className="w-full rounded-2xl border border-[#e8dfd2] bg-[#f8f5ef] px-4 py-3 outline-none focus:border-[#d4a83e]"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-600">
                    Something went wrong. Please try again or email us
                    directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-full bg-[#7b3327] px-8 py-4 font-semibold text-[#f5c95c] transition hover:opacity-90 disabled:opacity-60"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
