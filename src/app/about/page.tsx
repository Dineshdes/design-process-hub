import Navbar from "@/components/ui/navbar";
import { Leaf, Globe, Zap, Heart, ChevronRight } from "lucide-react";
import { PrimaryCTA, GhostCTA, PreFooterBanner } from "@/components/ui/cta";

// ─────────────────────────────────────────────────────────────────────────────
//  Same 12-col grid system as /hero
// ─────────────────────────────────────────────────────────────────────────────
const G   = "grid grid-cols-12";
const COL = "col-start-2 col-span-10";
const SEC = "py-20";
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
    <div className={HDR}>
      <span className={`mb-3 block text-[11px] font-bold uppercase tracking-[0.18em] ${light ? "text-[#e1fcad]/50" : "text-black/40"}`}>
        {label}
      </span>
      <h2 className={`text-4xl font-normal leading-[1.08] tracking-[-0.03em] md:text-5xl ${light ? "text-white" : "text-black"}`}>
        {heading}
      </h2>
    </div>
  );
}

// ── Wireframe Globe SVG ──────────────────────────────────────────────────────
function WireframeGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <clipPath id="globe-clip">
          <circle cx="200" cy="200" r="180" />
        </clipPath>
      </defs>

      {/* Outer ring */}
      <circle cx="200" cy="200" r="180" stroke="#e1fcad" strokeWidth="0.8" opacity="0.18" />
      <circle cx="200" cy="200" r="178" stroke="#e1fcad" strokeWidth="0.3" opacity="0.08" />

      <g clipPath="url(#globe-clip)">
        {/* Latitude lines (horizontal, clipped to globe) */}
        <line x1="20" y1="200" x2="380" y2="200" stroke="#e1fcad" strokeWidth="0.6" opacity="0.15" /> {/* equator */}
        <line x1="44" y1="110" x2="356" y2="110" stroke="#e1fcad" strokeWidth="0.4" opacity="0.08" /> {/* 30°N */}
        <line x1="110" y1="44" x2="290" y2="44" stroke="#e1fcad" strokeWidth="0.4" opacity="0.06" /> {/* 60°N */}
        <line x1="44" y1="290" x2="356" y2="290" stroke="#e1fcad" strokeWidth="0.4" opacity="0.08" /> {/* 30°S */}
        <line x1="110" y1="356" x2="290" y2="356" stroke="#e1fcad" strokeWidth="0.4" opacity="0.06" /> {/* 60°S */}
        {/* Additional finer latitudes */}
        <line x1="26" y1="153" x2="374" y2="153" stroke="#e1fcad" strokeWidth="0.3" opacity="0.05" />
        <line x1="73" y1="73" x2="327" y2="73" stroke="#e1fcad" strokeWidth="0.3" opacity="0.04" />
        <line x1="26" y1="247" x2="374" y2="247" stroke="#e1fcad" strokeWidth="0.3" opacity="0.05" />
        <line x1="73" y1="327" x2="327" y2="327" stroke="#e1fcad" strokeWidth="0.3" opacity="0.04" />

        {/* Longitude lines (vertical ellipses, clipped to globe) */}
        <line x1="200" y1="20" x2="200" y2="380" stroke="#e1fcad" strokeWidth="0.6" opacity="0.15" /> {/* prime meridian */}
        <ellipse cx="200" cy="200" rx="90" ry="180" stroke="#e1fcad" strokeWidth="0.4" opacity="0.08" /> {/* 30° */}
        <ellipse cx="200" cy="200" rx="156" ry="180" stroke="#e1fcad" strokeWidth="0.4" opacity="0.08" /> {/* 60° */}
        {/* Finer longitudes */}
        <ellipse cx="200" cy="200" rx="47" ry="180" stroke="#e1fcad" strokeWidth="0.3" opacity="0.05" /> {/* 15° */}
        <ellipse cx="200" cy="200" rx="127" ry="180" stroke="#e1fcad" strokeWidth="0.3" opacity="0.05" /> {/* 45° */}
        <ellipse cx="200" cy="200" rx="174" ry="180" stroke="#e1fcad" strokeWidth="0.3" opacity="0.04" /> {/* 75° */}
      </g>

      {/* Subtle glow at center */}
      <circle cx="200" cy="200" r="60" fill="#e1fcad" opacity="0.03" />
    </svg>
  );
}

// ── Page Hero ─────────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-[#122023] pb-24 pt-40">
      {/* Subtle bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#122023] via-[#122023]/95 to-[#0d1a1c]" />

      {/* Wireframe globe — right side, partially clipped */}
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 opacity-60 md:right-[5%]">
        <WireframeGlobe className="h-[500px] w-[500px] md:h-[650px] md:w-[650px]" />
      </div>

      <div className={`relative ${G} w-full`}>
        <div className={COL}>
          <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">
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
    <section className={`bg-white ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
            {/* Text */}
            <div>
              <SectionHeader label="Our story" heading="Born out of urgency, built for scale" />
              <div className="space-y-5 text-[15px] leading-[1.75] text-black/55">
                <p>
                  Verdant was founded by a team of energy engineers, climate
                  scientists, and policy experts who watched promising net-zero
                  commitments stall inside spreadsheets and boardroom decks.
                </p>
                <p>
                  We built the tools and advisory practice we wished existed —
                  combining rigorous financial modelling, best-in-class data
                  pipelines, and on-the-ground implementation expertise so
                  organisations could stop planning and start doing.
                </p>
                <p>
                  Today, Verdant operates across 42 countries, helping utilities,
                  corporates, governments, and communities make the energy
                  transition real, measurable, and just.
                </p>
              </div>

              <div className="mt-10">
                <GhostCTA label="See our platform" href="/product" />
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              {[
                { year: "2018", label: "Founded in Copenhagen with a team of 6" },
                { year: "2019", label: "First 50 enterprise clients across Europe" },
                { year: "2021", label: "Expanded to North America & APAC" },
                { year: "2023", label: "Launched the Verdant carbon data platform" },
                { year: "2025", label: "2.4M tonnes CO\u2082 avoided \u2014 and counting" },
              ].map((item, i, arr) => (
                <div key={item.year} className="flex gap-6">
                  {/* Line + dot */}
                  <div className="flex flex-col items-center">
                    <div className="size-3 shrink-0 rounded-full border-2 border-[#122023] bg-[#e1fcad] mt-1" />
                    {i < arr.length - 1 && (
                      <div className="mt-1 flex-1 w-px bg-black/10" style={{ minHeight: 40 }} />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-10">
                    <span className="font-mono text-[11px] font-bold tracking-widest text-black/30">{item.year}</span>
                    <p className="mt-1 text-[15px] font-medium leading-snug text-black">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                  <p className="mb-2 text-xs text-[#e1fcad]/60">{member.role}</p>
                  <p className="text-xs leading-relaxed text-white/40">{member.bio}</p>
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
              <span className="text-xs font-medium uppercase tracking-widest text-black/35">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  Solutions: ["Clean Energy", "Carbon Strategy", "Community Programs", "Nature Solutions"],
  Company:   ["About", "Team", "Careers", "Press"],
  Resources: ["Case Studies", "Reports", "Blog", "Webinars"],
  Legal:     ["Privacy", "Terms", "Cookie Policy"],
};

function Footer() {
  return (
    <footer className="border-t border-black/[0.08] bg-white py-16">
      <div className={G}>
        <div className={COL}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
            <div className="col-span-2 space-y-5 sm:col-span-3 md:col-span-1 md:max-w-[200px]">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#122023]">
                  <Leaf className="h-4 w-4 text-[#e1fcad]" />
                </div>
                <span className="text-base font-semibold tracking-tight">Verdant</span>
              </div>
              <p className="text-[13px] leading-relaxed text-black/40">
                Empowering a just and sustainable future through clean energy solutions.
              </p>
            </div>

            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group} className="space-y-4">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/30">{group}</h4>
                <ul className="space-y-3">
                  {links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[13px] text-black/45 transition-colors duration-200 hover:text-black">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-black/[0.08] pt-8 md:flex-row md:items-center">
            <span className="text-xs text-black/30">&copy; 2026 Verdant Energy Ltd. All rights reserved.</span>
            <div className="flex items-center gap-8">
              {["Twitter / X", "LinkedIn", "Instagram"].map((s) => (
                <a key={s} href="#" className="text-xs text-black/30 transition-colors duration-200 hover:text-black">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
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
      <PreFooterBanner />
      <Footer />
    </main>
  );
}
