import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navigation() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  // Build href for home-page anchor links — works correctly from any route
  const homeHref = (anchor: string) =>
    location.pathname === "/" ? anchor : `/${anchor}`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8dfd2] bg-[#f8f5ef]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div>
          <Link to="/" onClick={closeMenu}>
            <h1 className="text-3xl font-bold tracking-wide text-[#7b3327]">
              ANINNA
            </h1>
          </Link>
          <p className="text-sm text-[#7d6d63]">Nourishing Scalp & Hair Serum</p>
        </div>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex">
          <a href={homeHref("#benefits")} className="font-medium hover:text-[#7b3327]">
            Benefits
          </a>
          <a href={homeHref("#how-it-works")} className="font-medium hover:text-[#7b3327]">
            How It Works
          </a>
          <a href={homeHref("#ingredients")} className="font-medium hover:text-[#7b3327]">
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

        {/* Right side: cart + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="rounded-full bg-[#7b3327] px-6 py-3 font-semibold text-[#f5c95c] transition hover:opacity-90"
          >
            Cart ({totalItems})
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-[#7b3327] transition-all duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[#7b3327] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[#7b3327] transition-all duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-[#e8dfd2] bg-[#f8f5ef] px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-5 text-lg font-medium text-[#2b211d]">
            <li>
              <a
                href={homeHref("#benefits")}
                onClick={closeMenu}
                className="block hover:text-[#7b3327]"
              >
                Benefits
              </a>
            </li>
            <li>
              <a
                href={homeHref("#how-it-works")}
                onClick={closeMenu}
                className="block hover:text-[#7b3327]"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href={homeHref("#ingredients")}
                onClick={closeMenu}
                className="block hover:text-[#7b3327]"
              >
                Ingredients
              </a>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu} className="block hover:text-[#7b3327]">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMenu} className="block hover:text-[#7b3327]">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/shop" onClick={closeMenu} className="block hover:text-[#7b3327]">
                Shop
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
