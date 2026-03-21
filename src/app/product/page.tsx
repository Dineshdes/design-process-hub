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
const SEC = "py-[100px] min-h-[740px]";

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
      <div className={`relative z-10 w-full pb-16`}>
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

            {/* Image + grain + stats panel */}
            <div className="relative min-h-[520px] self-stretch overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0a1618]/58" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.4, mixBlendMode: "overlay" }}
              />
              {/* Stats content */}
              <div className="relative flex h-full min-h-[520px] flex-col justify-end p-8">
                {/* Primary stat */}
                <div className="mb-8">
                  <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">Total emissions reduction</p>
                  <p className="text-[72px] font-normal leading-none tracking-[-0.04em] text-[#e1fcad]">−23.4%</p>
                  <p className="mt-3 text-base text-white/45">vs previous year · Scope 1, 2 &amp; 3 combined</p>
                </div>
                {/* Secondary stats */}
                <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6">
                  {[
                    { val: "−18%", label: "Scope 1" },
                    { val: "−31%", label: "Scope 2" },
                    { val: "−14%", label: "Scope 3" },
                  ].map((s) => (
                    <div key={s.label} className="pr-6 first:pl-0 last:pr-0 [&:not(:first-child)]:pl-6">
                      <p className="text-xl font-semibold text-white">{s.val}</p>
                      <p className="text-base text-white/40">{s.label}</p>
                    </div>
                  ))}
                </div>
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
            {/* Image + grain + stats panel — left */}
            <div className="relative order-2 min-h-[520px] self-stretch overflow-hidden rounded-2xl lg:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0a1618]/62" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.38, mixBlendMode: "overlay" }}
              />
              {/* Stats content */}
              <div className="relative flex h-full min-h-[520px] flex-col justify-end p-8">
                {/* Primary stat */}
                <div className="mb-8">
                  <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">Roadmap phases</p>
                  <p className="text-[72px] font-normal leading-none tracking-[-0.04em] text-[#e1fcad]">3</p>
                  <p className="mt-3 text-base text-white/45">clear phases to net-zero by 2030, financially modelled</p>
                </div>
                {/* Secondary stats */}
                <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6">
                  {[
                    { val: "2030",  label: "Target year" },
                    { val: "12",    label: "Levers modelled" },
                    { val: "Live",  label: "Auto-updated" },
                  ].map((s) => (
                    <div key={s.label} className="pr-6 first:pl-0 last:pr-0 [&:not(:first-child)]:pl-6">
                      <p className="text-xl font-semibold text-white">{s.val}</p>
                      <p className="text-base text-white/40">{s.label}</p>
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
      <ImpactStats />
      <Footer />
    </main>
  );
}
