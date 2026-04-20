import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
            About ANINNA
          </p>

          <h1 className="mb-6 text-5xl font-semibold leading-tight text-[#7b3327] md:text-6xl">
            Where Scalp Care Becomes Ritual
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-[#6f6159]">
            ANINNA was created from the belief that scalp care deserves the same
            elegance, intention, and thoughtful formulation as skincare. Our
            approach blends botanical tradition with modern care to support a
            healthier-feeling scalp and healthier-looking hair.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
              Our Story
            </p>
            <h2 className="mb-6 text-3xl font-semibold text-[#7b3327]">
              Created with Purpose
            </h2>
            <p className="mb-4 leading-8 text-[#6f6159]">
              ANINNA was designed for people who want more from their hair care
              routine. Not just another product, but a refined experience rooted
              in comfort, quality, and intentional care.
            </p>
            <p className="leading-8 text-[#6f6159]">
              By focusing on the scalp first, ANINNA supports the foundation of
              healthier-looking hair with a formula that feels lightweight,
              soothing, and beautifully considered.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-10 shadow-sm">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
              Our Philosophy
            </p>
            <h2 className="mb-6 text-3xl font-semibold text-[#7b3327]">
              Botanical Wisdom, Modern Precision
            </h2>
            <p className="mb-4 leading-8 text-[#6f6159]">
              We believe the best care comes from balance. That is why ANINNA
              brings together purposeful botanical ingredients and modern
              formulation thinking in one elegant ritual.
            </p>
            <p className="leading-8 text-[#6f6159]">
              Every detail, from the alcohol-free formula to the precision
              applicator, is designed to make scalp care feel elevated, simple,
              and effective.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2rem] bg-[#7b3327] px-8 py-14 text-center text-white md:px-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f5c95c]">
            Our Mission
          </p>

          <h2 className="mb-6 text-4xl font-semibold">
            To Elevate Everyday Scalp Care
          </h2>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-white/85">
            ANINNA exists to transform scalp care into a premium daily ritual
            through elegant formulation, thoughtful design, and intentional
            botanical support.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}