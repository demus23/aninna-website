import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-[#eadfce] bg-[#f3ede4]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <h4 className="text-2xl font-bold text-[#7b3327]">ANINNA</h4>
          <p className="mt-2 text-sm text-[#7d6d63]">
            Nourishing Scalp & Hair Serum
          </p>
          <p className="mt-4 max-w-sm leading-7 text-[#6f6159]">
            Combining ancestral botanical wisdom with modern clinical precision
            for a more elevated scalp care ritual.
          </p>
        </div>

        <div>
          <h5 className="mb-4 font-semibold text-[#7b3327]">Explore</h5>
          <ul className="space-y-3 text-[#6f6159]">
            <li>
              <a href="/#benefits">Benefits</a>
            </li>
            <li>
              <a href="/#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="/#ingredients">Ingredients</a>
            </li>
            <li>
              <a href="/#reviews">Reviews</a>
            </li>
            <li>
              <a href="/#faq">FAQ</a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 font-semibold text-[#7b3327]">Company</h5>
          <ul className="space-y-3 text-[#6f6159]">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}