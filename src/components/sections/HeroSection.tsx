import heroProduct from "../../assets/aninna-hero.jpg";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
            Luxury Scalp Care
          </p>

          <h2 className="mb-6 text-5xl font-semibold leading-tight md:text-6xl">
            Revive Your Scalp.
            <span className="block text-[#7b3327]">Restore Your Hair.</span>
          </h2>

          <p className="mb-8 max-w-xl text-lg leading-8 text-[#6f6159]">
            A precision-crafted nourishing scalp and hair serum that combines
            ancestral botanical wisdom with modern clinical actives to hydrate,
            soothe, and support healthier-looking hair from the root.
          </p>

          <div className="mb-10 flex flex-wrap gap-4">
            <a
  href="/shop"
  className="inline-block rounded-full bg-[#f5c95c] px-8 py-4 font-semibold text-[#7b3327] transition hover:opacity-90"
>
  Shop Now
</a>

            <a
              href="#how-it-works"
              className="rounded-full border-2 border-[#d4a83e] px-8 py-4 font-semibold text-[#d4a83e] transition hover:bg-[#d4a83e] hover:text-white"
            >
              How It Works
            </a>
          </div>

          <div className="grid max-w-xl grid-cols-3 gap-6 border-t border-[#e3d8ca] pt-6">
            <div>
              <p className="text-3xl font-bold text-[#7b3327]">15ml</p>
              <p className="text-sm text-[#6f6159]">Precision Dose</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-[#7b3327]">100%</p>
              <p className="text-sm text-[#6f6159]">Alcohol-Free</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-[#7b3327]">Botanical</p>
              <p className="text-sm text-[#6f6159]">+ Clinical Blend</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-sm md:p-8">
          <div className="overflow-hidden rounded-[1.5rem] bg-[#f3ede4]">
            <img
              src={heroProduct}
              alt="ANINNA Nourishing Scalp and Hair Serum"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}