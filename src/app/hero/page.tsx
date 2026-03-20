import Hero from "@/components/ui/hero";
import Navbar from "@/components/ui/navbar";
import { Leaf, Zap, BarChart3, Globe, ChevronRight } from "lucide-react";
import Footer from "@/components/ui/footer";
import { InlineCTA } from "@/components/ui/cta";

// ─────────────────────────────────────────────────────────────────────────────
//  12-COLUMN GRID SYSTEM
//
//  Every section stretches full-width (background colour fills edge-to-edge).
//  Inside each section an inner 12-col grid is placed; content lives in
//  cols 2–11 — leaving col 1 and col 12 as pure gutter/spacing.
//
//  G   = 12-col grid container  (grid grid-cols-12)
//  COL = content column slot    (col-start-2 col-span-10)
//  SEC = vertical section gap   (py-20 = 80px top + 80px bottom)
//  HDR = space below section heading before content (mb-12 = 48px)
// ─────────────────────────────────────────────────────────────────────────────
const G   = "grid grid-cols-12";
const COL = "col-start-2 col-span-10";
const SEC = "py-[100px] min-h-[740px]";
const HDR = "mb-12";

// ── Section label + h2 ───────────────────────────────────────────────────────
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

// ── Trusted By ────────────────────────────────────────────────────────────────
const LOGOS = ["Vestas", "Ørsted", "Siemens", "Northvolt", "Enphase", "Tesla Energy"];

function TrustedBy() {
  return (
    <section className="border-b border-black/10 bg-white py-7">
      <div className={G}>
        <div className={`${COL} flex flex-wrap items-center gap-x-10 gap-y-4`}>
          <span className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.18em] text-black/30">
            Trusted by
          </span>
          <div className="h-4 w-px shrink-0 bg-black/10" />
          {LOGOS.map((name) => (
            <span
              key={name}
              className="text-base font-semibold tracking-tight text-black/20 transition-colors duration-300 hover:text-black/50"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: <Zap className="h-5 w-5" />,
    num: "01",
    title: "Clean Energy Transition",
    desc: "End-to-end advisory for businesses moving to renewables — solar, wind, storage, and beyond.",
    img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=90",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    num: "02",
    title: "Carbon Strategy & Reporting",
    desc: "Science-based targets, Scope 1–3 mapping, and board-ready sustainability reporting aligned to TCFD.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=90",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    num: "03",
    title: "Community Energy Programs",
    desc: "Design and launch community microgrids, co-operative ownership models, and equitable access initiatives.",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=90",
  },
  {
    icon: <Leaf className="h-5 w-5" />,
    num: "04",
    title: "Nature-Based Solutions",
    desc: "Verified carbon offsets, biodiversity credits, and regenerative land-use projects with measurable impact.",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=90",
  },
];

function Services() {
  return (
    <section className={`bg-white ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          {/* Section header row */}
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <span className="mb-3 block text-sm font-bold uppercase tracking-[0.18em] text-black/40">
                What we do
              </span>
              <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] md:text-5xl">
                Solutions built for a low-carbon economy
              </h2>
            </div>
            <InlineCTA label="See the platform" href="/product" />
          </div>

          {/* 4-col service cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div
                key={s.num}
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-[#f7f7f5] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.img}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f7f7f5]/70 via-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-sm font-bold tracking-widest text-black/25">{s.num}</span>
                    <span className="text-black/25">{s.icon}</span>
                  </div>
                  <h3 className="mb-2 text-base font-semibold leading-snug tracking-tight">{s.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-black/50">{s.desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#122023] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Learn more <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Impact Stats — bento card layout (reference style) ───────────────────────

/** Card A — CO₂: hero number + ascending bar chart */
function CardCO2() {
  const bars = [28, 38, 45, 55, 62, 74, 88, 100];
  return (
    <div className="group flex h-full flex-col justify-between rounded-3xl bg-white/[0.05] p-8 ring-1 ring-white/[0.08] transition-colors duration-300 hover:bg-white/[0.08]">
      {/* Top */}
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-white/30">CO₂ avoided</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-normal leading-none tracking-[-0.02em] text-[#e1fcad]">2.4M</span>
          <span className="text-sm font-medium uppercase tracking-widest text-white/30">tonnes</span>
        </div>
        <p className="mt-3 max-w-[200px] text-sm leading-relaxed text-white/40">
          Measured against business-as-usual baselines, annually.
        </p>
      </div>

      {/* Bar chart */}
      <div className="mt-8 flex items-end gap-[5px]">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-sm"
              style={{
                height: `${(h / 100) * 72}px`,
                background: i === bars.length - 1
                  ? "#e1fcad"
                  : i >= bars.length - 3
                  ? "rgba(225,252,173,0.45)"
                  : "rgba(255,255,255,0.08)",
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-white/20">
        <span>2018</span><span>2025</span>
      </div>
    </div>
  );
}

/** Card B — Projects: donut chart + country count */
function CardProjects() {
  // Donut: Solar 45%, Wind 28%, Storage 15%, Other 12%
  const segments = [
    { pct: 45, color: "#e1fcad",        label: "Solar" },
    { pct: 28, color: "rgba(225,252,173,0.5)", label: "Wind" },
    { pct: 15, color: "rgba(225,252,173,0.25)", label: "Storage" },
    { pct: 12, color: "rgba(255,255,255,0.08)", label: "Other" },
  ];
  // Build SVG arc paths for a donut
  const cx = 70, cy = 70, r = 52, inner = 32;
  let cursor = -90; // start from top
  function arc(pct: number) {
    const deg = (pct / 100) * 360;
    const start = (cursor * Math.PI) / 180;
    cursor += deg;
    const end = (cursor * Math.PI) / 180;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end),   y2 = cy + r * Math.sin(end);
    const ix1 = cx + inner * Math.cos(start), iy1 = cy + inner * Math.sin(start);
    const ix2 = cx + inner * Math.cos(end),   iy2 = cy + inner * Math.sin(end);
    const large = deg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${inner} ${inner} 0 ${large} 0 ${ix1} ${iy1} Z`;
  }

  return (
    <div className="group flex h-full flex-col justify-between rounded-3xl bg-white/[0.05] p-8 ring-1 ring-white/[0.08] transition-colors duration-300 hover:bg-white/[0.08]">
      {/* Donut */}
      <div className="flex justify-center">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {segments.map((s) => (
            <path key={s.label} d={arc(s.pct)} fill={s.color} />
          ))}
          {/* Centre label */}
          <text x="70" y="68" textAnchor="middle" fontSize="16" fontWeight="400" fill="#e1fcad">340+</text>
          <text x="70" y="82" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.35)" letterSpacing="1.5" fontFamily="ui-monospace,monospace">PROJECTS</text>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              <span className="text-white/40">{s.label}</span>
            </div>
            <span className="font-mono text-white/50">{s.pct}%</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-white/30">Deployed across <span className="text-white/60">42 countries</span></p>
    </div>
  );
}

/** Card C — Investment: large heading + sparkline area */
function CardInvestment() {
  // Sparkline points
  const pts = [
    { x: 0,   y: 70 },
    { x: 40,  y: 62 },
    { x: 80,  y: 55 },
    { x: 120, y: 44 },
    { x: 160, y: 38 },
    { x: 200, y: 28 },
    { x: 240, y: 18 },
    { x: 280, y: 8  },
  ];
  const lineD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${lineD} L 280 80 L 0 80 Z`;

  return (
    <div className="group flex h-full flex-col justify-between rounded-3xl bg-[#e1fcad] p-8 transition-opacity duration-300">
      {/* Top — inverted colours on lime card */}
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#122023]/50">Clean energy assets</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-normal leading-none tracking-[-0.02em] text-[#122023]">$8.2B</span>
        </div>
        <p className="mt-3 max-w-[200px] text-sm leading-relaxed text-[#122023]/55">
          Capital mobilised through Verdant-advised financing structures.
        </p>
      </div>

      {/* Sparkline */}
      <div className="mt-6 overflow-hidden rounded-xl">
        <svg width="100%" viewBox="0 0 280 80" preserveAspectRatio="none" className="h-20 w-full">
          <defs>
            <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#122023" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#122023" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#spark-grad)" />
          <path d={lineD} fill="none" stroke="#122023" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          <circle cx="280" cy="8" r="4" fill="#122023" opacity="0.7" />
        </svg>
      </div>
      <div className="flex justify-between text-[10px] text-[#122023]/40 font-mono">
        <span>2018</span><span>2025</span>
      </div>
    </div>
  );
}

/** Card D — Teams: hero number + sector breakdown rows (like reference card 3) */
function CardTeams() {
  const rows = [
    { label: "Enterprise",    count: "8,400+", bg: "bg-white/[0.04]",  text: "text-white/70"  },
    { label: "SME",           count: "5,200+", bg: "bg-[#e1fcad]/10",  text: "text-[#e1fcad]" },
    { label: "Government",    count: "1,400+", bg: "bg-[#122023]",     text: "text-[#e1fcad]" },
  ];
  return (
    <div className="group flex h-full flex-col justify-between rounded-3xl bg-white/[0.05] p-8 ring-1 ring-white/[0.08] transition-colors duration-300 hover:bg-white/[0.08]">
      {/* Top */}
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-white/30">Teams onboard</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-normal leading-none tracking-[-0.02em] text-[#e1fcad]">15K+</span>
        </div>
        <p className="mt-2 text-sm text-white/40">Making the transition</p>
      </div>

      {/* Sector breakdown rows — mirrors reference's table style */}
      <div className="mt-6 overflow-hidden rounded-2xl">
        {rows.map((r) => (
          <div
            key={r.label}
            className={`flex items-center justify-between px-5 py-4 ${r.bg}`}
          >
            <span className={`text-sm font-medium ${r.text}`}>{r.label}</span>
            <span className={`font-mono text-base font-semibold ${r.text}`}>{r.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImpactStats() {
  return (
    <section className={`bg-[#122023] ${SEC} flex flex-col justify-center`}>
      <div className={G}>
        <div className={COL}>
          <SectionHeader label="Our impact" heading="The numbers that matter" light />

          {/* Bento grid — 2 × 2 on desktop */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CardCO2 />
            <CardProjects />
            <CardInvestment />
            <CardTeams />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "Discovery & Assessment",
    desc: "We map your current carbon footprint, energy usage, and operational constraints to establish a clear baseline and identify the highest-impact opportunities.",
  },
  {
    num: "02",
    title: "Strategy & Roadmap",
    desc: "Our team co-designs a phased transition roadmap — financially modelled, stakeholder-aligned, and benchmarked to global best practice.",
  },
  {
    num: "03",
    title: "Implement & Monitor",
    desc: "We deploy solutions, train your teams, and provide ongoing monitoring with real-time dashboards so you can track and report with confidence.",
  },
];

function HowItWorks() {
  return (
    <section className={`bg-[#f7f7f5] ${SEC} flex flex-col justify-center`}>
      <div className={G}>
        <div className={COL}>
          <SectionHeader label="How it works" heading="A proven process, end to end" />

          <div className="grid grid-cols-1 divide-y divide-black/[0.08] overflow-hidden rounded-2xl border border-black/[0.08] bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="group relative flex flex-col gap-6 p-8 transition-colors duration-300 hover:bg-[#f7f7f5]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold tracking-[0.2em] text-black/30">
                    STEP {step.num}
                  </span>
                  <span className="size-2 rounded-full bg-[#e1fcad] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-black/50">{step.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-[#122023] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more <ChevronRight className="h-3.5 w-3.5" />
                </div>
                {i < STEPS.length - 1 && (
                  <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 md:flex">
                    <div className="flex size-7 items-center justify-center rounded-full border-2 border-[#f7f7f5] bg-[#e1fcad] text-[#122023]">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Integrations ──────────────────────────────────────────────────────────────
const INTEGRATIONS = [
  {
    name: "Google Workspace",
    handle: "Google",
    color: "#4285F4",
    metrics: ["Sheets carbon sync", "Slides report export", "Drive audit logs"],
    desc: "Sync sustainability data from Google Sheets directly into Verdant. Auto-export board reports to Slides.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: "Microsoft 365",
    handle: "Microsoft",
    color: "#00A4EF",
    metrics: ["Azure emissions API", "Teams ESG alerts", "Power BI dashboards"],
    desc: "Pull Azure carbon data into Verdant automatically. Push live ESG metrics to Power BI and Teams.",
    icon: (
      <svg viewBox="0 0 21 21" className="h-7 w-7">
        <rect width="10" height="10" fill="#F25022"/>
        <rect x="11" width="10" height="10" fill="#7FBA00"/>
        <rect y="11" width="10" height="10" fill="#00A4EF"/>
        <rect x="11" y="11" width="10" height="10" fill="#FFB900"/>
      </svg>
    ),
  },
  {
    name: "Zoho Suite",
    handle: "Zoho",
    color: "#E42527",
    metrics: ["CRM ESG tagging", "Books carbon spend", "Analytics reporting"],
    desc: "Tag carbon footprint against CRM deals. Capture sustainability spend in Zoho Books and visualise in Analytics.",
    icon: (
      <svg viewBox="0 0 60 24" className="h-6 w-14">
        <text x="0" y="20" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="#E42527">zoho</text>
      </svg>
    ),
  },
];

function Integrations() {
  return (
    <section className={`bg-[#122023] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          {/* Section header */}
          <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 block text-sm font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">
                Integrations
              </span>
              <h2 className="max-w-xl text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-5xl">
                Works with the tools you already use
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/40 md:text-right">
              Verdant connects to your existing stack — no migration, no disruption.
            </p>
          </div>

          {/* ── Hub diagram ── */}
          <div className="mb-14 flex flex-col items-center">
            {/* Row: Google ─── Verdant ─── Microsoft */}
            <div className="flex w-full max-w-2xl items-center justify-between">
              {/* Google */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                  {INTEGRATIONS[0].icon}
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-white/30">Google</span>
              </div>

              {/* Line Google → center */}
              <div className="flex flex-1 items-center px-3">
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-[#e1fcad]/50 to-[#e1fcad]/20" />
                <div className="mx-1 size-1.5 shrink-0 rounded-full bg-[#e1fcad]/60" />
              </div>

              {/* Verdant center hub */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative flex size-20 shrink-0 items-center justify-center rounded-full bg-[#e1fcad] shadow-[0_0_0_8px_rgba(225,252,173,0.12),0_0_0_16px_rgba(225,252,173,0.05)]">
                  <Leaf className="h-9 w-9 text-[#122023]" />
                </div>
                <span className="text-sm font-semibold text-white">Verdant</span>
              </div>

              {/* Line center → Microsoft */}
              <div className="flex flex-1 items-center px-3">
                <div className="mx-1 size-1.5 shrink-0 rounded-full bg-[#e1fcad]/60" />
                <div className="h-px flex-1 bg-gradient-to-r from-[#e1fcad]/20 via-[#e1fcad]/50 to-white/10" />
              </div>

              {/* Microsoft */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.06]">
                  {INTEGRATIONS[1].icon}
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-white/30">Microsoft</span>
              </div>
            </div>

            {/* Vertical line down to Zoho */}
            <div className="flex flex-col items-center">
              <div className="h-10 w-px bg-gradient-to-b from-[#e1fcad]/30 to-transparent" />
              <div className="mb-1 size-1.5 rounded-full bg-[#e1fcad]/40" />
              <div className="h-8 w-px bg-gradient-to-b from-[#e1fcad]/20 to-transparent" />
            </div>

            {/* Zoho */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-16 min-w-[90px] items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.06] px-4">
                {INTEGRATIONS[2].icon}
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-white/30">Zoho</span>
            </div>
          </div>

          {/* ── Integration cards ── */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {INTEGRATIONS.map((intg) => (
              <div
                key={intg.name}
                className="group flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-7 transition-colors duration-300 hover:border-[#e1fcad]/20 hover:bg-white/[0.07]"
              >
                {/* Logo + name */}
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]">
                    {intg.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{intg.name}</p>
                    <p className="text-xs text-white/30">Official connector</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-white/50">{intg.desc}</p>

                {/* Metric tags */}
                <div className="flex flex-wrap gap-2">
                  {intg.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-[#e1fcad]/15 bg-[#e1fcad]/[0.07] px-3 py-1 text-sm font-medium text-[#e1fcad]/70"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Learn more */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#e1fcad]/50 transition-colors duration-200 group-hover:text-[#e1fcad]">
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

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Working with this team completely transformed how we think about energy strategy. We hit net-zero 3 years ahead of schedule.",
    name: "Sarah Chen",
    role: "Chief Sustainability Officer, Meridian Group",
    img: "https://i.pravatar.cc/64?img=47",
  },
  {
    quote: "The roadmap wasn't just aspirational — it was financially rigorous and had board buy-in from day one. Remarkable execution.",
    name: "James Okafor",
    role: "CEO, Harborview Infrastructure",
    img: "https://i.pravatar.cc/64?img=12",
  },
  {
    quote: "Our community microgrid is now serving 4,200 households. The team guided us through every regulatory and technical hurdle.",
    name: "Elena Vasquez",
    role: "Director, Coastal Energy Co-op",
    img: "https://i.pravatar.cc/64?img=23",
  },
];

function Testimonials() {
  return (
    <section className={`bg-white ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <SectionHeader label="Testimonials" heading="Heard from the people doing it" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="flex flex-col gap-6 rounded-2xl border border-black/[0.06] bg-[#f7f7f5] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              >
                <span className="select-none font-serif text-6xl leading-[0.75] text-black/10">&ldquo;</span>
                <p className="flex-1 text-[15px] leading-[1.7] text-black/65">{t.quote}</p>
                <div className="flex items-center gap-3 border-t border-black/[0.08] pt-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.img}
                    alt={t.name}
                    className="size-10 shrink-0 rounded-full object-cover ring-2 ring-[#e1fcad] ring-offset-2"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-black">{t.name}</p>
                    <p className="truncate text-xs text-black/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA section replaced by shared PreFooterBanner component

// Footer imported from @/components/ui/footer

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HeroPage() {
  return (
    <main className="w-full">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Services />
      <ImpactStats />
      <HowItWorks />
      <Integrations />
      <Testimonials />
      <Footer />
    </main>
  );
}
