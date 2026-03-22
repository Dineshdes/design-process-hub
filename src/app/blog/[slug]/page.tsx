import { notFound } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { ArrowLeft, ArrowUpRight, Clock, Leaf } from "lucide-react";
import { BLOG_POSTS, type BlogPost, type BlogSection } from "@/lib/blog-data";

// ── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

// ── Design tokens ─────────────────────────────────────────────────────────────
const G   = "grid grid-cols-12";
const COL = "col-start-2 col-span-10";
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").map((w) => w[0]).join("");
  const cls =
    size === "lg" ? "size-14 text-base" :
    size === "md" ? "size-10 text-sm"   :
                    "size-7 text-[11px]";
  return (
    <div className={`${cls} flex shrink-0 items-center justify-center rounded-full bg-[#e1fcad] font-bold text-[#122023]`}>
      {initials}
    </div>
  );
}

// ── Article body renderer ─────────────────────────────────────────────────────
function ArticleBody({ sections }: { sections: BlogSection[] }) {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((s, i) => {
        switch (s.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#122023]">
                {s.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-2 text-lg font-semibold leading-snug tracking-tight text-[#122023]">
                {s.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-[17px] leading-[1.75] text-black/65">
                {s.text}
              </p>
            );
          case "blockquote":
            return (
              <blockquote
                key={i}
                className="relative my-2 overflow-hidden rounded-2xl bg-[#122023] px-8 py-7"
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.2, mixBlendMode: "overlay" }}
                />
                <div className="relative">
                  <div className="mb-3 h-0.5 w-8 rounded-full bg-[#e1fcad]" />
                  <p className="text-lg font-normal leading-relaxed tracking-[-0.01em] text-white">
                    {s.text}
                  </p>
                </div>
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-3 rounded-2xl border border-black/[0.06] bg-[#f7f7f5] p-6">
                {s.items?.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a7c59]" />
                    <span className="text-[15px] leading-relaxed text-black/60">{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "divider":
            return (
              <div key={i} className="my-4 flex items-center gap-4">
                <div className="h-px flex-1 bg-black/[0.07]" />
                <Leaf className="h-4 w-4 text-[#4a7c59]/40" />
                <div className="h-px flex-1 bg-black/[0.07]" />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

// ── Related card ─────────────────────────────────────────────────────────────
function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <a href={`/blog/${post.slug}`} className="group flex gap-4 rounded-xl border border-black/[0.06] bg-white p-4 transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="flex min-w-0 flex-col justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4a7c59]">{post.tag}</p>
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-[#122023] transition-colors group-hover:text-[#4a7c59]">{post.title}</p>
        <div className="flex items-center gap-1.5 text-[11px] text-black/30">
          <Clock className="h-2.5 w-2.5" />{post.readTime}
        </div>
      </div>
    </a>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.tag === post.tag).slice(0, 2);
  const more    = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.tag !== post.tag).slice(0, 3 - related.length);
  const relatedPosts = [...related, ...more].slice(0, 3);

  return (
    <>
      <Navbar theme="light" />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-[#f7f7f5] pt-40 pb-0">
        <div className={G}>
          <div className={COL}>

            {/* Back link */}
            <a href="/blog" className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-black/35 transition-colors hover:text-black/70">
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              All articles
            </a>

            {/* Top row — tag badge left, meta right */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2">
                <Leaf className="h-3.5 w-3.5 text-[#4a7c59]" />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50">{post.tag}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-black/35">
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime} read</span>
                <span className="text-black/20">·</span>
                <span>{post.date}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-8 max-w-4xl text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-[#122023] md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {/* Author row */}
            <div className="flex items-center gap-4 border-t border-black/[0.07] pt-8 pb-12">
              <Avatar name={post.author} size="lg" />
              <div>
                <p className="text-base font-semibold text-[#122023]">{post.author}</p>
                <p className="text-sm text-black/40">{post.authorRole}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero image — full width, contained in 12-col grid */}
        <div className={G}>
          <div className={COL}>
            <div className="relative h-[420px] overflow-hidden rounded-2xl lg:h-[520px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Article body ────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={G}>
          <div className={COL}>
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_300px]">

              {/* Article text */}
              <article>
                {/* Excerpt lede */}
                <p className="mb-10 border-l-2 border-[#4a7c59] pl-6 text-xl font-normal leading-relaxed text-black/55">
                  {post.excerpt}
                </p>
                <ArticleBody sections={post.body} />

                {/* Author bio card */}
                <div className="mt-16 flex gap-5 rounded-2xl border border-black/[0.06] bg-[#f7f7f5] p-7">
                  <Avatar name={post.author} size="lg" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/30">Written by</p>
                    <p className="mt-1 text-base font-semibold text-[#122023]">{post.author}</p>
                    <p className="mt-0.5 text-sm text-[#4a7c59]">{post.authorRole}</p>
                    <p className="mt-3 text-sm leading-relaxed text-black/50">{post.authorBio}</p>
                  </div>
                </div>

                {/* Share strip */}
                <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-black/[0.06] pt-8">
                  <span className="text-sm font-semibold text-black/40">Share this article</span>
                  {["LinkedIn", "X (Twitter)", "Email"].map((s) => (
                    <button key={s} className="rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium text-black/55 transition-colors hover:border-black/25 hover:text-black/80">
                      {s}
                    </button>
                  ))}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="flex flex-col gap-6">

                {/* Table of contents */}
                <div className="rounded-xl border border-black/[0.06] bg-[#f7f7f5] p-5">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-black/30">In this article</p>
                  <nav className="flex flex-col gap-2">
                    {post.body.filter((s) => s.type === "h2").map((s, i) => (
                      <span key={i} className="flex items-start gap-2.5 text-sm text-black/55 hover:text-[#4a7c59] cursor-pointer transition-colors">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a7c59]/40" />
                        {s.text}
                      </span>
                    ))}
                  </nav>
                </div>

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                  <div className="rounded-xl border border-black/[0.06] bg-white p-5">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-black/30">Related articles</p>
                    <div className="flex flex-col gap-3">
                      {relatedPosts.map((p) => (
                        <RelatedCard key={p.slug} post={p} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter */}
                <div className="overflow-hidden rounded-xl bg-[#122023] p-6">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[#e1fcad]/10">
                    <Leaf className="h-5 w-5 text-[#e1fcad]" />
                  </div>
                  <p className="text-base font-semibold text-white">Weekly briefing</p>
                  <p className="mt-1 text-sm text-white/40">Climate policy, markets & technology — every two weeks.</p>
                  <div className="mt-5 flex flex-col gap-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="rounded-lg border border-white/10 bg-white/8 px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-[#e1fcad]/30"
                    />
                    <button className="rounded-lg bg-[#e1fcad] py-2.5 text-sm font-semibold text-[#122023] transition-colors hover:bg-[#d4f59a]">
                      Subscribe
                    </button>
                  </div>
                  <p className="mt-3 text-[11px] text-white/20">No spam. Unsubscribe anytime.</p>
                </div>

                {/* CTA */}
                <a href="/product" className="group flex items-center justify-between rounded-xl border border-black/[0.06] bg-white p-5 transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                  <div>
                    <p className="text-sm font-semibold text-[#122023]">See Verdant in action</p>
                    <p className="mt-0.5 text-xs text-black/40">Built for the full sustainability operation.</p>
                  </div>
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#122023] text-[#e1fcad] transition-transform duration-200 group-hover:scale-110">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </a>
              </aside>

            </div>
          </div>
        </div>
      </section>

      {/* ── More from the blog ───────────────────────────────────────────── */}
      <section className="bg-[#f7f7f5] py-[100px]">
        <div className={G}>
          <div className={COL}>
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-2xl font-normal tracking-[-0.02em] text-[#122023]">More from the blog</h2>
              <a href="/blog" className="flex items-center gap-2 text-sm font-semibold text-[#4a7c59] transition-opacity hover:opacity-70">
                All articles <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3).map((p) => (
                <a key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-shadow hover:shadow-[0_16px_48px_rgba(0,0,0,0.09)]">
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[#122023]/15" />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-3 flex-1 text-base font-semibold leading-snug tracking-tight text-[#122023] line-clamp-2 transition-colors group-hover:text-[#4a7c59]">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-black/30">
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
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
