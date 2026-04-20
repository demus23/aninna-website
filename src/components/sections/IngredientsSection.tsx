export default function IngredientsSection() {
  return (
    <section id="ingredients" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">Ingredients</p>
        <h3 className="mb-4 text-4xl font-semibold text-[#7b3327]">Powered by Purposeful Ingredients</h3>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-[#6f6159]">
          Every ingredient in ANINNA is selected with intention. From soothing botanicals to clinically inspired actives, the formula is designed to support scalp comfort, hydration, and a healthier-looking hair routine.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h4 className="mb-4 text-2xl font-semibold text-[#7b3327]">Key Botanicals</h4>
          <p className="leading-8 text-[#6f6159]">
            Plant-based ingredients chosen to help nourish the scalp, support comfort, and elevate the daily care experience.
          </p>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h4 className="mb-4 text-2xl font-semibold text-[#7b3327]">Clinical Actives</h4>
          <p className="leading-8 text-[#6f6159]">
            Modern ingredients selected to support scalp balance, lightweight performance, and a clean, elegant finish.
          </p>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h4 className="mb-4 text-2xl font-semibold text-[#7b3327]">Soothing Support</h4>
          <p className="leading-8 text-[#6f6159]">
            Comforting extracts that help refresh the scalp and promote a calmer, more balanced feel.
          </p>
        </div>
      </div>
    </section>
  );
}