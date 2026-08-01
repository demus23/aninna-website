import { Link } from "react-router-dom";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";

export default function ScalpCareRoutineGCC() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <article className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
            Routine · 7 min read
          </p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-[#7b3327] md:text-5xl">
            The Complete Scalp Care Routine for UAE & GCC Women
          </h1>
          <p className="text-lg leading-8 text-[#6f6159]">
            A practical, effective routine built specifically for the Gulf
            climate — covering water quality, wash frequency, what to apply,
            and when.
          </p>
        </div>

        <div className="space-y-8">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Why Your Old Routine Might Not Work Here
            </h2>
            <p className="leading-8 text-[#6f6159]">
              The scalp care routine that worked perfectly in London, Beirut,
              or Nairobi may not translate directly to life in Dubai or Riyadh.
              The UAE and broader GCC environment — hard water, extreme heat,
              constant air conditioning, and high UV — creates specific scalp
              challenges that require a slightly different approach. The good
              news is that the routine is simple. It just needs to be adapted.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Step 1 — Address the Water
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Hard water is unavoidable in most UAE buildings, but you can
              reduce its impact. Use a chelating or clarifying shampoo once
              every two weeks to remove mineral buildup from your scalp and
              hair. On regular wash days, a gentle sulphate-free shampoo is
              preferable — it cleans without stripping the natural oils your
              scalp is already struggling to maintain in the dry climate.
              If possible, finish with a cool water rinse — hot water opens
              the scalp and accelerates moisture loss.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Step 2 — Wash Frequency
            </h2>
            <p className="leading-8 text-[#6f6159]">
              In the UAE's heat, sweating is unavoidable — and sweat left on
              the scalp creates an environment that can irritate follicles
              and encourage dandruff. But washing too frequently with the
              wrong shampoo strips the scalp's natural barrier. A good middle
              ground for most GCC residents is 2 to 3 times per week with a
              gentle formula. If you exercise heavily or spend significant time
              outdoors, rinsing with water only between wash days can refresh
              the scalp without stripping it.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Step 3 — Apply Your Scalp Serum
            </h2>
            <p className="leading-8 text-[#6f6159]">
              This is the most important step for long-term scalp health in
              the Gulf. After washing and lightly towel-drying, apply a
              leave-in scalp serum directly to the scalp using a precision
              applicator. Part your hair in sections and apply along each
              parting to ensure even coverage. Gently massage with your
              fingertips for 30 to 60 seconds — this increases circulation
              to the follicles and helps the formula absorb. Leave it in.
              Do not rinse. The ingredients need time on the scalp to work.
            </p>
            <p className="mt-4 leading-8 text-[#6f6159]">
              For UAE conditions specifically, choose an alcohol-free serum.
              Alcohol-based formulas evaporate quickly in low-humidity
              environments and can make dryness worse over time.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Step 4 — Protect from the Sun
            </h2>
            <p className="leading-8 text-[#6f6159]">
              The UAE's UV index regularly reaches extreme levels, and direct
              sun exposure to the parting or crown thins hair over time.
              When spending time outdoors, wear a hat or use a UV-protective
              hair product. This is a step most people skip but one of the
              most impactful ones for long-term hair retention in the Gulf.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Your Weekly Scalp Routine at a Glance
            </h2>
            <div className="space-y-3">
              {[
                { day: "Wash days (2–3x per week)", action: "Gentle sulphate-free shampoo → cool rinse → apply scalp serum → leave in" },
                { day: "Every 2 weeks", action: "Chelating or clarifying shampoo to remove mineral buildup from hard water" },
                { day: "Daily", action: "Scalp serum can be reapplied lightly on non-wash days to maintain hydration" },
                { day: "Outdoors", action: "Hat or UV-protective product, especially during summer months" },
              ].map((item) => (
                <div key={item.day} className="rounded-xl bg-[#f8f5ef] p-4">
                  <p className="font-semibold text-[#7b3327]">{item.day}</p>
                  <p className="mt-1 text-sm leading-6 text-[#6f6159]">{item.action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#7b3327] px-8 py-10 text-center text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f5c95c]">
              Built for This Routine
            </p>
            <h3 className="mb-4 text-3xl font-semibold">
              ANINNA Nourishing Scalp & Hair Serum
            </h3>
            <p className="mb-8 text-lg leading-8 text-white/85">
              Alcohol-free leave-in serum with a precision rollerball applicator.
              Designed for consistent daily scalp care in the UAE and GCC climate.
              AED 90 · Delivered across UAE.
            </p>
            <Link
              to="/shop"
              className="inline-block rounded-full bg-[#f5c95c] px-8 py-4 font-semibold text-[#7b3327] transition hover:opacity-90"
            >
              Shop Now — AED 90
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
              <Link to="/blog/hair-loss-uae-women" className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
                <p className="font-semibold text-[#7b3327]">Hair Loss in the UAE: Causes and Solutions →</p>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
