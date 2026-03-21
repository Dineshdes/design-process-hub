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
} from "lucide-react";
import BlogCallout from "@/components/ui/blog-callout";

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
  { value: "2.4M",  label: "Tonnes CO₂ avoided",         sub: "across all customers" },
  { value: "90%+",  label: "Data error reduction",        sub: "vs. manual processes" },
  { value: "60%",   label: "Faster reporting cycle",      sub: "first report to signed-off" },
  { value: "2+ hrs", label: "Saved daily per analyst",    sub: "reclaimed for strategy" },
  { value: "42",    label: "Countries deployed",          sub: "across 5 continents" },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Integrations
// ─────────────────────────────────────────────────────────────────────────────
const INTEGRATIONS = [
  "SAP S/4HANA", "Oracle NetSuite", "Microsoft 365", "Salesforce", "Workday",
  "CDP", "Enablon", "Sphera", "Persefoni", "EcoVadis",
  "Turvo", "Slack", "Google Workspace", "Power BI", "Tableau",
  "Bloomberg", "AWS", "Azure", "Stripe", "DocuSign",
];

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
                <h3 className="mb-2.5 text-xl font-semibold leading-snug tracking-[-0.02em] text-[#122023]">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-black/45">{p.desc}</p>
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
//  How it works — numbered steps + screenshot panel
// ─────────────────────────────────────────────────────────────────────────────
function HowItWorks({ active }: { active: string }) {
  const [step, setStep] = useState(0);
  const steps = HOW_IT_WORKS[active];
  const current = steps[step];

  return (
    <section className="bg-[#f7f7f5] py-[120px]">
      <div className={G}>
        <div className={COL}>

          {/* Header */}
          <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-black/35">How it works</p>
              <h2 className="text-4xl font-normal leading-[1.06] tracking-[-0.03em] text-[#122023] md:text-5xl">
                Four steps to{" "}
                <span className="text-black/30">full clarity</span>
              </h2>
            </div>
            <a
              href="#"
              className="group hidden shrink-0 items-center gap-0 overflow-hidden rounded-full border border-black/10 bg-transparent transition-colors hover:border-black/30 md:flex"
            >
              <span className="pl-5 pr-4 text-sm font-medium text-black">See full demo</span>
              <div className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-[#122023] text-[#e1fcad]">
                <ArrowUpRight className="absolute h-4 w-4 -translate-x-1/2 transition-all duration-500 group-hover:translate-x-10" />
                <ArrowUpRight className="absolute h-4 w-4 -translate-x-10 transition-all duration-500 group-hover:-translate-x-1/2" />
              </div>
            </a>
          </div>

          {/* Main layout: steps list left + screenshot right */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[5fr_7fr]">

            {/* Left: step list */}
            <div className="flex flex-col gap-1">
              {steps.map((s, i) => {
                const isActive = i === step;
                return (
                  <button
                    key={s.num}
                    onClick={() => setStep(i)}
                    className={`group flex items-start gap-5 rounded-2xl px-5 py-5 text-left transition-all duration-200 ${
                      isActive
                        ? "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
                        : "hover:bg-white/60"
                    }`}
                  >
                    {/* Step number */}
                    <span
                      className={`mt-0.5 shrink-0 font-mono text-xs font-bold tracking-[0.14em] transition-colors duration-200 ${
                        isActive ? "text-[#4a7c59]" : "text-black/25"
                      }`}
                    >
                      {s.num}
                    </span>

                    <div className="min-w-0">
                      <p
                        className={`text-base font-semibold leading-snug tracking-[-0.01em] transition-colors duration-200 ${
                          isActive ? "text-[#122023]" : "text-black/45 group-hover:text-[#122023]"
                        }`}
                      >
                        {s.title}
                      </p>
                      {isActive && (
                        <p className="mt-2 text-sm leading-relaxed text-black/45">{s.desc}</p>
                      )}
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="ml-auto mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#e1fcad]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#122023]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: screenshot */}
            <div className="sticky top-28 overflow-hidden rounded-3xl bg-[#122023] shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={`${active}-${step}`}
                src={current.img}
                alt={current.title}
                className="aspect-[4/3] h-full w-full object-cover opacity-80 transition-opacity duration-500"
              />
              {/* Caption overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0a1618]/90 to-transparent p-8">
                <span className="mb-1 block font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#e1fcad]/55">
                  Step {current.num}
                </span>
                <p className="text-lg font-semibold text-white">{current.title}</p>
              </div>
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
    <section className="bg-[#0d1a1c]">
      <div className={G}>
        <div className={`${COL} flex flex-wrap divide-x divide-white/[0.07]`}>
          {STATS.map((s) => (
            <div key={s.value} className="flex min-w-[160px] flex-1 flex-col px-8 py-12">
              <span className="text-[40px] font-normal leading-none tracking-[-0.04em] text-[#e1fcad]">
                {s.value}
              </span>
              <span className="mt-2 text-sm font-semibold text-white/70">{s.label}</span>
              <span className="mt-0.5 text-xs text-white/30">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Integrations — Vooma-style: left heading panel + right 3-col logo grid
//  Grid cells have PCB-style lime connector notches + col-1 vertical accent line
//  Logos: Clearbit wordmark PNGs at 100% opacity, text fallback on error
// ─────────────────────────────────────────────────────────────────────────────
const INTEGRATION_LOGOS: { name: string; domain: string }[] = [
  { name: "SAP",        domain: "sap.com" },
  { name: "Oracle",     domain: "oracle.com" },
  { name: "Microsoft",  domain: "microsoft.com" },
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "Workday",    domain: "workday.com" },
  { name: "CDP",        domain: "cdp.net" },
  { name: "Enablon",    domain: "enablon.com" },
  { name: "Sphera",     domain: "sphera.com" },
  { name: "Persefoni",  domain: "persefoni.com" },
  { name: "EcoVadis",   domain: "ecovadis.com" },
  { name: "Tableau",    domain: "tableau.com" },
  { name: "Bloomberg",  domain: "bloomberg.com" },
  { name: "Google",     domain: "google.com" },
  { name: "Slack",      domain: "slack.com" },
  { name: "DocuSign",   domain: "docusign.com" },
  { name: "NetSuite",   domain: "netsuite.com" },
  { name: "Stripe",     domain: "stripe.com" },
  { name: "AWS",        domain: "amazon.com" },
];

function IntegrationLogo({ name, domain }: { name: string; domain: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-sm font-semibold text-black/45">{name}</span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={name}
      className="h-8 w-auto max-w-[120px] object-contain"
      onError={() => setFailed(true)}
    />
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
            <h2 className="text-[2.6rem] font-bold leading-[1.08] tracking-[-0.02em] text-[#122023]">
              Connected to<br />your existing<br />tools
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

          <h2 className="mb-5 max-w-2xl text-4xl font-normal leading-[1.06] tracking-[-0.03em] text-[#122023] md:text-5xl">
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
      <ValueProps active={active} />
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
