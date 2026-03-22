import Navbar from "@/components/ui/navbar";
import {
  Leaf,
  ChevronRight,
  BrainCircuit,
  FileBarChart2,
  Users2,
  PlugZap,
  CheckCircle2,
  Database,
  Cpu,
  BarChart2,
  ShieldCheck,
  ArrowDown,
} from "lucide-react";
import { PrimaryCTA, SecondaryCTA, GhostCTA } from "@/components/ui/cta";
import Footer from "@/components/ui/footer";
import BlogCallout from "@/components/ui/blog-callout";
import TrustedByCarousel from "@/components/ui/trusted-by";

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
      <h2 className={`text-4xl font-normal leading-[1.08] tracking-[-0.03em] md:text-5xl ${center ? "max-w-2xl" : ""} ${light ? "text-white" : "text-black"}`}>
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
          {/* Split header: label + heading left, description right */}
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-3 block text-sm font-bold uppercase tracking-[0.18em] text-black/40">
                What Verdant does
              </span>
              <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-black md:text-5xl">
                Built for the full<br />sustainability operation
              </h2>
            </div>
            <p className="max-w-xs text-base leading-relaxed text-black/50 lg:pb-1 lg:text-right">
              Four tightly integrated capabilities that replace the spreadsheets, silos, and manual effort.
            </p>
          </div>
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

const HOW_STEPS = [
  {
    tag: "Carbon Tracking",
    heading: "Live emissions, automatically captured",
    desc: "Connect your energy meters, ERP, and supply chain APIs once. Verdant ingests, normalises, and attributes every tonne in real time — no manual entry, no spreadsheets.",
    cta: "See Carbon Intelligence",
    visual: (
      <div className="flex h-full w-full items-center justify-center px-8 py-6">
        <div className="w-full max-w-sm rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_8px_32px_rgba(0,0,0,0.07)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-black/30">Scope 1 · Live</span>
            <span className="rounded-full bg-[#e1fcad] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#122023]">↓ 23%</span>
          </div>
          <svg viewBox="0 0 260 100" fill="none" className="w-full">
            {[20,40,60,80].map(y=><line key={y} x1="0" y1={y} x2="260" y2={y} stroke="#122023" strokeOpacity="0.05" strokeWidth="0.8"/>)}
            <path d="M0,75 C30,72 55,68 80,52 C105,36 130,18 160,14 C185,10 220,12 260,14" fill="rgba(225,252,173,0.15)" stroke="none"/>
            <path d="M0,75 C30,72 55,68 80,52 C105,36 130,18 160,14 C185,10 220,12 260,14" stroke="#4a7c59" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M0,85 C30,83 55,80 80,66 C105,52 130,36 160,30 C185,26 220,28 260,30" stroke="#122023" strokeWidth="1.4" strokeOpacity="0.2" strokeLinecap="round" fill="none"/>
            <circle cx="160" cy="14" r="4" fill="#e1fcad" stroke="#4a7c59" strokeWidth="1.5"/>
          </svg>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-black/[0.06] pt-4">
            {[{v:"1.2K",l:"t CO₂ today"},{v:"−18%",l:"vs last month"},{v:"98%",l:"data quality"}].map(s=>(
              <div key={s.l}><p className="text-sm font-bold text-[#122023]">{s.v}</p><p className="text-[9px] text-black/35">{s.l}</p></div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    tag: "Compliance Reporting",
    heading: "CSRD, CDP & GRI filed in hours",
    desc: "Select your framework, review the auto-populated fields, and export a submission-ready report. Verdant maps your data to every disclosure requirement automatically.",
    cta: "Explore Reporting",
    visual: (
      <div className="flex h-full w-full items-center justify-center px-8 py-6">
        <div className="w-full max-w-sm rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_8px_32px_rgba(0,0,0,0.07)]">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#122023]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3h10M2 7h7M2 11h5" stroke="#e1fcad" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </div>
            <div><p className="text-xs font-bold text-[#122023]">CSRD Report 2024</p><p className="text-[10px] text-black/35">Auto-generated · 48 disclosures</p></div>
            <span className="ml-auto rounded-full bg-[#f0fae0] px-2 py-0.5 text-[10px] font-bold text-[#4a7c59]">Ready</span>
          </div>
          {[
            {label:"Climate disclosure",pct:100,color:"#4a7c59"},
            {label:"Supply chain due diligence",pct:88,color:"#4a7c59"},
            {label:"Biodiversity reporting",pct:72,color:"#e1fcad"},
            {label:"Social indicators",pct:55,color:"#e1fcad"},
          ].map(item=>(
            <div key={item.label} className="mb-3">
              <div className="mb-1 flex justify-between">
                <span className="text-[10px] text-black/50">{item.label}</span>
                <span className="text-[10px] font-bold text-[#122023]">{item.pct}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/[0.06]">
                <div className="h-1.5 rounded-full" style={{width:`${item.pct}%`,backgroundColor:item.color}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    tag: "Supply Chain",
    heading: "Full Scope 3 visibility, no surveys",
    desc: "Verdant maps your entire supplier network and pulls primary activity data directly. You get verified Scope 3 numbers without chasing spreadsheets from hundreds of vendors.",
    cta: "Explore Supply Chain",
    visual: (
      <div className="flex h-full w-full items-center justify-center px-8 py-6">
        <div className="w-full max-w-sm space-y-3">
          {[
            {name:"Vestas Components",tier:"Tier 1",score:94,status:"Verified"},
            {name:"NordSteel AB",tier:"Tier 2",score:78,status:"Pending"},
            {name:"Baltic Logistics",tier:"Tier 3",score:61,status:"At risk"},
          ].map((s,i)=>(
            <div key={s.name} className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-white p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#f0fae0] text-xs font-bold text-[#4a7c59]">{s.tier}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#122023] truncate">{s.name}</p>
                <p className="text-[10px] text-black/35">{s.score}% emission score</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] ${i===0?"bg-[#f0fae0] text-[#4a7c59]":i===1?"bg-amber-50 text-amber-600":"bg-red-50 text-red-500"}`}>{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    tag: "Net-Zero Strategy",
    heading: "Roadmaps built in minutes, not months",
    desc: "Set your target year and budget. Verdant's AI generates a financially-modelled, scenario-tested decarbonisation roadmap — complete with initiative timelines and milestone tracking.",
    cta: "Explore Strategy Planner",
    visual: (
      <div className="flex h-full w-full items-center justify-center px-8 py-6">
        <div className="w-full max-w-sm rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_8px_32px_rgba(0,0,0,0.07)]">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/30">Net-zero roadmap · 2024–2040</p>
          </div>
          <div className="relative">
            {[
              {year:"2024",label:"Baseline set",fill:true},
              {year:"2026",label:"Scope 1 eliminated",fill:true},
              {year:"2028",label:"Scope 2 clean power",fill:true},
              {year:"2032",label:"Supply chain −50%",fill:false},
              {year:"2040",label:"Net zero achieved",fill:false},
            ].map((m,i,arr)=>(
              <div key={m.year} className="flex items-start gap-3 pb-4">
                <div className="flex flex-col items-center">
                  <div className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${m.fill?"border-[#4a7c59] bg-[#4a7c59]":"border-black/20 bg-white"}`}>
                    {m.fill && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  {i < arr.length-1 && <div className={`w-px flex-1 mt-0.5 min-h-[16px] ${m.fill?"bg-[#4a7c59]/30":"bg-black/10"}`}/>}
                </div>
                <div className="pb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-black/35">{m.year}</span>
                  <p className={`text-xs font-semibold ${m.fill?"text-[#122023]":"text-black/35"}`}>{m.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

function HowItWorks() {
  return (
    <section className="bg-[#f0f0ee] py-[150px]">
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10">
          <div className="mb-16">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-black/35">How it works</span>
            <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-[#122023] md:text-5xl">
              Four steps from data to decision
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {HOW_STEPS.map((step) => (
              <div
                key={step.tag}
                className="group flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-[#f7f7f5] transition-all duration-300 hover:shadow-[0_16px_56px_rgba(0,0,0,0.08)]"
              >
                {/* Tag — top left */}
                <div className="px-8 pt-8">
                  <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#122023]/40">
                    {step.tag}
                  </span>
                </div>

                {/* Visual — tall zone */}
                <div className="min-h-[300px] flex-1">
                  {step.visual}
                </div>

                {/* Copy + CTA — bottom */}
                <div className="flex items-end justify-between gap-6 border-t border-black/[0.06] px-8 py-7">
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-[#122023]">
                      {step.heading}
                    </h3>
                    <p className="text-sm leading-relaxed text-black/48">{step.desc}</p>
                  </div>
                  <a
                    href="/solutions"
                    className="shrink-0 flex items-center gap-1.5 rounded-full border border-[#122023]/15 bg-[#122023] px-5 py-2.5 text-sm font-semibold text-[#e1fcad] transition-all duration-200 hover:bg-[#1a3038] whitespace-nowrap"
                  >
                    {step.cta}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
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

// ── How It Works — Planar-style feature cards ─────────────────────────────────
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
    <section className="flex h-[728px] w-full overflow-hidden">
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
            <h2 className="max-w-sm text-4xl font-normal leading-[1.08] tracking-[-0.03em] md:text-5xl lg:text-[56px]">
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

// ── Architecture / Technical Layer ────────────────────────────────────────────
// Isometric box geometry helper — all values in SVG pixels
// cx,cy = center of bottom face; a = half-width; b = half-depth; h = height
function isoFaces(cx: number, cy: number, a: number, b: number, h: number) {
  const p = (x: number, y: number) => `${x},${y}`;
  // key vertices
  const front   = p(cx,    cy);
  const right   = p(cx+a,  cy-b);
  const left    = p(cx-a,  cy-b);
  const ft      = p(cx,    cy-h);
  const rt      = p(cx+a,  cy-b-h);
  const bt      = p(cx,    cy-2*b-h);
  const lt      = p(cx-a,  cy-b-h);
  return {
    shadow: `${p(cx-a,cy-b)} ${p(cx,cy-2*b)} ${p(cx+a,cy-b)} ${front}`,
    left:   `${front} ${ft} ${lt} ${left}`,
    right:  `${front} ${right} ${rt} ${ft}`,
    top:    `${lt} ${bt} ${rt} ${ft}`,
    // For icon centering on top face
    iconX: cx, iconY: cy - 2*b - h + (b + h * 0.5),
    // For label below
    labelX: cx, labelY: cy + 18,
    // Glow centre (back-top)
    glowX: cx, glowY: cy - 2*b - h,
  };
}

// 4 pipeline stages — positioned in a diagonal from bottom-left to top-right
const PIPELINE = [
  { id:"01", label:"Data Ingestion",      sub:"Raw source collection",       color:"#e1fcad",
    cx:165, cy:370, a:60, b:30, h:80  },
  { id:"02", label:"Processing Engine",   sub:"AI carbon calculation",       color:"#7dd3fc",
    cx:360, cy:315, a:65, b:32, h:110 },
  { id:"03", label:"Insight Layer",       sub:"Live dashboards & forecasts", color:"#e879f9",
    cx:555, cy:345, a:60, b:30, h:80  },
  { id:"04", label:"Compliance",          sub:"Audit-ready reports",         color:"#6ee7b7",
    cx:740, cy:290, a:60, b:30, h:90  },
] as const;

// Pre-compute all faces
const FACES = PIPELINE.map(b => ({ ...b, ...isoFaces(b.cx, b.cy, b.a, b.b, b.h) }));

// Connector rails (parallelogram bridging adjacent box faces)
// Each rail: top-left, top-right, bottom-right, bottom-left (left→right reading)
// Box1 right-face top=(225,260) bottom=(225,340) → Box2 left-face top=(295,173) bottom=(295,283)
const RAILS = [
  { pts:"225,260 295,173 295,283 225,340", midPath:"M225,300 L295,228", color:"#e1fcad" },
  // Box2 right top=(425,173) bottom=(425,283) → Box3 left top=(495,235) bottom=(495,315)
  { pts:"425,173 495,235 495,315 425,283", midPath:"M425,228 L495,275", color:"#7dd3fc" },
  // Box3 right top=(615,235) bottom=(615,315) → Box4 left top=(680,170) bottom=(680,260)
  { pts:"615,235 680,170 680,260 615,315", midPath:"M615,275 L680,215", color:"#e879f9" },
];

// Small SVG icons drawn at centre of each top face
function BoxIcon({ id, x, y, color }: { id: string; x: number; y: number; color: string }) {
  if (id === "01") return (
    <g transform={`translate(${x-10},${y-8})`}>
      <rect x="0" y="0"  width="20" height="4" rx="2" fill={color} fillOpacity="0.8"/>
      <rect x="0" y="6"  width="20" height="4" rx="2" fill={color} fillOpacity="0.55"/>
      <rect x="0" y="12" width="20" height="4" rx="2" fill={color} fillOpacity="0.3"/>
    </g>
  );
  if (id === "02") return (
    <g transform={`translate(${x-9},${y-9})`}>
      <circle cx="9" cy="9" r="7.5" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.8"/>
      <circle cx="9" cy="9" r="3"   fill={color} fillOpacity="0.7"/>
      <line x1="9" y1="0"  x2="9" y2="3"  stroke={color} strokeWidth="1.5" strokeOpacity="0.6"/>
      <line x1="9" y1="15" x2="9" y2="18" stroke={color} strokeWidth="1.5" strokeOpacity="0.6"/>
      <line x1="0" y1="9"  x2="3" y2="9"  stroke={color} strokeWidth="1.5" strokeOpacity="0.6"/>
      <line x1="15" y1="9" x2="18" y2="9" stroke={color} strokeWidth="1.5" strokeOpacity="0.6"/>
    </g>
  );
  if (id === "03") return (
    <g transform={`translate(${x-10},${y-9})`}>
      <rect x="0"  y="10" width="5" height="8"  rx="1.5" fill={color} fillOpacity="0.9"/>
      <rect x="7"  y="5"  width="5" height="13" rx="1.5" fill={color} fillOpacity="0.65"/>
      <rect x="14" y="0"  width="5" height="18" rx="1.5" fill={color} fillOpacity="0.4"/>
    </g>
  );
  // 04 — shield check
  return (
    <g transform={`translate(${x-8},${y-9})`}>
      <path d="M8 0 L16 3 L16 10 C16 14 8 18 8 18 C8 18 0 14 0 10 L0 3 Z"
        fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.8" strokeLinejoin="round"/>
      <polyline points="4,9 7,12 12,6" fill="none" stroke={color} strokeWidth="1.5"
        strokeLinecap="round" strokeOpacity="0.85"/>
    </g>
  );
}

function Architecture() {
  return (
    <section className="overflow-hidden bg-[#0a1618] py-[150px]">
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10">

          {/* Header */}
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#e1fcad]/50">
                Platform architecture
              </span>
              <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-5xl">
                Four layers,<br />
                <span className="text-white/25">one clean pipeline</span>
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-white/35 lg:pb-1 lg:text-right">
              From raw data to audited report — every step is automated, traceable, and built on open standards.
            </p>
          </div>

          {/* ── Isometric diagram ── */}
          <div className="overflow-hidden rounded-3xl border border-white/[0.06]"
            style={{ background: "linear-gradient(160deg,#0d1f23 0%,#091316 100%)" }}>
            <svg viewBox="0 0 900 460" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Isometric diamond tile for floor grid */}
                <pattern id="arch-grid" x="0" y="0" width="120" height="60" patternUnits="userSpaceOnUse">
                  <path d="M60 0 L120 30 L60 60 L0 30 Z"
                    fill="none" stroke="rgba(225,252,173,0.045)" strokeWidth="0.6"/>
                </pattern>
                {/* Glow filter */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Floor grid — lower two-thirds */}
              <rect x="0" y="200" width="900" height="260" fill="url(#arch-grid)"/>

              {/* Soft radial ambient behind each box */}
              {FACES.map(b => (
                <ellipse key={b.id} cx={b.cx} cy={b.cy - b.b} rx="80" ry="30"
                  fill={b.color} fillOpacity="0.04"/>
              ))}

              {/* Connection rails (drawn before boxes so boxes sit on top) */}
              {RAILS.map((r, i) => (
                <g key={i}>
                  <polygon points={r.pts}
                    fill={`${r.color}08`}
                    stroke={r.color} strokeOpacity="0.22" strokeWidth="0.8"/>
                  {/* Animated particle */}
                  <circle r="3.5" fill={r.color} fillOpacity="0">
                    <animateMotion path={r.midPath} dur="2.4s"
                      begin={`${i * 0.8}s`} repeatCount="indefinite"/>
                    <animate attributeName="fill-opacity"
                      values="0;0.9;0.9;0" dur="2.4s"
                      begin={`${i * 0.8}s`} repeatCount="indefinite"/>
                  </circle>
                  <circle r="2" fill={r.color} fillOpacity="0">
                    <animateMotion path={r.midPath} dur="2.4s"
                      begin={`${i * 0.8 + 1.2}s`} repeatCount="indefinite"/>
                    <animate attributeName="fill-opacity"
                      values="0;0.55;0.55;0" dur="2.4s"
                      begin={`${i * 0.8 + 1.2}s`} repeatCount="indefinite"/>
                  </circle>
                </g>
              ))}

              {/* Isometric boxes */}
              {FACES.map(b => (
                <g key={b.id}>
                  {/* Ground shadow */}
                  <polygon points={b.shadow} fill={b.color} fillOpacity="0.04"/>

                  {/* Left face — darkest */}
                  <polygon points={b.left}
                    fill={b.color} fillOpacity="0.05"
                    stroke={b.color} strokeOpacity="0.18" strokeWidth="0.8"/>

                  {/* Right face — medium */}
                  <polygon points={b.right}
                    fill={b.color} fillOpacity="0.09"
                    stroke={b.color} strokeOpacity="0.28" strokeWidth="0.8"/>

                  {/* Top face — brightest */}
                  <polygon points={b.top}
                    fill={b.color} fillOpacity="0.18"
                    stroke={b.color} strokeOpacity="0.65" strokeWidth="1"/>

                  {/* Glow highlight dot on top face back vertex */}
                  <circle cx={b.glowX} cy={b.glowY} r="4"
                    fill={b.color} fillOpacity="0.55" filter="url(#glow)"/>

                  {/* Icon */}
                  <BoxIcon id={b.id} x={b.iconX} y={b.iconY} color={b.color}/>

                  {/* Number badge above back-top */}
                  <text x={b.glowX} y={b.glowY - 14}
                    textAnchor="middle" fontSize="9" fontWeight="800"
                    letterSpacing="0.12em" fill={b.color} fillOpacity="0.5"
                    fontFamily="ui-monospace,monospace">
                    {b.id}
                  </text>

                  {/* Name label below front vertex */}
                  <text x={b.labelX} y={b.labelY}
                    textAnchor="middle" fontSize="11" fontWeight="700"
                    fill="white" fillOpacity="0.7" fontFamily="inherit">
                    {b.label}
                  </text>
                  <text x={b.labelX} y={b.labelY + 13}
                    textAnchor="middle" fontSize="9" fontWeight="500"
                    fill="white" fillOpacity="0.3" fontFamily="inherit">
                    {b.sub}
                  </text>
                </g>
              ))}

              {/* Flow direction arrow labels on rails */}
              <text x="260" y="218" textAnchor="middle" fontSize="8" fontWeight="600"
                fill="white" fillOpacity="0.2" letterSpacing="0.08em" fontFamily="inherit">
                →
              </text>
              <text x="460" y="220" textAnchor="middle" fontSize="8" fontWeight="600"
                fill="white" fillOpacity="0.2" letterSpacing="0.08em" fontFamily="inherit">
                →
              </text>
              <text x="648" y="213" textAnchor="middle" fontSize="8" fontWeight="600"
                fill="white" fillOpacity="0.2" letterSpacing="0.08em" fontFamily="inherit">
                →
              </text>

            </svg>
          </div>

          {/* Caption row */}
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4">
            {[
              { color:"#e1fcad", label:"Data Ingestion",    desc:"Meters, ERPs, APIs & supplier data unified automatically" },
              { color:"#7dd3fc", label:"Processing Engine",  desc:"AI-powered Scope 1–3 calculation with anomaly detection" },
              { color:"#e879f9", label:"Insight Layer",      desc:"Live dashboards, SBTi modelling and scenario planning" },
              { color:"#6ee7b7", label:"Compliance",         desc:"CSRD, GRI, CDP, TCFD filed with full source audit trail" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: item.color }}/>
                <div>
                  <p className="text-sm font-semibold text-white/75">{item.label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/35">{item.desc}</p>
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
      <TrustedByCarousel />
      <Capabilities />
      <HowItWorks />
      <Architecture />
      <ImpactStats />
      <DualVideoExplore />
      <BlogCallout />
      <Footer />
    </main>
  );
}
