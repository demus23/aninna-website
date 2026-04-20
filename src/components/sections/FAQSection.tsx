const faqs = [
  {
    question: "What is ANINNA designed for?",
    answer: "ANINNA is a nourishing scalp and hair serum created to support scalp comfort, hydration, and a healthier-looking hair routine.",
  },
  {
    question: "How often should I use it?",
    answer: "Use it consistently as part of your scalp care routine. Daily or several times a week can work well depending on your preference.",
  },
  {
    question: "Do I rinse it out?",
    answer: "No. ANINNA is designed to be left on the scalp after application.",
  },
  {
    question: "Will it feel heavy or greasy?",
    answer: "The formula is designed to feel lightweight and comfortable, making it easy to incorporate into regular use.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">Frequently Asked Questions</p>
          <h3 className="text-4xl font-semibold text-[#7b3327]">Everything You Need to Know</h3>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-[2rem] border border-[#eadfce] p-8">
              <h4 className="mb-3 text-xl font-semibold text-[#7b3327]">{faq.question}</h4>
              <p className="leading-8 text-[#6f6159]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}