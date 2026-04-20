import { Link } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";


export default function Cart() {
  const {
    items,
    totalItems,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
            Cart
          </p>

          <h1 className="mb-6 text-5xl font-semibold leading-tight text-[#7b3327] md:text-6xl">
            Your Cart
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-[#6f6159]">
            Review your items before checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
            <h2 className="mb-4 text-3xl font-semibold text-[#7b3327]">
              Your cart is empty
            </h2>
            <p className="mb-8 text-[#6f6159]">
              Add ANINNA to your cart to continue.
            </p>
            <Link
              to="/shop"
              className="inline-block rounded-full bg-[#7b3327] px-8 py-4 font-semibold text-[#f5c95c] transition hover:opacity-90"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-6 rounded-[2rem] bg-white p-6 shadow-sm md:grid-cols-[140px_1fr]"
                >
                  <div className="overflow-hidden rounded-[1.5rem] bg-[#f3ede4]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="mb-2 text-2xl font-semibold text-[#7b3327]">
                        {item.name}
                      </h3>
                      <p className="mb-4 text-lg font-semibold">
                        AED{item.price.toFixed(2)}
                      </p>
                      <p className="text-[#6f6159]">
                        Premium scalp care designed for hydration, comfort, and
                        targeted application.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <div className="flex items-center overflow-hidden rounded-full border border-[#e8dfd2]">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-4 py-2 text-lg font-semibold text-[#7b3327]"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-4 py-2 text-lg font-semibold text-[#7b3327]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-full border border-[#d7c8b6] px-5 py-2 font-medium text-[#7b3327] transition hover:bg-[#f8f5ef]"
                      >
                        Remove
                      </button>

                      <p className="ml-auto font-semibold text-[#2b211d]">
                        AED{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-[2rem] bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-3xl font-semibold text-[#7b3327]">
                Order Summary
              </h2>

              <div className="mb-4 flex items-center justify-between text-[#6f6159]">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="mb-6 flex items-center justify-between text-[#6f6159]">
                <span>Subtotal</span>
                <span>AED{totalPrice.toFixed(2)}</span>
              </div>

              <div className="mb-8 border-t border-[#eadfce] pt-6">
                <div className="flex items-center justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span>AED{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Link
  to="/checkout"
  className="mb-4 block w-full rounded-full bg-[#7b3327] px-8 py-4 text-center font-semibold text-[#f5c95c] transition hover:opacity-90"
>
  Proceed to Checkout
</Link>

              <button
                onClick={clearCart}
                className="w-full rounded-full border border-[#d7c8b6] px-8 py-4 font-semibold text-[#7b3327] transition hover:bg-[#f8f5ef]"
              >
                Clear Cart
              </button>

              <p className="mt-6 text-sm leading-7 text-[#8a7b72]">
                Checkout can be connected next to Stripe, Paystack, or
                Flutterwave.
              </p>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}