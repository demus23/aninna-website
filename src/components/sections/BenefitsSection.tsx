const benefits = [
  {
    title: "Deep Scalp Nourishment",
    description: "Helps replenish moisture and comfort the scalp without leaving behind a heavy or greasy feel.",
  },
  {
    title: "Cooling Daily Relief",
    description: "Refreshing botanical extracts help calm the scalp and create a cleaner, soothed sensation after application.",
  },
  {
    title: "Targeted Precision Application",
    description: "The pen-like applicator helps deliver serum exactly where it is needed for a more intentional scalp care ritual.",
  },
  {
    title: "Botanical + Clinical Balance",
    description: "A thoughtful blend of plant extracts and modern actives supports a healthier scalp environment.",
  },
  {
    title: "Lightweight Alcohol-Free Formula",
    description: "Created for regular use with a formula that feels elegant, clean, and easy to layer into your routine.",
  },
  {
    title: "Supports Healthier-Looking Hair",
    description: "By caring for the scalp consistently, ANINNA helps support the appearance of stronger, fuller, healthier-looking hair over time.",
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">Benefits</p>
        <h3 className="mb-4 text-4xl font-semibold text-[#7b3327]">Why ANINNA Belongs in Your Routine</h3>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-[#6f6159]">
          Created for targeted scalp care with a premium formula that feels elegant, effective, and easy to use.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h4 className="mb-4 text-2xl font-semibold text-[#7b3327]">{benefit.title}</h4>
            <p className="leading-8 text-[#6f6159]">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}