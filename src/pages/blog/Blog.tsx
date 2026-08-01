import { Link } from "react-router-dom";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";

const posts = [
  {
    slug: "dry-scalp-dubai-climate",
    title: "Why Dubai's Climate Causes Dry Scalp — And How to Fix It",
    excerpt: "Air conditioning, hard water, and extreme heat create the perfect storm for scalp dryness in the UAE. Here's what actually works.",
    category: "Scalp Health",
    readTime: "5 min read",
    date: "July 2026",
  },
  {
    slug: "hair-loss-uae-women",
    title: "Hair Loss in the UAE: Why It Happens and What You Can Do",
    excerpt: "Hair thinning is one of the most common concerns for women living in the GCC. We break down the real causes and the ingredients that help.",
    category: "Hair Loss",
    readTime: "6 min read",
    date: "July 2026",
  },
  {
    slug: "scalp-serum-vs-hair-oil",
    title: "Scalp Serum vs Hair Oil: What's the Difference and Which Do You Need?",
    excerpt: "Both are popular — but they do very different things. Understanding the difference can transform your hair care routine.",
    category: "Education",
    readTime: "4 min read",
    date: "July 2026",
  },
  {
    slug: "scalp-care-routine-gcc",
    title: "The Complete Scalp Care Routine for UAE & GCC Women",
    excerpt: "A simple, effective routine built specifically for the Gulf climate — covering everything from water quality to the right leave-in treatment.",
    category: "Routine",
    readTime: "7 min read",
    date: "July 2026",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
            The ANINNA Journal
          </p>
          <h1 className="mb-6 text-5xl font-semibold leading-tight text-[#7b3327] md:text-6xl">
            Scalp Care Guides
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-[#6f6159]">
            Expert guides on scalp health, hair care routines, and ingredient
            education — written for life in the UAE and GCC.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-[2rem] bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
                {post.category}
              </p>
              <h2 className="mb-4 text-2xl font-semibold leading-tight text-[#7b3327] group-hover:opacity-80">
                {post.title}
              </h2>
              <p className="mb-6 leading-7 text-[#6f6159]">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-[#8a7b72]">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
