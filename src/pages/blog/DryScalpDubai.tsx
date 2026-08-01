import { Link } from "react-router-dom";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";

export default function DryScalpDubai() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <article className="mx-auto max-w-3xl px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
            Scalp Health · 5 min read
          </p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-[#7b3327] md:text-5xl">
            Why Dubai's Climate Causes Dry Scalp — And How to Fix It
          </h1>
          <p className="text-lg leading-8 text-[#6f6159]">
            Air conditioning, hard water, and extreme heat create the perfect
            storm for scalp dryness in the UAE. Here's what actually helps.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-[#2b211d]">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              The UAE Scalp Problem Is Real
            </h2>
            <p className="leading-8 text-[#6f6159]">
              If you've moved to Dubai or anywhere in the GCC and noticed your
              scalp getting drier, itchier, or more irritated than back home —
              you're not imagining it. The UAE climate puts your scalp under
              pressure that most other environments simply don't. It's not one
              thing. It's three things happening at once.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              1. Air Conditioning Strips Moisture Constantly
            </h2>
            <p className="leading-8 text-[#6f6159]">
              In the UAE, air conditioning isn't optional — it runs almost
              24 hours a day for most of the year. And while it keeps you cool,
              it also pulls moisture from the air to dangerously low levels.
              Your scalp skin, like the skin on your face, needs ambient
              humidity to stay hydrated. When indoor humidity drops below 30%
              — which is common in UAE offices, malls, and homes — your scalp
              dehydrates faster than it can replenish itself. The result is
              tightness, flaking, and irritation that worsens the longer you
              spend indoors.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              2. Hard Water Builds Up on Your Scalp
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Most tap water in the UAE is desalinated, which means it goes
              through a process that leaves behind high levels of dissolved
              minerals — particularly calcium and magnesium. This is what's
              called hard water, and it behaves very differently from the
              softer water many expats are used to from Europe or Southeast
              Asia. When hard water meets your shampoo, it doesn't lather
              as easily — so many people use more product than they need.
              Over time, mineral deposits build up on the scalp and hair
              shaft, creating a layer that blocks moisture from getting in
              and makes it harder for active ingredients in serums and
              treatments to penetrate. The scalp ends up looking dull and
              feeling congested, even after washing.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              3. The Heat and Humidity Swing Creates Imbalance
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Step outside in summer and the humidity can hit 90%. Step back
              inside to the air conditioning and it drops to under 30%. Your
              scalp's sebum production — the natural oil that keeps skin
              balanced — is constantly trying to adapt to these swings. The
              result is a scalp that either over-produces oil to compensate
              for dryness, or becomes genuinely dry and flaky as it struggles
              to regulate. Neither is comfortable, and neither responds well
              to the same shampoo you used back home.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              What Actually Helps
            </h2>
            <p className="mb-4 leading-8 text-[#6f6159]">
              The most effective approach for scalp dryness in the UAE combines
              three things: consistent targeted hydration, barrier support, and
              a formula that can penetrate through any mineral buildup to reach
              the scalp itself.
            </p>
            <p className="mb-4 leading-8 text-[#6f6159]">
              A leave-in scalp serum applied directly to the scalp — rather
              than a rinse-out treatment — works better in this context because
              it stays on the scalp and continues working between washes.
              Look for ingredients like panthenol (Pro-Vitamin B5) for
              deep moisture retention, aloe vera for soothing irritation, and
              botanical extracts that calm rather than stimulate an already
              stressed scalp.
            </p>
            <p className="leading-8 text-[#6f6159]">
              Avoid alcohol-based formulas — they evaporate quickly and make
              the dryness worse in low-humidity environments. An alcohol-free
              serum with a precision applicator that delivers the formula
              directly to the scalp is the most effective format for UAE
              conditions.
            </p>
          </div>

          {/* CTA */}
          <div className="rounded-[2rem] bg-[#7b3327] px-8 py-10 text-center text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f5c95c]">
              Designed for the UAE Climate
            </p>
            <h3 className="mb-4 text-3xl font-semibold">
              ANINNA Nourishing Scalp & Hair Serum
            </h3>
            <p className="mb-8 text-lg leading-8 text-white/85">
              Alcohol-free formula with a precision rollerball applicator.
              Designed to hydrate, soothe, and support scalp health in
              the Gulf's demanding climate.
            </p>
            <Link
              to="/shop"
              className="inline-block rounded-full bg-[#f5c95c] px-8 py-4 font-semibold text-[#7b3327] transition hover:opacity-90"
            >
              Shop Now — AED 90
            </Link>
          </div>

          {/* More articles */}
          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
              Continue Reading
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                to="/blog/scalp-care-routine-gcc"
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <p className="font-semibold text-[#7b3327]">
                  The Complete Scalp Care Routine for UAE & GCC Women →
                </p>
              </Link>
              <Link
                to="/blog/scalp-serum-vs-hair-oil"
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <p className="font-semibold text-[#7b3327]">
                  Scalp Serum vs Hair Oil: What's the Difference? →
                </p>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
