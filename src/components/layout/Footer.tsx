import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setSubStatus("success");
      setEmail("");
    } catch {
      setSubStatus("error");
    }
  };

  return (
    <footer className="border-t border-[#eadfce] bg-[#f3ede4]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h4 className="text-2xl font-bold text-[#7b3327]">ANINNA</h4>
            <p className="mt-2 text-sm text-[#7d6d63]">
              Nourishing Scalp & Hair Serum
            </p>
            <p className="mt-4 max-w-sm leading-7 text-[#6f6159]">
              Combining ancestral botanical wisdom with modern clinical precision
              for a more elevated scalp care ritual.
            </p>

            {/* WhatsApp */}
            <a
              href="https://wa.me/971000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#d4a83e] px-4 py-2 text-sm font-semibold text-[#7b3327] transition hover:bg-[#d4a83e] hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Explore */}
          <div>
            <h5 className="mb-4 font-semibold text-[#7b3327]">Explore</h5>
            <ul className="space-y-3 text-[#6f6159]">
              <li><a href="/#benefits" className="hover:text-[#7b3327]">Benefits</a></li>
              <li><a href="/#how-it-works" className="hover:text-[#7b3327]">How It Works</a></li>
              <li><a href="/#ingredients" className="hover:text-[#7b3327]">Ingredients</a></li>
              <li><a href="/#reviews" className="hover:text-[#7b3327]">Reviews</a></li>
              <li><a href="/#faq" className="hover:text-[#7b3327]">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="mb-4 font-semibold text-[#7b3327]">Company</h5>
            <ul className="space-y-3 text-[#6f6159]">
              <li><Link to="/about" className="hover:text-[#7b3327]">About</Link></li>
              <li><Link to="/contact" className="hover:text-[#7b3327]">Contact</Link></li>
              <li><Link to="/shipping" className="hover:text-[#7b3327]">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-[#7b3327]">Return Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-[#7b3327]">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#7b3327]">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="mb-4 font-semibold text-[#7b3327]">Stay in the Ritual</h5>
            <p className="mb-4 leading-7 text-[#6f6159]">
              Be first to know about new launches and exclusive offers.
            </p>

            {subStatus === "success" ? (
              <div className="rounded-2xl bg-white p-4 text-sm font-medium text-green-700">
                You're on the list — welcome to ANINNA. ✓
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-2xl border border-[#e8dfd2] bg-white px-4 py-3 text-sm outline-none focus:border-[#d4a83e]"
                />
                {subStatus === "error" && (
                  <p className="text-xs text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  className="rounded-full bg-[#7b3327] px-6 py-3 text-sm font-semibold text-[#f5c95c] transition hover:opacity-90"
                >
                  Subscribe
                </button>
              </form>
            )}

            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-[#7b3327]">Follow Us</p>
              <a
                href="https://instagram.com/aninnabeauty"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#6f6159] hover:text-[#7b3327]"
              >
                @aninnabeauty
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#eadfce] pt-6 text-center text-sm text-[#8a7b72]">
          © {new Date().getFullYear()} ANINNA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
