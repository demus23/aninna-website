// REVIEWS — replace the three placeholder entries below with real customer
// quotes before launch. Remove this comment when done.
const reviews = [
  {
    name: "Amina K.",
    location: "Dubai, UAE",
    quote:
      "My scalp felt calmer and more refreshed after using ANINNA. It feels luxurious, lightweight, and easy to use.",
  },
  {
    name: "Grace M.",
    location: "Abu Dhabi, UAE",
    quote:
      "I love the precision applicator. It makes my routine feel intentional and premium, and my scalp feels more balanced.",
  },
  {
    name: "Naomi T.",
    location: "Riyadh, KSA",
    quote:
      "Beautiful texture, soothing feel, and a very elegant experience overall. ANINNA fits perfectly into my self-care routine.",
  },
];

function Stars() {
  return (
    <div className="mb-4 flex gap-1 text-[#e0b84f]" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
            Reviews
          </p>

          <h3 className="mb-4 text-4xl font-semibold text-[#7b3327]">
            What Customers Are Saying
          </h3>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-[#6f6159]">
            From first use to daily ritual — ANINNA is designed to be felt, not
            just applied.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-[2rem] border border-[#eadfce] bg-[#f8f5ef] p-8 shadow-sm"
            >
              <Stars />
              <p className="mb-6 text-lg leading-8 text-[#6f6159]">
                "{review.quote}"
              </p>
              <div>
                <p className="font-semibold text-[#7b3327]">{review.name}</p>
                <p className="text-sm text-[#8a7b72]">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
