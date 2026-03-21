import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { ArrowUpRight, Clock, Leaf } from "lucide-react";

const G   = "grid grid-cols-12";
const COL = "col-start-2 col-span-10";
const SEC = "py-[150px]";

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Data ──────────────────────────────────────────────────────────────────────
const FEATURED = {
  tag: "Net-Zero Strategy",
  title: "Why 90% of corporate net-zero targets will fail — and how to be in the 10%",
  excerpt: "Most decarbonisation commitments are built on assumptions, not data. Here's what separates the organisations that actually reach net-zero from those that don't.",
  author: "Mia Thornton",
  role: "Head of Climate Strategy",
  date: "18 Mar 2024",
  readTime: "9 min read",
  image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1600&q=80",
};

const POSTS = [
  {
    tag: "Carbon Markets",
    title: "The voluntary carbon market in 2024: what's actually working",
    excerpt: "After a turbulent 2023, the voluntary carbon market is stabilising. We look at which methodologies are holding up under scrutiny.",
    date: "12 Mar 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
  },
  {
    tag: "Reporting",
    title: "CSRD is here. Here's your 90-day readiness checklist",
    excerpt: "The EU Corporate Sustainability Reporting Directive now applies to 50,000 companies. Whether you're in scope or not, this checklist will prepare you.",
    date: "5 Mar 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  },
  {
    tag: "Technology",
    title: "How AI is rewriting the rules of emissions accounting",
    excerpt: "From satellite imagery to smart meter APIs, the data sources available to sustainability teams have multiplied. The bottleneck is now intelligence, not collection.",
    date: "28 Feb 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80",
  },
  {
    tag: "Finance",
    title: "Green bonds, sustainability-linked loans, and transition finance explained",
    excerpt: "Three instruments, three purposes. A plain-English guide to the green finance products your treasury team should know.",
    date: "20 Feb 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  },
  {
    tag: "Supply Chain",
    title: "Scope 3 Category 1: why purchased goods dominate your footprint",
    excerpt: "For most manufacturers, more than 70% of total emissions sit in Scope 3 Category 1. Here's how to measure it without drowning in supplier surveys.",
    date: "14 Feb 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  },
  {
    tag: "Policy",
    title: "COP29 outcomes: what the finance commitments mean for your business",
    excerpt: "The headline pledges from COP29 are in. We unpack what the $300B climate finance goal and the new carbon market rules mean in practice.",
    date: "8 Feb 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80",
  },
];

const CATEGORIES = ["All", "Net-Zero Strategy", "Carbon Markets", "Reporting", "Technology", "Finance", "Supply Chain", "Policy"];

// ── Blog Hero ─────────────────────────────────────────────────────────────────
function BlogHero() {
  return (
    <section className="bg-[#f7f7f5] pt-40 pb-[100px]">
      <div className={G}>
        <div className={COL}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2">
                <Leaf className="h-3.5 w-3.5 text-[#4a7c59]" />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-black/45">Verdant Insights</span>
              </div>
              <h1 className="text-5xl font-normal leading-[1.06] tracking-[-0.03em] text-[#122023] md:text-6xl">
                Ideas for a<br />
                <span className="text-black/30">low-carbon world</span>
              </h1>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-black/45 lg:text-right">
              Strategy, policy, technology, and finance — from the Verdant team and leading voices in sustainability.
            </p>
          </div>

          {/* Category filter strip */}
          <div className="mt-12 flex flex-wrap gap-2">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  i === 0
                    ? "bg-[#122023] text-white"
                    : "border border-black/10 bg-white text-black/55 hover:border-black/25 hover:text-black/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Featured Post ─────────────────────────────────────────────────────────────
function FeaturedPost() {
  return (
    <section className="bg-[#f7f7f5] pb-[80px]">
      <div className={G}>
        <div className={COL}>
          <a href="#" className="group block overflow-hidden rounded-3xl bg-[#122023]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative min-h-[360px] overflow-hidden lg:min-h-[500px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FEATURED.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#0a1618]/50" />
                <div className="pointer-events-none absolute inset-0"
                  style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.4, mixBlendMode: "overlay" }} />
                <div className="absolute top-6 left-6">
                  <span className="rounded-full bg-[#e1fcad] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#122023]">
                    Featured
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between p-10 lg:p-12">
                <div>
                  <span className="mb-4 block text-xs font-bold uppercase tracking-[0.15em] text-[#e1fcad]/55">{FEATURED.tag}</span>
                  <h2 className="mb-5 text-2xl font-normal leading-snug tracking-[-0.02em] text-white md:text-3xl">
                    {FEATURED.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-white/45">{FEATURED.excerpt}</p>
                </div>

                <div>
                  <div className="mb-6 flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e1fcad] text-xs font-bold text-[#122023]">
                      {FEATURED.author.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{FEATURED.author}</p>
                      <p className="text-xs text-white/40">{FEATURED.role}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-3 text-xs text-white/35">
                      <span>{FEATURED.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{FEATURED.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#e1fcad] transition-opacity group-hover:opacity-80">
                    Read article <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Post grid ─────────────────────────────────────────────────────────────────
function PostGrid() {
  return (
    <section className={`bg-white ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-2xl font-normal tracking-[-0.02em] text-[#122023]">Latest articles</h2>
            <span className="text-sm text-black/35">Showing 6 of 48</span>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p) => (
              <a key={p.title} href="#" className="group flex flex-col">
                {/* Image */}
                <div className="relative mb-5 h-52 overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[#122023]/20" />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                      {p.tag}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-1 flex-col">
                  <h3 className="mb-2.5 text-base font-semibold leading-snug tracking-tight text-[#122023] transition-colors group-hover:text-[#4a7c59]">
                    {p.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-black/45 line-clamp-2">{p.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-black/32">
                    <span>{p.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.readTime}</span>
                    <div className="ml-auto flex size-7 items-center justify-center rounded-full border border-black/10 text-black/30 transition-all group-hover:border-[#4a7c59] group-hover:text-[#4a7c59]">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Load more */}
          <div className="mt-14 flex justify-center">
            <button className="rounded-full border border-black/12 bg-white px-8 py-3.5 text-sm font-semibold text-black/60 transition-colors hover:border-black/30 hover:text-black/80">
              Load more articles
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Newsletter ────────────────────────────────────────────────────────────────
function Newsletter() {
  return (
    <section className="bg-[#122023] py-[100px]">
      <div className={G}>
        <div className={`${COL} flex flex-col items-center text-center`}>
          <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-[#e1fcad]">
            <Leaf className="h-6 w-6 text-[#122023]" />
          </div>
          <h2 className="mb-4 text-3xl font-normal leading-[1.1] tracking-[-0.03em] text-white md:text-4xl">
            The sustainability briefing.<br/>Every two weeks.
          </h2>
          <p className="mb-8 max-w-md text-sm leading-relaxed text-white/45">
            Policy changes, market moves, and analysis from the Verdant team — in your inbox.
          </p>
          <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm text-white placeholder-white/30 outline-none backdrop-blur-sm focus:border-[#e1fcad]/40"
            />
            <button className="shrink-0 rounded-full bg-[#e1fcad] px-6 py-3 text-sm font-semibold text-[#122023] transition-colors hover:bg-[#d4f59a]">
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-xs text-white/25">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  return (
    <>
      <Navbar />
      <BlogHero />
      <FeaturedPost />
      <PostGrid />
      <Newsletter />
      <Footer />
    </>
  );
}
