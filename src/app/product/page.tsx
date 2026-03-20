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
const HDR = "mb-12";

// ── Isometric cube SVG path helpers ──────────────────────────────────────────
const isoTop   = (cx: number, cy: number, w: number) =>
  `M${cx},${cy} L${cx+w},${cy+w*0.5} L${cx},${cy+w} L${cx-w},${cy+w*0.5} Z`;
const isoRight = (cx: number, cy: number, w: number, h: number) =>
  `M${cx+w},${cy+w*0.5} L${cx+w},${cy+w*0.5+h} L${cx},${cy+w+h} L${cx},${cy+w} Z`;
const isoLeft  = (cx: number, cy: number, w: number, h: number) =>
  `M${cx-w},${cy+w*0.5} L${cx},${cy+w} L${cx},${cy+w+h} L${cx-w},${cy+w*0.5+h} Z`;

// ── Shared: Section header ───────────────────────────────────────────────────
function SectionHeader({
  label,
  heading,
  sub,
  light = false,
  center = false,
}: {
  label: string;
  heading: string;
  sub?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? "flex flex-col items-center text-center" : ""}`}>
      <span className={`mb-3 block text-sm font-bold uppercase tracking-[0.18em] ${light ? "text-[#e1fcad]/50" : "text-black/40"}`}>
        {label}
      </span>
      <h2 className={`text-4xl font-normal leading-[1.08] tracking-[-0.03em] md:text-5xl ${center ? "max-w-2xl" : ""} ${light ? "text-white" : "text-black"}`}>
        {heading}
      </h2>
      {sub && (
        <p className={`mt-5 text-base leading-relaxed ${center ? "max-w-xl" : "max-w-xl"} ${light ? "text-white/45" : "text-black/50"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

// PrimaryCTA, SecondaryCTA, GhostCTA imported from @/components/ui/cta

// ── Trusted By ───────────────────────────────────────────────────────────────
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

// ── Product Hero ──────────────────────────────────────────────────────────────
function ProductHero() {
  return (
    <section className="relative overflow-hidden bg-[#122023] pt-36 pb-24">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(225,252,173,0.08),transparent)]" />

      <div className={`relative ${G}`}>
        <div className={COL}>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left: copy */}
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
              <p className="mt-5 text-xs text-white/25">No credit card required. 14-day free trial.</p>
            </div>

            {/* Right: product mockup */}
            <div className="relative">
              <div className="rounded-2xl border border-white/[0.06] bg-[#0d1a1c] p-6 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                {/* Mockup header */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-full bg-[#e1fcad]">
                      <Leaf className="h-3.5 w-3.5 text-[#122023]" />
                    </div>
                    <span className="text-sm font-semibold text-white">Carbon Overview</span>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-[#e1fcad]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#e1fcad]/70">
                    <span className="size-1.5 rounded-full bg-[#e1fcad] inline-block" />
                    Live
                  </span>
                </div>

                {/* Big stat */}
                <div className="mb-5 rounded-xl bg-white/[0.03] p-5">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-white/30">
                    Total Scope 1–3 Emissions
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-normal tracking-[-0.04em] text-[#e1fcad]">−23.4%</span>
                    <span className="text-sm text-white/30">vs last year</span>
                  </div>
                </div>

                {/* Mini bar chart */}
                <div className="mb-5 flex items-end gap-1.5 rounded-xl bg-white/[0.03] p-5">
                  {[40, 65, 55, 78, 50, 88, 62, 94, 70, 82, 58, 45].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm ${i === 11 ? "bg-[#e1fcad]" : "bg-white/[0.08]"}`}
                      style={{ height: `${h * 0.6}px` }}
                    />
                  ))}
                </div>

                {/* Scope breakdown */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { scope: "Scope 1", val: "−18%", color: "bg-[#e1fcad]" },
                    { scope: "Scope 2", val: "−31%", color: "bg-[#e1fcad]/60" },
                    { scope: "Scope 3", val: "−14%", color: "bg-[#e1fcad]/30" },
                  ].map((s) => (
                    <div key={s.scope} className="rounded-lg bg-white/[0.04] p-3">
                      <div className={`mb-2 h-1 w-full rounded-full ${s.color}`} />
                      <p className="text-[10px] text-white/30">{s.scope}</p>
                      <p className="text-sm font-semibold text-white">{s.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating alert card */}
              <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-white/[0.06] bg-[#122023] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.4)] lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e1fcad]/15">
                    <TrendingDown className="h-4 w-4 text-[#e1fcad]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-white">Target on track</p>
                    <p className="text-[10px] text-white/40">Net-zero by 2030</p>
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

// ── Capabilities ──────────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    icon: <PlugZap className="h-5 w-5" />,
    title: "Carbon Intelligence",
    desc: "Real-time Scope 1–3 tracking with anomaly detection and automated alerts when emissions deviate from your plan.",
  },
  {
    icon: <BrainCircuit className="h-5 w-5" />,
    title: "AI Strategy Engine",
    desc: "Tell Verdant your net-zero target. It builds the roadmap — financially modelled, scenario-tested, stakeholder-ready.",
  },
  {
    icon: <FileBarChart2 className="h-5 w-5" />,
    title: "Automated Reporting",
    desc: "One-click TCFD, GRI, and CDP-aligned reports. Formatted, annotated, and benchmarked against industry peers.",
  },
  {
    icon: <Users2 className="h-5 w-5" />,
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c, i) => (
              <div
                key={c.title}
                className="group flex flex-col gap-5 rounded-2xl border border-black/[0.06] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#122023] text-[#e1fcad]">
                  {c.icon}
                </div>
                <div>
                  <h3 className="mb-2 text-base font-semibold tracking-tight">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-black/50">{c.desc}</p>
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

// ── Feature Details ───────────────────────────────────────────────────────────
function FeatureDetail1() {
  return (
    <section className={`bg-white ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <div>
              <span className="mb-4 block text-sm font-bold uppercase tracking-[0.18em] text-black/40">
                Carbon Intelligence
              </span>
              <h2 className="mb-5 text-4xl font-normal leading-[1.08] tracking-[-0.03em] md:text-5xl">
                See every emission, everywhere it happens
              </h2>
              <p className="mb-8 max-w-md text-base leading-relaxed text-black/50">
                Verdant monitors your entire carbon footprint in real time — from factory floor to supply chain. When something&apos;s off, you know before your next board meeting.
              </p>
              <ul className="mb-10 space-y-3">
                {[
                  "Scope 1, 2 & 3 tracked automatically",
                  "Anomaly alerts with root-cause analysis",
                  "Supply chain emission attribution",
                  "Benchmark against industry peers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-black/60">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#122023]" />
                    {item}
                  </li>
                ))}
              </ul>
              <GhostCTA label="Explore Carbon Intelligence" />
            </div>

            {/* Visual mockup */}
            <div className="rounded-2xl border border-black/[0.06] bg-[#f7f7f5] p-6">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/30">
                Supply Chain Emissions Map
              </p>
              <div className="space-y-3">
                {[
                  { label: "Manufacturing — Tier 1", pct: 72, badge: "High" },
                  { label: "Logistics & Freight",     pct: 38, badge: "Medium" },
                  { label: "Office & Travel",          pct: 14, badge: "Low" },
                  { label: "Purchased Goods",          pct: 55, badge: "Medium" },
                ].map((row) => (
                  <div key={row.label} className="rounded-xl bg-white p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-black/60">{row.label}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                        row.badge === "High" ? "bg-red-50 text-red-500" :
                        row.badge === "Medium" ? "bg-amber-50 text-amber-600" :
                        "bg-emerald-50 text-emerald-600"
                      }`}>{row.badge}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
                      <div
                        className="h-full rounded-full bg-[#122023]"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureDetail2() {
  return (
    <section className={`bg-[#f7f7f5] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Visual mockup — left side */}
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl border border-white/[0.06] bg-[#122023] p-6">
                <p className="mb-5 text-[11px] font-bold uppercase tracking-widest text-white/30">
                  AI Roadmap Builder
                </p>
                {/* Chat-like interface */}
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
                      Based on your current trajectory, here&apos;s your fastest path to net-zero in 3 phases:
                    </div>
                  </div>
                </div>
                {/* Phase cards */}
                <div className="space-y-2">
                  {[
                    { phase: "Phase 1", title: "Switch to renewables", year: "2025", impact: "−38%" },
                    { phase: "Phase 2", title: "Supply chain audit",   year: "2027", impact: "−29%" },
                    { phase: "Phase 3", title: "Offset & certify",     year: "2030", impact: "Net-zero" },
                  ].map((p) => (
                    <div key={p.phase} className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#e1fcad]/50">{p.phase}</span>
                        <span className="text-sm text-white/70">{p.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/30">{p.year}</span>
                        <span className="rounded-full bg-[#e1fcad]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#e1fcad]">{p.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Text — right side */}
            <div className="order-1 lg:order-2">
              <span className="mb-4 block text-sm font-bold uppercase tracking-[0.18em] text-black/40">
                AI Strategy Engine
              </span>
              <h2 className="mb-5 text-4xl font-normal leading-[1.08] tracking-[-0.03em] md:text-5xl">
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

function FeatureDetail3() {
  return (
    <section className={`bg-white ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <div>
              <span className="mb-4 block text-sm font-bold uppercase tracking-[0.18em] text-black/40">
                Automated Reporting
              </span>
              <h2 className="mb-5 text-4xl font-normal leading-[1.08] tracking-[-0.03em] md:text-5xl">
                Reports your board will actually read
              </h2>
              <p className="mb-8 max-w-md text-base leading-relaxed text-black/50">
                Generate TCFD, GRI, and CDP-aligned reports in one click. Verdant formats, annotates, and benchmarks your progress so every stakeholder gets the right view.
              </p>
              <ul className="mb-10 space-y-3">
                {[
                  "TCFD, GRI, CDP & CSRD frameworks built-in",
                  "Peer benchmarking against 340+ industry datasets",
                  "Board-ready PDF and Slides export",
                  "Auditor-ready data trails and source links",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-black/60">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#122023]" />
                    {item}
                  </li>
                ))}
              </ul>
              <GhostCTA label="View reporting features" />
            </div>

            {/* Visual mockup */}
            <div className="rounded-2xl border border-black/[0.06] bg-[#f7f7f5] p-6">
              {/* Report header */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-black/30">TCFD Report 2025</p>
                  <p className="mt-0.5 text-sm font-semibold text-black">Meridian Group</p>
                </div>
                <div className="flex gap-2">
                  {["GRI", "CDP", "TCFD"].map((tag) => (
                    <span key={tag} className="rounded-full bg-[#122023] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#e1fcad]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Report sections */}
              <div className="space-y-3">
                {[
                  { title: "Governance",           score: 92, status: "Complete" },
                  { title: "Strategy",              score: 87, status: "Complete" },
                  { title: "Risk Management",       score: 78, status: "In review" },
                  { title: "Metrics & Targets",     score: 95, status: "Complete" },
                ].map((section) => (
                  <div key={section.title} className="flex items-center gap-4 rounded-xl bg-white p-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">{section.title}</p>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-black/[0.06]">
                        <div
                          className="h-full rounded-full bg-[#122023]"
                          style={{ width: `${section.score}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#122023]">{section.score}%</p>
                      <p className={`text-[10px] font-medium ${section.status === "Complete" ? "text-emerald-600" : "text-amber-600"}`}>
                        {section.status}
                      </p>
                    </div>
                  </div>
                ))}
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
  const IW = 50, IH = 38; // input cube half-width / face height
  const HCX = 450, HCY = 108, HW = 88, HH = 68; // hub cube
  const SCX = 735, SW = 60, SH = 13, SN = 8; // stack params
  const SSY = 101; // stack start cy — centers stack at ~183px matching hub

  const hubLX = HCX - HW;          // 362
  const hubLY = HCY + HW*0.5 + HH*0.5; // 183
  const hubRX = HCX + HW;          // 538
  const hubRY = hubLY;              // 183

  const INPUT_CUBES = [
    { cx: 155, cy: 68,  label: "Energy Meters" },
    { cx: 155, cy: 198, label: "Supply Chain"  },
    { cx: 155, cy: 328, label: "Finance Data"  },
  ];

  const stackColors = [
    { top: "#e1fcad", r: "#b3d168", l: "#8aad4e" }, // top layer — lime
    { top: "#2a4a50", r: "#1d3035", l: "#122023" },
    { top: "#233f44", r: "#1a3038", l: "#102028" },
    { top: "#2a4a50", r: "#1d3035", l: "#122023" },
    { top: "#233f44", r: "#1a3038", l: "#102028" },
    { top: "#2a4a50", r: "#1d3035", l: "#122023" },
    { top: "#233f44", r: "#1a3038", l: "#102028" },
    { top: "#1a3238", r: "#122023", l: "#0d1a1c" }, // bottom
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

              {/* ── subtle dot grid ── */}
              {Array.from({ length: 12 }, (_, col) =>
                Array.from({ length: 8 }, (_, row) => (
                  <circle key={`d-${col}-${row}`} cx={40 + col * 76} cy={28 + row * 56} r="1.5" fill="#122023" opacity="0.06" />
                ))
              )}

              {/* ── column header labels ── */}
              <text x="155" y="26" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#122023" opacity="0.3" letterSpacing="0.14em" fontFamily="system-ui,sans-serif">DATA INPUTS</text>
              <text x="450" y="60" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#122023" opacity="0.3" letterSpacing="0.14em" fontFamily="system-ui,sans-serif">PLATFORM CORE</text>
              <text x={SCX} y="60" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#122023" opacity="0.3" letterSpacing="0.14em" fontFamily="system-ui,sans-serif">OUTPUTS</text>

              {/* ── dashed connector: hub → stack ── */}
              <line x1={hubRX} y1={hubRY} x2={SCX - SW} y2={SSY + SW*0.5 + (SN*SH)*0.5} stroke="#122023" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="5 5" />

              {/* ── dashed connectors: input cubes → hub ── */}
              {INPUT_CUBES.map((c, i) => (
                <line key={`l-${i}`}
                  x1={c.cx + IW} y1={c.cy + IW*0.5 + IH*0.5}
                  x2={hubLX}     y2={hubLY}
                  stroke="#122023" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="5 5"
                />
              ))}

              {/* ── connection dots ── */}
              {INPUT_CUBES.map((c, i) => (
                <circle key={`dot-${i}`} cx={c.cx + IW} cy={c.cy + IW*0.5 + IH*0.5} r="4" fill="#122023" opacity="0.22" />
              ))}
              <circle cx={hubLX} cy={hubLY} r="5.5" fill="#e1fcad" opacity="0.85" />
              <circle cx={hubRX} cy={hubRY} r="5.5" fill="#e1fcad" opacity="0.85" />
              <circle cx={SCX - SW} cy={SSY + SW*0.5 + (SN*SH)*0.5} r="4" fill="#122023" opacity="0.22" />

              {/* ── input cubes (wireframe) ── */}
              {INPUT_CUBES.map((c) => (
                <g key={c.label}>
                  <path d={isoTop(c.cx, c.cy, IW)}     stroke="#122023" strokeOpacity="0.22" strokeWidth="1.2" fill="rgba(18,32,35,0.035)" />
                  <path d={isoRight(c.cx, c.cy, IW, IH)} stroke="#122023" strokeOpacity="0.14" strokeWidth="1.2" fill="rgba(18,32,35,0.02)" />
                  <path d={isoLeft(c.cx, c.cy, IW, IH)}  stroke="#122023" strokeOpacity="0.09" strokeWidth="1.2" fill="rgba(18,32,35,0.012)" />
                  <text x={c.cx} y={c.cy + IW + IH + 18} textAnchor="middle" fontSize="10" fill="#122023" opacity="0.42" fontFamily="system-ui,sans-serif">{c.label}</text>
                </g>
              ))}

              {/* ── main hub cube (solid — lime top, dark sides) ── */}
              <path d={isoLeft(HCX, HCY, HW, HH)}  fill="#8aad4e" />
              <path d={isoRight(HCX, HCY, HW, HH)} fill="#b3d168" />
              <path d={isoTop(HCX, HCY, HW)}        fill="#e1fcad" />
              {/* leaf silhouette on top face */}
              <path d="M450,126 C464,132 467,150 450,157 C433,150 436,132 450,126 Z" fill="#122023" opacity="0.4" />
              <text x={HCX} y={HCY + HW + HH + 18} textAnchor="middle" fontSize="12" fontWeight="600" fill="#122023" opacity="0.65" fontFamily="system-ui,sans-serif">Verdant Core</text>

              {/* ── output stack (bottom layer first so top renders over) ── */}
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
              <text x={SCX} y={SSY + SW + SN*SH + 18} textAnchor="middle" fontSize="12" fontWeight="600" fill="#122023" opacity="0.65" fontFamily="system-ui,sans-serif">Unified Outputs</text>

            </svg>
          </div>

          {/* 3-col legend */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              { num: "01", title: "Data Inputs",    desc: "Carbon meters, energy APIs, supply chain feeds — ingested automatically with zero manual effort." },
              { num: "02", title: "Verdant Core",   desc: "AI engine that normalises, analyses, and turns fragmented signals into actionable sustainability intelligence." },
              { num: "03", title: "Unified Outputs", desc: "Dashboards, reports, alerts, and roadmaps — structured and delivered for every stakeholder from ops to board." },
            ].map((item) => (
              <div key={item.num} className="flex flex-col gap-3 rounded-2xl border border-black/[0.06] bg-[#f7f7f5] p-6">
                <span className="font-mono text-[11px] font-bold tracking-widest text-black/25">{item.num}</span>
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

// ── Social Proof (Stats) ──────────────────────────────────────────────────────
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

// ── Testimonial strip ─────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Verdant replaced four tools and three consultants. Our sustainability team is now a product team — running on data, not guesswork.",
    name: "Sarah Chen",
    role: "Chief Sustainability Officer, Meridian Group",
    img: "https://i.pravatar.cc/64?img=47",
  },
  {
    quote: "The roadmap Verdant generated cut our time-to-strategy from 6 months to 3 weeks. The board adopted it without a single revision.",
    name: "James Okafor",
    role: "CEO, Harborview Infrastructure",
    img: "https://i.pravatar.cc/64?img=12",
  },
  {
    quote: "TCFD reporting used to take my team two months. Verdant does it in a day and it&apos;s better than anything we built manually.",
    name: "Elena Vasquez",
    role: "Head of ESG, Coastal Energy Co-op",
    img: "https://i.pravatar.cc/64?img=23",
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
              <div
                key={i}
                className="flex flex-col gap-6 rounded-2xl border border-black/[0.06] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              >
                <span className="select-none font-serif text-6xl leading-[0.75] text-black/10">&ldquo;</span>
                <p className="flex-1 text-[15px] leading-[1.7] text-black/65">{t.quote}</p>
                <div className="flex items-center gap-3 border-t border-black/[0.08] pt-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.img} alt={t.name} className="size-10 shrink-0 rounded-full object-cover ring-2 ring-[#e1fcad] ring-offset-2" />
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

// ProductCTA replaced by shared PreFooterBanner

// Footer imported from @/components/ui/footer

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
      <FeatureDetail3 />
      <SocialProof />
      <Testimonials />
      <Footer />
    </main>
  );
}
