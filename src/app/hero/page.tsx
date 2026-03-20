import Hero from "@/components/ui/hero";
import Navbar from "@/components/ui/navbar";
import { ArrowUpRight, Leaf, Zap, BarChart3, Globe, ChevronRight, PlugZap, FileBarChart2, Users2, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";

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
const SEC = "py-20";
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

// ── Trusted By ────────────────────────────────────────────────────────────────
const LOGOS = ["Vestas", "Ørsted", "Siemens", "Northvolt", "Enphase", "Tesla Energy"];

function TrustedBy() {
  return (
    <section className="border-b border-black/10 bg-white py-7">
      <div className={G}>
        <div className={`${COL} flex flex-wrap items-center gap-x-10 gap-y-4`}>
          <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em] text-black/30">
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
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    num: "02",
    title: "Carbon Strategy & Reporting",
    desc: "Science-based targets, Scope 1–3 mapping, and board-ready sustainability reporting aligned to TCFD.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    num: "03",
    title: "Community Energy Programs",
    desc: "Design and launch community microgrids, co-operative ownership models, and equitable access initiatives.",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
  },
  {
    icon: <Leaf className="h-5 w-5" />,
    num: "04",
    title: "Nature-Based Solutions",
    desc: "Verified carbon offsets, biodiversity credits, and regenerative land-use projects with measurable impact.",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
  },
];

function Services() {
  return (
    <section className={`bg-white ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          {/* Section header row with inline CTA button */}
          <div className={`${HDR} flex items-end justify-between gap-8`}>
            <div>
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                What we do
              </span>
              <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] md:text-5xl">
                Solutions built for a low-carbon economy
              </h2>
            </div>
            <a href="/product" className="group mb-1 hidden shrink-0 cursor-pointer items-center gap-0 overflow-hidden rounded-full border border-black/10 bg-transparent transition-colors hover:border-black/30 md:flex">
              <span className="pl-5 pr-4 text-sm font-medium text-black">See the platform</span>
              <div className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-[#122023] text-[#e1fcad]">
                <ArrowUpRight className="absolute h-4 w-4 -translate-x-1/2 transition-all duration-500 group-hover:translate-x-10" />
                <ArrowUpRight className="absolute h-4 w-4 -translate-x-10 transition-all duration-500 group-hover:-translate-x-1/2" />
              </div>
            </a>
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
                    <span className="font-mono text-[11px] font-bold tracking-widest text-black/25">{s.num}</span>
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

// ── Impact Stats ──────────────────────────────────────────────────────────────
const STATS = [
  { value: "2.4M",  unit: "tonnes",   label: "CO₂ avoided annually" },
  { value: "340+",  unit: "projects", label: "Deployed across 42 countries" },
  { value: "$8.2B", unit: "invested", label: "In clean energy assets" },
  { value: "15K+",  unit: "teams",    label: "Making the transition" },
];

function ImpactStats() {
  return (
    <section className={`bg-[#122023] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <SectionHeader label="Our impact" heading="The numbers that matter" light />

          {/* 1px gap between cells acts as divider lines */}
          <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.value} className="flex flex-col gap-3 bg-[#122023] p-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-normal leading-none tracking-[-0.04em] text-[#e1fcad] md:text-[56px]">
                    {s.value}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest text-white/30">
                    {s.unit}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white/50">{s.label}</p>
              </div>
            ))}
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
    <section className={`bg-[#f7f7f5] ${SEC}`}>
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
                  <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-black/30">
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
          <div className={`${HDR} flex flex-col gap-3 md:flex-row md:items-end md:justify-between`}>
            <div>
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">
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
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/30">Google</span>
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
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/30">Microsoft</span>
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
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/30">Zoho</span>
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
                      className="rounded-full border border-[#e1fcad]/15 bg-[#e1fcad]/[0.07] px-3 py-1 text-[11px] font-medium text-[#e1fcad]/70"
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

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className={`relative overflow-hidden bg-[#122023] ${SEC}`}>
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=50)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#122023] via-[#122023]/95 to-[#0d1a1c]" />

      <div className={`relative ${G}`}>
        <div className={`${COL} flex flex-col gap-12 md:flex-row md:items-end md:justify-between`}>
          <div className="space-y-5">
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">
              Get started
            </span>
            <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-6xl">
              Ready to build a cleaner future?
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-white/45">
              Join 15,000+ teams already making the transition. Our experts are ready to map your path to net-zero.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3">
            <Button
              variant="ghost"
              className="group flex cursor-pointer items-center gap-0 rounded-full border-none bg-transparent px-0 shadow-none hover:bg-transparent"
            >
              <span className="rounded-l-full bg-[#e1fcad] py-4 pl-8 pr-6 text-sm font-medium text-black duration-500 group-hover:bg-white group-hover:text-[#122023]">
                Start a Project
              </span>
              <div className="relative flex size-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e1fcad] text-black duration-500 group-hover:bg-white group-hover:text-[#122023]">
                <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 group-hover:translate-x-10" />
                <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 group-hover:-translate-x-1/2" />
              </div>
            </Button>
            <span className="pl-2 text-xs text-white/30">No commitment. Free discovery call.</span>
          </div>
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
          {/* Brand + 4 link columns */}
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

          {/* Bottom bar */}
          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-black/[0.08] pt-8 md:flex-row md:items-center">
            <span className="text-xs text-black/30">© 2026 Verdant Energy Ltd. All rights reserved.</span>
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
      <CTA />
      <Footer />
    </main>
  );
}
