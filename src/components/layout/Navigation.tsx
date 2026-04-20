import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navigation() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8dfd2] bg-[#f8f5ef]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <Link to="/">
            <h1 className="text-3xl font-bold tracking-wide text-[#7b3327]">
              ANINNA
            </h1>
          </Link>
          <p className="text-sm text-[#7d6d63]">Nourishing Scalp & Hair Serum</p>
        </div>

        <nav className="hidden gap-8 md:flex">
          <a href="/#benefits" className="font-medium hover:text-[#7b3327]">
            Benefits
          </a>
          <a href="/#how-it-works" className="font-medium hover:text-[#7b3327]">
            How It Works
          </a>
          <a href="/#ingredients" className="font-medium hover:text-[#7b3327]">
            Ingredients
          </a>
          <Link to="/about" className="font-medium hover:text-[#7b3327]">
            About
          </Link>
          <Link to="/contact" className="font-medium hover:text-[#7b3327]">
            Contact
          </Link>
          <Link to="/shop" className="font-medium hover:text-[#7b3327]">
            Shop
          </Link>
        </nav>

        <Link
          to="/cart"
          className="rounded-full bg-[#7b3327] px-6 py-3 font-semibold text-[#f5c95c] transition hover:opacity-90"
        >
          Cart ({totalItems})
        </Link>
      </div>
    </header>
  );
}