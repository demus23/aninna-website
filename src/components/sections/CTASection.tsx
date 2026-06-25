export default function CTASection() {
  return (
    <section id="cta" className="mx-auto max-w-5xl px-6 py-20">
      <div className="rounded-[2rem] bg-[#7b3327] px-8 py-14 text-center text-white md:px-16">
        <h3 className="mb-4 text-4xl font-semibold">Transform Your Scalp Ritual with ANINNA</h3>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-white/85">
          Discover targeted botanical scalp care designed to soothe, refresh, and support healthier-looking hair with every application.
        </p>
        <a
          href="/shop"
          className="inline-block rounded-full bg-[#f5c95c] px-8 py-4 font-semibold text-[#7b3327] transition hover:opacity-90"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}
