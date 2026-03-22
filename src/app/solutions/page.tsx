"use client";

import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import TestimonialsCarousel from "@/components/ui/testimonials-carousel";
import { PrimaryCTA, GhostCTA } from "@/components/ui/cta";
import {
  Leaf,
  ArrowUpRight,
  CheckCircle2,
  BarChart3,
  FileCheck,
  Network,
  TrendingUp,
  ChevronRight,
  Globe,
  ShieldCheck,
  Zap,
  Clock,
  MapPin,
} from "lucide-react";
import BlogCallout from "@/components/ui/blog-callout";
import TrustedBy from "@/components/ui/trusted-by";

// ─────────────────────────────────────────────────────────────────────────────
//  12-column grid constants
// ─────────────────────────────────────────────────────────────────────────────
const G   = "grid grid-cols-12";
const COL = "col-start-2 col-span-10";

// Grain texture
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ─────────────────────────────────────────────────────────────────────────────
//  Solution tabs
// ─────────────────────────────────────────────────────────────────────────────
const SOLUTIONS = [
  { id: "carbon",     label: "Carbon Intelligence",   icon: BarChart3   },
  { id: "reporting",  label: "Compliance Reporting",  icon: FileCheck   },
  { id: "supply",     label: "Supply Chain",          icon: Network     },
  { id: "strategy",   label: "Strategy Planner",      icon: TrendingUp  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Value propositions per solution
// ─────────────────────────────────────────────────────────────────────────────
const VALUE_PROPS: Record<string, { icon: string; title: string; desc: string }[]> = {
  carbon: [
    { icon: "01", title: "See every tonne in real time", desc: "Live dashboards across Scope 1, 2, and 3. No more waiting for last quarter's report to understand where you stand today." },
    { icon: "02", title: "Cut analysis from weeks to minutes", desc: "Ask plain-English questions, get board-ready answers instantly. Verdant AI does the heavy lifting so your team doesn't have to." },
    { icon: "03", title: "Eliminate data errors permanently", desc: "Automated ingestion from your existing ERP, utilities, and IoT systems. One source of truth, always reconciled." },
  ],
  reporting: [
    { icon: "01", title: "CSRD-ready on day one", desc: "Pre-built ESRS templates auto-populate from your live data. Submit to auditors in hours, not months." },
    { icon: "02", title: "GHG Protocol & SBTi aligned", desc: "Every calculation follows the latest methodologies. Flag divergences automatically before they become compliance risks." },
    { icon: "03", title: "Audit trail built in", desc: "Every data point, assumption, and edit is logged. Satisfy auditors and regulators with a single click." },
  ],
  supply: [
    { icon: "01", title: "Open the Scope 3 black box", desc: "Attribute every tonne of CO₂ back to its source across your entire supplier network — automatically, without endless surveys." },
    { icon: "02", title: "Supplier scorecards at scale", desc: "Rank, engage, and track thousands of suppliers simultaneously. Prioritise the interventions that move the needle most." },
    { icon: "03", title: "Flag risk before it lands", desc: "Predictive alerts surface high-emission suppliers and regulation changes before they become your problem." },
  ],
  strategy: [
    { icon: "01", title: "Model any decarbonisation path", desc: "Run unlimited scenario simulations — technology shifts, carbon pricing, policy changes — and see the financial impact instantly." },
    { icon: "02", title: "Financially rigorous roadmaps", desc: "Every recommendation comes with NPV, payback period, and risk-adjusted cost of carbon. Built for the CFO, not just the CSO." },
    { icon: "03", title: "Roadmaps that update themselves", desc: "As your data, targets, and market conditions change, your strategy re-optimises automatically. Always current, always credible." },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
//  How-it-works steps per solution
// ─────────────────────────────────────────────────────────────────────────────
const HOW_IT_WORKS: Record<string, { num: string; title: string; desc: string; img: string }[]> = {
  carbon: [
    { num: "01", title: "Connect your data sources", desc: "Forward emails, upload spreadsheets, or connect directly via API to your ERP, utility portals, and IoT sensors. No custom integration work required.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85" },
    { num: "02", title: "AI maps and classifies emissions", desc: "Our model automatically identifies emission sources, applies the correct GHG Protocol category, and fills data gaps using industry benchmarks where actuals aren't available.", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=85" },
    { num: "03", title: "Analyse, forecast & model scenarios", desc: "Explore your footprint from every angle. Set reduction targets, model interventions, and forecast your trajectory — with full financial impact at every step.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85" },
    { num: "04", title: "Report with confidence", desc: "Generate CSRD, CDP, and custom board reports with one click. Every figure is traceable, auditable, and formatted exactly as your stakeholders expect.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85" },
  ],
  reporting: [
    { num: "01", title: "Map your reporting obligations", desc: "Tell us your jurisdictions, frameworks, and deadlines. Verdant builds your compliance calendar and flags every requirement you need to satisfy.", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=85" },
    { num: "02", title: "Auto-populate templates", desc: "Live data flows directly into ESRS, CDP, and GRI templates. Fields that need human input are clearly flagged — nothing slips through the cracks.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85" },
    { num: "03", title: "Review, annotate & approve", desc: "A collaborative workspace where finance, legal, and sustainability teams review the same document simultaneously. Version control built in.", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85" },
    { num: "04", title: "Submit and archive", desc: "One-click submission to regulators and a permanent, tamper-proof archive. Your audit trail is complete the moment you press send.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85" },
  ],
  supply: [
    { num: "01", title: "Ingest your supplier list", desc: "Upload your procurement data or connect directly to your ERP. Verdant enriches each supplier with sector benchmarks and publicly available emissions data instantly.", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=85" },
    { num: "02", title: "AI scores and prioritises", desc: "Every supplier is ranked by emissions intensity, data quality, and reduction potential. Focus your engagement where it matters most, not just the loudest voices.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85" },
    { num: "03", title: "Run targeted engagement campaigns", desc: "Send data collection requests, share reduction guidance, and track responses — all from within Verdant. No more supplier survey spreadsheet hell.", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=85" },
    { num: "04", title: "Report Scope 3 Category 1 with confidence", desc: "Publish verified, methodology-aligned Scope 3 data to your sustainability report, CDP submission, or SBTi progress update in minutes.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85" },
  ],
  strategy: [
    { num: "01", title: "Baseline your full footprint", desc: "Before you can plan the path, you need to know where you're starting. Verdant builds a complete, audited baseline across all scopes automatically.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85" },
    { num: "02", title: "Set science-aligned targets", desc: "Model 1.5°C, well-below-2°C, and net-zero scenarios. Verdant checks alignment with SBTi criteria and flags gaps before you publish your commitment.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85" },
    { num: "03", title: "Build your decarbonisation roadmap", desc: "Choose from 200+ intervention levers — renewables, fleet electrification, supplier switching, carbon removal — and build a financially optimised sequence.", img: "https://images.unsplash.com/photo-1504711331083-9c895941bf81?w=900&q=85" },
    { num: "04", title: "Track, update and communicate progress", desc: "Your roadmap stays live. As actuals come in, targets shift, or new interventions become available, Verdant updates your plan and keeps your stakeholders current.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
//  Stats
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "2.4M",   label: "Tonnes CO₂ avoided",      sub: "across all customers",        icon: <Leaf className="h-5 w-5" /> },
  { value: "90%+",   label: "Data error reduction",     sub: "vs. manual processes",        icon: <ShieldCheck className="h-5 w-5" /> },
  { value: "60%",    label: "Faster reporting cycle",   sub: "first report to signed-off",  icon: <Zap className="h-5 w-5" /> },
  { value: "2+ hrs", label: "Saved daily per analyst",  sub: "reclaimed for strategy",      icon: <Clock className="h-5 w-5" /> },
  { value: "42",     label: "Countries deployed",       sub: "across 5 continents",         icon: <MapPin className="h-5 w-5" /> },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Integrations
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
//  Hero — matches site design system: full-screen dark, content pinned bottom
// ─────────────────────────────────────────────────────────────────────────────
const HERO_CONTENT: Record<string, {
  line1: string; accent: string; desc: string; img: string;
  stats: { val: string; unit: string; label: string }[];
}> = {
  carbon: {
    line1:  "Real-time carbon",
    accent: "intelligence",
    desc:   "Know every source of emissions the moment it happens — not next quarter. Verdant connects your existing tools and delivers a live, auditable carbon picture across Scope 1, 2, and 3.",
    img:    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=85",
    stats:  [
      { val: "2.4M", unit: "tonnes", label: "CO₂ avoided annually" },
      { val: "Scope 1–3", unit: "", label: "Full footprint visibility" },
      { val: "< 1 day", unit: "", label: "From connect to insight" },
    ],
  },
  reporting: {
    line1:  "Compliance reporting,",
    accent: "done in hours",
    desc:   "Auto-populate CSRD, CDP, and GRI templates from live data. Collaborative review, one-click submission, permanent audit trail — every regulator satisfied.",
    img:    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=85",
    stats:  [
      { val: "60%", unit: "faster", label: "Reporting cycle" },
      { val: "100%", unit: "", label: "Audit-trail coverage" },
      { val: "12+", unit: "frameworks", label: "CSRD, CDP, GRI & more" },
    ],
  },
  supply: {
    line1:  "Open the Scope 3",
    accent: "black box",
    desc:   "Attribute every tonne of CO₂ back to its supplier source — without drowning in surveys. Prioritise the right interventions and move your value chain faster.",
    img:    "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920&q=85",
    stats:  [
      { val: "3×", unit: "visibility", label: "Supply chain coverage" },
      { val: "80%", unit: "less", label: "Supplier survey burden" },
      { val: "$8M", unit: "", label: "Avoided compliance risk" },
    ],
  },
  strategy: {
    line1:  "Net-zero roadmaps,",
    accent: "financially rigorous",
    desc:   "Model any decarbonisation scenario, optimise interventions by financial return, and track live progress. A strategy that updates itself as conditions change.",
    img:    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85",
    stats:  [
      { val: "200+", unit: "levers", label: "Decarbonisation options" },
      { val: "SBTi", unit: "aligned", label: "Science-based targets" },
      { val: "Real-time", unit: "", label: "Roadmap that self-updates" },
    ],
  },
};

function SolutionsHero({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const h = HERO_CONTENT[active];

  return (
    <section className="relative flex h-screen min-h-[700px] w-full flex-col justify-end">

      {/* ── Background photo ── */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${h.img})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1618] via-[#0a1618]/65 to-[#122023]/20" />
      </div>

      {/* ── Grain ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.35, mixBlendMode: "overlay" }}
      />

      {/* ── Content — pinned to bottom ── */}
      <div className={`relative z-10 w-full pb-24`}>
        <div className={G}>
          <div className={COL}>

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 backdrop-blur-sm">
              <Leaf className="h-3.5 w-3.5 text-[#e1fcad]" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                Verdant Solutions
              </span>
            </div>

            {/* Solution tab switcher */}
            <div className="mb-10 flex flex-wrap gap-2">
              {SOLUTIONS.map((sol) => {
                const Icon = sol.icon;
                const isActive = sol.id === active;
                return (
                  <button
                    key={sol.id}
                    onClick={() => setActive(sol.id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#e1fcad] text-[#122023]"
                        : "border border-white/15 text-white/45 hover:border-white/30 hover:text-white/80"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {sol.label}
                  </button>
                );
              })}
            </div>

            {/* Headline + desc/CTA split */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <h1 className="max-w-3xl text-5xl font-normal leading-[1.04] tracking-[-0.03em] text-white md:text-6xl lg:text-[68px]">
                {h.line1}{" "}
                <span className="text-[#e1fcad]">{h.accent}</span>
              </h1>

              <div className="flex shrink-0 flex-col items-start gap-5 lg:items-end">
                <p className="max-w-xs text-base leading-relaxed text-white/45 lg:text-right">
                  {h.desc}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <PrimaryCTA label="Book a demo" href="#" />
                  <GhostCTA label="See it in action" href="#" dark />
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div className="mt-14 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-8">
              {h.stats.map((s, i) => (
                <div key={i} className={`${i > 0 ? "pl-8" : ""} ${i < 2 ? "pr-8" : ""}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-normal tracking-[-0.03em] text-[#e1fcad]">{s.val}</span>
                    {s.unit && (
                      <span className="text-sm uppercase tracking-widest text-white/30">{s.unit}</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-white/40">{s.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Value proposition cards
// ─────────────────────────────────────────────────────────────────────────────
function ValueProps({ active }: { active: string }) {
  const props = VALUE_PROPS[active];
  return (
    <section className="border-b border-black/[0.06] bg-white">
      <div className={G}>
        <div className={`${COL} grid grid-cols-1 divide-y divide-black/[0.06] md:grid-cols-3 md:divide-x md:divide-y-0`}>
          {props.map((p) => (
            <div key={p.icon} className="flex flex-col gap-5 px-0 py-10 md:px-8 md:first:pl-0 md:last:pr-0">
              <span className="font-mono text-xs font-bold tracking-[0.16em] text-[#4a7c59]">{p.icon}</span>
              <div>
                <h3 className="mb-2.5 text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#122023]">
                  {p.title}
                </h3>
                <p className="text-base leading-relaxed text-black/45">{p.desc}</p>
              </div>
              <a href="#" className="group mt-auto flex w-fit items-center gap-1.5 text-sm font-semibold text-[#4a7c59] transition-colors hover:text-[#122023]">
                Learn more
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Capability cards — identical pattern to Impact's ProjectCategories
// ─────────────────────────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    icon: <BarChart3 className="h-7 w-7" />,
    name: "Carbon Intelligence",
    stat1: { label: "Coverage",     val: "Scope 1–3" },
    stat2: { label: "Data sources", val: "50+" },
    stat3: { label: "Time to live", val: "< 1 day" },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    icon: <FileCheck className="h-7 w-7" />,
    name: "Compliance Reporting",
    stat1: { label: "Frameworks",      val: "12+" },
    stat2: { label: "Reporting cycle", val: "−60%" },
    stat3: { label: "Audit trail",     val: "100%" },
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  },
  {
    icon: <Network className="h-7 w-7" />,
    name: "Supply Chain",
    stat1: { label: "Scope 3 coverage", val: "3×" },
    stat2: { label: "Survey burden",    val: "−80%" },
    stat3: { label: "Suppliers scored", val: "Auto" },
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&q=80",
  },
  {
    icon: <TrendingUp className="h-7 w-7" />,
    name: "Strategy Planner",
    stat1: { label: "Scenario levers", val: "200+" },
    stat2: { label: "Target standard", val: "SBTi" },
    stat3: { label: "Roadmap",         val: "Live" },
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
];

function FeatureCards() {
  return (
    <section className="bg-[#f7f7f5] py-[150px]">
      <div className={G}>
        <div className={COL}>

          <div className="mb-16">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-black/35">
              What we solve
            </span>
            <h2 className="text-5xl font-normal leading-[1.06] tracking-[-0.03em] text-[#122023] md:text-6xl">
              Four capabilities,<br />one platform.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((cap) => (
              <div key={cap.name} className="group relative overflow-hidden rounded-3xl bg-white">

                {/* Image header */}
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cap.image} alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0a1618]/55" />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.4, mixBlendMode: "overlay" }}
                  />
                  {/* Icon badge */}
                  <div className="absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-xl bg-[#e1fcad] text-[#122023]">
                    {cap.icon}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="mb-5 text-base font-semibold tracking-tight text-[#122023]">{cap.name}</h3>
                  <div className="grid grid-cols-3 gap-3 border-t border-black/[0.06] pt-4">
                    {[cap.stat1, cap.stat2, cap.stat3].map((s) => (
                      <div key={s.label}>
                        <p className="text-sm font-semibold text-[#122023]">{s.val}</p>
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

// ─────────────────────────────────────────────────────────────────────────────
//  How it works — 2-col Methodology layout (mirrors Impact page)
// ─────────────────────────────────────────────────────────────────────────────
function HowItWorks({ active }: { active: string }) {
  const steps = HOW_IT_WORKS[active];

  // Concise intro per solution
  const INTROS: Record<string, string> = {
    carbon:    "Connect your existing tools in minutes. Verdant maps every emission source automatically — no custom integration work, no spreadsheet wrangling.",
    reporting: "From compliance calendar to signed-off submission, Verdant handles the heavy lifting so your team focuses on decisions, not data entry.",
    supply:    "Upload your supplier list and let Verdant do the rest. Scoring, engagement, and verified Scope 3 reporting — all in one workflow.",
    strategy:  "Start with a complete audited baseline, model the optimal path to net zero, and track live progress against your published commitment.",
  };

  return (
    <section className="relative overflow-hidden bg-[#0f1e22] py-[150px]">
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", mixBlendMode: "overlay" }}
      />

      <div className={`relative z-10 ${G}`}>
        <div className={COL}>

          {/* ── 2-col body — mirrors Impact Methodology ── */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr_3fr] lg:items-start">

            {/* Left: label + heading + intro + CTA (sticky) */}
            <div className="lg:sticky lg:top-28">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">
                How it works
              </span>
              <h2 className="mb-6 text-5xl font-normal leading-[1.06] tracking-[-0.03em] text-white md:text-6xl">
                Four steps to{" "}
                <span className="text-[#e1fcad]/60">full clarity</span>
              </h2>
              <p className="mb-10 text-base leading-relaxed text-white/50">
                {INTROS[active]}
              </p>

              {/* Standards badges */}
              <div className="mb-10 flex flex-col gap-3">
                {["GHG Protocol aligned", "ISO 14064 certified", "CSRD & TCFD ready", "SOC 2 Type II"].map((l) => (
                  <div key={l} className="flex items-center gap-3 text-base text-white/55">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#4a7c59]" />
                    {l}
                  </div>
                ))}
              </div>

              <a
                href="/product"
                className="group inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white/60 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                See full demo
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e1fcad] text-[#122023] transition-colors duration-200 group-hover:bg-[#d4f59a]">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </div>

            {/* Right: numbered step list — all steps always visible */}
            <div className="flex flex-col">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className={`group flex gap-6 py-10 ${i < steps.length - 1 ? "border-b border-white/[0.10]" : ""}`}
                >
                  {/* Step counter — larger, lime, clear visual anchor */}
                  <div className="shrink-0 pt-1">
                    <span className="font-mono text-[13px] font-bold tracking-[0.18em] text-[#e1fcad]/50">
                      {s.num}
                    </span>
                  </div>

                  {/* Content — clear 3-level hierarchy */}
                  <div className="min-w-0 flex-1">
                    {/* Title — dominant, large, scannable */}
                    <h3 className="mb-3 text-2xl font-semibold leading-snug tracking-[-0.02em] text-white">
                      {s.title}
                    </h3>
                    {/* Description — clearly subordinate: smaller, muted */}
                    <p className="text-base leading-relaxed text-white/45">{s.desc}</p>
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

// ─────────────────────────────────────────────────────────────────────────────
//  Stats bar
// ─────────────────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="bg-[#122023] py-[120px]">
      <div className={G}>
        <div className={COL}>
          <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">By the numbers</span>
              <h2 className="text-5xl font-normal leading-[1.06] tracking-[-0.03em] text-white md:text-6xl">
                The impact of switching to Verdant
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/40 lg:text-right">
              Aggregated across all active customers on the Verdant platform.
            </p>
          </div>

          {/* gap-px grid — matches ImpactNumbers pattern */}
          <div className="grid grid-cols-1 gap-px bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-5">
            {STATS.map((s) => (
              <div key={s.value} className="flex flex-col gap-5 bg-[#122023] p-8">
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#e1fcad]/10 text-[#e1fcad]">
                  {s.icon}
                </div>
                <div>
                  <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-white/35">{s.label}</span>
                  <span className="text-5xl font-normal tracking-[-0.04em] text-white">{s.value}</span>
                </div>
                <p className="border-t border-white/[0.08] pt-4 text-xs leading-relaxed text-white/40">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Integrations — Logo.dev API
//  Endpoint: https://img.logo.dev/{domain}?token={NEXT_PUBLIC_LOGODEV_TOKEN}
//  - WebP format, 2× retina size, lazy loading
//  - Light theme (section bg is #f7f7f5)
//  - Text name fallback if logo unavailable
// ─────────────────────────────────────────────────────────────────────────────
const LOGODEV_TOKEN = process.env.NEXT_PUBLIC_LOGODEV_TOKEN ?? "";

const INTEGRATION_LOGOS: { name: string; domain: string }[] = [
  { name: "SAP",         domain: "sap.com" },
  { name: "Oracle",      domain: "oracle.com" },
  { name: "Microsoft",   domain: "microsoft.com" },
  { name: "Salesforce",  domain: "salesforce.com" },
  { name: "Workday",     domain: "workday.com" },
  { name: "Enablon",     domain: "enablon.com" },
  { name: "Sphera",      domain: "sphera.com" },
  { name: "Persefoni",   domain: "persefoni.com" },
  { name: "EcoVadis",    domain: "ecovadis.com" },
  { name: "Tableau",     domain: "tableau.com" },
  { name: "Bloomberg",   domain: "bloomberg.com" },
  { name: "Google",      domain: "google.com" },
  { name: "Slack",       domain: "slack.com" },
  { name: "DocuSign",    domain: "docusign.com" },
  { name: "NetSuite",    domain: "netsuite.com" },
  { name: "Stripe",      domain: "stripe.com" },
  { name: "Amazon AWS",  domain: "aws.amazon.com" },
  { name: "Snowflake",   domain: "snowflake.com" },
];

function IntegrationLogo({ name, domain }: { name: string; domain: string }) {
  const src = `https://img.logo.dev/${domain}?token=${LOGODEV_TOKEN}&size=80&format=webp&theme=light`;

  return (
    <div className="relative flex h-10 w-full items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${name} logo`}
        loading="eager"
        decoding="async"
        width={120}
        height={40}
        className="h-8 w-auto max-w-[120px] object-contain"
        onError={(e) => {
          // Hide broken image and show sibling text fallback
          (e.currentTarget as HTMLImageElement).style.display = "none";
          const fallback = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement | null;
          if (fallback) fallback.style.display = "block";
        }}
      />
      <span
        className="hidden text-sm font-semibold tracking-tight text-black/45"
        aria-hidden="true"
      >
        {name}
      </span>
    </div>
  );
}

function Integrations() {
  return (
    <section className="bg-[#f7f7f5] py-[120px]">
      <div className={G}>
        {/* ── Left panel: label + heading + CTA ── */}
        <div className="col-start-2 col-span-3 flex flex-col justify-between pr-8 lg:min-h-[520px]">
          <div>
            <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-black/35">
              Integrations
            </p>
            <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-[#122023] md:text-5xl">
              Connected to your existing tools
            </h2>
          </div>

          {/* CTA — square bordered button, mono uppercase (Vooma style) */}
          <div className="mt-16">
            <a
              href="#"
              className="inline-flex items-center border border-black/20 px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-black/60 transition-colors duration-200 hover:border-black/50 hover:text-black/90"
            >
              View all integrations
            </a>
          </div>
        </div>

        {/* ── Right panel: 3-col logo grid ── */}
        <div className="col-start-5 col-span-8">
          {/* Outer container — bordered, no gap so borders share pixel */}
          <div className="relative border border-black/[0.09]">

            {/* Vertical lime accent line through column 1 */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[33.333%]"
              aria-hidden
            >
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#e1fcad]/70" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3">
              {INTEGRATION_LOGOS.map((logo, i) => {
                const col        = i % 3;
                const row        = Math.floor(i / 3);
                const isFirstCol = col === 0;
                const isLastRow  = row === Math.floor((INTEGRATION_LOGOS.length - 1) / 3);

                return (
                  <div
                    key={logo.name}
                    className={`group relative flex flex-col items-center justify-center bg-[#f7f7f5] px-6 py-10 transition-colors duration-200 hover:bg-white
                      ${col < 2 ? "border-r border-black/[0.09]" : ""}
                      ${!isLastRow ? "border-b border-black/[0.09]" : ""}
                    `}
                  >
                    {/* PCB connector notch */}
                    <div
                      className={`absolute -top-px left-1/2 h-[3px] w-6 -translate-x-1/2 transition-colors duration-200 ${
                        isFirstCol
                          ? "bg-[#e1fcad]"
                          : "bg-transparent group-hover:bg-[#e1fcad]/50"
                      }`}
                    />

                    <IntegrationLogo name={logo.name} domain={logo.domain} />
                  </div>
                );
              })}
            </div>

            {/* Faded bottom edge */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f7f7f5] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Pre-footer CTA strip
// ─────────────────────────────────────────────────────────────────────────────
function SolutionsCTA() {
  return (
    <section className="bg-[#f7f7f5] py-[100px]">
      <div className={G}>
        <div className={`${COL} flex flex-col items-center text-center`}>

          {/* Leaf badge */}
          <div className="mb-8 flex size-14 items-center justify-center rounded-full bg-[#122023]">
            <Leaf className="h-6 w-6 text-[#e1fcad]" />
          </div>

          <h2 className="mb-5 max-w-2xl text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-[#122023] md:text-5xl">
            Ready to see Verdant in your environment?
          </h2>

          <p className="mb-10 max-w-md text-base leading-relaxed text-black/45">
            A 30-minute demo using your own data. No setup required. See your carbon picture before the call ends.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <PrimaryCTA label="Book a demo" href="#" />
            <a
              href="/product"
              className="text-sm font-medium text-black/50 transition-colors duration-200 hover:text-black"
            >
              Explore the product →
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-black/30">
            {["No credit card required", "14-day free trial", "Cancel anytime", "SOC 2 Type II certified"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#4a7c59]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  const [active, setActive] = useState("carbon");

  return (
    <>
      <Navbar />
      <SolutionsHero active={active} setActive={setActive} />
      <TrustedBy />
      <ValueProps active={active} />
      <FeatureCards />
      <HowItWorks active={active} />
      <TestimonialsCarousel />
      <StatsBar />
      <Integrations />
      <SolutionsCTA />
      <BlogCallout />
      <Footer />
    </>
  );
}
