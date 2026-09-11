import { Link } from "react-router-dom";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";

export default function ScalpSerumVsHairOil() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <article className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
            Education · 4 min read
          </p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-[#7b3327] md:text-5xl">
            Scalp Serum vs Hair Oil: What's the Difference and Which Do You Need?
          </h1>
          <p className="text-lg leading-8 text-[#6f6159]">
            Both are popular in scalp care routines — but they work very
            differently. Understanding which one addresses your concern can
            transform your results.
          </p>
        </div>

        <div className="space-y-8">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              What a Scalp Serum Does
            </h2>
            <p className="leading-8 text-[#6f6159]">
              A scalp serum is a water-based or lightweight formula designed
              to deliver active ingredients directly to the scalp skin and
              hair follicles. Because serums have smaller molecular structures
              than oils, they penetrate the scalp rather than sitting on top
              of it. This means the active ingredients — niacinamide, biotin,
              botanical extracts, panthenol — can reach the follicle where
              they're actually needed. Serums are typically leave-in formulas
              applied after washing, and they dry down without residue.
              They're designed for consistent daily or weekly use as part of
              a scalp health routine.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              What a Hair Oil Does
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Hair oils work primarily on the hair shaft rather than the
              scalp skin. They coat the outside of the hair strand, sealing
              in moisture and reducing friction that causes breakage and
              frizz. Some oils — like rosehip or argan — can penetrate the
              hair shaft to some degree, but their main benefit is surface
              protection and shine. Applied to the scalp, most oils create
              a barrier that can actually prevent active ingredients from
              reaching the skin, and in the UAE's hot climate, heavy oils
              on the scalp can contribute to product buildup and clogged
              follicles. Oils work best applied mid-lengths to ends, not
              at the root.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Which One Do You Need?
            </h2>
            <div className="space-y-4">
              {[
                { concern: "Dry or itchy scalp", answer: "Scalp serum — delivers hydrating actives directly to the skin." },
                { concern: "Hair thinning or shedding", answer: "Scalp serum — targets the follicle environment where growth begins." },
                { concern: "Dandruff or flaking", answer: "Scalp serum — anti-inflammatory botanicals address the cause at scalp level." },
                { concern: "Frizzy or dry hair lengths", answer: "Hair oil — applied mid-lengths to ends after serum." },
                { concern: "Dull, unshiny hair", answer: "Hair oil — a few drops on dry hair for instant gloss." },
                { concern: "Overall scalp and hair health", answer: "Both — serum on scalp, oil on lengths. They complement each other." },
              ].map((item) => (
                <div key={item.concern} className="flex gap-4 rounded-xl bg-[#f8f5ef] p-4">
                  <div className="min-w-fit">
                    <p className="font-semibold text-[#7b3327]">{item.concern}</p>
                    <p className="mt-1 text-sm leading-6 text-[#6f6159]">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Why Alcohol-Free Matters for Scalp Serums in the UAE
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Many scalp serums on the market contain denatured alcohol as a
              carrier — it helps the formula spread and dry quickly. But in
              the UAE's already dry, air-conditioned environment, alcohol
              accelerates moisture loss from the scalp. An alcohol-free serum
              delivers the active ingredients without stripping moisture in the
              process, making it a much better choice for the Gulf climate.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#7b3327] px-8 py-10 text-center text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f5c95c]">
              The Scalp Serum for the Gulf Climate
            </p>
            <h3 className="mb-4 text-3xl font-semibold">
              ANINNA Nourishing Scalp & Hair Serum
            </h3>
            <p className="mb-8 text-lg leading-8 text-white/85">
              Alcohol-free. Lightweight. Precision rollerball applicator for
              direct scalp delivery. Designed for consistent daily ritual.
            </p>
            <Link
              to="/shop"
              className="inline-block rounded-full bg-[#f5c95c] px-8 py-4 font-semibold text-[#7b3327] transition hover:opacity-90"
            >
              Shop Now — AED 99
            </Link>
          </div>

          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
              Continue Reading
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Link to="/blog/dry-scalp-dubai-climate" className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
                <p className="font-semibold text-[#7b3327]">Why Dubai's Climate Causes Dry Scalp →</p>
              </Link>
              <Link to="/blog/scalp-care-routine-gcc" className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
                <p className="font-semibold text-[#7b3327]">The Complete Scalp Care Routine for GCC Women →</p>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
