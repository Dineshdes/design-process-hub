"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/navbar";
import {
  Leaf, Globe, Zap, Heart, ChevronRight,
  ArrowUpRight, MapPin, Users, Briefcase,
} from "lucide-react";
import { GsapTimeline } from "@/components/ui/gsap-timeline";
import SharedFooter from "@/components/ui/footer";
import BlogCallout from "@/components/ui/blog-callout";

const AmChartsGlobe = dynamic(() => import("@/components/ui/amcharts-globe"), { ssr: false });

const G   = "grid grid-cols-12";
const COL = "col-start-2 col-span-10";
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const LOGODEV_TOKEN = process.env.NEXT_PUBLIC_LOGODEV_TOKEN ?? "";

// ── Wireframe Globe ────────────────────────────────────────────────────────────
function HeroGlobe() {
  const CX = 500, CY = 500, R = 440;
  const lats: [number, number, number][] = [
    [0, R, 22], [-130, 382, 17], [-260, 220, 12], [-370, 90, 6],
    [130, 382, 17], [260, 220, 12], [370, 90, 6],
  ];
  const lngs = [R, 380, 220, 80];
  const dots: [number, number, string][] = [
    [500, 310, "0s"], [330, 390, "1.3s"], [670, 340, "2.6s"],
  ];
  return (
    <svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <defs>
        <clipPath id="hg-clip"><circle cx={CX} cy={CY} r={R} /></clipPath>
        <radialGradient id="hg-glow" cx="38%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#e1fcad" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#0a1618" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hg-outer" cx="50%" cy="50%" r="50%">
          <stop offset="75%" stopColor="#e1fcad" stopOpacity="0" />
          <stop offset="100%" stopColor="#e1fcad" stopOpacity="0.07" />
        </radialGradient>
      </defs>

      {/* Outer glow rings */}
      <circle cx={CX} cy={CY} r={R + 70} fill="url(#hg-outer)" />
      <circle cx={CX} cy={CY} r={R + 32} stroke="#e1fcad" strokeWidth="0.5" strokeOpacity="0.06" />
      <circle cx={CX} cy={CY} r={R + 10} stroke="#e1fcad" strokeWidth="0.8" strokeOpacity="0.10" />

      {/* Sphere base + inner glow */}
      <circle cx={CX} cy={CY} r={R} fill="#0a1618" fillOpacity="0.3" />
      <circle cx={CX} cy={CY} r={R} fill="url(#hg-glow)" />
      <circle cx={CX} cy={CY} r={R} stroke="#e1fcad" strokeWidth="1.2" strokeOpacity="0.28" />

      <g clipPath="url(#hg-clip)">
        {/* Latitude lines */}
        {lats.map(([dy, rx, ry], i) => (
          <ellipse key={`lat-${i}`} cx={CX} cy={CY + dy} rx={rx} ry={ry}
            stroke="#e1fcad" strokeWidth="0.6" strokeOpacity="0.13" />
        ))}

        {/* Rotating longitude lines */}
        <g>
          <animateTransform attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="60s" repeatCount="indefinite" />
          {lngs.map((rx, i) => (
            <ellipse key={`lng-${i}`} cx={CX} cy={CY} rx={rx} ry={R}
              stroke="#e1fcad" strokeWidth="0.6" strokeOpacity={i === 0 ? 0.20 : 0.11} />
          ))}
        </g>

        {/* Land masses */}
        <g fill="#e1fcad" fillOpacity="0.07" stroke="#e1fcad" strokeWidth="0.8" strokeOpacity="0.18">
          <path d="M230,220 L265,195 L310,188 L348,210 L368,250 L360,300 L340,345 L315,368 L285,358 L258,335 L238,295 L228,258 Z" />
          <path d="M300,390 L330,380 L355,400 L362,445 L355,495 L335,535 L310,552 L288,540 L275,510 L272,465 L278,430 Z" />
          <path d="M468,295 L505,285 L532,305 L542,355 L535,415 L518,460 L495,478 L472,468 L458,435 L452,385 L455,340 Z" />
          <path d="M540,190 L620,170 L695,185 L730,220 L725,268 L700,295 L660,305 L615,292 L578,268 L558,240 Z" />
        </g>

        {/* Pulsing location dots */}
        {dots.map(([dcx, dcy, delay], i) => (
          <g key={`dot-${i}`}>
            <circle cx={dcx} cy={dcy} r="5" stroke="#e1fcad" strokeOpacity="0" fill="none">
              <animate attributeName="r" values="5;26" dur="2.8s" begin={delay} repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.5;0" dur="2.8s" begin={delay} repeatCount="indefinite" />
            </circle>
            <circle cx={dcx} cy={dcy} r="4.5" fill="#e1fcad" fillOpacity="0.95" />
          </g>
        ))}
      </g>
    </svg>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section className="relative flex h-screen min-h-[700px] w-full flex-col justify-end overflow-hidden bg-[#0a1618]">

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px", opacity: 0.22, mixBlendMode: "overlay" }}
      />

      {/* Interactive amCharts globe — right side, 80% visible */}
      <div className="absolute right-0 top-1/2 z-[1] -translate-y-[35%] translate-x-[20%]
                      w-[700px] h-[700px] md:w-[900px] md:h-[900px] lg:w-[1080px] lg:h-[1080px]">
        <AmChartsGlobe />
      </div>

      {/* Left-side vignette — keeps text legible against the globe */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[65%]
                      bg-gradient-to-r from-[#0a1618] via-[#0a1618]/80 to-transparent" />

      {/* Bottom vignette */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-48
                      bg-gradient-to-t from-[#0a1618] to-transparent" />

      {/* Content — pinned to bottom */}
      <div className={`relative z-10 ${G} pb-16`}>
        <div className={COL}>

          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 backdrop-blur-sm">
            <Leaf className="h-3.5 w-3.5 text-[#e1fcad]" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">About Verdant</span>
          </div>

          {/* Headline + description — full left column, no stats on right */}
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-normal leading-[1.05] tracking-[-0.03em] text-white md:text-6xl lg:text-7xl">
              We exist to make the<br />
              <span className="text-[#e1fcad]">clean energy transition</span> inevitable.
            </h1>
            <p className="mb-10 max-w-xl text-base leading-relaxed text-white/55">
              Founded in 2018, Verdant gives organisations a real-time, auditable carbon picture
              — so that reaching net zero becomes the path of least resistance.
            </p>
            <div className="flex items-center gap-5">
              <a href="/product" className="inline-flex items-center gap-2 rounded-full bg-[#e1fcad] px-6 py-3 text-sm font-semibold text-[#122023] transition-colors hover:bg-[#d4f59a]">
                See the platform <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#story" className="text-sm font-semibold text-white/40 transition-colors hover:text-white/70">
                Our story ↓
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-14 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-[0.18em] text-white/30">Our story</span>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Stats strip ───────────────────────────────────────────────────────────────
const STATS = [
  { val: "2018",  label: "Year founded",         sub: "Copenhagen, Denmark" },
  { val: "180+",  label: "Team members",          sub: "Across 12 offices" },
  { val: "42",    label: "Countries deployed",    sub: "On 5 continents" },
  { val: "15K+",  label: "Client organisations",  sub: "From SMEs to Fortune 500" },
];

function StatsStrip() {
  return (
    <section className="bg-[#0a1618] border-t border-white/[0.06]">
      <div className={G}>
        <div className={COL}>
          <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] sm:grid-cols-4 sm:divide-y-0">
            {STATS.map((s) => (
              <div key={s.val} className="flex flex-col gap-1 px-8 py-10">
                <span className="text-4xl font-normal tracking-[-0.04em] text-[#e1fcad]">{s.val}</span>
                <span className="text-sm font-semibold text-white/60">{s.label}</span>
                <span className="text-xs text-white/25">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Mission ───────────────────────────────────────────────────────────────────
function Mission() {
  return (
    <section id="story" className="bg-white py-[140px]">
      <div className={G}>
        <div className={COL}>
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-8 block text-xs font-bold uppercase tracking-[0.22em] text-black/30">Our mission</span>
            <blockquote className="text-4xl font-normal leading-[1.14] tracking-[-0.03em] text-[#122023] md:text-5xl lg:text-[52px]">
              &ldquo;To give every organisation a real-time, actionable carbon picture — so that reaching net zero becomes the path of least resistance.&rdquo;
            </blockquote>
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-black/10" />
              <div className="flex size-9 items-center justify-center rounded-full bg-[#122023]">
                <Leaf className="h-4 w-4 text-[#e1fcad]" />
              </div>
              <div className="h-px w-16 bg-black/10" />
            </div>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-black/45">
              Verdant combines rigorous science, best-in-class data infrastructure, and on-the-ground
              advisory expertise so organisations can move from measurement to meaningful reduction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Our Story ─────────────────────────────────────────────────────────────────
function OurStory() {
  return (
    <section className="bg-[#f7f7f5] py-[150px]">
      <div className={G}>
        <div className={COL}>
          <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-black/35">Our story</span>
              <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-[#122023] md:text-5xl">
                Born out of urgency,{" "}
                <span className="italic text-black/35">built for scale</span>
              </h2>
            </div>
            <div className="space-y-5 text-base leading-[1.8] text-black/50">
              <p>
                Verdant was founded by energy engineers, climate scientists, and policy experts
                who watched net-zero commitments stall inside spreadsheets and boardroom decks.
              </p>
              <p>
                We built the tools we wished existed — combining rigorous financial modelling,
                best-in-class data pipelines, and implementation expertise so organisations
                could stop planning and start doing.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <div className="relative overflow-hidden rounded-3xl" style={{ paddingTop: "75%" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85"
                alt="Verdant team"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1618]/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">Copenhagen HQ — 2024</p>
              </div>
            </div>
            <GsapTimeline />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Values ────────────────────────────────────────────────────────────────────
const VALUES = [
  { num: "01", icon: <Zap className="h-5 w-5" />, title: "Urgency over perfection", desc: "The climate crisis does not wait for perfect solutions. We bias toward action, learning, and iteration — because a good plan executed today beats a perfect plan executed too late." },
  { num: "02", icon: <Globe className="h-5 w-5" />, title: "Systems thinking", desc: "Energy, finance, policy, and community are inseparable. We design solutions that work across all four, understanding that sustainable impact requires seeing the whole system." },
  { num: "03", icon: <Heart className="h-5 w-5" />, title: "Equitable by design", desc: "A just transition leaves no community behind. Inclusion and access are non-negotiable in every project, product, and partnership we undertake." },
  { num: "04", icon: <Leaf className="h-5 w-5" />, title: "Science-led integrity", desc: "Every claim we make is traceable. We hold ourselves to the same rigour we demand of our clients — no greenwashing, no shortcuts, no ambiguity." },
];

function Values() {
  return (
    <section className="bg-[#0f1e22] py-[150px]">
      <div className={G}>
        <div className={COL}>

          {/* Header */}
          <div className="mb-16 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-[#e1fcad]/45">
                What we stand for
              </span>
              <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-5xl">
                Principles that guide{" "}
                <span className="text-white/30">every decision</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/35 lg:text-right">
              Four beliefs that shape how we build, advise, and show up for our clients and the planet.
            </p>
          </div>

          {/* 2 × 2 card grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div
                key={v.num}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 transition-all duration-300 hover:border-[#e1fcad]/20 hover:bg-white/[0.06]"
              >
                {/* Ghost number — decorative background */}
                <span
                  className="pointer-events-none absolute -right-2 -top-4 select-none font-bold text-white/[0.04] transition-all duration-300 group-hover:text-[#e1fcad]/[0.07]"
                  style={{ fontSize: "120px", lineHeight: 1, letterSpacing: "-0.04em" }}
                >
                  {v.num}
                </span>

                {/* Icon */}
                <div className="mb-7 inline-flex size-11 items-center justify-center rounded-xl border border-[#e1fcad]/15 bg-[#e1fcad]/[0.08] text-[#e1fcad] transition-colors duration-300 group-hover:bg-[#e1fcad]/[0.14]">
                  {v.icon}
                </div>

                {/* Title */}
                <h3 className="mb-3 text-lg font-semibold leading-snug tracking-tight text-white">
                  {v.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-white/40">{v.desc}</p>

                {/* Bottom lime accent line on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#e1fcad]/40 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Team ──────────────────────────────────────────────────────────────────────
const FOUNDERS = [
  { name: "Maya Andersen",  role: "Co-founder & CEO", bio: "Former wind energy director at Ørsted. MSc Climate Science, Oxford. 12 years transforming energy systems across Northern Europe.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85" },
  { name: "Rafael Nkosi",   role: "Co-founder & CTO", bio: "Built carbon data infrastructure at Google. PhD Energy Systems, MIT. Architect of Verdant's real-time data pipeline.",            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85" },
];
const TEAM_REST = [
  { name: "Priya Subramaniam", role: "Chief Impact Officer",  bio: "Led UNDP clean energy programs across 18 countries.",    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85" },
  { name: "Thomas Eriksson",   role: "Head of Advisory",      bio: "20 years in energy finance. Goldman Sachs & Macquarie.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=85" },
  { name: "Amara Diallo",      role: "VP Community Programs", bio: "Microgrids for 200+ communities in Sub-Saharan Africa.",  img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=85" },
  { name: "Jonas Müller",      role: "Head of Science",       bio: "Lead author, IPCC AR6. Nature-based carbon solutions.",   img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85" },
];

function LinkedInBtn() {
  return (
    <a href="#" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-black/30 text-white/50 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white" onClick={e => e.preventDefault()}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </a>
  );
}

function FounderCard({ member }: { member: typeof FOUNDERS[0] }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl" style={{ paddingTop: "115%" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.img}
        alt={member.name}
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
      />
      {/* Always-on dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1618]/95 via-[#0a1618]/30 to-transparent" />

      {/* Co-founder badge */}
      <div className="absolute left-5 top-5">
        <span className="rounded-full bg-[#e1fcad] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#122023]">
          Co-founder
        </span>
      </div>

      {/* LinkedIn */}
      <div className="absolute right-5 top-5">
        <LinkedInBtn />
      </div>

      {/* Bio — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 translate-y-0">
        {/* Bio text (hidden under, reveals on hover) */}
        <div className="absolute inset-x-0 bottom-full bg-[#0a1618]/80 px-7 py-5 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <p className="text-sm leading-relaxed text-white/70">{member.bio}</p>
        </div>
        {/* Name/role block */}
        <div className="px-7 pb-7 pt-4 transition-transform duration-300 group-hover:-translate-y-1">
          <p className="text-xl font-semibold text-white">{member.name}</p>
          <p className="mt-1 text-sm font-medium text-[#e1fcad]/70">{member.role}</p>
        </div>
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: typeof TEAM_REST[0] }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl" style={{ paddingTop: "110%" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.img}
        alt={member.name}
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1618]/90 via-[#0a1618]/20 to-transparent" />

      {/* LinkedIn */}
      <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <LinkedInBtn />
      </div>

      {/* Bio — slides up on hover */}
      <div className="absolute inset-x-0 bottom-full bg-[#0a1618]/75 px-5 py-4 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
        <p className="text-xs leading-relaxed text-white/65">{member.bio}</p>
      </div>

      {/* Name/role */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-5 transition-transform duration-300 group-hover:-translate-y-1">
        <p className="text-[15px] font-semibold text-white">{member.name}</p>
        <p className="mt-0.5 text-xs font-medium text-[#e1fcad]/65">{member.role}</p>
      </div>
    </div>
  );
}

function Team() {
  return (
    <section className="bg-[#f7f7f5] py-[150px]">
      <div className={G}>
        <div className={COL}>

          {/* Header */}
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-black/35">The team</span>
              <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-[#122023] md:text-5xl">
                The people behind Verdant
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-black/45">
                Scientists, engineers, financiers, and policy experts united by one goal:
                making decarbonisation measurable and achievable for every organisation.
              </p>
            </div>
            <a
              href="/careers"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-black/[0.12] bg-white px-5 py-3 text-sm font-semibold text-black/60 transition-all hover:border-black/25 hover:text-black/90"
            >
              View open roles
              <span className="flex size-6 items-center justify-center rounded-full bg-[#122023] text-[#e1fcad]">
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </a>
          </div>

          {/* Row 1 — Founders (large) */}
          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {FOUNDERS.map((m) => <FounderCard key={m.name} member={m} />)}
          </div>

          {/* Row 2 — Rest of team (medium, 4-col) */}
          <div className="mb-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {TEAM_REST.map((m) => <MemberCard key={m.name} member={m} />)}
          </div>

          {/* Row 3 — Join us CTA bar */}
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-[#122023] px-10 py-10 sm:flex-row">
            <div className="flex items-center gap-5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#e1fcad]/10">
                <Users className="h-5 w-5 text-[#e1fcad]" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Join the team</p>
                <p className="mt-0.5 text-sm text-white/40">
                  We&apos;re growing fast across engineering, science, advisory &amp; product.
                </p>
              </div>
            </div>
            <a
              href="/careers"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#e1fcad] px-6 py-3 text-sm font-semibold text-[#122023] transition-colors hover:bg-[#d4f59a]"
            >
              See open roles <ChevronRight className="h-4 w-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Investors ──────────────────────────────────────────────────────────────────
const BACKERS = [
  { name: "Sequoia Capital",     domain: "sequoiacap.com",         round: "Series B" },
  { name: "Andreessen Horowitz", domain: "a16z.com",               round: "Series A" },
  { name: "Accel",               domain: "accel.com",              round: "Seed" },
  { name: "Index Ventures",      domain: "indexventures.com",      round: "Series B" },
  { name: "Atomico",             domain: "atomico.com",            round: "Series A" },
  { name: "Breakthrough Energy", domain: "breakthroughenergy.org", round: "Seed" },
];

function Investors() {
  return (
    <section className="border-y border-black/[0.07] bg-[#f7f7f5] py-[120px]">
      <div className={G}>
        <div className={COL}>
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-black/35">Backed by</span>
              <h2 className="text-3xl font-normal leading-[1.08] tracking-[-0.03em] text-[#122023] md:text-4xl">
                Investors who believe in the mission
              </h2>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-3xl font-normal tracking-[-0.03em] text-[#122023]">$84M raised</p>
              <p className="mt-1 text-sm text-black/40">across Seed, Series A &amp; Series B</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {BACKERS.map(({ name, domain, round }) => (
              <div key={name} className="group flex flex-col items-center gap-3 rounded-2xl border border-black/[0.07] bg-white px-5 py-8 transition-all duration-200 hover:border-black/15 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="flex h-9 w-full items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.logo.dev/${domain}?token=${LOGODEV_TOKEN}&size=80&format=webp`}
                    alt={name}
                    width={100} height={36}
                    className="h-7 w-auto max-w-[100px] object-contain opacity-45 grayscale transition-all duration-300 group-hover:opacity-85 group-hover:grayscale-0"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <span className="rounded-full bg-[#f0fae8] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#4a7c59]">{round}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Careers CTA ───────────────────────────────────────────────────────────────
const OPEN_ROLES = [
  { title: "Senior Climate Data Engineer", team: "Engineering", location: "Remote / Copenhagen" },
  { title: "Carbon Advisory Manager",      team: "Advisory",    location: "London / Remote" },
  { title: "Head of Sales — DACH",         team: "Commercial",  location: "Berlin / Remote" },
];

function CareersCTA() {
  return (
    <section className="bg-[#0f1e22] py-[150px]">
      <div className={G}>
        <div className={COL}>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2">
                <Briefcase className="h-3.5 w-3.5 text-[#e1fcad]" />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Join us</span>
              </div>
              <h2 className="mb-5 text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-5xl">
                Help us solve one of the{" "}
                <span className="text-[#e1fcad]">world&apos;s hardest problems</span>
              </h2>
              <p className="mb-10 max-w-md text-base leading-relaxed text-white/45">
                We&apos;re 180+ people across engineering, science, advisory, and product.
                If you&apos;re exceptional at what you do and care deeply about climate, we want to hear from you.
              </p>
              <div className="flex items-center gap-5">
                <a href="/careers" className="inline-flex items-center gap-2 rounded-full bg-[#e1fcad] px-6 py-3 text-sm font-semibold text-[#122023] transition-colors hover:bg-[#d4f59a]">
                  See all open roles <ArrowUpRight className="h-4 w-4" />
                </a>
                <span className="text-sm text-white/30">{OPEN_ROLES.length} positions open</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {OPEN_ROLES.map((role) => (
                <a key={role.title} href="/careers" className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-6 py-5 transition-all duration-200 hover:border-[#e1fcad]/25 hover:bg-white/[0.07]">
                  <div>
                    <p className="text-sm font-semibold text-white">{role.title}</p>
                    <div className="mt-1.5 flex items-center gap-3">
                      <span className="text-xs text-white/35">{role.team}</span>
                      <span className="text-white/20">·</span>
                      <span className="flex items-center gap-1 text-xs text-white/35">
                        <MapPin className="h-3 w-3" /> {role.location}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white/25 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#e1fcad]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="w-full">
      <Navbar />
      <AboutHero />
      <StatsStrip />
      <Mission />
      <OurStory />
      <Values />
      <Team />
      <Investors />
      <CareersCTA />
      <BlogCallout />
      <SharedFooter />
    </main>
  );
}
