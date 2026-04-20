const steps = [
  {
    title: "Apply Directly to the Scalp",
    description: "Use the precision applicator to place the serum onto targeted areas of the scalp.",
  },
  {
    title: "Massage Gently",
    description: "Allow the cooling rollerball and your fingertips to help distribute the formula evenly.",
  },
  {
    title: "Leave In",
    description: "Do not rinse. Let the formula absorb as part of your daily or weekly scalp care ritual.",
  },
  {
    title: "Use Consistently",
    description: "Consistent use helps support a healthier-feeling scalp and healthier-looking hair over time.",
  },
];

export default function UsageSection() {
  return (
    <section id="how-it-works" className="bg-[#f3ede4] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">How It Works</p>
          <h3 className="mb-4 text-4xl font-semibold text-[#7b3327]">A Simple Ritual with Precision Benefits</h3>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-[#6f6159]">
            ANINNA is designed to make scalp care feel intentional, elegant, and easy. Its targeted delivery system helps place the formula directly where needed, while the lightweight blend fits beautifully into your routine.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-[2rem] bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5c95c] font-bold text-[#7b3327]">
                {index + 1}
              </div>
              <h4 className="mb-3 text-2xl font-semibold text-[#7b3327]">{step.title}</h4>
              <p className="leading-8 text-[#6f6159]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}