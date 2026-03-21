import Navbar from "@/components/ui/navbar";
import { Leaf, Globe, Zap, Heart, ChevronRight } from "lucide-react";
import { GhostCTA } from "@/components/ui/cta";
import { GsapTimeline } from "@/components/ui/gsap-timeline";
import SharedFooter from "@/components/ui/footer";
import BlogCallout from "@/components/ui/blog-callout";

// ─────────────────────────────────────────────────────────────────────────────
//  Same 12-col grid system as /hero
// ─────────────────────────────────────────────────────────────────────────────
const G   = "grid grid-cols-12";
const COL = "col-start-2 col-span-10";
const SEC = "py-[150px] min-h-[740px]";
const HDR = "mb-12";

function SectionHeader({
  label,
  heading,
  light = false,
}: {
  label: string;
  heading: string;
  light?: boolean;
}) {
  return (
    <div className="mb-12">
      <span className={`mb-3 block text-sm font-bold uppercase tracking-[0.18em] ${light ? "text-[#e1fcad]/50" : "text-black/40"}`}>
        {label}
      </span>
      <h2 className={`text-4xl font-normal leading-[1.08] tracking-[-0.03em] md:text-5xl ${light ? "text-white" : "text-black"}`}>
        {heading}
      </h2>
    </div>
  );
}

// ── Wireframe Globe SVG with Continents ──────────────────────────────────────
function WireframeGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <clipPath id="globe-clip">
          <circle cx="200" cy="200" r="180" />
        </clipPath>
      </defs>

      {/* Outer rings */}
      <circle cx="200" cy="200" r="180" stroke="#e1fcad" strokeWidth="1" opacity="0.2" />
      <circle cx="200" cy="200" r="177" stroke="#e1fcad" strokeWidth="0.4" opacity="0.08" />

      <g clipPath="url(#globe-clip)">
        {/* ── Grid lines ── */}
        {/* Latitude */}
        <line x1="20" y1="200" x2="380" y2="200" stroke="#e1fcad" strokeWidth="0.5" opacity="0.12" />
        <line x1="44" y1="110" x2="356" y2="110" stroke="#e1fcad" strokeWidth="0.4" opacity="0.07" />
        <line x1="110" y1="44" x2="290" y2="44" stroke="#e1fcad" strokeWidth="0.4" opacity="0.05" />
        <line x1="44" y1="290" x2="356" y2="290" stroke="#e1fcad" strokeWidth="0.4" opacity="0.07" />
        <line x1="110" y1="356" x2="290" y2="356" stroke="#e1fcad" strokeWidth="0.4" opacity="0.05" />
        <line x1="26" y1="153" x2="374" y2="153" stroke="#e1fcad" strokeWidth="0.3" opacity="0.04" />
        <line x1="26" y1="247" x2="374" y2="247" stroke="#e1fcad" strokeWidth="0.3" opacity="0.04" />
        {/* Longitude */}
        <line x1="200" y1="20" x2="200" y2="380" stroke="#e1fcad" strokeWidth="0.5" opacity="0.12" />
        <ellipse cx="200" cy="200" rx="90" ry="180" stroke="#e1fcad" strokeWidth="0.4" opacity="0.07" />
        <ellipse cx="200" cy="200" rx="156" ry="180" stroke="#e1fcad" strokeWidth="0.4" opacity="0.07" />
        <ellipse cx="200" cy="200" rx="47" ry="180" stroke="#e1fcad" strokeWidth="0.3" opacity="0.04" />
        <ellipse cx="200" cy="200" rx="127" ry="180" stroke="#e1fcad" strokeWidth="0.3" opacity="0.04" />

        {/* ── Simplified continent outlines (filled, low opacity) ── */}
        <g fill="#e1fcad" opacity="0.12" stroke="#e1fcad" strokeWidth="0.5" strokeOpacity="0.2">
          {/* Africa */}
          <path d="M200,118 L210,98 L225,92 L240,95 L252,105 L260,122 L268,148 L268,175 L265,200 L260,225 L252,255 L242,278 L235,290 L228,285 L220,268 L215,248 L210,228 L205,208 L198,192 L193,175 L192,155 L195,138 Z" />
          {/* Europe */}
          <path d="M192,62 L202,55 L215,50 L228,52 L238,60 L240,72 L236,82 L228,90 L218,92 L208,90 L198,82 L190,72 Z" />
          {/* British Isles */}
          <path d="M180,50 L188,46 L192,52 L188,58 L182,56 Z" />
          {/* Scandinavia */}
          <path d="M215,30 L224,26 L230,35 L228,48 L222,52 L216,42 Z" />
          {/* Arabian Peninsula */}
          <path d="M252,105 L270,108 L280,120 L278,138 L268,148 L258,140 L252,125 Z" />
          {/* India */}
          <path d="M282,132 L296,128 L306,148 L300,172 L290,188 L280,178 L276,158 L280,140 Z" />
          {/* SE Asia partial */}
          <path d="M310,140 L325,132 L338,145 L335,162 L322,170 L312,160 Z" />
          {/* North America */}
          <path d="M110,58 L128,48 L148,44 L165,50 L176,62 L172,80 L165,92 L152,100 L138,106 L122,105 L112,96 L105,82 L108,68 Z" />
          {/* Central America */}
          <path d="M148,108 L158,105 L162,115 L158,128 L152,135 L145,128 L144,118 Z" />
          {/* South America */}
          <path d="M150,180 L162,175 L170,188 L172,205 L168,228 L162,252 L155,275 L145,295 L138,288 L135,268 L138,245 L140,225 L144,205 L148,192 Z" />
          {/* Greenland */}
          <path d="M138,28 L155,24 L165,32 L162,44 L152,48 L140,40 Z" />
          {/* Northern Asia partial */}
          <path d="M238,38 L262,32 L290,38 L320,52 L345,72 L352,92 L342,108 L325,105 L305,95 L282,82 L262,68 L248,55 Z" />
          {/* Australia partial (bottom-right) */}
          <path d="M318,248 L338,240 L352,252 L355,270 L345,282 L330,285 L318,275 L315,262 Z" />
        </g>
      </g>

      {/* Subtle radial glow */}
      <circle cx="200" cy="200" r="80" fill="#e1fcad" opacity="0.025" />
    </svg>
  );
}

// ── Page Hero ─────────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-[#122023] pb-36 pt-60">
      {/* Subtle bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#122023] via-[#122023]/95 to-[#0d1a1c]" />

      {/* Wireframe globe — huge, only ~1/3 visible from right edge */}
      <div className="pointer-events-none absolute -right-[500px] top-1/2 -translate-y-1/2 md:-right-[380px]">
        <WireframeGlobe className="h-[900px] w-[900px] md:h-[1100px] md:w-[1100px]" />
      </div>

      <div className={`relative ${G} w-full`}>
        <div className={COL}>
          <span className="mb-6 block text-sm font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">
            About Verdant
          </span>
          <h1 className="mb-8 max-w-3xl text-5xl font-normal leading-[1.04] tracking-[-0.03em] text-white md:text-7xl">
            We exist to make the{" "}
            <span className="text-[#e1fcad]">clean energy transition</span>{" "}
            inevitable.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/45">
            Founded in 2018, Verdant has grown from a small advisory team into a
            global platform trusted by 15,000+ organisations to decarbonise
            faster, smarter, and more equitably.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Our Story ─────────────────────────────────────────────────────────────────
function OurStory() {
  return (
    <section className="bg-white py-[150px] min-h-[740px] flex items-center">
      <div className="grid grid-cols-12 w-full">
        <div className="col-start-2 col-span-10">

          {/* ── Centred heading block ── */}
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="mb-4 block font-mono text-sm font-bold uppercase tracking-[0.18em] text-black/40">
              Our story
            </span>
            <h2 className="mb-8 max-w-3xl text-5xl font-normal leading-[1.06] tracking-[-0.03em] text-black md:text-6xl">
              Born out of urgency,{" "}
              <span className="italic text-black/40">built for scale</span>
            </h2>
            <div className="max-w-2xl space-y-5 text-base leading-[1.8] text-black/50">
              <p>
                Verdant was founded by a team of energy engineers, climate scientists, and policy
                experts who watched promising net-zero commitments stall inside spreadsheets and
                boardroom decks.
              </p>
              <p>
                We built the tools and advisory practice we wished existed — combining rigorous
                financial modelling, best-in-class data pipelines, and on-the-ground
                implementation expertise so organisations could stop planning and start doing.
              </p>
            </div>
            <div className="mt-10">
              <GhostCTA label="See our platform" href="/product" />
            </div>
          </div>

          {/* ── GSAP centred alternating timeline ── */}
          <GsapTimeline />

        </div>
      </div>
    </section>
  );
}

// ── Values ────────────────────────────────────────────────────────────────────
const VALUES = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Urgency over perfection",
    desc: "The climate crisis does not wait for perfect solutions. We bias toward action, learning, and iteration.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Systems thinking",
    desc: "Energy, finance, policy, and community are inseparable. We design solutions that work across all four.",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Equitable by design",
    desc: "A just transition leaves no community behind. Inclusion and access are non-negotiable in every project.",
  },
  {
    icon: <Leaf className="h-5 w-5" />,
    title: "Science-led integrity",
    desc: "Every claim we make is traceable. We hold ourselves to the same rigour we demand of our clients.",
  },
];

function Values() {
  return (
    <section className={`bg-[#f7f7f5] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <SectionHeader label="What we stand for" heading="Principles that guide every decision" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="group flex flex-col gap-5 rounded-2xl border border-black/[0.06] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#122023] text-[#e1fcad]">
                  {v.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold leading-snug tracking-tight">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-black/50">{v.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-[#122023] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Team ──────────────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: "Maya Andersen",
    role: "Co-founder & CEO",
    bio: "Former wind energy director at \u00D8rsted. MSc Climate Science, Oxford.",
    img: "https://i.pravatar.cc/200?img=47",
  },
  {
    name: "Rafael Nkosi",
    role: "Co-founder & CTO",
    bio: "Built carbon data infrastructure at Google. PhD Energy Systems, MIT.",
    img: "https://i.pravatar.cc/200?img=12",
  },
  {
    name: "Priya Subramaniam",
    role: "Chief Impact Officer",
    bio: "Led UNDP clean energy programs across 18 countries. MBA, INSEAD.",
    img: "https://i.pravatar.cc/200?img=23",
  },
  {
    name: "Thomas Eriksson",
    role: "Head of Advisory",
    bio: "20 years in energy finance. Previously Goldman Sachs & Macquarie.",
    img: "https://i.pravatar.cc/200?img=33",
  },
  {
    name: "Amara Diallo",
    role: "VP Community Programs",
    bio: "Designed microgrids for 200+ communities across Sub-Saharan Africa.",
    img: "https://i.pravatar.cc/200?img=25",
  },
  {
    name: "Jonas M\u00FCller",
    role: "Head of Science",
    bio: "Lead author, IPCC AR6. Expert in nature-based carbon solutions.",
    img: "https://i.pravatar.cc/200?img=15",
  },
];

function Team() {
  return (
    <section className={`bg-[#122023] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <SectionHeader label="The team" heading="People who have done this before" light />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="group flex gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 transition-colors duration-300 hover:border-[#e1fcad]/20 hover:bg-white/[0.07]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="size-14 shrink-0 rounded-full object-cover ring-2 ring-[#e1fcad]/20 ring-offset-2 ring-offset-[#122023]"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{member.name}</p>
                  <p className="mb-2 text-sm text-[#e1fcad]/60">{member.role}</p>
                  <p className="text-sm leading-relaxed text-white/40">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: "2018",  label: "Year founded" },
  { value: "180+",  label: "Team members" },
  { value: "42",    label: "Countries" },
  { value: "15K+",  label: "Client organisations" },
];

function StatsBar() {
  return (
    <section className="border-y border-black/[0.08] bg-white py-12">
      <div className={G}>
        <div className={`${COL} grid grid-cols-2 gap-px bg-black/[0.06] md:grid-cols-4`}>
          {STATS.map((s) => (
            <div key={s.value} className="flex flex-col items-center gap-1 bg-white px-6 py-8 text-center">
              <span className="text-4xl font-normal tracking-[-0.03em] text-[#122023]">{s.value}</span>
              <span className="text-sm font-medium uppercase tracking-widest text-black/35">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="w-full">
      <Navbar />
      <AboutHero />
      <StatsBar />
      <OurStory />
      <Values />
      <Team />
      <BlogCallout />
      <SharedFooter />
    </main>
  );
}
