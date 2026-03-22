"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { ArrowUpRight, Clock, Leaf, Search } from "lucide-react";
import { BLOG_POSTS, CATEGORIES, type BlogPost } from "@/lib/blog-data";

// ── Design tokens ─────────────────────────────────────────────────────────────
const G   = "grid grid-cols-12";
const COL = "col-start-2 col-span-10";
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Shared sub-components ─────────────────────────────────────────────────────
function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("");
  return (
    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e1fcad] text-[11px] font-bold text-[#122023]">
      {initials}
    </div>
  );
}

function TagPill({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
      light
        ? "border border-white/20 bg-black/25 text-white backdrop-blur-sm"
        : "bg-[#122023]/[0.07] text-[#122023]/60"
    }`}>
      {label}
    </span>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function BlogHero({
  activeCategory, setActiveCategory,
  searchQuery, setSearchQuery,
}: {
  activeCategory: string; setActiveCategory: (c: string) => void;
  searchQuery: string;    setSearchQuery: (q: string) => void;
}) {
  return (
    <section className="bg-[#f7f7f5] pt-40 pb-16">
      <div className={G}>
        <div className={COL}>

          {/* Top row */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2">
                <Leaf className="h-3.5 w-3.5 text-[#4a7c59]" />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-black/45">Verdant Insights</span>
              </div>
              <h1 className="text-5xl font-normal leading-[1.06] tracking-[-0.03em] text-[#122023] md:text-6xl">
                Ideas for a<br />
                <span className="text-black/25">low-carbon world</span>
              </h1>
            </div>

            <div className="flex flex-col gap-4 lg:items-end lg:pb-1">
              <p className="max-w-xs text-base leading-relaxed text-black/45 lg:text-right">
                Strategy, policy, technology, and finance — from the Verdant team.
              </p>
              <div className="flex items-center gap-2.5 rounded-full border border-black/10 bg-white px-4 py-2.5 lg:w-60">
                <Search className="h-4 w-4 shrink-0 text-black/25" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles…"
                  className="flex-1 bg-transparent text-sm text-black/65 placeholder-black/25 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Category filter pills */}
          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#122023] text-white"
                    : "border border-black/10 bg-white text-black/50 hover:border-black/20 hover:text-black/75"
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

// ── Featured post ─────────────────────────────────────────────────────────────
function FeaturedPost() {
  const post = BLOG_POSTS.find((p) => p.featured)!;
  return (
    <section className="bg-[#f7f7f5] pb-[150px]">
      <div className={G}>
        <div className={COL}>
          <a href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-3xl bg-[#122023]">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[480px]">

              {/* Image */}
              <div className="relative min-h-[300px] overflow-hidden lg:min-h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image} alt={post.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0a1618]/40" />
                <div className="pointer-events-none absolute inset-0"
                  style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.35, mixBlendMode: "overlay" }} />
                <div className="absolute left-6 top-6">
                  <span className="rounded-full bg-[#e1fcad] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#122023]">
                    Featured
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between p-10 lg:p-14">
                <div>
                  <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">
                    {post.tag}
                  </span>
                  <h2 className="mb-5 text-2xl font-normal leading-snug tracking-[-0.02em] text-white lg:text-3xl">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-white/40">{post.excerpt}</p>
                </div>

                <div className="mt-10">
                  <div className="mb-6 flex items-center gap-3 border-t border-white/[0.08] pt-6">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e1fcad] text-[11px] font-bold text-[#122023]">
                      {post.author.split(" ").map((w: string) => w[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{post.author}</p>
                      <p className="text-xs text-white/35">{post.authorRole}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/30">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />{post.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#e1fcad] transition-opacity group-hover:opacity-70">
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

// ── Article card ──────────────────────────────────────────────────────────────
function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-black/[0.06] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.09)]"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image} alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[#122023]/10" />
        <div className="absolute left-4 top-4">
          <TagPill label={post.tag} light />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-3 flex-1 text-[15px] font-semibold leading-snug tracking-tight text-[#122023] line-clamp-2 transition-colors duration-200 group-hover:text-[#4a7c59]">
          {post.title}
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-black/40 line-clamp-2">{post.excerpt}</p>

        {/* Footer */}
        <div className="flex items-center gap-2.5 border-t border-black/[0.06] pt-4">
          <Avatar name={post.author} />
          <span className="flex-1 text-xs font-medium text-black/50 truncate">{post.author}</span>
          <span className="text-xs text-black/30">{post.date}</span>
          <div className="ml-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/30 transition-all duration-200 group-hover:border-[#4a7c59] group-hover:text-[#4a7c59]">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Newsletter banner ─────────────────────────────────────────────────────────
function NewsletterBanner() {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#122023] px-10 py-9">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-5">
          <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e1fcad]/10">
            <Leaf className="h-5 w-5 text-[#e1fcad]" />
          </div>
          <div>
            <p className="text-base font-semibold text-white">The sustainability briefing</p>
            <p className="mt-0.5 text-sm text-white/40">Policy, markets &amp; analysis — delivered every two weeks.</p>
          </div>
        </div>
        <div className="flex w-full gap-2 lg:w-auto lg:min-w-[320px]">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.07] px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-[#e1fcad]/30"
          />
          <button className="shrink-0 rounded-xl bg-[#e1fcad] px-5 py-2.5 text-sm font-semibold text-[#122023] transition-colors hover:bg-[#d4f59a]">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-black/[0.05]">
        <Search className="h-6 w-6 text-black/20" />
      </div>
      <p className="text-base font-semibold text-black/40">No articles found</p>
      <p className="text-sm text-black/30">Try a different category or search term</p>
    </div>
  );
}

// ── Posts section ─────────────────────────────────────────────────────────────
function PostsSection({
  posts, activeCategory, total,
}: {
  posts: BlogPost[]; activeCategory: string; total: number;
}) {
  const nonFeatured = posts.filter((p) => !p.featured);

  return (
    <section className="bg-white py-[150px]">
      <div className={G}>
        <div className={COL}>

          {/* Section header */}
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                {activeCategory === "All" ? "All articles" : activeCategory}
              </span>
              <h2 className="text-3xl font-normal leading-[1.08] tracking-[-0.03em] text-[#122023] md:text-4xl">
                {activeCategory === "All" ? "Latest from the team" : `Articles on ${activeCategory}`}
              </h2>
            </div>
            <span className="hidden text-sm text-black/30 lg:block">
              {total} article{total !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Grid */}
          {nonFeatured.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-16">
              {/* First 6 cards */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {nonFeatured.slice(0, 6).map((p) => (
                  <ArticleCard key={p.slug} post={p} />
                ))}
              </div>

              {/* Newsletter banner between rows */}
              <NewsletterBanner />

              {/* Remaining cards */}
              {nonFeatured.slice(6).length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {nonFeatured.slice(6).map((p) => (
                    <ArticleCard key={p.slug} post={p} />
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let posts = BLOG_POSTS;
    if (activeCategory !== "All") posts = posts.filter((p) => p.tag === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeCategory, searchQuery]);

  const nonFeaturedCount = filtered.filter((p) => !p.featured).length;

  return (
    <>
      <Navbar theme="light" />
      <BlogHero
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <FeaturedPost />
      <PostsSection
        posts={filtered}
        activeCategory={activeCategory}
        total={nonFeaturedCount}
      />
      <Footer />
    </>
  );
}
