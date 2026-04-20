const reviews = [
  {
    name: "Amina K.",
    title: "Verified Customer",
    quote:
      "My scalp felt calmer and more refreshed after using ANINNA. It feels luxurious, lightweight, and easy to use.",
  },
  {
    name: "Grace M.",
    title: "Verified Customer",
    quote:
      "I love the precision applicator. It makes my routine feel intentional and premium, and my scalp feels more balanced.",
  },
  {
    name: "Naomi T.",
    title: "Verified Customer",
    quote:
      "Beautiful texture, soothing feel, and a very elegant experience overall. ANINNA fits perfectly into my self-care routine.",
  },
];

function Stars() {
  return (
    <div className="mb-4 flex gap-1 text-[#e0b84f]">
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
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
            A luxurious scalp ritual designed to feel elegant, targeted, and
            refreshing from the very first use.
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
                “{review.quote}”
              </p>
              <div>
                <p className="font-semibold text-[#7b3327]">{review.name}</p>
                <p className="text-sm text-[#8a7b72]">{review.title}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-[#8a7b72]">
          Replace these with real customer reviews before launch.
        </p>
      </div>
    </section>
  );
}