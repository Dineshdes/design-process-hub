import Navbar from "@/components/ui/navbar";
import {
  Leaf,
  ChevronRight,
  BrainCircuit,
  FileBarChart2,
  Users2,
  PlugZap,
  CheckCircle2,
} from "lucide-react";
import { PrimaryCTA, SecondaryCTA, GhostCTA } from "@/components/ui/cta";
import Footer from "@/components/ui/footer";

// ── 12-col grid constants ────────────────────────────────────────────────────
const G   = "grid grid-cols-12";
const COL = "col-start-2 col-span-10";
const SEC = "py-[150px] min-h-[740px]";

// ── Grain noise texture overlay ───────────────────────────────────────────────
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

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

// ── Product Hero — full screen with image + grain ─────────────────────────────
function ProductHero() {
  return (
    <section className="relative flex h-screen min-h-[700px] w-full flex-col justify-end">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1618] via-[#0a1618]/60 to-[#122023]/25" />
      </div>

      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.35, mixBlendMode: "overlay" }}
      />

      {/* Content — pinned to bottom */}
      <div className={`relative z-10 w-full pb-24`}>
        <div className={G}>
          <div className={COL}>
            {/* Badge */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-7 items-center justify-center rounded-full bg-[#e1fcad]">
                <Leaf className="h-3.5 w-3.5 text-[#122023]" />
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#e1fcad]/70">Verdant Platform</span>
            </div>

            {/* Headline + right side */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <h1 className="max-w-3xl text-5xl font-normal leading-[1.04] tracking-[-0.03em] text-white md:text-6xl lg:text-[68px]">
                Every sustainability insight,{" "}
                <span className="text-[#e1fcad]">one intelligent platform</span>
              </h1>
              <div className="flex shrink-0 flex-col items-start gap-5 lg:items-end">
                <p className="max-w-xs text-base leading-relaxed text-white/45 lg:text-right">
                  From carbon tracking to board reporting, Verdant unifies your entire sustainability operation.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <PrimaryCTA label="Start free trial" href="/hero" />
                  <SecondaryCTA label="See how it works" href="#capabilities" dark />
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div className="mt-14 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-8">
              {[
                { val: "2.4M", unit: "tonnes", label: "CO₂ avoided annually" },
                { val: "340+", unit: "projects", label: "Across 42 countries" },
                { val: "15K+", unit: "teams",    label: "Making the transition" },
              ].map((s, i) => (
                <div key={i} className={`${i > 0 ? "pl-8" : ""} ${i < 2 ? "pr-8" : ""}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-normal tracking-[-0.03em] text-[#e1fcad]">{s.val}</span>
                    <span className="text-base uppercase tracking-widest text-white/30">{s.unit}</span>
                  </div>
                  <p className="mt-1 text-base text-white/40">{s.label}</p>
                </div>
              ))}
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
    <section className={`bg-[#0f1e22] ${SEC}`}>
      <div className={`${G}`}>
        <div className={COL}>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Text — on clean dark bg */}
            <div>
              <span className="mb-4 block text-sm font-bold uppercase tracking-[0.18em] text-[#e1fcad]/60">Carbon Intelligence</span>
              <h2 className="mb-5 font-normal leading-[1.08] tracking-[-0.03em] text-white">
                See every emission, everywhere it happens
              </h2>
              <p className="mb-8 max-w-md text-base leading-relaxed text-white/55">
                Verdant monitors your entire carbon footprint in real time — from factory floor to supply chain. When something&apos;s off, you know before your next board meeting.
              </p>
              <ul className="mb-10 space-y-3">
                {["Scope 1, 2 & 3 tracked automatically","Anomaly alerts with root-cause analysis","Supply chain emission attribution","Benchmark against industry peers"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-white/65">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#e1fcad]" />
                    {item}
                  </li>
                ))}
              </ul>
              <GhostCTA label="Explore Carbon Intelligence" />
            </div>

            {/* Image panel — grain + dark overlay, frosted chart floats on top */}
            <div className="relative overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0a1618]/68" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.55, mixBlendMode: "overlay" }}
              />
              {/* Frosted glass chart */}
              <div className="relative z-10 m-5 rounded-xl border border-white/60 bg-white/70 p-6 shadow-[0_8px_48px_rgba(0,0,0,0.18)] backdrop-blur-md">
              <p className="mb-0.5 font-mono text-sm font-semibold tracking-[0.14em] text-black/55">Emissions Trend</p>
              <p className="mb-4 text-base text-black/35">Scope 1 · 2 · 3 over 12 months</p>

              <svg viewBox="0 0 320 185" fill="none" className="w-full">
                {/* Horizontal grid lines */}
                {[30, 68, 106, 144].map((y) => (
                  <line key={y} x1="28" y1={y} x2="308" y2={y} stroke="#122023" strokeOpacity="0.07" strokeWidth="1" />
                ))}
                {/* Vertical grid lines */}
                {[28, 84, 140, 196, 252, 308].map((x) => (
                  <line key={x} x1={x} y1="18" x2={x} y2="158" stroke="#122023" strokeOpacity="0.07" strokeWidth="1" />
                ))}

                {/* Scope 1 — solid dark #122023 */}
                <path
                  d="M28,22 C55,24 72,38 84,48 C96,58 120,78 140,92 C160,106 180,116 196,122 C212,128 240,132 252,134 C264,136 290,136 308,137"
                  stroke="#122023" strokeWidth="1.8" strokeLinecap="round" fill="none"
                />

                {/* Scope 2 — dashed lime */}
                <path
                  d="M28,38 C55,42 72,58 84,68 C96,78 120,98 140,112 C160,124 180,132 196,138 C212,143 240,147 252,149 C264,151 290,152 308,153"
                  stroke="#4a7c59" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4" fill="none"
                />

                {/* Scope 3 — solid lighter gray */}
                <path
                  d="M28,55 C55,60 72,76 84,87 C96,98 120,116 140,128 C155,136 175,143 196,148 C212,152 240,156 252,157 C264,158 290,159 308,160"
                  stroke="#122023" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3" fill="none"
                />

                {/* X-axis month labels */}
                {[
                  { x: 28, l: "Jan" }, { x: 84, l: "Mar" }, { x: 140, l: "May" },
                  { x: 196, l: "Jul" }, { x: 252, l: "Sep" }, { x: 308, l: "Nov" },
                ].map((m) => (
                  <text key={m.l} x={m.x} y="172" textAnchor="middle" fontSize="9" fill="#122023" fillOpacity="0.35" fontFamily="ui-monospace,monospace" letterSpacing="0.06em">{m.l}</text>
                ))}

                {/* Legend */}
                <line x1="28" y1="183" x2="46" y2="183" stroke="#122023" strokeWidth="1.8" />
                <text x="50" y="186" fontSize="8.5" fill="#122023" fillOpacity="0.55" fontFamily="ui-monospace,monospace" letterSpacing="0.08em">Scope 1</text>
                <line x1="110" y1="183" x2="128" y2="183" stroke="#4a7c59" strokeWidth="1.5" strokeDasharray="5 3" />
                <text x="132" y="186" fontSize="8.5" fill="#122023" fillOpacity="0.55" fontFamily="ui-monospace,monospace" letterSpacing="0.08em">Scope 2</text>
                <line x1="194" y1="183" x2="212" y2="183" stroke="#122023" strokeWidth="1.5" strokeOpacity="0.3" />
                <text x="216" y="186" fontSize="8.5" fill="#122023" fillOpacity="0.55" fontFamily="ui-monospace,monospace" letterSpacing="0.08em">Scope 3</text>
              </svg>

              {/* Bottom stat strip */}
              <div className="mt-5 grid grid-cols-3 divide-x divide-black/10 border-t border-black/08 pt-5">
                {[
                  { val: "−23.4%", label: "Total reduction" },
                  { val: "Real-time", label: "Alert frequency" },
                  { val: "100%", label: "Supply chain" },
                ].map((s) => (
                  <div key={s.label} className="pr-4 first:pl-0 last:pr-0 [&:not(:first-child)]:pl-4">
                    <p className="text-sm font-semibold text-[#122023]">{s.val}</p>
                    <p className="text-base text-black/40">{s.label}</p>
                  </div>
                ))}
              </div>{/* end stat strip */}
              </div>{/* end frosted chart */}
            </div>{/* end image panel */}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Feature Detail 2 — AI Strategy Engine ─────────────────────────────────────
function FeatureDetail2() {
  return (
    <section className={`bg-[#0f1e22] ${SEC}`}>
      <div className={`${G}`}>
        <div className={COL}>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Image panel — grain + dark overlay, frosted chart floats on top */}
            <div className="relative order-2 overflow-hidden rounded-2xl lg:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1600&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0a1618]/68" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.55, mixBlendMode: "overlay" }}
              />
              {/* Frosted glass chart */}
              <div className="relative z-10 m-5 rounded-xl border border-white/60 bg-white/70 p-6 shadow-[0_8px_48px_rgba(0,0,0,0.18)] backdrop-blur-md">
              <p className="mb-0.5 font-mono text-sm font-semibold tracking-[0.14em] text-black/55">Net-Zero Pathways</p>
              <p className="mb-4 text-base text-black/35">Scenario comparison · 2024 – 2030</p>

              <svg viewBox="0 0 320 185" fill="none" className="w-full">
                {/* Grid */}
                {[30, 68, 106, 144].map((y) => (
                  <line key={y} x1="28" y1={y} x2="308" y2={y} stroke="#122023" strokeOpacity="0.07" strokeWidth="1" />
                ))}
                {[28, 76, 124, 172, 220, 268, 308].map((x) => (
                  <line key={x} x1={x} y1="18" x2={x} y2="158" stroke="#122023" strokeOpacity="0.07" strokeWidth="1" />
                ))}

                {/* Path A: Renewables — solid dark */}
                <path
                  d="M28,22 C60,28 80,48 100,68 C120,88 150,118 172,134 C194,148 230,155 268,158 C285,159 300,159 308,159"
                  stroke="#122023" strokeWidth="1.8" strokeLinecap="round" fill="none"
                />

                {/* Path B: Efficiency (selected) — lime solid */}
                <path
                  d="M28,22 C60,30 85,55 108,78 C132,102 160,128 180,142 C200,154 240,158 268,159 C285,159 300,159 308,159"
                  stroke="#4a7c59" strokeWidth="2" strokeLinecap="round" fill="none"
                />

                {/* Path C: Supply Chain — dashed */}
                <path
                  d="M28,22 C55,32 78,60 104,88 C128,114 155,136 180,147 C204,156 240,159 268,159 C285,159 300,159 308,159"
                  stroke="#122023" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4" strokeOpacity="0.45" fill="none"
                />

                {/* Path D: BAU (business as usual) — light dotted stays high */}
                <path
                  d="M28,22 C80,20 140,18 200,17 C250,17 285,18 308,18"
                  stroke="#122023" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 4" strokeOpacity="0.2" fill="none"
                />

                {/* Net-zero baseline */}
                <line x1="28" y1="159" x2="308" y2="159" stroke="#4a7c59" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 3" />
                <text x="310" y="162" fontSize="8" fill="#4a7c59" fillOpacity="0.6" fontFamily="ui-monospace,monospace">0</text>

                {/* X-axis labels */}
                {[
                  { x: 28, l: "2024" }, { x: 76, l: "2025" }, { x: 124, l: "2026" },
                  { x: 172, l: "2027" }, { x: 220, l: "2028" }, { x: 268, l: "2029" }, { x: 308, l: "2030" },
                ].map((m) => (
                  <text key={m.l} x={m.x} y="172" textAnchor="middle" fontSize="8.5" fill="#122023" fillOpacity="0.35" fontFamily="ui-monospace,monospace" letterSpacing="0.06em">{m.l}</text>
                ))}

                {/* Legend */}
                <line x1="28" y1="183" x2="46" y2="183" stroke="#122023" strokeWidth="1.8" />
                <text x="50" y="186" fontSize="8.5" fill="#122023" fillOpacity="0.55" fontFamily="ui-monospace,monospace" letterSpacing="0.08em">Renewables</text>
                <line x1="126" y1="183" x2="144" y2="183" stroke="#4a7c59" strokeWidth="2" />
                <text x="148" y="186" fontSize="8.5" fill="#122023" fillOpacity="0.55" fontFamily="ui-monospace,monospace" letterSpacing="0.08em">Efficiency ✓</text>
                <line x1="230" y1="183" x2="248" y2="183" stroke="#122023" strokeWidth="1.5" strokeDasharray="5 3" strokeOpacity="0.45" />
                <text x="252" y="186" fontSize="8.5" fill="#122023" fillOpacity="0.55" fontFamily="ui-monospace,monospace" letterSpacing="0.08em">Supply</text>
              </svg>

              {/* Bottom stat strip */}
              <div className="mt-5 grid grid-cols-3 divide-x divide-black/10 border-t border-black/08 pt-5">
                {[
                  { val: "3",     label: "Phases to zero" },
                  { val: "12",    label: "Levers modelled" },
                  { val: "Live",  label: "Auto-updated" },
                ].map((s) => (
                  <div key={s.label} className="pr-4 first:pl-0 last:pr-0 [&:not(:first-child)]:pl-4">
                    <p className="text-sm font-semibold text-[#122023]">{s.val}</p>
                    <p className="text-base text-black/40">{s.label}</p>
                  </div>
                ))}
              </div>{/* end stat strip */}
              </div>{/* end frosted chart */}
            </div>{/* end image panel */}

            {/* Text — right */}
            <div className="order-1 lg:order-2">
              <span className="mb-4 block text-sm font-bold uppercase tracking-[0.18em] text-[#e1fcad]/60">AI Strategy Engine</span>
              <h2 className="mb-5 font-normal leading-[1.08] tracking-[-0.03em] text-white">
                An AI strategist that never stops working
              </h2>
              <p className="mb-8 max-w-md text-base leading-relaxed text-white/55">
                Tell Verdant your net-zero target and it builds the roadmap — financially modelled, stakeholder-ready, and updated automatically as your operations change.
              </p>
              <ul className="mb-10 space-y-3">
                {[
                  "Scenario modelling across 12 decarbonisation levers",
                  "Financial projections and ROI for every initiative",
                  "Auto-updated when energy or policy data changes",
                  "Export board-ready strategy decks in one click",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-white/65">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#e1fcad]" />
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
  return (
    <section className="bg-[#f5f5f2] py-[150px]">
      <div className={G}>
        <div className={COL}>
          <SectionHeader
            label="How it works"
            heading="Every layer, intelligently connected"
            sub="Four modules operating in parallel — ingesting data, building strategy, ensuring compliance, and integrating seamlessly."
          />

          <div className="grid grid-cols-12 auto-rows-[300px] gap-4">

            {/* ── Card A — tall left: stacked scope layer slabs ── */}
            {/* cx=120 W=62 H=13  slab-cy: 22,109,196,283  total-h≈358 */}
            <div className="col-span-12 row-span-2 flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white md:col-span-5">
              <div className="flex flex-1 items-center justify-center py-8">
                <svg viewBox="0 0 275 385" fill="none" className="w-[88%] max-h-[320px]">

                  {/* Corner bracket marks around the slab stack  */}
                  {/* TL */}<path d="M68,22 L58,22 L58,34" stroke="#122023" strokeOpacity="0.14" strokeWidth="1.5" strokeLinecap="square" fill="none"/>
                  {/* TR */}<path d="M172,22 L182,22 L182,34" stroke="#122023" strokeOpacity="0.14" strokeWidth="1.5" strokeLinecap="square" fill="none"/>
                  {/* BL */}<path d="M68,358 L58,358 L58,346" stroke="#122023" strokeOpacity="0.14" strokeWidth="1.5" strokeLinecap="square" fill="none"/>
                  {/* BR */}<path d="M172,358 L182,358 L182,346" stroke="#122023" strokeOpacity="0.14" strokeWidth="1.5" strokeLinecap="square" fill="none"/>

                  {/* ── Slab 0: Scope 1 — lime (cy=22) ── */}
                  <path d="M58,53 L120,84 L120,97 L58,66 Z" fill="#8aad4e" stroke="#8aad4e" strokeOpacity="0.6" strokeWidth="1"/>
                  <path d="M182,53 L182,66 L120,97 L120,84 Z" fill="#b3d168" stroke="#b3d168" strokeOpacity="0.6" strokeWidth="1"/>
                  <path d="M120,22 L182,53 L120,84 L58,53 Z" fill="#e1fcad" stroke="#122023" strokeOpacity="0.35" strokeWidth="1.3"/>
                  {/* label pill — lime */}
                  <rect x="190" y="42" width="72" height="22" rx="11" fill="#e1fcad"/>
                  <text x="226" y="57.5" textAnchor="middle" fontSize="10" fill="#122023" fillOpacity="0.85" fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="0.05em">Scope 1</text>
                  {/* connector */}
                  <line x1="120" y1="97" x2="120" y2="109" stroke="#122023" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3"/>

                  {/* ── Slab 1: Scope 2 — warm gray (cy=109) ── */}
                  <path d="M58,140 L120,171 L120,184 L58,153 Z" fill="#d8d8d4" stroke="#d8d8d4" strokeOpacity="0.8" strokeWidth="0.8"/>
                  <path d="M182,140 L182,153 L120,184 L120,171 Z" fill="#e2e2de" stroke="#e2e2de" strokeOpacity="0.8" strokeWidth="0.8"/>
                  <path d="M120,109 L182,140 L120,171 L58,140 Z" fill="#ececea" stroke="#122023" strokeOpacity="0.2" strokeWidth="1.2"/>
                  <rect x="190" y="129" width="72" height="22" rx="11" fill="rgba(18,32,35,0.07)"/>
                  <text x="226" y="144.5" textAnchor="middle" fontSize="10" fill="#122023" fillOpacity="0.42" fontFamily="system-ui,sans-serif" fontWeight="500" letterSpacing="0.05em">Scope 2</text>
                  <line x1="120" y1="184" x2="120" y2="196" stroke="#122023" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 3"/>

                  {/* ── Slab 2: Scope 3 — warm gray (cy=196) ── */}
                  <path d="M58,227 L120,258 L120,271 L58,240 Z" fill="#d8d8d4" strokeOpacity="0" strokeWidth="0"/>
                  <path d="M182,227 L182,240 L120,271 L120,258 Z" fill="#e2e2de" strokeOpacity="0" strokeWidth="0"/>
                  <path d="M120,196 L182,227 L120,258 L58,227 Z" fill="#ececea" stroke="#122023" strokeOpacity="0.16" strokeWidth="1.2"/>
                  <rect x="190" y="216" width="72" height="22" rx="11" fill="rgba(18,32,35,0.06)"/>
                  <text x="226" y="231.5" textAnchor="middle" fontSize="10" fill="#122023" fillOpacity="0.36" fontFamily="system-ui,sans-serif" fontWeight="500" letterSpacing="0.05em">Scope 3</text>
                  <line x1="120" y1="271" x2="120" y2="283" stroke="#122023" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3"/>

                  {/* ── Slab 3: Supply — warm gray (cy=283) ── */}
                  <path d="M58,314 L120,345 L120,358 L58,327 Z" fill="#d8d8d4" strokeOpacity="0" strokeWidth="0"/>
                  <path d="M182,314 L182,327 L120,358 L120,345 Z" fill="#e2e2de" strokeOpacity="0" strokeWidth="0"/>
                  <path d="M120,283 L182,314 L120,345 L58,314 Z" fill="#ececea" stroke="#122023" strokeOpacity="0.13" strokeWidth="1.2"/>
                  <rect x="190" y="303" width="72" height="22" rx="11" fill="rgba(18,32,35,0.055)"/>
                  <text x="226" y="318.5" textAnchor="middle" fontSize="10" fill="#122023" fillOpacity="0.30" fontFamily="system-ui,sans-serif" fontWeight="500" letterSpacing="0.05em">Supply</text>
                </svg>
              </div>
              <div className="shrink-0 px-8 pb-9">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.18em] text-black/30">Live data</span>
                <h3 className="mb-2 text-[17px] font-semibold leading-snug tracking-tight text-[#122023]">Real-time ingestion from any source</h3>
                <p className="text-sm leading-relaxed text-black/45">Connect meters, APIs, and ERP systems. Carbon data flows in continuously — no manual exports.</p>
              </div>
            </div>

            {/* ── Card B — wide top right: branching pathway selector ── */}
            {/* Front card: x=50 y=24 w=268 h=162 | source: cx=96 cy=111 | rows y=68,111,154 | nodes x=195 */}
            <div className="col-span-12 flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-[#f5f5f2] md:col-span-7">
              <div className="flex flex-1 items-center justify-center px-6 pt-6">
                <svg viewBox="0 0 430 215" fill="none" className="w-full">

                  {/* ─ Stacked background cards ─ */}
                  <g transform="rotate(-9,184,112)">
                    <rect x="50" y="24" width="268" height="162" rx="12" fill="#e8e8e4" stroke="#122023" strokeOpacity="0.07" strokeWidth="1"/>
                  </g>
                  <g transform="rotate(-4.5,184,112)">
                    <rect x="50" y="24" width="268" height="162" rx="12" fill="#efefed" stroke="#122023" strokeOpacity="0.09" strokeWidth="1"/>
                  </g>

                  {/* ─ Front panel ─ */}
                  <rect x="50" y="24" width="268" height="162" rx="12" fill="white" stroke="#122023" strokeOpacity="0.13" strokeWidth="1.3"/>
                  {/* Corner brackets on front card */}
                  <path d="M62,24 L50,24 L50,36"   stroke="#122023" strokeOpacity="0.17" strokeWidth="1.3" strokeLinecap="square" fill="none"/>
                  <path d="M306,24 L318,24 L318,36" stroke="#122023" strokeOpacity="0.17" strokeWidth="1.3" strokeLinecap="square" fill="none"/>
                  <path d="M62,186 L50,186 L50,174"   stroke="#122023" strokeOpacity="0.17" strokeWidth="1.3" strokeLinecap="square" fill="none"/>
                  <path d="M306,186 L318,186 L318,174" stroke="#122023" strokeOpacity="0.17" strokeWidth="1.3" strokeLinecap="square" fill="none"/>

                  {/* ─ Source node ─ */}
                  <circle cx="96" cy="111" r="12" fill="#f0f0ed" stroke="#122023" strokeOpacity="0.22" strokeWidth="1.3"/>
                  <circle cx="96" cy="111" r="4.5" fill="#122023" fillOpacity="0.5"/>

                  {/* ─ 3 branches ─ */}
                  {/* Top row: Renewables -38% (inactive) */}
                  <path d="M108,111 C148,111 148,68 195,68" stroke="#122023" strokeOpacity="0.16" strokeWidth="1.2" fill="none"/>
                  <circle cx="195" cy="68" r="8" fill="rgba(18,32,35,0.06)" stroke="#122023" strokeOpacity="0.18" strokeWidth="1.2"/>
                  <text x="210" y="72.5" fontSize="10.5" fill="#122023" fillOpacity="0.32" fontFamily="system-ui,sans-serif" fontWeight="400">Renewables</text>
                  <text x="310" y="72.5" textAnchor="end" fontSize="10.5" fill="#122023" fillOpacity="0.22" fontFamily="system-ui,sans-serif" fontWeight="400">−38%</text>

                  {/* Mid row: Efficiency -22% (ACTIVE) */}
                  <path d="M108,111 C148,111 148,111 195,111" stroke="#122023" strokeOpacity="0.55" strokeWidth="1.8" fill="none"/>
                  <circle cx="195" cy="111" r="10" fill="#e1fcad" stroke="#122023" strokeOpacity="0.42" strokeWidth="1.3"/>
                  {/* checkmark */}
                  <path d="M190,111 l4,4.5 7.5-7.5" stroke="#122023" strokeOpacity="0.65" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <text x="212" y="115.5" fontSize="10.5" fill="#122023" fillOpacity="0.85" fontFamily="system-ui,sans-serif" fontWeight="700">Efficiency</text>
                  <text x="310" y="115.5" textAnchor="end" fontSize="10.5" fill="#122023" fillOpacity="0.75" fontFamily="system-ui,sans-serif" fontWeight="700">−22%</text>

                  {/* Bot row: Supply chain -18% (inactive) */}
                  <path d="M108,111 C148,111 148,154 195,154" stroke="#122023" strokeOpacity="0.16" strokeWidth="1.2" fill="none"/>
                  <circle cx="195" cy="154" r="8" fill="rgba(18,32,35,0.06)" stroke="#122023" strokeOpacity="0.18" strokeWidth="1.2"/>
                  <text x="210" y="158.5" fontSize="10.5" fill="#122023" fillOpacity="0.32" fontFamily="system-ui,sans-serif" fontWeight="400">Supply chain</text>
                  <text x="310" y="158.5" textAnchor="end" fontSize="10.5" fill="#122023" fillOpacity="0.22" fontFamily="system-ui,sans-serif" fontWeight="400">−18%</text>
                </svg>
              </div>
              <div className="shrink-0 px-8 pb-9 pt-2">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.18em] text-black/30">AI-powered</span>
                <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-[#122023]">Model every decarbonisation path</h3>
              </div>
            </div>

            {/* ── Card C — compliance ring · lime background ── */}
            {/* r=60 circ=376.99  98%=369.46  dashOffset=94.25 for 12-o'clock start */}
            <div className="col-span-12 flex flex-col justify-between overflow-hidden rounded-3xl bg-[#e1fcad] p-8 md:col-span-3">
              <div className="flex flex-1 items-center justify-center">
                <svg viewBox="0 0 180 180" fill="none" className="w-36 h-36">
                  {/* track */}
                  <circle cx="90" cy="90" r="60" stroke="#122023" strokeOpacity="0.1" strokeWidth="12" fill="none"/>
                  {/* 98% arc — starts at 12 o'clock */}
                  <circle cx="90" cy="90" r="60"
                    stroke="#122023" strokeOpacity="0.7" strokeWidth="12" fill="none"
                    strokeDasharray="369.46 376.99" strokeDashoffset="94.25"
                    strokeLinecap="round"/>
                  <text x="90" y="85" textAnchor="middle" fontSize="30" fontWeight="700"
                    fill="#122023" fontFamily="system-ui,sans-serif">98%</text>
                  <text x="90" y="105" textAnchor="middle" fontSize="9.5" fontWeight="600"
                    fill="#122023" fillOpacity="0.45" fontFamily="system-ui,sans-serif"
                    letterSpacing="0.14em">COMPLIANT</text>
                </svg>
              </div>
              <div>
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.18em] text-[#122023]/35">Compliance</span>
                <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-[#122023]">Audit-ready from day one</h3>
              </div>
            </div>

            {/* ── Card D — integration hub ── */}
            {/* Hub cx=140 cy=46 w=36 h=24 | Sats w=22 h=14 | TL(50,16) TR(230,16) BL(50,106) BR(230,106) */}
            {/* Connectors: TL(72,27)→(104,64)  TR(208,27)→(176,64)  BL(72,117)→(104,64)  BR(208,117)→(176,64) */}
            <div className="col-span-12 flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white md:col-span-4">
              <div className="flex flex-1 items-center justify-center pt-4">
                <svg viewBox="0 0 280 168" fill="none" className="w-[92%]">

                  {/* ─ Dashed connector lines (draw before cubes so cubes sit on top) ─ */}
                  <line x1="72"  y1="27"  x2="104" y2="64" stroke="#122023" strokeOpacity="0.16" strokeWidth="1.2" strokeDasharray="4 3"/>
                  <line x1="208" y1="27"  x2="176" y2="64" stroke="#122023" strokeOpacity="0.16" strokeWidth="1.2" strokeDasharray="4 3"/>
                  <line x1="72"  y1="117" x2="104" y2="64" stroke="#122023" strokeOpacity="0.16" strokeWidth="1.2" strokeDasharray="4 3"/>
                  <line x1="208" y1="117" x2="176" y2="64" stroke="#122023" strokeOpacity="0.16" strokeWidth="1.2" strokeDasharray="4 3"/>

                  {/* ─ Satellite cubes ─ */}
                  {/* TL (cx=50 cy=16) */}
                  <path d="M28,27 L50,38 L50,52 L28,41 Z"   fill="#e0e0dc" stroke="#122023" strokeOpacity="0.12" strokeWidth="1"/>
                  <path d="M72,27 L72,41 L50,52 L50,38 Z"   fill="#eaeae6" stroke="#122023" strokeOpacity="0.12" strokeWidth="1"/>
                  <path d="M50,16 L72,27 L50,38 L28,27 Z"   fill="#f2f2f0" stroke="#122023" strokeOpacity="0.22" strokeWidth="1.2"/>
                  <text x="50" y="62" textAnchor="middle" fontSize="9" fill="#122023" fillOpacity="0.4" fontFamily="system-ui,sans-serif" fontWeight="600">SAP</text>

                  {/* TR (cx=230 cy=16) */}
                  <path d="M208,27 L230,38 L230,52 L208,41 Z" fill="#e0e0dc" stroke="#122023" strokeOpacity="0.12" strokeWidth="1"/>
                  <path d="M252,27 L252,41 L230,52 L230,38 Z" fill="#eaeae6" stroke="#122023" strokeOpacity="0.12" strokeWidth="1"/>
                  <path d="M230,16 L252,27 L230,38 L208,27 Z" fill="#f2f2f0" stroke="#122023" strokeOpacity="0.22" strokeWidth="1.2"/>
                  <text x="230" y="62" textAnchor="middle" fontSize="9" fill="#122023" fillOpacity="0.4" fontFamily="system-ui,sans-serif" fontWeight="600">Oracle</text>

                  {/* BL (cx=50 cy=106) */}
                  <path d="M28,117 L50,128 L50,142 L28,131 Z"  fill="#e0e0dc" stroke="#122023" strokeOpacity="0.12" strokeWidth="1"/>
                  <path d="M72,117 L72,131 L50,142 L50,128 Z"  fill="#eaeae6" stroke="#122023" strokeOpacity="0.12" strokeWidth="1"/>
                  <path d="M50,106 L72,117 L50,128 L28,117 Z"  fill="#f2f2f0" stroke="#122023" strokeOpacity="0.22" strokeWidth="1.2"/>
                  <text x="50" y="152" textAnchor="middle" fontSize="9" fill="#122023" fillOpacity="0.4" fontFamily="system-ui,sans-serif" fontWeight="600">Meters</text>

                  {/* BR (cx=230 cy=106) */}
                  <path d="M208,117 L230,128 L230,142 L208,131 Z" fill="#e0e0dc" stroke="#122023" strokeOpacity="0.12" strokeWidth="1"/>
                  <path d="M252,117 L252,131 L230,142 L230,128 Z" fill="#eaeae6" stroke="#122023" strokeOpacity="0.12" strokeWidth="1"/>
                  <path d="M230,106 L252,117 L230,128 L208,117 Z" fill="#f2f2f0" stroke="#122023" strokeOpacity="0.22" strokeWidth="1.2"/>
                  <text x="230" y="152" textAnchor="middle" fontSize="9" fill="#122023" fillOpacity="0.4" fontFamily="system-ui,sans-serif" fontWeight="600">Grid</text>

                  {/* ─ Centre hub cube — lime ─ */}
                  {/* cx=140 cy=46 w=36 h=24 */}
                  <path d="M104,64 L140,82 L140,106 L104,88 Z"  fill="#8aad4e" stroke="#122023" strokeOpacity="0.3" strokeWidth="1.2"/>
                  <path d="M176,64 L176,88 L140,106 L140,82 Z"  fill="#b3d168" stroke="#122023" strokeOpacity="0.3" strokeWidth="1.2"/>
                  <path d="M140,46 L176,64 L140,82 L104,64 Z"   fill="#e1fcad" stroke="#122023" strokeOpacity="0.45" strokeWidth="1.5"/>
                  {/* checkmark on top face — centred around (140,64) */}
                  <path d="M134,64 l5,5.5 8.5-9" stroke="#122023" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div className="shrink-0 px-8 pb-9 pt-1">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.18em] text-black/30">Integrations</span>
                <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-[#122023]">Works with your existing stack</h3>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ── Impact Stats (same as homepage) ──────────────────────────────────────────
const IMPACT_STATS = [
  {
    tag: "Carbon Impact",
    value: "2.4M",
    unit: "tonnes",
    desc: "CO₂ avoided against business-as-usual baselines annually",
    svg: (
      <svg width="72" height="72" viewBox="0 0 36 36" fill="none">
        <path d="M18 30 C10 24 8 14 18 6 C28 14 26 24 18 30Z" fill="#e1fcad" fillOpacity="0.15" stroke="#e1fcad" strokeWidth="1.2" strokeLinejoin="round"/>
        <line x1="18" y1="6" x2="18" y2="30" stroke="#e1fcad" strokeWidth="0.8" opacity="0.4"/>
        <path d="M18 12 L14 17 M18 12 L22 17" stroke="#e1fcad" strokeWidth="0.8" opacity="0.35" strokeLinecap="round"/>
        <path d="M28 8 L28 3 M26 5 L28 3 L30 5" stroke="#e1fcad" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      </svg>
    ),
  },
  {
    tag: "Global Reach",
    value: "340+",
    unit: "projects",
    desc: "Clean energy projects deployed across 42 countries",
    svg: (
      <svg width="72" height="72" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="13" stroke="#e1fcad" strokeWidth="1.2" opacity="0.3"/>
        <ellipse cx="18" cy="18" rx="13" ry="5" stroke="#e1fcad" strokeWidth="0.8" opacity="0.15"/>
        <line x1="5" y1="18" x2="31" y2="18" stroke="#e1fcad" strokeWidth="0.8" opacity="0.12"/>
        <line x1="18" y1="5" x2="18" y2="31" stroke="#e1fcad" strokeWidth="0.8" opacity="0.12"/>
        <circle cx="14" cy="14" r="2.5" fill="#e1fcad" opacity="0.9"/>
        <circle cx="22" cy="20" r="2" fill="#e1fcad" opacity="0.6"/>
        <circle cx="14" cy="14" r="1" fill="#122023"/>
        <circle cx="22" cy="20" r="0.8" fill="#122023"/>
      </svg>
    ),
  },
  {
    tag: "Clean Finance",
    value: "$8.2B",
    unit: "invested",
    desc: "Capital mobilised through Verdant-advised financing structures",
    svg: (
      <svg width="72" height="72" viewBox="0 0 36 36" fill="none">
        <line x1="6" y1="28" x2="30" y2="28" stroke="#e1fcad" strokeWidth="1" opacity="0.2"/>
        <rect x="7"  y="20" width="5" height="8" rx="1" fill="#e1fcad" fillOpacity="0.2"/>
        <rect x="15" y="15" width="5" height="13" rx="1" fill="#e1fcad" fillOpacity="0.45"/>
        <rect x="23" y="9"  width="5" height="19" rx="1" fill="#e1fcad" fillOpacity="0.9"/>
        <polyline points="9.5,20 17.5,15 25.5,9" stroke="#e1fcad" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    tag: "Organisations",
    value: "15K+",
    unit: "teams",
    desc: "Businesses actively tracking and reducing their emissions",
    svg: (
      <svg width="72" height="72" viewBox="0 0 36 36" fill="none">
        <line x1="18" y1="18" x2="9"  y2="11" stroke="#e1fcad" strokeWidth="0.9" opacity="0.2"/>
        <line x1="18" y1="18" x2="27" y2="11" stroke="#e1fcad" strokeWidth="0.9" opacity="0.2"/>
        <line x1="18" y1="18" x2="9"  y2="25" stroke="#e1fcad" strokeWidth="0.9" opacity="0.2"/>
        <line x1="18" y1="18" x2="27" y2="25" stroke="#e1fcad" strokeWidth="0.9" opacity="0.2"/>
        <circle cx="9"  cy="11" r="3" stroke="#e1fcad" strokeWidth="1.2" opacity="0.5"/>
        <circle cx="27" cy="11" r="3" stroke="#e1fcad" strokeWidth="1.2" opacity="0.5"/>
        <circle cx="9"  cy="25" r="3" stroke="#e1fcad" strokeWidth="1.2" opacity="0.5"/>
        <circle cx="27" cy="25" r="3" stroke="#e1fcad" strokeWidth="1.2" opacity="0.5"/>
        <circle cx="18" cy="18" r="5" fill="#e1fcad" fillOpacity="0.12" stroke="#e1fcad" strokeWidth="1.5"/>
        <circle cx="18" cy="18" r="2" fill="#e1fcad"/>
      </svg>
    ),
  },
];

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

function ImpactStats() {
  return (
    <section className={`bg-[#122023] ${SEC} flex flex-col justify-center`}>
      <div className={G}>
        <div className={COL}>
          <SectionHeader label="Our impact" heading="The numbers that matter" light />
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {IMPACT_STATS.map((s) => (
              <div key={s.value} className="flex flex-col gap-5 px-0 py-8 sm:px-8 sm:py-0 lg:first:pl-0 lg:last:pr-0">
                {s.svg}
                <span className="text-base font-medium text-[#e1fcad]/50">{s.tag}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[44px] font-normal leading-none tracking-[-0.04em] text-[#e1fcad]">{s.value}</span>
                  <span className="text-base uppercase tracking-widest text-white/25">{s.unit}</span>
                </div>
                <p className="text-base leading-snug text-white/40">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Dual Video Explore ────────────────────────────────────────────────────────
const EXPLORE_PANELS = [
  {
    // Children running in a green field — warm human sustainable feel
    video: "https://videos.pexels.com/video-files/6299083/6299083-hd_1920_1080_25fps.mp4",
    poster: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3C8 3 3 8 3 14s5 11 11 11 11-5 11-11S20 3 14 3z" stroke="white" strokeWidth="1.5"/>
        <path d="M9 14c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 9v2M14 17v2M9 14H7M21 14h-2" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    label: "Explore",
    heading: "A future worth running towards",
    href: "/product",
  },
  {
    video: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    poster: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=80",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="5" stroke="white" strokeWidth="1.5"/>
        <path d="M14 3v3M14 22v3M3 14h3M22 14h3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6.5 6.5l2.1 2.1M19.4 19.4l2.1 2.1M6.5 21.5l2.1-2.1M19.4 8.6l2.1-2.1" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    label: "Explore",
    heading: "Build your net-zero strategy",
    href: "/product",
  },
];

function DualVideoExplore() {
  return (
    <section className="flex h-[560px] w-full overflow-hidden">
      {EXPLORE_PANELS.map((panel) => (
        <a
          key={panel.heading}
          href={panel.href}
          className="group relative flex flex-1 cursor-pointer items-center justify-center overflow-hidden"
        >
          {/* Video */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={panel.poster}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-[1.04]"
          >
            <source src={panel.video} type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10 transition-opacity duration-500 group-hover:opacity-80" />

          {/* Divider between panels */}
          <div className="absolute right-0 top-0 h-full w-px bg-white/20 last:hidden" />

          {/* Content — centered */}
          <div className="relative z-10 flex flex-col items-center gap-3 text-center text-white transition-transform duration-500 group-hover:-translate-y-2">
            <div className="mb-1 opacity-80">{panel.icon}</div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">{panel.label}</p>
            <h2 className="max-w-sm text-4xl font-normal leading-[1.06] tracking-[-0.03em] md:text-5xl lg:text-[56px]">
              {panel.heading}
            </h2>
            {/* Underline arrow */}
            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-white/60 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <span>Discover more</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </a>
      ))}
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
      <ImpactStats />
      <DualVideoExplore />
      <Footer />
    </main>
  );
}
