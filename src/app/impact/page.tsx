import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { PrimaryCTA, GhostCTA } from "@/components/ui/cta";
import {
  Leaf, ArrowUpRight, TrendingDown, Globe, Zap, Users, TreePine,
  Wind, Sun, Droplets, Factory, CheckCircle2,
} from "lucide-react";

// ── Grid constants ────────────────────────────────────────────────────────────
const G   = "grid grid-cols-12";
const COL = "col-start-2 col-span-10";
const SEC = "py-[150px]";

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Hero ──────────────────────────────────────────────────────────────────────
function ImpactHero() {
  return (
    <section className="relative flex h-screen min-h-[700px] w-full flex-col justify-end">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1920&q=80)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1618] via-[#0a1618]/65 to-[#122023]/20" />
      </div>
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.38, mixBlendMode: "overlay" }}
      />

      {/* Content — pinned bottom */}
      <div className={`relative z-10 ${G} pb-16`}>
        <div className={COL}>
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-sm">
            <Leaf className="h-3.5 w-3.5 text-[#e1fcad]" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Impact Report 2024</span>
          </div>

          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            {/* Headline */}
            <div className="max-w-3xl">
              <h1 className="mb-6 text-5xl font-normal leading-[1.05] tracking-[-0.03em] text-white md:text-6xl lg:text-7xl">
                Turning data into
                <br />
                <span className="text-[#e1fcad]">measurable change</span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
                Every tonne of carbon tracked, every dollar of green finance mobilised, every organisation guided to net-zero — this is the real-world impact of Verdant.
              </p>
            </div>

            {/* Right: 3 quick hero stats */}
            <div className="flex shrink-0 flex-col gap-6 lg:items-end">
              {[
                { val: "2.4M", unit: "tonnes CO₂ avoided" },
                { val: "$8.2B", unit: "clean finance mobilised" },
                { val: "340+", unit: "projects worldwide" },
              ].map((s) => (
                <div key={s.unit} className="flex flex-col lg:items-end">
                  <span className="text-4xl font-normal tracking-[-0.03em] text-white">{s.val}</span>
                  <span className="text-sm text-white/40">{s.unit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom scrolling indicator */}
          <div className="mt-12 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-[0.18em] text-white/30">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Impact Numbers ─────────────────────────────────────────────────────────────
const NUMBERS = [
  {
    tag: "Carbon Avoided",
    value: "2.4M",
    unit: "tonnes CO₂e",
    delta: "↑ 34% YoY",
    desc: "Emissions avoided against business-as-usual baselines across all active projects.",
    icon: <TrendingDown className="h-6 w-6" />,
  },
  {
    tag: "Clean Finance",
    value: "$8.2B",
    unit: "mobilised",
    delta: "↑ 61% YoY",
    desc: "Capital directed into verified clean-energy and nature-based projects through Verdant-advised structures.",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    tag: "Global Projects",
    value: "340+",
    unit: "in 42 countries",
    delta: "↑ 28% YoY",
    desc: "Clean energy, reforestation, industrial decarbonisation, and sustainable agriculture projects.",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    tag: "Organisations",
    value: "15K+",
    unit: "teams on-platform",
    delta: "↑ 112% YoY",
    desc: "Companies actively tracking, reporting, and reducing their footprint with Verdant's intelligence layer.",
    icon: <Users className="h-6 w-6" />,
  },
];

function ImpactNumbers() {
  return (
    <section className={`bg-[#122023] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">By the numbers</span>
              <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-5xl">
                The scale of what we track
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-white/45 lg:text-right">
              Independently verified impact data updated in real time across every project in the Verdant network.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {NUMBERS.map((n) => (
              <div key={n.tag} className="flex flex-col gap-5 bg-[#122023] p-8 first:rounded-tl-2xl last:rounded-br-2xl">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#e1fcad]/10 text-[#e1fcad]">
                  {n.icon}
                </div>
                <div>
                  <span className="mb-1 block text-xs font-bold uppercase tracking-[0.15em] text-white/35">{n.tag}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-normal tracking-[-0.03em] text-white">{n.value}</span>
                    <span className="text-sm text-white/40">{n.unit}</span>
                  </div>
                  <span className="mt-1 block text-xs font-semibold text-[#e1fcad]/70">{n.delta}</span>
                </div>
                <p className="border-t border-white/8 pt-4 text-sm leading-relaxed text-white/40">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Project Categories ─────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    icon: <Wind className="h-7 w-7" />,
    name: "Wind & Solar",
    count: "124 projects",
    co2: "980K tonnes",
    finance: "$3.1B",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
  },
  {
    icon: <TreePine className="h-7 w-7" />,
    name: "Nature & Forests",
    count: "89 projects",
    co2: "740K tonnes",
    finance: "$1.8B",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  },
  {
    icon: <Factory className="h-7 w-7" />,
    name: "Industrial Decarbonisation",
    count: "67 projects",
    co2: "420K tonnes",
    finance: "$2.2B",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  },
  {
    icon: <Droplets className="h-7 w-7" />,
    name: "Sustainable Agriculture",
    count: "61 projects",
    co2: "260K tonnes",
    finance: "$1.1B",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  },
];

function ProjectCategories() {
  return (
    <section className={`bg-[#f7f7f5] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <div className="mb-16">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-black/35">Where impact happens</span>
            <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-[#122023] md:text-5xl">
              Four pillars of <br/>the green transition
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="group relative overflow-hidden rounded-3xl bg-white">
                {/* Image header */}
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[#0a1618]/55" />
                  {/* Grain */}
                  <div className="pointer-events-none absolute inset-0"
                    style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.4, mixBlendMode: "overlay" }} />
                  {/* Icon */}
                  <div className="absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-xl bg-[#e1fcad] text-[#122023]">
                    {cat.icon}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="mb-4 text-base font-semibold tracking-tight text-[#122023]">{cat.name}</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Projects", val: cat.count },
                      { label: "CO₂ avoided", val: cat.co2 },
                      { label: "Finance", val: cat.finance },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="text-xs font-semibold text-[#122023]">{s.val}</p>
                        <p className="text-[10px] text-black/38">{s.label}</p>
                      </div>
                    ))}
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

// ── Case Study spotlight ───────────────────────────────────────────────────────
const CASES = [
  {
    client: "Vestas",
    region: "Northern Europe",
    tag: "Wind Energy",
    headline: "1.2 GW offshore wind portfolio — tracked in real time",
    result: "−340K tonnes CO₂ per year · Scope 1 fully automated",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80",
    stat1: { val: "340K", label: "tonnes avoided/yr" },
    stat2: { val: "100%", label: "Scope 1 automated" },
  },
  {
    client: "Northvolt",
    region: "Sweden",
    tag: "Industrial",
    headline: "Battery gigafactory decarbonisation roadmap to 2030",
    result: "−22% energy intensity · $480M green finance secured",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80",
    stat1: { val: "−22%", label: "energy intensity" },
    stat2: { val: "$480M", label: "green finance" },
  },
];

function CaseStudies() {
  return (
    <section className={`bg-[#0f1e22] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">Case studies</span>
              <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-5xl">
                Proof, not promises
              </h2>
            </div>
            <GhostCTA label="View all case studies" dark href="#" />
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {CASES.map((c) => (
              <div key={c.client} className="group relative overflow-hidden rounded-3xl">
                {/* Background image */}
                <div className="relative min-h-[420px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1618] via-[#0a1618]/60 to-transparent" />
                  <div className="pointer-events-none absolute inset-0"
                    style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.35, mixBlendMode: "overlay" }} />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    {/* Top: tag + region */}
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/70 backdrop-blur-sm">
                        {c.tag}
                      </span>
                      <span className="text-xs text-white/40">{c.region}</span>
                    </div>

                    {/* Bottom: headline + stats */}
                    <div>
                      <p className="mb-1 text-sm font-bold text-[#e1fcad]">{c.client}</p>
                      <h3 className="mb-4 text-xl font-normal leading-snug tracking-tight text-white">{c.headline}</h3>
                      <p className="mb-6 text-sm text-white/50">{c.result}</p>

                      {/* Stat strip */}
                      <div className="flex items-center gap-8 border-t border-white/12 pt-5">
                        <div>
                          <p className="text-2xl font-normal tracking-tight text-white">{c.stat1.val}</p>
                          <p className="text-xs text-white/40">{c.stat1.label}</p>
                        </div>
                        <div>
                          <p className="text-2xl font-normal tracking-tight text-white">{c.stat2.val}</p>
                          <p className="text-xs text-white/40">{c.stat2.label}</p>
                        </div>
                        <div className="ml-auto flex size-10 items-center justify-center rounded-full border border-white/20 text-white/50 transition-all group-hover:border-[#e1fcad] group-hover:text-[#e1fcad]">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
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

// ── Methodology ───────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "Data ingestion",
    desc: "Real-time feeds from meters, ERPs, satellite imagery, and third-party verification bodies. No spreadsheets, no manual entry.",
  },
  {
    num: "02",
    title: "Baseline modelling",
    desc: "Verdant's AI constructs a business-as-usual baseline using sector benchmarks, historical data, and IPCC-aligned pathways.",
  },
  {
    num: "03",
    title: "Additionality assessment",
    desc: "Each intervention is tested for additionality — would the emission reduction have happened without the project? Rigorous, defensible, auditable.",
  },
  {
    num: "04",
    title: "Third-party verification",
    desc: "All reported impact is validated by independent verifiers against GHG Protocol, ISO 14064, and Verra VCS standards.",
  },
];

function Methodology() {
  return (
    <section className={`bg-white ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
            {/* Left: copy */}
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-black/35">Methodology</span>
              <h2 className="mb-6 text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-[#122023] md:text-5xl">
                Impact you can defend in an audit
              </h2>
              <p className="mb-8 text-base leading-relaxed text-black/50">
                Every number in our impact reports is traceable to a data source, a model, and a verifier. Verdant does not publish estimates — only independently validated outcomes.
              </p>
              <div className="flex flex-col gap-3">
                {["GHG Protocol aligned", "ISO 14064 certified", "Verra VCS registered", "TCFD ready reporting"].map((l) => (
                  <div key={l} className="flex items-center gap-3 text-sm text-black/60">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#4a7c59]" />
                    {l}
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <GhostCTA label="Read the full methodology" href="#" />
              </div>
            </div>

            {/* Right: steps */}
            <div className="flex flex-col gap-0">
              {STEPS.map((s, i) => (
                <div key={s.num} className={`flex gap-6 py-8 ${i < STEPS.length - 1 ? "border-b border-black/06" : ""}`}>
                  <span className="shrink-0 font-mono text-xs font-semibold tracking-[0.14em] text-black/25 pt-0.5">{s.num}</span>
                  <div>
                    <h3 className="mb-2 text-base font-semibold tracking-tight text-[#122023]">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-black/48">{s.desc}</p>
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

// ── Global Reach (SVG world dots) ─────────────────────────────────────────────
const REGIONS = [
  { name: "Northern Europe", projects: 89, co2: "680K t" },
  { name: "North America", projects: 72, co2: "520K t" },
  { name: "South & SE Asia", projects: 61, co2: "410K t" },
  { name: "Latin America", projects: 58, co2: "380K t" },
  { name: "Sub-Saharan Africa", projects: 34, co2: "250K t" },
  { name: "Middle East", projects: 26, co2: "160K t" },
];

function GlobalReach() {
  return (
    <section className={`relative overflow-hidden bg-[#122023] ${SEC}`}>
      {/* Grain */}
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.3, mixBlendMode: "overlay" }} />

      <div className={`relative z-10 ${G}`}>
        <div className={COL}>
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">Geographic reach</span>
            <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-5xl">
              42 countries, one platform
            </h2>
          </div>

          {/* Region grid */}
          <div className="grid grid-cols-2 gap-px bg-white/8 sm:grid-cols-3 lg:grid-cols-6">
            {REGIONS.map((r) => (
              <div key={r.name} className="flex flex-col gap-3 bg-[#122023] p-6 text-center">
                <p className="text-2xl font-normal tracking-tight text-white">{r.projects}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">{r.name}</p>
                <div className="mx-auto h-px w-8 bg-[#e1fcad]/20" />
                <p className="text-xs text-[#e1fcad]/55">{r.co2} avoided</p>
              </div>
            ))}
          </div>

          {/* World map SVG (simplified dot-grid visual) */}
          <div className="mt-16 overflow-hidden rounded-3xl border border-white/8 bg-[#0a1618] p-8">
            <svg viewBox="0 0 900 380" fill="none" className="w-full opacity-60">
              {/* Simplified continent dot clusters */}
              {/* North America */}
              {[[120,80],[140,95],[130,110],[155,100],[170,90],[165,120],[140,130]].map(([x,y],i)=>(
                <circle key={`na${i}`} cx={x} cy={y} r="3.5" fill="#e1fcad" fillOpacity="0.5"/>
              ))}
              {/* Europe */}
              {[[420,65],[440,72],[430,82],[450,80],[460,70],[455,88],[435,90],[445,95]].map(([x,y],i)=>(
                <circle key={`eu${i}`} cx={x} cy={y} r="3.5" fill="#e1fcad" fillOpacity="0.5"/>
              ))}
              {/* Africa */}
              {[[440,140],[450,155],[445,170],[455,185],[440,200],[460,170],[435,185]].map(([x,y],i)=>(
                <circle key={`af${i}`} cx={x} cy={y} r="3.5" fill="#e1fcad" fillOpacity="0.35"/>
              ))}
              {/* Asia */}
              {[[600,80],[620,90],[640,85],[660,95],[650,110],[630,105],[605,100],[680,80]].map(([x,y],i)=>(
                <circle key={`as${i}`} cx={x} cy={y} r="3.5" fill="#e1fcad" fillOpacity="0.5"/>
              ))}
              {/* South America */}
              {[[200,180],[215,195],[210,215],[220,230],[205,245],[225,210]].map(([x,y],i)=>(
                <circle key={`sa${i}`} cx={x} cy={y} r="3.5" fill="#e1fcad" fillOpacity="0.4"/>
              ))}
              {/* Australia */}
              {[[720,230],[740,240],[730,255],[750,245],[755,230]].map(([x,y],i)=>(
                <circle key={`au${i}`} cx={x} cy={y} r="3.5" fill="#e1fcad" fillOpacity="0.35"/>
              ))}
              {/* Pulse rings on key project hubs */}
              <circle cx="140" cy="95" r="12" stroke="#e1fcad" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
              <circle cx="140" cy="95" r="20" stroke="#e1fcad" strokeOpacity="0.10" strokeWidth="1" fill="none"/>
              <circle cx="440" cy="72" r="12" stroke="#e1fcad" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
              <circle cx="440" cy="72" r="20" stroke="#e1fcad" strokeOpacity="0.10" strokeWidth="1" fill="none"/>
              <circle cx="630" cy="92" r="12" stroke="#e1fcad" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
              <circle cx="630" cy="92" r="20" stroke="#e1fcad" strokeOpacity="0.10" strokeWidth="1" fill="none"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 2024 Milestones timeline ──────────────────────────────────────────────────
const MILESTONES = [
  { date: "Jan 2024", title: "Net-zero baseline launched", desc: "First platform to offer AI-generated net-zero baselines against IPCC 1.5°C pathways in under 60 seconds." },
  { date: "Mar 2024", title: "1M tonne milestone", desc: "Verdant-tracked projects collectively crossed 1 million tonnes of verified CO₂ avoidance." },
  { date: "Jun 2024", title: "EU taxonomy alignment", desc: "Full SFDR and EU Taxonomy reporting module shipped, making Verdant the first platform with native taxonomy mapping." },
  { date: "Sep 2024", title: "$8B in green finance", desc: "Cumulative capital mobilised through Verdant-connected projects crossed $8 billion." },
  { date: "Nov 2024", title: "15K organisations", desc: "Verdant crossed 15,000 active organisations — from SMEs to FTSE 100 companies — all tracking emissions live." },
];

function Milestones() {
  return (
    <section className={`bg-[#f7f7f5] ${SEC}`}>
      <div className={G}>
        <div className={COL}>
          <div className="mb-16">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-black/35">2024 Milestones</span>
            <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-[#122023] md:text-5xl">
              A year of compounding progress
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div className="absolute left-[7.5rem] top-0 hidden h-full w-px bg-black/08 lg:block" />

            {MILESTONES.map((m, i) => (
              <div key={m.date} className={`flex flex-col gap-3 py-8 lg:flex-row lg:gap-16 ${i < MILESTONES.length - 1 ? "border-b border-black/06" : ""}`}>
                {/* Date */}
                <div className="shrink-0 lg:w-[7rem]">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-black/35">{m.date}</span>
                </div>
                {/* Dot */}
                <div className="relative hidden shrink-0 lg:flex lg:items-start lg:pt-0.5">
                  <div className="relative z-10 flex size-4 items-center justify-center rounded-full border-2 border-[#4a7c59] bg-[#f7f7f5]">
                    <div className="size-1.5 rounded-full bg-[#4a7c59]" />
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-[#122023]">{m.title}</h3>
                  <p className="text-sm leading-relaxed text-black/48">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
function ImpactCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0a1618] py-[150px]">
      {/* Grain */}
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.35, mixBlendMode: "overlay" }} />
      <div className={`relative z-10 ${G}`}>
        <div className={`${COL} text-center`}>
          <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-full bg-[#e1fcad]">
            <Leaf className="h-7 w-7 text-[#122023]" />
          </div>
          <h2 className="mx-auto mb-6 max-w-2xl text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-5xl">
            Add your organisation to the impact
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-base leading-relaxed text-white/45">
            Join 15,000+ organisations tracking, reporting, and reducing emissions with Verdant's intelligence layer.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <PrimaryCTA label="Start for free" href="/product" />
            <GhostCTA label="Talk to an expert" dark href="#" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ImpactPage() {
  return (
    <>
      <Navbar />
      <ImpactHero />
      <ImpactNumbers />
      <ProjectCategories />
      <CaseStudies />
      <Methodology />
      <GlobalReach />
      <Milestones />
      <ImpactCTA />
      <Footer />
    </>
  );
}
