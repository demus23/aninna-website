import { useState } from "react";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// Change this if your image filename is different
import productImage from "../assets/aninna-bottle.jpg";

export default function Shop() {
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(
      {
        id: "aninna-serum",
        name: "ANINNA Nourishing Scalp & Hair Serum",
        price: 90,
        image: productImage,
      },
      quantity
    );

    setAddedMessage(`Added ${quantity} item(s) to cart`);

    setTimeout(() => {
      setAddedMessage("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
            Shop
          </p>

          <h1 className="mb-6 text-5xl font-semibold leading-tight text-[#7b3327] md:text-6xl">
            Shop ANINNA
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-[#6f6159]">
            Discover our precision-crafted nourishing scalp and hair serum,
            designed to support comfort, hydration, and a more elevated hair
            care ritual.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-sm md:p-8">
            <div className="overflow-hidden rounded-[1.5rem] bg-[#f3ede4]">
              <img
                src={productImage}
                alt="ANINNA Nourishing Scalp & Hair Serum"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
              Signature Product
            </p>

            <h2 className="mb-4 text-4xl font-semibold text-[#7b3327]">
              ANINNA Nourishing Scalp & Hair Serum
            </h2>

            <p className="mb-4 text-2xl font-semibold text-[#2b211d]"> AED 90.00</p>

            <p className="mb-8 leading-8 text-[#6f6159]">
              A lightweight alcohol-free formula that blends botanical wisdom
              with modern precision to help nourish the scalp, support comfort,
              and promote healthier-looking hair from the root.
            </p>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#f8f5ef] p-4">
                <p className="font-semibold text-[#7b3327]">Size</p>
                <p className="text-[#6f6159]">15ml</p>
              </div>

              <div className="rounded-2xl bg-[#f8f5ef] p-4">
                <p className="font-semibold text-[#7b3327]">Formula</p>
                <p className="text-[#6f6159]">Alcohol-Free</p>
              </div>

              <div className="rounded-2xl bg-[#f8f5ef] p-4">
                <p className="font-semibold text-[#7b3327]">Use</p>
                <p className="text-[#6f6159]">Leave-In Scalp Serum</p>
              </div>

              <div className="rounded-2xl bg-[#f8f5ef] p-4">
                <p className="font-semibold text-[#7b3327]">Applicator</p>
                <p className="text-[#6f6159]">Precision Rollerball</p>
              </div>
            </div>

            <div className="mb-8 flex items-center gap-4">
              <label htmlFor="quantity" className="font-medium text-[#7b3327]">
                Quantity
              </label>

              <select
                id="quantity"
                className="rounded-xl border border-[#e8dfd2] bg-[#f8f5ef] px-4 py-3 outline-none"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleAddToCart}
                className="rounded-full bg-[#7b3327] px-8 py-4 font-semibold text-[#f5c95c] transition hover:opacity-90"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  handleAddToCart();
                  navigate("/cart");
                }}
                className="rounded-full border-2 border-[#d4a83e] px-8 py-4 font-semibold text-[#d4a83e] transition hover:bg-[#d4a83e] hover:text-white"
              >
                Buy Now
              </button>
            </div>

            {addedMessage && (
              <p className="mt-4 font-medium text-green-700">{addedMessage}</p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h3 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Why You’ll Love It
            </h3>
            <p className="leading-8 text-[#6f6159]">
              Lightweight, elegant, and designed for targeted scalp care without
              a greasy finish.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h3 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Ritual-Ready Formula
            </h3>
            <p className="leading-8 text-[#6f6159]">
              Created to fit beautifully into your daily or weekly self-care
              routine.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h3 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Precision Application
            </h3>
            <p className="leading-8 text-[#6f6159]">
              The rollerball applicator helps place the serum directly where it
              is needed most.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
