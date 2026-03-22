"use client";

import Hero from "@/components/ui/hero";
import Navbar from "@/components/ui/navbar";
import { Leaf, Zap, BarChart3, Globe, ChevronRight } from "lucide-react";
import Footer from "@/components/ui/footer";
import { InlineCTA } from "@/components/ui/cta";
import TestimonialsCarousel from "@/components/ui/testimonials-carousel";
import BlogCallout from "@/components/ui/blog-callout";
import TrustedBy from "@/components/ui/trusted-by";

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
const SEC = "py-[150px] min-h-[740px]";
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
    <div className="mb-12">
      <span className={`mb-3 block text-sm font-bold uppercase tracking-[0.18em] ${light ? "text-[#e1fcad]/50" : "text-black/40"}`}>
        {label}
      </span>
      <h2 className={`text-4xl font-normal leading-[1.08] tracking-[-0.03em] md:text-5xl ${light ? "text-white" : "text-black"}`}>
        {heading}
      </h2>
    </div>
  );
}


// ── Services — bento mosaic grid ─────────────────────────────────────────────
function Services() {
  return (
    <section className={`bg-[#f7f7f5] ${SEC}`}>
      <div className={G}>
        <div className={COL}>

          {/* Header */}
          <div className="mb-10 flex items-end justify-between gap-8">
            <div>
              <span className="mb-3 block font-mono text-base font-bold uppercase tracking-[0.18em] text-black/35">
                What we do
              </span>
              <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-black md:text-5xl">
                Solutions built for a<br />low-carbon economy
              </h2>
            </div>
            <InlineCTA label="See the platform" href="/product" />
          </div>

          {/* ── Bento grid ── */}
          <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {/* A — Clean Energy: tall image card, spans 2 rows */}
            <div className="group relative row-span-2 overflow-hidden rounded-2xl bg-[#122023] sm:col-span-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=90"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122023] via-[#122023]/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-bold tracking-[0.2em] text-white/30">01</span>
                  <Zap className="h-4 w-4 text-[#e1fcad]/60" />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-semibold leading-tight text-white">
                    Clean Energy<br />Transition
                  </h3>
                  <p className="text-base leading-relaxed text-white/50">
                    End-to-end advisory for businesses moving to renewables.
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-base font-semibold text-[#e1fcad] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Learn more <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* B — Carbon Strategy: light warm card with arc stat */}
            <div className="group relative overflow-hidden rounded-2xl bg-[#f0ece4] p-7">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-base font-bold tracking-[0.2em] text-black/30">02</span>
                  <BarChart3 className="h-4 w-4 text-black/25" />
                </div>
                <div>
                  <p className="mb-1 text-base font-medium text-black/40">Scope 1–3 coverage</p>
                  <p className="text-[56px] font-normal leading-none tracking-[-0.04em] text-[#122023]">94<span className="text-[32px]">%</span></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black/80">Carbon Strategy<br />&amp; Reporting</h3>
                </div>
              </div>
            </div>

            {/* C — Accent stat card: dark, avg time to net-zero */}
            <div className="group relative overflow-hidden rounded-2xl bg-[#122023] p-7">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-base font-bold tracking-[0.2em] text-white/25">—</span>
                  <span className="rounded-full bg-[#e1fcad]/10 px-3 py-1 text-base font-medium text-[#e1fcad]/70">Live</span>
                </div>
                <div>
                  <p className="mb-1 text-base text-white/40">Avg. time to first milestone</p>
                  <p className="text-[56px] font-normal leading-none tracking-[-0.04em] text-[#e1fcad]">6<span className="text-2xl font-normal text-white/40"> mo</span></p>
                </div>
              </div>
            </div>

            {/* D — Community Programs: image card */}
            <div className="group relative overflow-hidden rounded-2xl bg-[#1a2e30]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=90"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-7">
                <span className="font-mono text-base font-bold tracking-[0.2em] text-white/30">03</span>
                <div>
                  <Globe className="mb-2 h-4 w-4 text-[#e1fcad]/60" />
                  <h3 className="text-lg font-semibold leading-snug text-white">Community<br />Energy Programs</h3>
                </div>
              </div>
            </div>

            {/* E — Nature-Based Solutions: muted light card */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-7 ring-1 ring-black/[0.06]">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-base font-bold tracking-[0.2em] text-black/25">04</span>
                  <Leaf className="h-4 w-4 text-[#122023]/30" />
                </div>
                {/* Minimal tree SVG */}
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="my-2">
                  <path d="M28 48 C14 38 10 20 28 8 C46 20 42 38 28 48Z" fill="#122023" fillOpacity="0.07" stroke="#122023" strokeWidth="1.2" strokeLinejoin="round"/>
                  <line x1="28" y1="8" x2="28" y2="48" stroke="#122023" strokeWidth="0.8" opacity="0.25"/>
                  <path d="M28 20 L22 28 M28 20 L34 28" stroke="#122023" strokeWidth="0.8" opacity="0.2" strokeLinecap="round"/>
                  <line x1="28" y1="48" x2="28" y2="54" stroke="#122023" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
                </svg>
                <div>
                  <h3 className="mb-1 text-lg font-semibold leading-snug text-black">Nature-Based<br />Solutions</h3>
                  <p className="text-base leading-relaxed text-black/45">Verified offsets &amp; biodiversity credits.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ── Industries ────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  {
    num: "01",
    tag: "Energy & Utilities",
    title: "Power grids & renewables",
    desc: "We help utilities and energy producers decarbonise generation, modernise grid infrastructure, and meet evolving regulatory targets.",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=90",
    stat: "68% avg. carbon reduction",
  },
  {
    num: "02",
    tag: "Real Estate & Construction",
    title: "Built environment",
    desc: "From net-zero building design to retrofit programmes, we guide developers through every stage of sustainable construction.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=90",
    stat: "140+ certified buildings",
  },
  {
    num: "03",
    tag: "Manufacturing & Industry",
    title: "Industrial decarbonisation",
    desc: "We identify Scope 1 & 2 reduction levers across heavy industry — electrification, process heat, and supply chain emission mapping.",
    img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=900&q=90",
    stat: "Scope 1–3 coverage",
  },
  {
    num: "04",
    tag: "Finance & Investment",
    title: "Sustainable capital",
    desc: "We support banks, funds, and insurers in ESG integration, green bond frameworks, and climate risk disclosure aligned to TCFD.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=90",
    stat: "$8.2B mobilised",
  },
];

function Industries() {
  return (
    <section className="bg-white py-[150px]">
      <div className={G}>
        <div className={COL}>

          {/* Header */}
          <div className="mb-2 flex items-end justify-between gap-8">
            <div>
              <span className="mb-4 block font-mono text-base font-bold uppercase tracking-[0.18em] text-black/30">
                Industries
              </span>
              <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-black md:text-5xl">
                Sectors we serve
              </h2>
            </div>
            <a href="/about" className="hidden shrink-0 text-base font-medium text-black/35 underline-offset-4 transition-colors hover:text-black md:block">
              View all →
            </a>
          </div>

          {/* Row list — top border */}
          <div className="mt-10 border-t border-black/[0.08]">
            {INDUSTRIES.map((ind) => (
              <a
                key={ind.num}
                href="/product"
                className="group relative block overflow-hidden border-b border-black/[0.08]"
              >
                {/* Hover bg — slides up from bottom */}
                <div className="absolute inset-0 translate-y-full bg-[#122023] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />

                {/* Image — occupies right ~38% (≈ 4-5 of 12 cols), full row height */}
                <div className="pointer-events-none absolute right-0 top-0 h-full w-[38%] translate-x-full opacity-0 transition-all duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 group-hover:opacity-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ind.img}
                    alt={ind.tag}
                    className="h-full w-full object-cover"
                  />
                  {/* Left-edge fade so image bleeds into content */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#122023] via-[#122023]/50 to-transparent" />
                </div>

                {/* Inner height container — transitions from collapsed to 480px */}
                <div className="relative h-[88px] transition-[height] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:h-[360px]">

                  {/* Content — fills height, right padding reserves space for image */}
                  <div className="flex h-full flex-col justify-between px-2 py-8 pr-4 lg:pr-[42%]">

                    {/* Top row — always visible */}
                    <div className="flex items-center gap-5 md:gap-8">

                      <span className="w-8 shrink-0 font-mono text-base font-bold text-black/25 transition-colors duration-300 group-hover:text-white/30">
                        {ind.num}
                      </span>

                      <h3 className="flex-1 text-2xl font-normal leading-snug tracking-tight text-black transition-colors duration-300 group-hover:text-white md:text-[28px]">
                        {ind.title}
                      </h3>

                      <span className="hidden shrink-0 rounded-full border border-black/10 px-4 py-1.5 text-base text-black/35 transition-all duration-300 group-hover:border-white/15 group-hover:text-white/40 md:block">
                        {ind.tag}
                      </span>

                      <div className="ml-auto flex size-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/30 transition-all duration-500 group-hover:border-[#e1fcad] group-hover:bg-[#e1fcad] group-hover:text-[#122023]">
                        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    {/* Bottom — fades in when row is open */}
                    <div className="translate-y-4 opacity-0 transition-all delay-150 duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                      {/* Spacer matches w-8 number column + gap so text aligns with heading */}
                      <div className="flex gap-5 md:gap-8">
                        <div className="w-8 shrink-0" />
                        <div>
                          <p className="mb-6 max-w-lg text-base leading-relaxed text-white/50">
                            {ind.desc}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="text-base font-semibold text-[#e1fcad]">Learn more</span>
                            <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#e1fcad] text-[#122023]">
                              <ChevronRight className="h-4 w-4" />
                            </span>
                            <span className="ml-4 text-base text-[#e1fcad]/50">{ind.stat}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Impact Stats ─────────────────────────────────────────────────────────────

const STATS = [
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

          {/* 4 columns separated by 1px lines */}
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.value} className="flex flex-col gap-5 px-0 py-8 sm:px-8 sm:py-0 lg:first:pl-0 lg:last:pr-0">
                {/* Illustration */}
                {s.svg}

                {/* Tag */}
                <span className="text-base font-medium text-[#e1fcad]/50">{s.tag}</span>

                {/* Number */}
                <div className="flex items-baseline gap-2">
                  <span className="text-[44px] font-normal leading-none tracking-[-0.04em] text-[#e1fcad]">
                    {s.value}
                  </span>
                  <span className="text-base uppercase tracking-widest text-white/25">{s.unit}</span>
                </div>

                {/* One-line description */}
                <p className="text-base leading-snug text-white/40">{s.desc}</p>
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
    <section className={`bg-[#f7f7f5] ${SEC} flex flex-col justify-center`}>
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
                  <span className="font-mono text-sm font-bold tracking-[0.2em] text-black/30">
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
const LOGODEV = process.env.NEXT_PUBLIC_LOGODEV_TOKEN ?? "";

// Inline SVG icons — guaranteed to render with no API dependency
const GOOGLE_ICON = (
  <svg viewBox="0 0 24 24" width="26" height="26">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);
const MICROSOFT_ICON = (
  <svg viewBox="0 0 21 21" width="26" height="26">
    <rect width="10" height="10" fill="#F25022"/>
    <rect x="11" width="10" height="10" fill="#7FBA00"/>
    <rect y="11" width="10" height="10" fill="#00A4EF"/>
    <rect x="11" y="11" width="10" height="10" fill="#FFB900"/>
  </svg>
);

function DevLogo({ domain, size = 26 }: { domain: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://img.logo.dev/${domain}?token=${LOGODEV}&size=80&format=webp`}
      alt={domain}
      width={size}
      height={size}
      className="object-contain"
      style={{ width: size, height: size }}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
    />
  );
}

// Cards
const INTEGRATIONS = [
  {
    name: "Google Workspace",
    icon: GOOGLE_ICON,
    metrics: ["Sheets carbon sync", "Slides report export", "Drive audit logs"],
    desc: "Sync sustainability data from Google Sheets directly into Verdant. Auto-export board reports to Slides.",
  },
  {
    name: "Microsoft 365",
    icon: MICROSOFT_ICON,
    metrics: ["Azure emissions API", "Teams ESG alerts", "Power BI dashboards"],
    desc: "Pull Azure carbon data into Verdant automatically. Push live ESG metrics to Power BI and Teams.",
  },
  {
    name: "Zoho Suite",
    icon: <DevLogo domain="zoho.com" size={26} />,
    metrics: ["CRM ESG tagging", "Books carbon spend", "Analytics reporting"],
    desc: "Tag carbon footprint against CRM deals. Capture sustainability spend in Zoho Books and visualise in Analytics.",
  },
];

// Hub diagram — uses div overlay over SVG lines (no foreignObject)
// Container: 640 × 360  |  Center: (320, 180)
// ─── Hub diagram constants ────────────────────────────────────────────────────
// SVG viewBox: 960 × 520  |  Center: (480, 260)
const D_CX = 480, D_CY = 260;
const D_HUB_R   = 60;   // hub circle px radius  → div 120×120
const D_NODE_H  = 44;   // node half-width        → div 88×88

// Spoke layout — positioned for visual balance in 960×520
const DIAGRAM_SPOKES = [
  { label: "Google",     delay: "0s",    cx: 60,  cy: 260, icon: GOOGLE_ICON },
  { label: "Microsoft",  delay: "0.7s",  cx: 900, cy: 260, icon: MICROSOFT_ICON },
  { label: "Salesforce", delay: "1.4s",  cx: 188, cy: 66,  icon: <DevLogo domain="salesforce.com" size={38}/> },
  { label: "SAP",        delay: "2.1s",  cx: 772, cy: 66,  icon: <DevLogo domain="sap.com" size={38}/> },
  { label: "Zoho",       delay: "2.8s",  cx: 480, cy: 462, icon: <DevLogo domain="zoho.com" size={38}/> },
];

function HubDiagram() {
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: 960 }}>
      {/* Aspect-ratio box 960:520 */}
      <div className="relative w-full" style={{ paddingTop: `${(520 / 960) * 100}%` }}>
        <div className="absolute inset-0">

          {/* ── SVG: lines + rings + animated dots ── */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 960 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Static ambient ring */}
            <circle cx={D_CX} cy={D_CY} r="90" stroke="#e1fcad" strokeOpacity="0.07" strokeWidth="1"/>

            {/* Pulsing rings */}
            <circle cx={D_CX} cy={D_CY} r="90" stroke="#e1fcad" strokeOpacity="0" strokeWidth="1.5" fill="none">
              <animate attributeName="r"             values="90;180"   dur="3.5s" repeatCount="indefinite"/>
              <animate attributeName="stroke-opacity" values="0.18;0"  dur="3.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx={D_CX} cy={D_CY} r="90" stroke="#e1fcad" strokeOpacity="0" strokeWidth="1" fill="none">
              <animate attributeName="r"             values="90;180"   dur="3.5s" begin="1.75s" repeatCount="indefinite"/>
              <animate attributeName="stroke-opacity" values="0.12;0"  dur="3.5s" begin="1.75s" repeatCount="indefinite"/>
            </circle>

            {/* Lines + flowing dots */}
            {DIAGRAM_SPOKES.map((s) => {
              const dx = s.cx - D_CX, dy = s.cy - D_CY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const ux = dx / dist, uy = dy / dist;
              const x1 = D_CX + ux * D_HUB_R,  y1 = D_CY + uy * D_HUB_R;
              const x2 = s.cx - ux * D_NODE_H,  y2 = s.cy - uy * D_NODE_H;
              const path = `M ${x1} ${y1} L ${x2} ${y2}`;
              return (
                <g key={s.label}>
                  {/* Track line */}
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#e1fcad" strokeOpacity="0.14" strokeWidth="1"
                  />
                  {/* Bright glow copy */}
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#e1fcad" strokeOpacity="0.06" strokeWidth="4"
                  />
                  {/* Flowing dot — spoke → hub */}
                  <circle r="3.5" fill="#e1fcad" fillOpacity="0.9">
                    <animateMotion
                      dur="2.8s"
                      begin={s.delay}
                      repeatCount="indefinite"
                      path={`M ${x2} ${y2} L ${x1} ${y1}`}
                    />
                    <animate attributeName="fill-opacity" values="0;1;1;0" dur="2.8s" begin={s.delay} repeatCount="indefinite"/>
                  </circle>
                  {/* Second dot offset */}
                  <circle r="2" fill="#e1fcad" fillOpacity="0.5">
                    <animateMotion
                      dur="2.8s"
                      begin={`calc(${s.delay} + 1.4s)`}
                      repeatCount="indefinite"
                      path={`M ${x2} ${y2} L ${x1} ${y1}`}
                    />
                    <animate attributeName="fill-opacity" values="0;0.6;0.6;0" dur="2.8s" begin={`calc(${s.delay} + 1.4s)`} repeatCount="indefinite"/>
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* ── Spoke nodes ── */}
          {DIAGRAM_SPOKES.map((s) => (
            <div
              key={s.label}
              className="absolute flex flex-col items-center"
              style={{
                left: `${(s.cx / 960) * 100}%`,
                top:  `${(s.cy / 520) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Icon box */}
              <div
                className="flex items-center justify-center rounded-[22px]"
                style={{
                  width: D_NODE_H * 2,
                  height: D_NODE_H * 2,
                  background: "linear-gradient(145deg, #1e3035 0%, #162428 100%)",
                  border: "1px solid rgba(225,252,173,0.13)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {s.icon}
              </div>
              {/* Label */}
              <span
                className="mt-3 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {s.label}
              </span>
            </div>
          ))}

          {/* ── Center Verdant hub ── */}
          <div
            className="absolute flex flex-col items-center"
            style={{
              left: `${(D_CX / 960) * 100}%`,
              top:  `${(D_CY / 520) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Glow backdrop */}
            <div
              className="absolute rounded-full"
              style={{
                width: D_HUB_R * 4,
                height: D_HUB_R * 4,
                background: "radial-gradient(circle, rgba(225,252,173,0.14) 0%, transparent 70%)",
                transform: "translate(-50%,-50%)",
                left: "50%",
                top: "50%",
              }}
            />
            {/* Hub circle */}
            <div
              className="relative flex items-center justify-center rounded-full bg-[#e1fcad]"
              style={{
                width: D_HUB_R * 2,
                height: D_HUB_R * 2,
                boxShadow: "0 0 0 10px rgba(225,252,173,0.1), 0 0 0 20px rgba(225,252,173,0.05), 0 0 48px rgba(225,252,173,0.25)",
              }}
            >
              <Leaf className="h-8 w-8 text-[#122023]" />
            </div>
            <span className="mt-3 text-[11px] font-semibold tracking-[0.08em] text-white/50">Verdant</span>
          </div>

        </div>
      </div>
    </div>
  );
}

function Integrations() {
  return (
    <section className={`relative overflow-hidden bg-[#0d1a1c] ${SEC}`}>

      {/* Soft radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 700,
          height: 700,
          background: "radial-gradient(ellipse at center, rgba(225,252,173,0.055) 0%, transparent 60%)",
        }}
      />

      <div className={`relative z-10 ${G}`}>
        <div className={COL}>

          {/* ── Header ── */}
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#e1fcad]/50">
                Integrations
              </span>
              <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-5xl">
                Works with the tools<br />
                <span className="text-white/25">you already use</span>
              </h2>
            </div>
            <p className="max-w-[260px] text-sm leading-relaxed text-white/35 lg:pb-1 lg:text-right">
              Verdant connects to your existing stack —
              no migration, no disruption.
            </p>
          </div>

          {/* ── Hub diagram ── */}
          <div className="mb-14 w-full overflow-hidden">
            <HubDiagram />
          </div>

          {/* ── Integration cards ── */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {INTEGRATIONS.map((intg) => (
              <div
                key={intg.name}
                className="group flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.06]"
              >
                {/* Logo + name */}
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05]">
                    {intg.icon}
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold leading-tight text-white">{intg.name}</p>
                    <span className="mt-1 inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#e1fcad]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#e1fcad]/60">Official connector</span>
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06]" />

                {/* Description */}
                <p className="text-sm leading-relaxed text-white/40">{intg.desc}</p>

                {/* Metric tags */}
                <div className="flex flex-wrap gap-1.5">
                  {intg.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[11px] font-medium text-white/40 transition-colors duration-150 group-hover:border-white/[0.14] group-hover:text-white/60"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Learn more */}
                <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-white/25 transition-all duration-200 group-hover:gap-2 group-hover:text-[#e1fcad]">
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
function Testimonials() {
  return <TestimonialsCarousel />;
}

// ── USP Carousel ──────────────────────────────────────────────────────────────
const USP_CARDS = [
  {
    num: "01",
    title: "Unlocking your full carbon picture",
    desc: "Scope 1, 2 & 3 tracked automatically from every data source — meters, APIs, ERPs — with no manual exports.",
    img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=900&q=85",
  },
  {
    num: "02",
    title: "Best-price green finance, delivered",
    desc: "We connect you to verified lenders and grant programs and present the best deal transparently — no hidden fees.",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=85",
  },
  {
    num: "03",
    title: "Grow smarter with AI strategy",
    desc: "Verdant builds your net-zero roadmap — financially modelled, stakeholder-ready, and updated as your operations change.",
    img: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=900&q=85",
  },
  {
    num: "04",
    title: "Audit-ready compliance from day one",
    desc: "CSRD, TCFD, GHG Protocol, and EU Taxonomy — pre-mapped so your reports are defensible and board-ready in one click.",
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=85",
  },
  {
    num: "05",
    title: "Full supply-chain transparency",
    desc: "Attribute emissions across thousands of suppliers with AI-powered Scope 3 models — without drowning in surveys.",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=85",
  },
  {
    num: "06",
    title: "Works with your existing stack",
    desc: "SAP, Oracle, Google, Microsoft, Salesforce — Verdant integrates in hours, not months, with zero disruption.",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85",
  },
];

const GRAIN_USP = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function USPCarousel() {
  // Duplicate cards for seamless infinite loop
  const looped = [...USP_CARDS, ...USP_CARDS];

  return (
    <section className="overflow-hidden bg-[#f7f7f5] py-[150px]">
      {/* Header */}
      <div className="grid grid-cols-12 mb-14">
        <div className="col-start-2 col-span-10 flex flex-col gap-4">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-black/40">
            Our Value
          </span>
          <h2 className="max-w-2xl text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-[#122023] md:text-5xl">
            Modern solutions &amp; lasting benefits for your organisation
          </h2>
        </div>
      </div>

      {/* Auto-scrolling track — full viewport width, no padding clip */}
      <div className="overflow-hidden">
        <div className="usp-track gap-4 pl-[8.33vw]">
          {looped.map((card, i) => (
            <div
              key={i}
              className="group relative flex-shrink-0 w-[320px] md:w-[370px] h-[500px] overflow-hidden rounded-3xl mr-4"
            >
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.img}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient: dark top for text readability + dark bottom */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a1618]/70 via-[#0a1618]/20 to-[#0a1618]/80" />
              {/* Grain */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: GRAIN_USP, backgroundSize: "200px 200px", opacity: 0.32, mixBlendMode: "overlay" }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-7">

                {/* ── Top row: number + title side by side ── */}
                <div className="flex items-start gap-4">
                  {/* Number block */}
                  <div className="flex items-start leading-none shrink-0">
                    <span className="text-[52px] font-normal tracking-[-0.03em] text-white leading-none">
                      {card.num}
                    </span>
                    <span className="text-[11px] font-bold text-white/45 mt-1 ml-0.5">No</span>
                  </div>
                  {/* Title — fills remaining width */}
                  <h3 className="text-[17px] font-normal leading-snug tracking-tight text-white mt-1">
                    {card.title}
                  </h3>
                </div>

                {/* ── Bottom: description ── */}
                <p className="text-sm leading-relaxed text-white/55">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
      <Industries />
      <HowItWorks />
      <Integrations />
      <ImpactStats />
      <Testimonials />
      <USPCarousel />
      <BlogCallout />
      <Footer />
    </main>
  );
}
