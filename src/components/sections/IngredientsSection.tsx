const ingredients = [
  {
    category: "Key Botanicals",
    color: "bg-[#f8f5ef]",
    items: [
      {
        name: "Rosehip Seed Oil",
        benefit: "Rich in essential fatty acids that deeply nourish the scalp and support moisture retention.",
      },
      {
        name: "Green Tea Extract",
        benefit: "A potent antioxidant that helps protect the scalp environment and supports a balanced, calm feel.",
      },
      {
        name: "Aloe Vera",
        benefit: "A soothing botanical that helps hydrate and cool the scalp with each application.",
      },
    ],
  },
  {
    category: "Clinical Actives",
    color: "bg-[#f3ede4]",
    items: [
      {
        name: "Niacinamide (Vitamin B3)",
        benefit: "Supports scalp barrier function and helps improve the appearance of hair density over time.",
      },
      {
        name: "Panthenol (Pro-Vitamin B5)",
        benefit: "Penetrates deeply to condition both the scalp and hair shaft, improving softness and resilience.",
      },
      {
        name: "Biotin Complex",
        benefit: "Supports the scalp's natural environment to encourage a healthier-looking hair growth foundation.",
      },
    ],
  },
  {
    category: "Soothing Support",
    color: "bg-white",
    items: [
      {
        name: "Peppermint Oil",
        benefit: "Delivers a signature cooling sensation that refreshes and invigorates the scalp after each use.",
      },
      {
        name: "Chamomile Extract",
        benefit: "Calms scalp sensitivity and helps reduce the appearance of redness or irritation.",
      },
      {
        name: "Glycerin",
        benefit: "A humectant that draws moisture to the scalp surface and keeps it comfortable throughout the day.",
      },
    ],
  },
];

export default function IngredientsSection() {
  return (
    <section id="ingredients" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
          Ingredients
        </p>
        <h3 className="mb-4 text-4xl font-semibold text-[#7b3327]">
          Powered by Purposeful Ingredients
        </h3>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-[#6f6159]">
          Every ingredient in ANINNA is chosen with intention — from scalp-soothing
          botanicals to clinically inspired actives that work together to support
          hydration, comfort, and healthier-looking hair from the root.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {ingredients.map((group) => (
          <div key={group.category} className={`rounded-[2rem] ${group.color} p-8 shadow-sm`}>
            <h4 className="mb-6 text-2xl font-semibold text-[#7b3327]">
              {group.category}
            </h4>
            <div className="space-y-5">
              {group.items.map((item) => (
                <div key={item.name}>
                  <p className="font-semibold text-[#2b211d]">{item.name}</p>
                  <p className="mt-1 text-sm leading-6 text-[#6f6159]">
                    {item.benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-[#8a7b72]">
        ANINNA is formulated without alcohol, parabens, or artificial fragrance.
      </p>
    </section>
  );
}
