import { ArrowUpRight, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

// ─────────────────────────────────────────────────────────────────────────────
//  BlogCallout — 3-article preview strip placed above the footer on every page
//  Pulls directly from the shared blog-data source of truth
// ─────────────────────────────────────────────────────────────────────────────

const G   = "grid grid-cols-12";
const COL = "col-start-2 col-span-10";

// Show the featured post first, then next 2 most recent
const POSTS = [
  ...BLOG_POSTS.filter((p) => p.featured),
  ...BLOG_POSTS.filter((p) => !p.featured),
].slice(0, 3);

export default function BlogCallout() {
  return (
    <section className="bg-[#f7f7f5] py-[100px]">
      <div className={G}>
        <div className={COL}>

          {/* Header */}
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-black/35">
                Verdant Insights
              </p>
              <h2 className="text-4xl font-normal leading-[1.06] tracking-[-0.03em] text-[#122023] md:text-5xl">
                Latest from the blog
              </h2>
            </div>
            <a
              href="/blog"
              className="group hidden shrink-0 items-center gap-0 overflow-hidden rounded-full border border-black/10 bg-transparent transition-colors hover:border-black/30 md:flex"
            >
              <span className="pl-5 pr-4 text-sm font-medium text-black/70">All articles</span>
              <div className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-[#122023] text-[#e1fcad]">
                <ArrowUpRight className="absolute h-4 w-4 -translate-x-1/2 transition-all duration-500 group-hover:translate-x-10" />
                <ArrowUpRight className="absolute h-4 w-4 -translate-x-10 transition-all duration-500 group-hover:-translate-x-1/2" />
              </div>
            </a>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p) => (
              <a key={p.title} href="/blog" className="group flex flex-col">
                {/* Image */}
                <div className="relative mb-5 h-52 overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#122023]/20" />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                      {p.tag}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-1 flex-col">
                  <h3 className="mb-3 text-base font-semibold leading-snug tracking-tight text-[#122023] transition-colors group-hover:text-[#4a7c59]">
                    {p.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-3 text-xs text-black/32">
                    <span>{p.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {p.readTime}
                    </span>
                    <div className="ml-auto flex size-7 items-center justify-center rounded-full border border-black/10 text-black/30 transition-all group-hover:border-[#4a7c59] group-hover:text-[#4a7c59]">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Mobile: all articles link */}
          <div className="mt-10 flex justify-center md:hidden">
            <a
              href="/blog"
              className="rounded-full border border-black/12 bg-white px-8 py-3.5 text-sm font-semibold text-black/60 transition-colors hover:border-black/30 hover:text-black/80"
            >
              All articles
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
