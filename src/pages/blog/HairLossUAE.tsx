import { Link } from "react-router-dom";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";

export default function HairLossUAE() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <article className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
            Hair Loss · 6 min read
          </p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-[#7b3327] md:text-5xl">
            Hair Loss in the UAE: Why It Happens and What You Can Do
          </h1>
          <p className="text-lg leading-8 text-[#6f6159]">
            Hair thinning is one of the most common concerns for women living
            in the GCC. The environment plays a bigger role than most people
            realise — here's what's really behind it.
          </p>
        </div>

        <div className="space-y-8">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Why Hair Loss Is So Common in the Gulf
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Dermatologists across Dubai and Abu Dhabi consistently report that
              hair loss and thinning are among the top concerns they see from
              both residents and expats. While genetics and hormones play a
              role for some, the UAE environment creates a specific set of
              stressors on the scalp and hair follicle that accelerate shedding
              in people who would otherwise have healthy hair.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Hard Water and Mineral Buildup
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Desalinated water — the standard in most UAE buildings — is high
              in dissolved minerals that accumulate on the scalp over time.
              This buildup can clog follicles, making it harder for hair to
              grow normally and for scalp treatments to reach the skin
              effectively. Many women notice increased shedding within a few
              months of moving to the UAE, even if they had no hair concerns
              before. Hard water exposure is consistently one of the first
              causes to investigate.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Heat and Sun Exposure
            </h2>
            <p className="leading-8 text-[#6f6159]">
              UV radiation damages the hair shaft and can dry out the scalp,
              weakening follicles over time. In summer months, when temperatures
              regularly exceed 40°C and UV index levels are extreme, scalp
              exposure — especially at the parting or crown — becomes a
              significant factor in hair thinning. Wearing a hat during outdoor
              exposure is one of the simplest protective steps you can take.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Stress and Lifestyle
            </h2>
            <p className="leading-8 text-[#6f6159]">
              Relocation stress, busy work schedules, and the physical
              adjustment to a new climate all elevate cortisol — the stress
              hormone directly linked to a type of hair loss called telogen
              effluvium, where hair prematurely enters its resting and shedding
              phase. This type of hair loss typically appears 2 to 3 months
              after a stressful period, which is why many expats connect it
              to their move rather than recognising it was triggered earlier.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-[#7b3327]">
              Ingredients That Support Scalp Health and Hair Retention
            </h2>
            <p className="mb-4 leading-8 text-[#6f6159]">
              While severe or persistent hair loss warrants a visit to a
              dermatologist, consistent scalp care with targeted ingredients
              can meaningfully support a healthier follicle environment.
              Key ingredients to look for:
            </p>
            <div className="space-y-4">
              {[
                { name: "Niacinamide (Vitamin B3)", benefit: "Supports scalp barrier function and helps improve the appearance of hair density when used consistently." },
                { name: "Panthenol (Pro-Vitamin B5)", benefit: "Deeply conditions the scalp and hair shaft, improving resilience and reducing breakage." },
                { name: "Biotin Complex", benefit: "Supports the scalp environment that healthy hair growth depends on." },
                { name: "Botanical Extracts", benefit: "Plant-based ingredients like green tea and chamomile help calm scalp inflammation that can interfere with normal hair cycles." },
              ].map((item) => (
                <div key={item.name} className="rounded-xl bg-[#f8f5ef] p-4">
                  <p className="font-semibold text-[#7b3327]">{item.name}</p>
                  <p className="mt-1 text-sm leading-6 text-[#6f6159]">{item.benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#7b3327] px-8 py-10 text-center text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f5c95c]">
              Support Your Scalp from the Root
            </p>
            <h3 className="mb-4 text-3xl font-semibold">
              ANINNA Nourishing Scalp & Hair Serum
            </h3>
            <p className="mb-8 text-lg leading-8 text-white/85">
              Formulated with niacinamide, panthenol, and botanical extracts
              to support a healthier scalp environment and healthier-looking
              hair over time.
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
