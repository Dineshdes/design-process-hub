import Navbar from "@/components/ui/navbar";
import {
  Leaf,
  ChevronRight,
  BrainCircuit,
  FileBarChart2,
  Users2,
  PlugZap,
  CheckCircle2,
  TrendingDown,
} from "lucide-react";
import { PrimaryCTA, SecondaryCTA, GhostCTA } from "@/components/ui/cta";
import Footer from "@/components/ui/footer";

// ── 12-col grid constants ────────────────────────────────────────────────────
const G   = "grid grid-cols-12";
const COL = "col-start-2 col-span-10";
const SEC = "py-[100px] min-h-[740px]";

// ── Isometric cube SVG path helpers ──────────────────────────────────────────
const isoTop   = (cx: number, cy: number, w: number) =>
  `M${cx},${cy} L${cx+w},${cy+w*0.5} L${cx},${cy+w} L${cx-w},${cy+w*0.5} Z`;
const isoRight = (cx: number, cy: number, w: number, h: number) =>
  `M${cx+w},${cy+w*0.5} L${cx+w},${cy+w*0.5+h} L${cx},${cy+w+h} L${cx},${cy+w} Z`;
const isoLeft  = (cx: number, cy: number, w: number, h: number) =>
  `M${cx-w},${cy+w*0.5} L${cx},${cy+w} L${cx},${cy+w+h} L${cx-w},${cy+w*0.5+h} Z`;

// ── Shared: Section header ───────────────────────────────────────────────────
function SectionHeader({
  label, heading, sub, light = false, center = false,
}: {
  label: string; heading: string; sub?: string; light?: boolean; center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? "flex flex-col items-center text-center" : ""}`}>
      <span className={`mb-3 block text-sm font-bold uppercase tracking-[0.18em] ${light ? "text-[#e1fcad]/50" : "text-black/40"}`}>
        {label}
      </span>
      <h2 className={`font-normal leading-[1.08] tracking-[-0.03em] ${center ? "max-w-2xl" : ""} ${light ? "text-white" : "text-black"}`}>
        {heading}
      </h2>
      {sub && (
        <p className={`mt-5 text-base leading-relaxed max-w-xl ${light ? "text-white/45" : "text-black/50"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ── Trusted By ───────────────────────────────────────────────────────────────
const LOGOS = ["Vestas", "Ørsted", "Siemens", "Northvolt", "Enphase", "Tesla Energy"];

function TrustedBy() {
  return (
    <section className="border-b border-black/10 bg-white py-7">
      <div className={G}>
        <div className={`${COL} flex flex-wrap items-center gap-x-10 gap-y-4`}>
          <span className="whitespace-nowrap text-base font-bold uppercase tracking-[0.18em] text-black/30">
            Trusted by
          </span>
          <div className="h-4 w-px shrink-0 bg-black/10" />
          {LOGOS.map((name) => (
            <span key={name} className="text-base font-semibold tracking-tight text-black/20 transition-colors duration-300 hover:text-black/50">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Product Hero ──────────────────────────────────────────────────────────────
function ProductHero() {
  return (
    <section className="relative overflow-hidden bg-[#122023] pt-36 pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(225,252,173,0.08),transparent)]" />
      <div className={`relative ${G}`}>
        <div className={COL}>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-5 inline-block rounded-full border border-[#e1fcad]/20 bg-[#e1fcad]/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.18em] text-[#e1fcad]/80">
                Verdant Platform
              </span>
              <h1 className="mb-6 text-5xl font-normal leading-[1.04] tracking-[-0.03em] text-white md:text-6xl">
                Every sustainability insight,{" "}
                <span className="text-[#e1fcad]">one intelligent platform</span>
              </h1>
              <p className="mb-10 max-w-[480px] text-[17px] leading-relaxed text-white/45">
                From carbon tracking to board reporting, Verdant unifies your entire sustainability operation — powered by AI that learns your business.
              </p>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <PrimaryCTA label="Start free trial" href="/hero" />
                <SecondaryCTA label="See how it works" href="#capabilities" dark />
              </div>
              <p className="mt-5 text-base text-white/25">No credit card required. 14-day free trial.</p>
            </div>

            {/* Right: product mockup */}
            <div className="relative">
              <div className="rounded-2xl border border-white/[0.06] bg-[#0d1a1c] p-6 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-full bg-[#e1fcad]">
                      <Leaf className="h-3.5 w-3.5 text-[#122023]" />
                    </div>
                    <span className="text-sm font-semibold text-white">Carbon Overview</span>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-[#e1fcad]/10 px-3 py-1 text-base font-bold uppercase tracking-widest text-[#e1fcad]/70">
                    <span className="inline-block size-1.5 rounded-full bg-[#e1fcad]" />
                    Live
                  </span>
                </div>
                <div className="mb-5 rounded-xl bg-white/[0.03] p-5">
                  <p className="mb-1 text-base font-bold uppercase tracking-widest text-white/30">Total Scope 1–3 Emissions</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-normal tracking-[-0.04em] text-[#e1fcad]">−23.4%</span>
                    <span className="text-sm text-white/30">vs last year</span>
                  </div>
                  {/* Mini sparkline */}
                  <svg viewBox="0 0 260 32" fill="none" className="mt-3 w-full">
                    <path d="M0 28 C20 24 40 20 60 22 C80 24 100 18 120 14 C140 10 160 16 180 10 C200 4 230 8 260 2" stroke="#e1fcad" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
                    <path d="M0 28 C20 24 40 20 60 22 C80 24 100 18 120 14 C140 10 160 16 180 10 C200 4 230 8 260 2 L260 32 L0 32 Z" fill="#e1fcad" fillOpacity="0.05" />
                    <circle cx="260" cy="2" r="3" fill="#e1fcad" />
                  </svg>
                </div>
                <div className="mb-5 flex items-end gap-1.5 rounded-xl bg-white/[0.03] p-5">
                  {[40, 65, 55, 78, 50, 88, 62, 94, 70, 82, 58, 45].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-sm ${i === 11 ? "bg-[#e1fcad]" : "bg-white/[0.08]"}`} style={{ height: `${h * 0.6}px` }} />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { scope: "Scope 1", val: "−18%", color: "bg-[#e1fcad]" },
                    { scope: "Scope 2", val: "−31%", color: "bg-[#e1fcad]/60" },
                    { scope: "Scope 3", val: "−14%", color: "bg-[#e1fcad]/30" },
                  ].map((s) => (
                    <div key={s.scope} className="rounded-lg bg-white/[0.04] p-3">
                      <div className={`mb-2 h-1 w-full rounded-full ${s.color}`} />
                      <p className="text-base text-white/30">{s.scope}</p>
                      <p className="text-sm font-semibold text-white">{s.val}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-white/[0.06] bg-[#122023] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.4)] lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e1fcad]/15">
                    <TrendingDown className="h-4 w-4 text-[#e1fcad]" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">Target on track</p>
                    <p className="text-base text-white/40">Net-zero by 2030</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CAPABILITIES = [
  {
    icon: <PlugZap className="h-6 w-6" />,
    title: "Carbon Intelligence",
    desc: "Real-time Scope 1–3 tracking with anomaly detection and automated alerts when emissions deviate from your plan.",
  },
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: "AI Strategy Engine",
    desc: "Tell Verdant your net-zero target. It builds the roadmap — financially modelled, scenario-tested, stakeholder-ready.",
  },
  {
    icon: <FileBarChart2 className="h-6 w-6" />,
    title: "Automated Reporting",
    desc: "One-click TCFD, GRI, and CDP-aligned reports. Formatted, annotated, and benchmarked against industry peers.",
  },
  {
    icon: <Users2 className="h-6 w-6" />,
    title: "Team Workspace",
    desc: "Assign emission owners, track decarbonisation tasks, and collaborate across departments in one unified space.",
  },
];

function Capabilities() {
  return (
    <section id="capabilities" className={`bg-[#f7f7f5] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <SectionHeader
            label="What Verdant does"
            heading="Built for the full sustainability operation"
            sub="Four tightly integrated capabilities that replace the spreadsheets, silos, and manual effort."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c) => (
              <div key={c.title} className="group flex flex-col gap-5 rounded-2xl border border-black/[0.06] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.09)]">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-[#122023] text-[#e1fcad]">
                  {c.icon}
                </div>
                <div>
                  <h3 className="mb-2 text-base font-semibold tracking-tight">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-black/50">{c.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-base font-semibold text-[#122023] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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

// ── Feature Detail 1 — Carbon Intelligence ────────────────────────────────────
function FeatureDetail1() {
  return (
    <section className={`bg-white ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="mb-4 block text-sm font-bold uppercase tracking-[0.18em] text-black/40">Carbon Intelligence</span>
              <h2 className="mb-5 font-normal leading-[1.08] tracking-[-0.03em]">
                See every emission, everywhere it happens
              </h2>
              <p className="mb-8 max-w-md text-base leading-relaxed text-black/50">
                Verdant monitors your entire carbon footprint in real time — from factory floor to supply chain. When something&apos;s off, you know before your next board meeting.
              </p>
              <ul className="mb-10 space-y-3">
                {["Scope 1, 2 & 3 tracked automatically","Anomaly alerts with root-cause analysis","Supply chain emission attribution","Benchmark against industry peers"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-black/60">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#122023]" />
                    {item}
                  </li>
                ))}
              </ul>
              <GhostCTA label="Explore Carbon Intelligence" />
            </div>

            {/* Enhanced mockup */}
            <div className="relative rounded-2xl border border-black/[0.06] bg-[#f7f7f5] p-6 overflow-hidden">
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#e1fcad]/20 blur-3xl" />
              <p className="mb-4 text-base font-bold uppercase tracking-widest text-black/30">Supply Chain Emissions Map</p>
              {/* Mini donut chart */}
              <div className="mb-5 flex items-center gap-4 rounded-xl bg-white p-4">
                <svg viewBox="0 0 60 60" className="h-14 w-14 shrink-0">
                  <circle cx="30" cy="30" r="22" stroke="#f7f7f5" strokeWidth="8" fill="none" />
                  <circle cx="30" cy="30" r="22" stroke="#122023" strokeWidth="8" fill="none" strokeDasharray="83 55" strokeDashoffset="34" strokeLinecap="round" />
                  <circle cx="30" cy="30" r="22" stroke="#e1fcad" strokeWidth="8" fill="none" strokeDasharray="34 104" strokeDashoffset="-48" strokeLinecap="round" />
                  <text x="30" y="34" textAnchor="middle" fontSize="10" fontWeight="700" fill="#122023" fontFamily="system-ui">72%</text>
                </svg>
                <div>
                  <p className="text-sm font-semibold text-black">Tier 1 manufacturing</p>
                  <p className="text-base text-black/40">Highest concentration</p>
                </div>
                <span className="ml-auto rounded-full bg-red-50 px-2.5 py-0.5 text-base font-bold uppercase tracking-widest text-red-500">High</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Logistics & Freight", pct: 38, badge: "Medium" },
                  { label: "Office & Travel",      pct: 14, badge: "Low" },
                  { label: "Purchased Goods",      pct: 55, badge: "Medium" },
                ].map((row) => (
                  <div key={row.label} className="rounded-xl bg-white p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-base font-medium text-black/60">{row.label}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-base font-bold uppercase tracking-widest ${
                        row.badge === "Medium" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                      }`}>{row.badge}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
                      <div className="h-full rounded-full bg-[#122023]" style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              {/* Floating badge */}
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#122023]/10 bg-white p-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-[#e1fcad]">
                  <TrendingDown className="h-3.5 w-3.5 text-[#122023]" />
                </div>
                <p className="text-base font-medium text-black">−23.4% total vs last year</p>
                <span className="ml-auto text-base font-semibold text-emerald-600">On target</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Feature Detail 2 — AI Strategy Engine ─────────────────────────────────────
function FeatureDetail2() {
  return (
    <section className={`bg-[#f7f7f5] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Visual — left */}
            <div className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#122023] p-6">
                {/* Radial glow */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 bg-[#e1fcad]/06 blur-3xl" />
                <p className="mb-4 text-base font-bold uppercase tracking-widest text-white/30">AI Roadmap Builder</p>
                {/* Progress ring */}
                <div className="mb-5 flex items-center gap-5 rounded-xl bg-white/[0.04] p-4">
                  <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0 -rotate-90">
                    <circle cx="32" cy="32" r="26" stroke="rgba(225,252,173,0.1)" strokeWidth="6" fill="none" />
                    <circle cx="32" cy="32" r="26" stroke="#e1fcad" strokeWidth="6" fill="none"
                      strokeDasharray="113 163" strokeDashoffset="0" strokeLinecap="round" />
                  </svg>
                  <div>
                    <p className="text-sm text-white/40">Net-zero progress</p>
                    <p className="text-2xl font-normal tracking-tight text-[#e1fcad]">69% <span className="text-sm text-white/30">complete</span></p>
                  </div>
                </div>
                {/* Chat */}
                <div className="mb-4 space-y-3">
                  <div className="flex justify-end">
                    <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-[#e1fcad] px-4 py-3 text-sm font-medium text-[#122023]">
                      We need to hit net-zero by 2030.
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e1fcad]/15">
                      <BrainCircuit className="h-3.5 w-3.5 text-[#e1fcad]" />
                    </div>
                    <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-4 py-3 text-sm text-white/70">
                      Based on your trajectory, here&apos;s your fastest path in 3 phases:
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { phase: "Phase 1", title: "Switch to renewables", year: "2025", impact: "−38%" },
                    { phase: "Phase 2", title: "Supply chain audit",   year: "2027", impact: "−29%" },
                    { phase: "Phase 3", title: "Offset & certify",     year: "2030", impact: "Net-zero" },
                  ].map((p) => (
                    <div key={p.phase} className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-bold uppercase tracking-widest text-[#e1fcad]/50">{p.phase}</span>
                        <span className="text-sm text-white/70">{p.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-base text-white/30">{p.year}</span>
                        <span className="rounded-full bg-[#e1fcad]/10 px-2.5 py-0.5 text-base font-bold text-[#e1fcad]">{p.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Text — right */}
            <div className="order-1 lg:order-2">
              <span className="mb-4 block text-sm font-bold uppercase tracking-[0.18em] text-black/40">AI Strategy Engine</span>
              <h2 className="mb-5 font-normal leading-[1.08] tracking-[-0.03em]">
                An AI strategist that never stops working
              </h2>
              <p className="mb-8 max-w-md text-base leading-relaxed text-black/50">
                Tell Verdant your net-zero target and it builds the roadmap — financially modelled, stakeholder-ready, and updated automatically as your operations change.
              </p>
              <ul className="mb-10 space-y-3">
                {[
                  "Scenario modelling across 12 decarbonisation levers",
                  "Financial projections and ROI for every initiative",
                  "Auto-updated when energy or policy data changes",
                  "Export board-ready strategy decks in one click",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-black/60">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#122023]" />
                    {item}
                  </li>
                ))}
              </ul>
              <GhostCTA label="See the AI in action" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── NEW: Bento Features — isometric line-art style ───────────────────────────
function BentoFeatures() {
  // Reuse iso helpers defined at top of file
  const W = 52, H = 10; // slab dimensions

  return (
    <section className="bg-white py-[100px]">
      <div className={G}>
        <div className={COL}>
          <SectionHeader
            label="How it works"
            heading="Every layer, intelligently connected"
            sub="Four modules operating in parallel — ingesting data, building strategy, ensuring compliance, and integrating seamlessly."
          />

          <div className="grid grid-cols-12 auto-rows-[280px] gap-4">

            {/* ── Card A — tall left: stacked isometric data layers ── */}
            <div className="col-span-12 row-span-2 flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-[#f7f7f5] md:col-span-5">
              <div className="flex flex-1 items-center justify-center">
                <svg viewBox="0 0 260 310" fill="none" className="w-[85%] h-[85%]">
                  {/* 4 stacked slabs — top slab is lime (most active) */}
                  {[
                    { cy: 14,  fill: "#e1fcad", fr: "#b3d168", fl: "#8aad4e", so: 1,    label: "Scope 1" },
                    { cy: 88,  fill: "rgba(18,32,35,0.07)", fr: "rgba(18,32,35,0.04)", fl: "rgba(18,32,35,0.025)", so: 0.35, label: "Scope 2" },
                    { cy: 162, fill: "rgba(18,32,35,0.07)", fr: "rgba(18,32,35,0.04)", fl: "rgba(18,32,35,0.025)", so: 0.25, label: "Scope 3" },
                    { cy: 236, fill: "rgba(18,32,35,0.07)", fr: "rgba(18,32,35,0.04)", fl: "rgba(18,32,35,0.025)", so: 0.18, label: "Supply" },
                  ].map((s, i) => (
                    <g key={i}>
                      {/* slab faces */}
                      <path d={isoTop(130, s.cy, W)}       fill={s.fill}  stroke="#122023" strokeOpacity={s.so} strokeWidth="1.3" />
                      <path d={isoRight(130, s.cy, W, H)}  fill={s.fr}    stroke="#122023" strokeOpacity={s.so} strokeWidth="1.3" />
                      <path d={isoLeft(130, s.cy, W, H)}   fill={s.fl}    stroke="#122023" strokeOpacity={s.so} strokeWidth="1.3" />
                      {/* label pill to the right */}
                      <rect x="192" y={s.cy + W * 0.5 - 8} width="56" height="16" rx="8"
                        fill={i === 0 ? "#e1fcad" : "rgba(18,32,35,0.06)"} />
                      <text x="220" y={s.cy + W * 0.5 + 4} textAnchor="middle" fontSize="8"
                        fill={i === 0 ? "#122023" : "#122023"} fillOpacity={i === 0 ? 0.8 : 0.4}
                        fontFamily="system-ui" fontWeight="600" letterSpacing="0.06em">{s.label}</text>
                      {/* dashed connector down to next slab */}
                      {i < 3 && (
                        <line x1="130" y1={s.cy + W + H} x2="130" y2={s.cy + W + H + 14}
                          stroke="#122023" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 3" />
                      )}
                    </g>
                  ))}
                  {/* small floating corner marks (like reference) */}
                  {[{x:60,y:14},{x:60,y:248},{x:200,y:14},{x:200,y:248}].map((p,i)=>(
                    <g key={i} opacity="0.15">
                      <line x1={p.x-6} y1={p.y} x2={p.x} y2={p.y} stroke="#122023" strokeWidth="1.5" />
                      <line x1={p.x} y1={p.y} x2={p.x} y2={p.y+6} stroke="#122023" strokeWidth="1.5" />
                    </g>
                  ))}
                </svg>
              </div>
              <div className="shrink-0 px-8 pb-8">
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-black/30">Live data</span>
                <h3 className="mb-2 text-xl font-normal leading-snug tracking-tight text-[#122023]">Real-time ingestion from any source</h3>
                <p className="text-base leading-relaxed text-black/45">Connect meters, APIs, and ERP systems. Carbon data flows in continuously — no manual exports.</p>
              </div>
            </div>

            {/* ── Card B — wide top right: overlapping isometric screens ── */}
            <div className="col-span-12 flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-[#f7f7f5] md:col-span-7">
              <div className="flex flex-1 items-center justify-center px-10 pt-8">
                <svg viewBox="0 0 380 190" fill="none" className="w-full h-full">
                  {/* Back card — rotated */}
                  <g transform="rotate(-7 190 95)">
                    <rect x="55" y="22" width="240" height="140" rx="12"
                      fill="white" stroke="#122023" strokeOpacity="0.1" strokeWidth="1.2" />
                    {/* content lines */}
                    <rect x="75" y="46" width="100" height="6" rx="3" fill="#122023" fillOpacity="0.08" />
                    <rect x="75" y="60" width="140" height="4" rx="2" fill="#122023" fillOpacity="0.06" />
                    <rect x="75" y="72" width="120" height="4" rx="2" fill="#122023" fillOpacity="0.06" />
                  </g>
                  {/* Middle card */}
                  <g transform="rotate(-2 190 95)">
                    <rect x="65" y="18" width="240" height="140" rx="12"
                      fill="white" stroke="#122023" strokeOpacity="0.14" strokeWidth="1.2" />
                    <rect x="85" y="42" width="80" height="6" rx="3" fill="#122023" fillOpacity="0.1" />
                    <rect x="85" y="56" width="130" height="4" rx="2" fill="#122023" fillOpacity="0.07" />
                  </g>
                  {/* Front card — main, no rotation */}
                  <rect x="75" y="14" width="240" height="152" rx="12"
                    fill="white" stroke="#122023" strokeOpacity="0.18" strokeWidth="1.5" />
                  {/* Root node */}
                  <circle cx="113" cy="90" r="9" fill="rgba(18,32,35,0.07)" stroke="#122023" strokeOpacity="0.3" strokeWidth="1.2" />
                  <circle cx="113" cy="90" r="4" fill="#122023" fillOpacity="0.4" />
                  {/* 4 branches */}
                  {[{y:44,active:false},{y:68,active:true},{y:104,active:false},{y:128,active:false}].map((b,i)=>(
                    <g key={i}>
                      <path d={`M122 90 C155 90 152 ${b.y} 188 ${b.y}`}
                        stroke="#122023" strokeOpacity={b.active?0.5:0.18} strokeWidth={b.active?1.5:1.1} fill="none" />
                      <circle cx="188" cy={b.y} r={b.active?8:6}
                        fill={b.active?"#e1fcad":"rgba(18,32,35,0.06)"}
                        stroke="#122023" strokeOpacity={b.active?0.5:0.2} strokeWidth="1.2" />
                      {b.active && <path d={`M184 ${b.y} L188 ${b.y+4} L193 ${b.y-5}`} stroke="#122023" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
                      <text x="202" y={b.y+4} fontSize="9" fill="#122023" fillOpacity={b.active?0.65:0.3}
                        fontFamily="system-ui" fontWeight={b.active?"600":"400"}>
                        {["Renewables","Efficiency","Supply chain","Offsets"][i]}
                      </text>
                      <text x="295" y={b.y+4} textAnchor="end" fontSize="9" fill="#122023" fillOpacity={b.active?0.75:0.22}
                        fontFamily="system-ui" fontWeight="700">
                        {["−38%","−22%","−18%","−12%"][i]}
                      </text>
                    </g>
                  ))}
                  {/* corner accent marks */}
                  {[{x:75,y:14},{x:315,y:14},{x:75,y:166},{x:315,y:166}].map((p,i)=>(
                    <g key={i} opacity="0.2">
                      <line x1={p.x+(i%2?-8:0)} y1={p.y} x2={p.x+(i%2?0:8)} y2={p.y} stroke="#122023" strokeWidth="1.5" />
                      <line x1={p.x} y1={p.y+(i>1?-8:0)} x2={p.x} y2={p.y+(i>1?0:8)} stroke="#122023" strokeWidth="1.5" />
                    </g>
                  ))}
                </svg>
              </div>
              <div className="shrink-0 px-8 pb-8 pt-2">
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-black/30">AI-powered</span>
                <h3 className="text-xl font-normal leading-snug tracking-tight text-[#122023]">Model every decarbonisation path</h3>
              </div>
            </div>

            {/* ── Card C — compliance: isometric ring on lime bg ── */}
            <div className="col-span-12 flex flex-col justify-between overflow-hidden rounded-3xl bg-[#e1fcad] p-8 md:col-span-3">
              <div className="flex flex-1 items-center justify-center">
                <svg viewBox="0 0 150 150" fill="none" className="w-32 h-32">
                  {/* outer decorative ring */}
                  <circle cx="75" cy="75" r="68" stroke="#122023" strokeOpacity="0.07" strokeWidth="1" fill="none" />
                  {/* track */}
                  <circle cx="75" cy="75" r="54" stroke="#122023" strokeOpacity="0.12" strokeWidth="10" fill="none" />
                  {/* 98% progress — circumference = 2π×54 ≈ 339.3, 98% = 332.5 */}
                  <circle cx="75" cy="75" r="54" stroke="#122023" strokeOpacity="0.6" strokeWidth="10" fill="none"
                    strokeDasharray="332.5 339.3" strokeDashoffset="84.8" strokeLinecap="round" />
                  {/* center */}
                  <text x="75" y="70" textAnchor="middle" fontSize="26" fontWeight="700" fill="#122023" fontFamily="system-ui">98%</text>
                  <text x="75" y="88" textAnchor="middle" fontSize="9" fontWeight="600" fill="#122023" fillOpacity="0.45"
                    fontFamily="system-ui" letterSpacing="0.12em">COMPLIANT</text>
                </svg>
              </div>
              <div>
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-[#122023]/35">Compliance</span>
                <h3 className="text-xl font-normal leading-snug tracking-tight text-[#122023]">Audit-ready from day one</h3>
              </div>
            </div>

            {/* ── Card D — integrations: isometric hub cubes ── */}
            <div className="col-span-12 flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-[#f7f7f5] md:col-span-4">
              <div className="flex flex-1 items-center justify-center">
                <svg viewBox="0 0 260 180" fill="none" className="w-[88%] h-[88%]">
                  {/* 4 satellite cubes — small */}
                  {[
                    { cx: 42,  cy: 22,  w: 22, h: 14, label: "SAP" },
                    { cx: 218, cy: 22,  w: 22, h: 14, label: "Oracle" },
                    { cx: 42,  cy: 104, w: 22, h: 14, label: "Meters" },
                    { cx: 218, cy: 104, w: 22, h: 14, label: "Grid" },
                  ].map((s) => (
                    <g key={s.label}>
                      <path d={isoTop(s.cx, s.cy, s.w)}       fill="white" stroke="#122023" strokeOpacity="0.22" strokeWidth="1.2" />
                      <path d={isoRight(s.cx, s.cy, s.w, s.h)} fill="rgba(18,32,35,0.04)" stroke="#122023" strokeOpacity="0.14" strokeWidth="1.2" />
                      <path d={isoLeft(s.cx, s.cy, s.w, s.h)}  fill="rgba(18,32,35,0.025)" stroke="#122023" strokeOpacity="0.1" strokeWidth="1.2" />
                      <text x={s.cx} y={s.cy + s.w + s.h + 14} textAnchor="middle" fontSize="8.5"
                        fill="#122023" fillOpacity="0.4" fontFamily="system-ui" fontWeight="600">{s.label}</text>
                    </g>
                  ))}
                  {/* dashed connector lines from satellites to center */}
                  {[
                    { x1: 42+22, y1: 22+11+7, x2: 130-36, y2: 52+18+7 },
                    { x1: 218+22, y1: 22+11+7, x2: 130+36, y2: 52+18+7 },
                    { x1: 42+22, y1: 104+11+7, x2: 130-36, y2: 52+18+7 },
                    { x1: 218+22, y1: 104+11+7, x2: 130+36, y2: 52+18+7 },
                  ].map((l, i) => (
                    <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                      stroke="#122023" strokeOpacity="0.15" strokeWidth="1.2" strokeDasharray="4 3" />
                  ))}
                  {/* center hub cube — lime top */}
                  <path d={isoTop(130, 52, 36)}       fill="#e1fcad" stroke="#122023" strokeOpacity="0.55" strokeWidth="1.4" />
                  <path d={isoRight(130, 52, 36, 22)} fill="#b3d168" stroke="#122023" strokeOpacity="0.45" strokeWidth="1.4" />
                  <path d={isoLeft(130, 52, 36, 22)}  fill="#8aad4e" stroke="#122023" strokeOpacity="0.35" strokeWidth="1.4" />
                  {/* V mark on top face */}
                  <path d="M123 68 L130 76 L137 68" stroke="#122023" strokeOpacity="0.55" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div className="shrink-0 px-8 pb-8 pt-0">
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-black/30">Integrations</span>
                <h3 className="text-xl font-normal leading-snug tracking-tight text-[#122023]">Works with your existing stack</h3>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ── Feature Detail 3 — Automated Reporting ────────────────────────────────────
function FeatureDetail3() {
  return (
    <section className={`bg-white ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="mb-4 block text-sm font-bold uppercase tracking-[0.18em] text-black/40">Automated Reporting</span>
              <h2 className="mb-5 font-normal leading-[1.08] tracking-[-0.03em]">
                Reports your board will actually read
              </h2>
              <p className="mb-8 max-w-md text-base leading-relaxed text-black/50">
                Generate TCFD, GRI, and CDP-aligned reports in one click. Verdant formats, annotates, and benchmarks your progress so every stakeholder gets the right view.
              </p>
              <ul className="mb-10 space-y-3">
                {["TCFD, GRI, CDP & CSRD frameworks built-in","Peer benchmarking against 340+ industry datasets","Board-ready PDF and Slides export","Auditor-ready data trails and source links"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-black/60">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#122023]" />
                    {item}
                  </li>
                ))}
              </ul>
              <GhostCTA label="View reporting features" />
            </div>

            {/* Enhanced mockup */}
            <div className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-[#f7f7f5] p-6">
              <div className="pointer-events-none absolute -left-8 -bottom-8 h-36 w-36 rounded-full bg-[#122023]/5 blur-3xl" />
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-base font-bold uppercase tracking-widest text-black/30">TCFD Report 2025</p>
                  <p className="mt-0.5 text-sm font-semibold text-black">Meridian Group</p>
                </div>
                <div className="flex gap-2">
                  {["GRI","CDP","TCFD"].map((tag) => (
                    <span key={tag} className="rounded-full bg-[#122023] px-2.5 py-1 text-base font-bold uppercase tracking-widest text-[#e1fcad]">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { title: "Governance",       score: 92, status: "Complete" },
                  { title: "Strategy",          score: 87, status: "Complete" },
                  { title: "Risk Management",   score: 78, status: "In review" },
                  { title: "Metrics & Targets", score: 95, status: "Complete" },
                ].map((section) => (
                  <div key={section.title} className="flex items-center gap-4 rounded-xl bg-white p-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">{section.title}</p>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
                        <div className="h-full rounded-full bg-[#122023]" style={{ width: `${section.score}%` }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#122023]">{section.score}%</p>
                      <p className={`text-base font-medium ${section.status === "Complete" ? "text-emerald-600" : "text-amber-600"}`}>
                        {section.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Mini sparkline bar at bottom */}
              <div className="mt-4 rounded-xl bg-white p-4">
                <p className="mb-3 text-base font-bold uppercase tracking-widest text-black/30">Reporting velocity</p>
                <div className="flex items-end gap-1">
                  {[22,35,28,45,38,55,42,62,50,70,58,78].map((h,i) => (
                    <div key={i} className={`flex-1 rounded-sm ${i===11?"bg-[#122023]":"bg-[#122023]/10"}`} style={{height:`${h*0.5}px`}} />
                  ))}
                </div>
                <p className="mt-2 text-base text-black/40">Reports generated this year — <span className="font-semibold text-black">↑ 3.5×</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Platform Architecture Diagram ─────────────────────────────────────────────
function PlatformDiagram() {
  const IW = 50, IH = 38;
  const HCX = 450, HCY = 108, HW = 88, HH = 68;
  const SCX = 735, SW = 60, SH = 13, SN = 8;
  const SSY = 101;

  const hubLX = HCX - HW;
  const hubLY = HCY + HW*0.5 + HH*0.5;
  const hubRX = HCX + HW;
  const hubRY = hubLY;

  const INPUT_CUBES = [
    { cx: 155, cy: 68,  label: "Energy Meters" },
    { cx: 155, cy: 198, label: "Supply Chain"  },
    { cx: 155, cy: 328, label: "Finance Data"  },
  ];

  const stackColors = [
    { top: "#e1fcad", r: "#b3d168", l: "#8aad4e" },
    { top: "#2a4a50", r: "#1d3035", l: "#122023" },
    { top: "#233f44", r: "#1a3038", l: "#102028" },
    { top: "#2a4a50", r: "#1d3035", l: "#122023" },
    { top: "#233f44", r: "#1a3038", l: "#102028" },
    { top: "#2a4a50", r: "#1d3035", l: "#122023" },
    { top: "#233f44", r: "#1a3038", l: "#102028" },
    { top: "#1a3238", r: "#122023", l: "#0d1a1c" },
  ];

  return (
    <section className={`bg-[#f7f7f5] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <SectionHeader
            label="Platform architecture"
            heading="Every layer, working as one"
            sub="From raw data inputs to board-ready outputs — Verdant connects, analyses, and delivers your entire sustainability operation through one intelligent system."
          />
          <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-6 lg:p-12">
            <svg viewBox="0 0 900 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ maxHeight: 420 }}>
              {Array.from({ length: 12 }, (_, col) =>
                Array.from({ length: 8 }, (_, row) => (
                  <circle key={`d-${col}-${row}`} cx={40 + col * 76} cy={28 + row * 56} r="1.5" fill="#122023" opacity="0.06" />
                ))
              )}
              <text x="155" y="26" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#122023" opacity="0.3" letterSpacing="0.14em" fontFamily="system-ui,sans-serif">DATA INPUTS</text>
              <text x="450" y="60" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#122023" opacity="0.3" letterSpacing="0.14em" fontFamily="system-ui,sans-serif">PLATFORM CORE</text>
              <text x={SCX} y="60" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#122023" opacity="0.3" letterSpacing="0.14em" fontFamily="system-ui,sans-serif">OUTPUTS</text>
              <line x1={hubRX} y1={hubRY} x2={SCX - SW} y2={SSY + SW*0.5 + (SN*SH)*0.5} stroke="#122023" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="5 5" />
              {INPUT_CUBES.map((c, i) => (
                <line key={`l-${i}`} x1={c.cx + IW} y1={c.cy + IW*0.5 + IH*0.5} x2={hubLX} y2={hubLY} stroke="#122023" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="5 5" />
              ))}
              {INPUT_CUBES.map((c, i) => (
                <circle key={`dot-${i}`} cx={c.cx + IW} cy={c.cy + IW*0.5 + IH*0.5} r="4" fill="#122023" opacity="0.22" />
              ))}
              <circle cx={hubLX} cy={hubLY} r="5.5" fill="#e1fcad" opacity="0.85" />
              <circle cx={hubRX} cy={hubRY} r="5.5" fill="#e1fcad" opacity="0.85" />
              <circle cx={SCX - SW} cy={SSY + SW*0.5 + (SN*SH)*0.5} r="4" fill="#122023" opacity="0.22" />
              {INPUT_CUBES.map((c) => (
                <g key={c.label}>
                  <path d={isoTop(c.cx, c.cy, IW)}       stroke="#122023" strokeOpacity="0.22" strokeWidth="1.2" fill="rgba(18,32,35,0.035)" />
                  <path d={isoRight(c.cx, c.cy, IW, IH)} stroke="#122023" strokeOpacity="0.14" strokeWidth="1.2" fill="rgba(18,32,35,0.02)" />
                  <path d={isoLeft(c.cx, c.cy, IW, IH)}  stroke="#122023" strokeOpacity="0.09" strokeWidth="1.2" fill="rgba(18,32,35,0.012)" />
                  <text x={c.cx} y={c.cy + IW + IH + 18} textAnchor="middle" fontSize="16" fill="#122023" opacity="0.42" fontFamily="system-ui,sans-serif">{c.label}</text>
                </g>
              ))}
              <path d={isoLeft(HCX, HCY, HW, HH)}  fill="#8aad4e" />
              <path d={isoRight(HCX, HCY, HW, HH)} fill="#b3d168" />
              <path d={isoTop(HCX, HCY, HW)}        fill="#e1fcad" />
              <path d="M450,126 C464,132 467,150 450,157 C433,150 436,132 450,126 Z" fill="#122023" opacity="0.4" />
              <text x={HCX} y={HCY + HW + HH + 18} textAnchor="middle" fontSize="16" fontWeight="600" fill="#122023" opacity="0.65" fontFamily="system-ui,sans-serif">Verdant Core</text>
              {Array.from({ length: SN }, (_, i) => SN - 1 - i).map((i) => {
                const cy = SSY + i * SH;
                const c  = stackColors[i];
                return (
                  <g key={`sl-${i}`}>
                    <path d={isoLeft(SCX, cy, SW, SH)}  fill={c.l} />
                    <path d={isoRight(SCX, cy, SW, SH)} fill={c.r} />
                    <path d={isoTop(SCX, cy, SW)}        fill={c.top} />
                  </g>
                );
              })}
              <text x={SCX} y={SSY + SW + SN*SH + 18} textAnchor="middle" fontSize="16" fontWeight="600" fill="#122023" opacity="0.65" fontFamily="system-ui,sans-serif">Unified Outputs</text>
            </svg>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              { num: "01", title: "Data Inputs",     desc: "Carbon meters, energy APIs, supply chain feeds — ingested automatically with zero manual effort." },
              { num: "02", title: "Verdant Core",    desc: "AI engine that normalises, analyses, and turns fragmented signals into actionable sustainability intelligence." },
              { num: "03", title: "Unified Outputs", desc: "Dashboards, reports, alerts, and roadmaps — structured and delivered for every stakeholder from ops to board." },
            ].map((item) => (
              <div key={item.num} className="flex flex-col gap-3 rounded-2xl border border-black/[0.06] bg-[#f7f7f5] p-6">
                <span className="font-mono text-base font-bold tracking-widest text-black/25">{item.num}</span>
                <h4 className="text-base font-semibold tracking-tight">{item.title}</h4>
                <p className="text-sm leading-relaxed text-black/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Social Proof ──────────────────────────────────────────────────────────────
const STATS = [
  { value: "2.4M",  unit: "tonnes",   label: "CO₂ avoided annually" },
  { value: "340+",  unit: "projects", label: "Deployed across 42 countries" },
  { value: "$8.2B", unit: "invested", label: "In clean energy assets" },
  { value: "15K+",  unit: "teams",    label: "Making the transition" },
];

function SocialProof() {
  return (
    <section className={`bg-[#122023] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <SectionHeader label="Our impact" heading="The numbers behind the mission" light />
          <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.value} className="flex flex-col gap-3 bg-[#122023] p-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-normal leading-none tracking-[-0.04em] text-[#e1fcad] md:text-[56px]">{s.value}</span>
                  <span className="text-base font-medium uppercase tracking-widest text-white/30">{s.unit}</span>
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

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Verdant replaced four tools and three consultants. Our sustainability team is now a product team — running on data, not guesswork.",
    name: "Sarah Chen", role: "Chief Sustainability Officer, Meridian Group", img: "https://i.pravatar.cc/64?img=47",
  },
  {
    quote: "The roadmap Verdant generated cut our time-to-strategy from 6 months to 3 weeks. The board adopted it without a single revision.",
    name: "James Okafor", role: "CEO, Harborview Infrastructure", img: "https://i.pravatar.cc/64?img=12",
  },
  {
    quote: "TCFD reporting used to take my team two months. Verdant does it in a day and it&apos;s better than anything we built manually.",
    name: "Elena Vasquez", role: "Head of ESG, Coastal Energy Co-op", img: "https://i.pravatar.cc/64?img=23",
  },
];

function Testimonials() {
  return (
    <section className={`bg-[#f7f7f5] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <SectionHeader label="Customers" heading="Heard from teams running it" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex flex-col gap-6 rounded-2xl border border-black/[0.06] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                <span className="select-none font-serif text-6xl leading-[0.75] text-black/10">&ldquo;</span>
                <p className="flex-1 text-base leading-[1.7] text-black/65">{t.quote}</p>
                <div className="flex items-center gap-3 border-t border-black/[0.08] pt-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.img} alt={t.name} className="size-10 shrink-0 rounded-full object-cover ring-2 ring-[#e1fcad] ring-offset-2" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-black">{t.name}</p>
                    <p className="truncate text-base text-black/40">{t.role}</p>
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProductPage() {
  return (
    <main className="w-full">
      <Navbar />
      <ProductHero />
      <TrustedBy />
      <Capabilities />
      <PlatformDiagram />
      <FeatureDetail1 />
      <FeatureDetail2 />
      <BentoFeatures />
      <FeatureDetail3 />
      <SocialProof />
      <Testimonials />
      <Footer />
    </main>
  );
}
