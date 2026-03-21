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
              <GhostCTA label="Explore Carbon Intelligence" dark />
            </div>

            {/* Image panel — fixed height so image shows around all edges */}
            <div className="relative min-h-[520px] overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0a1618]/65" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.5, mixBlendMode: "overlay" }}
              />
              {/* Frosted glass chart — inset so image shows as frame on all sides */}
              <div className="absolute inset-10 z-10 rounded-2xl border border-white/20 bg-white/95 p-5 shadow-[0_12px_56px_rgba(0,0,0,0.25)]">
                <p className="mb-0.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-black/50">Emissions Trend</p>
                <p className="mb-3 text-[11px] text-black/30">Scope 1 · 2 · 3 over 12 months</p>

                <svg viewBox="0 0 300 165" fill="none" className="w-full">
                  {/* ── Horizontal grid lines ── */}
                  {[20, 55, 90, 125].map((y) => (
                    <line key={y} x1="8" y1={y} x2="292" y2={y} stroke="#122023" strokeOpacity="0.06" strokeWidth="0.8"/>
                  ))}
                  {/* ── Vertical grid lines at month positions ── */}
                  {[8, 64, 120, 176, 232, 292].map((x) => (
                    <line key={x} x1={x} y1="8" x2={x} y2="140" stroke="#122023" strokeOpacity="0.06" strokeWidth="0.8"/>
                  ))}

                  {/* ── Subtle area fill under Scope 1 ── */}
                  <path
                    d="M8,22 C40,22 65,24 90,45 C115,68 145,105 172,120 C196,133 232,137 292,138 L292,140 L8,140 Z"
                    fill="#122023" fillOpacity="0.04"
                  />

                  {/* ── Scope 1 — solid dark, S-curve descent ── */}
                  <path
                    d="M8,22 C40,22 65,24 90,45 C115,68 145,105 172,120 C196,133 232,137 292,138"
                    stroke="#122023" strokeWidth="2" strokeLinecap="round" fill="none"
                  />

                  {/* ── Scope 2 — dashed green, parallel descent ── */}
                  <path
                    d="M8,38 C40,38 65,40 90,60 C115,82 145,117 172,132 C196,144 232,148 292,149"
                    stroke="#4a7c59" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="7 4" fill="none"
                  />

                  {/* ── Scope 3 — solid light gray ── */}
                  <path
                    d="M8,54 C40,54 65,56 90,74 C115,96 145,128 172,141 C196,151 232,155 292,156"
                    stroke="#122023" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.22" fill="none"
                  />

                  {/* ── Month labels ── */}
                  {[{x:8,l:"Jan"},{x:64,l:"Mar"},{x:120,l:"May"},{x:176,l:"Jul"},{x:232,l:"Sep"},{x:292,l:"Nov"}].map((m) => (
                    <text key={m.l} x={m.x} y="153" textAnchor="middle" fontSize="8.5"
                      fill="#122023" fillOpacity="0.32" fontFamily="ui-monospace,monospace" letterSpacing="0.05em">{m.l}</text>
                  ))}

                  {/* ── Legend row ── */}
                  <line x1="8"   y1="163" x2="24"  y2="163" stroke="#122023" strokeWidth="2"/>
                  <text x="28"  y="166" fontSize="8" fill="#122023" fillOpacity="0.5" fontFamily="ui-monospace,monospace" letterSpacing="0.07em">Scope 1</text>
                  <line x1="92"  y1="163" x2="108" y2="163" stroke="#4a7c59" strokeWidth="1.6" strokeDasharray="5 3"/>
                  <text x="112" y="166" fontSize="8" fill="#122023" fillOpacity="0.5" fontFamily="ui-monospace,monospace" letterSpacing="0.07em">Scope 2</text>
                  <line x1="176" y1="163" x2="192" y2="163" stroke="#122023" strokeWidth="1.4" strokeOpacity="0.22"/>
                  <text x="196" y="166" fontSize="8" fill="#122023" fillOpacity="0.5" fontFamily="ui-monospace,monospace" letterSpacing="0.07em">Scope 3</text>
                </svg>

                {/* Stat strip */}
                <div className="mt-4 grid grid-cols-3 divide-x divide-black/08 border-t border-black/08 pt-4">
                  {[
                    { val: "−23.4%", label: "Total reduction" },
                    { val: "Real-time", label: "Alert frequency" },
                    { val: "100%", label: "Supply chain" },
                  ].map((s) => (
                    <div key={s.label} className="pr-3 first:pl-0 last:pr-0 [&:not(:first-child)]:pl-3">
                      <p className="text-xs font-bold text-[#122023]">{s.val}</p>
                      <p className="text-[10px] leading-relaxed text-black/40">{s.label}</p>
                    </div>
                  ))}
                </div>
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
            {/* Image panel — fixed height so image shows around all edges */}
            <div className="relative order-2 min-h-[520px] overflow-hidden rounded-3xl lg:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1600&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0a1618]/65" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.5, mixBlendMode: "overlay" }}
              />
              {/* Frosted glass chart — inset so image shows as frame */}
              <div className="absolute inset-10 z-10 rounded-2xl border border-white/20 bg-white/95 p-5 shadow-[0_12px_56px_rgba(0,0,0,0.25)]">
                <p className="mb-0.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-black/50">Net-Zero Pathways</p>
                <p className="mb-3 text-[11px] text-black/30">Scenario comparison · 2024 – 2030</p>

                <svg viewBox="0 0 300 165" fill="none" className="w-full">
                  {/* ── Grid ── */}
                  {[20, 55, 90, 125].map((y) => (
                    <line key={y} x1="8" y1={y} x2="292" y2={y} stroke="#122023" strokeOpacity="0.06" strokeWidth="0.8"/>
                  ))}
                  {[8, 55, 103, 151, 199, 247, 292].map((x) => (
                    <line key={x} x1={x} y1="8" x2={x} y2="140" stroke="#122023" strokeOpacity="0.06" strokeWidth="0.8"/>
                  ))}

                  {/* ── Net-zero baseline ── */}
                  <line x1="8" y1="133" x2="292" y2="133" stroke="#4a7c59" strokeOpacity="0.2" strokeWidth="0.8" strokeDasharray="4 3"/>
                  <text x="294" y="136" fontSize="7.5" fill="#4a7c59" fillOpacity="0.55" fontFamily="ui-monospace,monospace">0</text>

                  {/* ── BAU — flat dotted line (stays high, no reduction) ── */}
                  <path d="M8,20 C80,19 160,18 230,18 C260,18 280,19 292,19"
                    stroke="#122023" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.15" fill="none"/>

                  {/* ── Renewables — solid dark, steeper descent ── */}
                  <path d="M8,20 C40,20 62,22 82,42 C102,64 130,100 155,118 C178,132 218,133 292,134"
                    stroke="#122023" strokeWidth="2" strokeLinecap="round" fill="none"/>

                  {/* ── Efficiency (selected) — green, moderate descent ── */}
                  <path d="M8,20 C40,22 65,28 88,52 C112,78 140,110 165,124 C188,136 228,138 292,139"
                    stroke="#4a7c59" strokeWidth="2.2" strokeLinecap="round" fill="none"/>

                  {/* ── Supply Chain — dashed dark, slowest descent ── */}
                  <path d="M8,20 C38,24 60,34 85,62 C110,90 138,118 162,130 C185,140 226,142 292,143"
                    stroke="#122023" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4" strokeOpacity="0.38" fill="none"/>

                  {/* ── Year labels ── */}
                  {[{x:8,l:"2024"},{x:55,l:"2025"},{x:103,l:"2026"},{x:151,l:"2027"},{x:199,l:"2028"},{x:247,l:"2029"},{x:292,l:"2030"}].map((m) => (
                    <text key={m.l} x={m.x} y="153" textAnchor="middle" fontSize="7.5"
                      fill="#122023" fillOpacity="0.3" fontFamily="ui-monospace,monospace" letterSpacing="0.04em">{m.l}</text>
                  ))}

                  {/* ── Legend ── */}
                  <line x1="8"   y1="163" x2="22"  y2="163" stroke="#122023" strokeWidth="2"/>
                  <text x="26"  y="166" fontSize="7.5" fill="#122023" fillOpacity="0.5" fontFamily="ui-monospace,monospace" letterSpacing="0.06em">Renewables</text>
                  <line x1="102" y1="163" x2="116" y2="163" stroke="#4a7c59" strokeWidth="2.2"/>
                  <text x="120" y="166" fontSize="7.5" fill="#122023" fillOpacity="0.5" fontFamily="ui-monospace,monospace" letterSpacing="0.06em">Efficiency ✓</text>
                  <line x1="198" y1="163" x2="212" y2="163" stroke="#122023" strokeWidth="1.5" strokeDasharray="5 3" strokeOpacity="0.38"/>
                  <text x="216" y="166" fontSize="7.5" fill="#122023" fillOpacity="0.5" fontFamily="ui-monospace,monospace" letterSpacing="0.06em">Supply chain</text>
                </svg>

                {/* Stat strip */}
                <div className="mt-4 grid grid-cols-3 divide-x divide-black/08 border-t border-black/08 pt-4">
                  {[
                    { val: "3",    label: "Phases to zero" },
                    { val: "12",   label: "Levers modelled" },
                    { val: "Live", label: "Auto-updated" },
                  ].map((s) => (
                    <div key={s.label} className="pr-3 first:pl-0 last:pr-0 [&:not(:first-child)]:pl-3">
                      <p className="text-xs font-bold text-[#122023]">{s.val}</p>
                      <p className="text-[10px] leading-relaxed text-black/40">{s.label}</p>
                    </div>
                  ))}
                </div>
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
              <GhostCTA label="See the AI in action" dark />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Bento Features ────────────────────────────────────────────────────────────
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

            {/* ══ CARD A ── Scope layer slabs (tall, left, row-span-2) ══════════
                Slab dims: half-width W=52, top-diamond height 24, thickness T=12
                cx=104  →  left=(52,cy+12)  right=(156,cy+12)  bot=(104,cy+24)
                Slab cy:  15 / 74 / 133 / 192
                Slab bottoms (cy+24+12=cy+36):  51 / 110 / 169 / 228
                Pill x=164 (right+8), width=66, height=21, rx=10.5
            ════════════════════════════════════════════════════════════════════ */}
            <div className="col-span-12 row-span-2 flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white md:col-span-5">
              <div className="flex flex-1 items-center justify-center">
                <svg viewBox="0 0 242 252" fill="none" className="w-[82%]">

                  {/* focus brackets — frame the slab stack x:44–160, y:8–236 */}
                  <path d="M56,15 L44,15 L44,27"   stroke="#122023" strokeOpacity="0.14" strokeWidth="1.5" strokeLinecap="square" fill="none"/>
                  <path d="M152,15 L164,15 L164,27" stroke="#122023" strokeOpacity="0.14" strokeWidth="1.5" strokeLinecap="square" fill="none"/>
                  <path d="M56,237 L44,237 L44,225" stroke="#122023" strokeOpacity="0.14" strokeWidth="1.5" strokeLinecap="square" fill="none"/>
                  <path d="M152,237 L164,237 L164,225" stroke="#122023" strokeOpacity="0.14" strokeWidth="1.5" strokeLinecap="square" fill="none"/>

                  {/* ── Slab 0 · Scope 1 (lime) · cy=15 ──────────────────────
                      top-face:  M52,27  L104,15  L156,27  L104,39  Z
                      left-face: M52,27  L104,39  L104,51  L52,39   Z
                      right-face:M104,39 L156,27  L156,39  L104,51  Z         */}
                  <path d="M52,27 L104,39 L104,51 L52,39 Z"   fill="#7aab3e"/>
                  <path d="M104,39 L156,27 L156,39 L104,51 Z" fill="#a8d05c"/>
                  <path d="M52,27 L104,15 L156,27 L104,39 Z"  fill="#e1fcad" stroke="#122023" strokeOpacity="0.28" strokeWidth="1.3"/>
                  <rect x="166" y="16" width="66" height="21" rx="10.5" fill="#e1fcad"/>
                  <text x="199" y="31" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#122023" fillOpacity="0.82" fontFamily="system-ui,sans-serif" letterSpacing="0.04em">Scope 1</text>
                  <line x1="104" y1="51" x2="104" y2="74" stroke="#122023" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="3 3"/>

                  {/* ── Slab 1 · Scope 2 · cy=74 ──────────────────────────────
                      top-face:  M52,86  L104,74  L156,86  L104,98  Z         */}
                  <path d="M52,86 L104,98 L104,110 L52,98 Z"   fill="#ccccc8"/>
                  <path d="M104,98 L156,86 L156,98 L104,110 Z" fill="#d8d8d4"/>
                  <path d="M52,86 L104,74 L156,86 L104,98 Z"   fill="#eaeae8" stroke="#122023" strokeOpacity="0.17" strokeWidth="1.2"/>
                  <rect x="166" y="75" width="66" height="21" rx="10.5" fill="rgba(18,32,35,0.07)"/>
                  <text x="199" y="90" textAnchor="middle" fontSize="10.5" fontWeight="500" fill="#122023" fillOpacity="0.42" fontFamily="system-ui,sans-serif" letterSpacing="0.04em">Scope 2</text>
                  <line x1="104" y1="110" x2="104" y2="133" stroke="#122023" strokeOpacity="0.13" strokeWidth="1" strokeDasharray="3 3"/>

                  {/* ── Slab 2 · Scope 3 · cy=133 ─────────────────────────────
                      top-face:  M52,145 L104,133 L156,145 L104,157 Z         */}
                  <path d="M52,145 L104,157 L104,169 L52,157 Z"   fill="#ccccc8"/>
                  <path d="M104,157 L156,145 L156,157 L104,169 Z" fill="#d8d8d4"/>
                  <path d="M52,145 L104,133 L156,145 L104,157 Z"  fill="#eaeae8" stroke="#122023" strokeOpacity="0.13" strokeWidth="1.2"/>
                  <rect x="166" y="134" width="66" height="21" rx="10.5" fill="rgba(18,32,35,0.055)"/>
                  <text x="199" y="149" textAnchor="middle" fontSize="10.5" fontWeight="500" fill="#122023" fillOpacity="0.34" fontFamily="system-ui,sans-serif" letterSpacing="0.04em">Scope 3</text>
                  <line x1="104" y1="169" x2="104" y2="192" stroke="#122023" strokeOpacity="0.11" strokeWidth="1" strokeDasharray="3 3"/>

                  {/* ── Slab 3 · Supply · cy=192 ──────────────────────────────
                      top-face:  M52,204 L104,192 L156,204 L104,216 Z         */}
                  <path d="M52,204 L104,216 L104,228 L52,216 Z"   fill="#ccccc8"/>
                  <path d="M104,216 L156,204 L156,216 L104,228 Z" fill="#d8d8d4"/>
                  <path d="M52,204 L104,192 L156,204 L104,216 Z"  fill="#eaeae8" stroke="#122023" strokeOpacity="0.10" strokeWidth="1.2"/>
                  <rect x="166" y="193" width="66" height="21" rx="10.5" fill="rgba(18,32,35,0.045)"/>
                  <text x="199" y="208" textAnchor="middle" fontSize="10.5" fontWeight="500" fill="#122023" fillOpacity="0.26" fontFamily="system-ui,sans-serif" letterSpacing="0.04em">Supply</text>
                </svg>
              </div>
              <div className="shrink-0 px-8 pb-9">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.18em] text-black/30">Live data</span>
                <h3 className="mb-2 text-[17px] font-semibold leading-snug tracking-tight text-[#122023]">Real-time ingestion from any source</h3>
                <p className="text-sm leading-relaxed text-black/45">Connect meters, APIs, and ERP systems. Carbon data flows in continuously — no manual exports.</p>
              </div>
            </div>

            {/* ══ CARD B ── Branching pathway selector (top-right) ══════════════
                Front card: x=20 y=12 w=318 h=170 rx=14
                Source node: cx=68 cy=97
                Rows:  top=55  mid=97  bot=139
                Branch nodes x=180  Labels x=198  Values x=340 (end)
            ════════════════════════════════════════════════════════════════════ */}
            <div className="col-span-12 flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-[#f5f5f2] md:col-span-7">
              <div className="flex flex-1 items-center justify-center px-6 pt-6">
                <svg viewBox="0 0 380 195" fill="none" className="w-full">

                  {/* stacked depth cards */}
                  <g transform="rotate(-5 179 106)">
                    <rect x="20" y="12" width="318" height="170" rx="14" fill="#e4e4e0" stroke="#122023" strokeOpacity="0.06" strokeWidth="1"/>
                  </g>
                  <g transform="rotate(-2.5 179 106)">
                    <rect x="20" y="12" width="318" height="170" rx="14" fill="#ebebea" stroke="#122023" strokeOpacity="0.08" strokeWidth="1"/>
                  </g>

                  {/* front card */}
                  <rect x="20" y="12" width="318" height="170" rx="14" fill="white" stroke="#122023" strokeOpacity="0.10" strokeWidth="1.2"/>

                  {/* source node: big outer ring + filled inner dot */}
                  <circle cx="68" cy="97" r="14" fill="#f0f0ed" stroke="#122023" strokeOpacity="0.18" strokeWidth="1.3"/>
                  <circle cx="68" cy="97" r="5.5" fill="#122023" fillOpacity="0.55"/>

                  {/* ── branch lines ────────────────────────────────────────── */}
                  {/* top: Renewables (dim) */}
                  <path d="M82,97 C122,97 122,55 175,55" stroke="#122023" strokeOpacity="0.14" strokeWidth="1.3" fill="none"/>
                  {/* mid: Efficiency (active) */}
                  <line x1="82" y1="97" x2="175" y2="97" stroke="#122023" strokeOpacity="0.55" strokeWidth="1.8"/>
                  {/* bot: Supply chain (dim) */}
                  <path d="M82,97 C122,97 122,139 175,139" stroke="#122023" strokeOpacity="0.14" strokeWidth="1.3" fill="none"/>

                  {/* ── row nodes + labels ───────────────────────────────────── */}
                  {/* Renewables */}
                  <circle cx="175" cy="55" r="9" fill="rgba(18,32,35,0.06)" stroke="#122023" strokeOpacity="0.16" strokeWidth="1.2"/>
                  <text x="192" y="59.5" fontSize="11"   fill="#122023" fillOpacity="0.28" fontFamily="system-ui,sans-serif" fontWeight="400">Renewables</text>
                  <text x="330" y="59.5" textAnchor="end" fontSize="11" fill="#122023" fillOpacity="0.20" fontFamily="system-ui,sans-serif">−38%</text>

                  {/* Efficiency — ACTIVE */}
                  <circle cx="175" cy="97" r="13" fill="#e1fcad" stroke="#122023" strokeOpacity="0.38" strokeWidth="1.4"/>
                  <path d="M169.5,97 l4.5,5 8,-9" stroke="#122023" strokeOpacity="0.68" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <text x="196" y="101.5" fontSize="12"   fill="#122023" fillOpacity="0.88" fontFamily="system-ui,sans-serif" fontWeight="700">Efficiency</text>
                  <text x="330" y="101.5" textAnchor="end" fontSize="12" fill="#122023" fillOpacity="0.78" fontFamily="system-ui,sans-serif" fontWeight="700">−22%</text>

                  {/* Supply chain */}
                  <circle cx="175" cy="139" r="9" fill="rgba(18,32,35,0.06)" stroke="#122023" strokeOpacity="0.16" strokeWidth="1.2"/>
                  <text x="192" y="143.5" fontSize="11"   fill="#122023" fillOpacity="0.28" fontFamily="system-ui,sans-serif" fontWeight="400">Supply chain</text>
                  <text x="330" y="143.5" textAnchor="end" fontSize="11" fill="#122023" fillOpacity="0.20" fontFamily="system-ui,sans-serif">−18%</text>
                </svg>
              </div>
              <div className="shrink-0 px-8 pb-9 pt-2">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.18em] text-black/30">AI-powered</span>
                <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-[#122023]">Model every decarbonisation path</h3>
              </div>
            </div>

            {/* ══ CARD C ── Compliance ring (lime bg) ══════════════════════════
                r=58  circ=2π×58=364.42  98%=357.13  25%=91.1 (dashoffset)
            ════════════════════════════════════════════════════════════════════ */}
            <div className="col-span-12 flex flex-col justify-between overflow-hidden rounded-3xl bg-[#e1fcad] p-8 md:col-span-3">
              <div className="flex flex-1 items-center justify-center">
                <svg viewBox="0 0 180 180" fill="none" className="w-[140px] h-[140px]">
                  {/* track */}
                  <circle cx="90" cy="90" r="58" stroke="#122023" strokeOpacity="0.10" strokeWidth="13" fill="none"/>
                  {/* 98% arc — 12-o'clock start via dashoffset=91.1 */}
                  <circle cx="90" cy="90" r="58"
                    stroke="#122023" strokeOpacity="0.72" strokeWidth="13" fill="none"
                    strokeDasharray="357.13 364.42"
                    strokeDashoffset="91.1"
                    strokeLinecap="round"/>
                  <text x="90" y="84" textAnchor="middle" fontSize="30" fontWeight="700" fill="#122023" fontFamily="system-ui,sans-serif">98%</text>
                  <text x="90" y="103" textAnchor="middle" fontSize="9" fontWeight="600" fill="#122023" fillOpacity="0.45" fontFamily="system-ui,sans-serif" letterSpacing="0.15em">COMPLIANT</text>
                </svg>
              </div>
              <div>
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.18em] text-[#122023]/35">Compliance</span>
                <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-[#122023]">Audit-ready from day one</h3>
              </div>
            </div>

            {/* ══ CARD D ── Integration hub ═════════════════════════════════════
                Satellite cubes:  W=20 H_face=20 T=11
                  TL center (56,42): top=(56,32) right=(76,42) bot=(56,52) left=(36,42)
                  TR center (224,42): top=(224,32) right=(244,42) bot=(224,52) left=(204,42)
                  BL center (56,148): top=(56,138) …
                  BR center (224,148)
                Hub cube: W=30 H_face=30 T=18
                  center(140,95): top=(140,80) right=(170,95) bot=(140,110) left=(110,95)
                Connectors (facing vertices):
                  TL right(76,42) → hub left(110,95)
                  TR left(204,42) → hub right(170,95)
                  BL right(76,148) → hub left(110,95)
                  BR left(204,148) → hub right(170,95)
            ════════════════════════════════════════════════════════════════════ */}
            <div className="col-span-12 flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white md:col-span-4">
              <div className="flex flex-1 items-center justify-center pt-4">
                <svg viewBox="0 0 280 200" fill="none" className="w-[90%]">

                  {/* ── connectors (behind cubes) ─────────────────────────── */}
                  <line x1="76"  y1="42"  x2="110" y2="95"  stroke="#122023" strokeOpacity="0.15" strokeWidth="1.3" strokeDasharray="4 3"/>
                  <line x1="204" y1="42"  x2="170" y2="95"  stroke="#122023" strokeOpacity="0.15" strokeWidth="1.3" strokeDasharray="4 3"/>
                  <line x1="76"  y1="148" x2="110" y2="95"  stroke="#122023" strokeOpacity="0.15" strokeWidth="1.3" strokeDasharray="4 3"/>
                  <line x1="204" y1="148" x2="170" y2="95"  stroke="#122023" strokeOpacity="0.15" strokeWidth="1.3" strokeDasharray="4 3"/>

                  {/* ── satellite TL (cx=56 cy=42) ──────────────────────────
                      top-face: M36,42 L56,32 L76,42 L56,52 Z
                      left-face: M36,42 L56,52 L56,63 L36,53 Z
                      right-face: M56,52 L76,42 L76,53 L56,63 Z              */}
                  <path d="M36,42 L56,52 L56,63 L36,53 Z"   fill="#d0d0cc"/>
                  <path d="M56,52 L76,42 L76,53 L56,63 Z"   fill="#dbdbd8"/>
                  <path d="M36,42 L56,32 L76,42 L56,52 Z"   fill="#eeeeed" stroke="#122023" strokeOpacity="0.18" strokeWidth="1.2"/>
                  <text x="56" y="76" textAnchor="middle" fontSize="10" fill="#122023" fillOpacity="0.40" fontFamily="system-ui,sans-serif" fontWeight="600">SAP</text>

                  {/* ── satellite TR (cx=224 cy=42) ─────────────────────────
                      top-face: M204,42 L224,32 L244,42 L224,52 Z            */}
                  <path d="M204,42 L224,52 L224,63 L204,53 Z" fill="#d0d0cc"/>
                  <path d="M224,52 L244,42 L244,53 L224,63 Z" fill="#dbdbd8"/>
                  <path d="M204,42 L224,32 L244,42 L224,52 Z" fill="#eeeeed" stroke="#122023" strokeOpacity="0.18" strokeWidth="1.2"/>
                  <text x="224" y="76" textAnchor="middle" fontSize="10" fill="#122023" fillOpacity="0.40" fontFamily="system-ui,sans-serif" fontWeight="600">Oracle</text>

                  {/* ── satellite BL (cx=56 cy=148) ─────────────────────────
                      top-face: M36,148 L56,138 L76,148 L56,158 Z            */}
                  <path d="M36,148 L56,158 L56,169 L36,159 Z" fill="#d0d0cc"/>
                  <path d="M56,158 L76,148 L76,159 L56,169 Z" fill="#dbdbd8"/>
                  <path d="M36,148 L56,138 L76,148 L56,158 Z" fill="#eeeeed" stroke="#122023" strokeOpacity="0.18" strokeWidth="1.2"/>
                  <text x="56" y="182" textAnchor="middle" fontSize="10" fill="#122023" fillOpacity="0.40" fontFamily="system-ui,sans-serif" fontWeight="600">Meters</text>

                  {/* ── satellite BR (cx=224 cy=148) ─────────────────────────
                      top-face: M204,148 L224,138 L244,148 L224,158 Z        */}
                  <path d="M204,148 L224,158 L224,169 L204,159 Z" fill="#d0d0cc"/>
                  <path d="M224,158 L244,148 L244,159 L224,169 Z" fill="#dbdbd8"/>
                  <path d="M204,148 L224,138 L244,148 L224,158 Z" fill="#eeeeed" stroke="#122023" strokeOpacity="0.18" strokeWidth="1.2"/>
                  <text x="224" y="182" textAnchor="middle" fontSize="10" fill="#122023" fillOpacity="0.40" fontFamily="system-ui,sans-serif" fontWeight="600">Grid</text>

                  {/* ── hub cube (cx=140 cy=95) — lime ───────────────────────
                      top-face: M110,95 L140,80 L170,95 L140,110 Z
                      left-face: M110,95 L140,110 L140,128 L110,113 Z
                      right-face: M140,110 L170,95 L170,113 L140,128 Z       */}
                  <path d="M110,95 L140,110 L140,128 L110,113 Z"  fill="#7aab3e"/>
                  <path d="M140,110 L170,95 L170,113 L140,128 Z"  fill="#a8d05c"/>
                  <path d="M110,95 L140,80 L170,95 L140,110 Z"    fill="#e1fcad" stroke="#122023" strokeOpacity="0.38" strokeWidth="1.5"/>
                  {/* checkmark centred at (140,95) */}
                  <path d="M134,95 l5,5.5 8.5,-9.5" stroke="#122023" strokeOpacity="0.62" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
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
