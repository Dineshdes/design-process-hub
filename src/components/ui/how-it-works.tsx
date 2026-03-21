"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const STEPS = [
  {
    num: "01",
    title: "Connect your data sources",
    desc: "Forward emails, upload spreadsheets, or connect directly via API to your ERP, utility portals, and IoT sensors. No custom integration work required — Verdant reads whatever you already have.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85",
    stat: { val: "180+", label: "data connectors" },
  },
  {
    num: "02",
    title: "AI maps and classifies emissions",
    desc: "Verdant's AI automatically categorises every data point across Scope 1, 2 and 3, cross-referencing 180+ emission factor databases in real time. Zero manual mapping, full audit trail.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85",
    stat: { val: "99.2%", label: "classification accuracy" },
  },
  {
    num: "03",
    title: "Analyse, forecast & model scenarios",
    desc: "Run financial models, compare reduction pathways, and stress-test your net-zero roadmap against different market and regulatory futures — all in the same workspace.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85",
    stat: { val: "40+", label: "scenario variables" },
  },
  {
    num: "04",
    title: "Report with confidence",
    desc: "One-click CSRD, TCFD, GRI, and CDP-aligned reports. Fully auditable, benchmarked against 15,000+ peers, and board-ready in hours — not months.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&q=85",
    stat: { val: "8 hrs", label: "avg. report time" },
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <section className="relative overflow-hidden bg-[#0f1e22] py-[150px]">
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: GRAIN,
          backgroundSize: "200px 200px",
          opacity: 0.25,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 grid grid-cols-12">
        <div className="col-start-2 col-span-10">

          {/* ── Header row ── */}
          <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-[#e1fcad]/50">
                How it works
              </span>
              <h2 className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-5xl">
                Four steps to{" "}
                <span className="text-white/30">full clarity</span>
              </h2>
            </div>

            {/* "See full demo" CTA */}
            <a
              href="/product"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white/60 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white"
            >
              See full demo
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e1fcad] text-[#122023] transition-colors duration-200 group-hover:bg-[#d4f59a]">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>

          {/* ── Main content: accordion left + screenshot right ── */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-10 lg:items-start">

            {/* ── Left: numbered accordion ── */}
            <div className="flex flex-col gap-1 lg:col-span-4">
              {STEPS.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.num}
                    onClick={() => setActive(i)}
                    className={`group w-full rounded-2xl text-left transition-all duration-300 ${
                      isActive
                        ? "bg-white p-6 shadow-[0_12px_48px_rgba(0,0,0,0.35)]"
                        : "px-6 py-5 hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Number + title row */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span
                          className={`shrink-0 font-mono text-xs font-bold tracking-[0.16em] ${
                            isActive ? "text-[#4a7c59]" : "text-white/22"
                          }`}
                        >
                          {s.num}
                        </span>
                        <span
                          className={`text-[15px] font-semibold leading-snug tracking-tight transition-colors duration-200 ${
                            isActive ? "text-[#122023]" : "text-white/38 group-hover:text-white/60"
                          }`}
                        >
                          {s.title}
                        </span>
                      </div>

                      {/* Active checkmark */}
                      {isActive && (
                        <div className="shrink-0 flex size-6 items-center justify-center rounded-full bg-[#e1fcad]">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M2 5.5l2.2 2.2 3.8-4"
                              stroke="#122023"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Expanded description + stat */}
                    {isActive && (
                      <div className="mt-4 pl-[calc(0.75rem+1rem)]">
                        <p className="mb-5 text-sm leading-relaxed text-black/50">{s.desc}</p>
                        <div className="inline-flex items-baseline gap-1.5 rounded-lg bg-[#f0f9e8] px-3 py-2">
                          <span className="text-lg font-bold text-[#4a7c59]">{s.stat.val}</span>
                          <span className="text-[11px] text-[#4a7c59]/60">{s.stat.label}</span>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Right: screenshot panel ── */}
            <div className="relative lg:col-span-6 overflow-hidden rounded-3xl" style={{ height: 520 }}>
              {/* Background image with cross-fade */}
              {STEPS.map((s, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.num}
                  src={s.image}
                  alt={s.title}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Grain overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: GRAIN,
                  backgroundSize: "200px 200px",
                  opacity: 0.4,
                  mixBlendMode: "overlay",
                }}
              />

              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1618]/85 via-[#0a1618]/20 to-transparent" />

              {/* Step label at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#e1fcad]/55">
                  Step {step.num}
                </p>
                <p className="text-lg font-semibold leading-snug text-white">{step.title}</p>
              </div>

              {/* Step progress dots — top right */}
              <div className="absolute right-6 top-6 flex gap-1.5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === active ? "h-2 w-6 bg-[#e1fcad]" : "h-2 w-2 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Step ${i + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
