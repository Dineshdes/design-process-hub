"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SLIDES = [
  {
    company: "Ørsted",
    companyInitial: "Ø",
    quote:
      "Verdant gave us real-time visibility across our entire carbon footprint. We reduced Scope 2 emissions by 40% in the first year — something we thought would take a decade.",
    name: "Mads Nipper",
    role: "Chief Sustainability Officer",
    avatar: "https://i.pravatar.cc/64?img=12",
    image:
      "https://images.unsplash.com/photo-1504711331083-9c895941bf81?w=900&q=85",
    stats: [
      { value: "40%", label: "Reduction in Scope 2 emissions" },
      { value: "2 yrs", label: "Ahead of net-zero target" },
    ],
  },
  {
    company: "Northvolt",
    companyInitial: "N",
    quote:
      "The AI strategy engine built our entire decarbonisation roadmap in hours. It's financially rigorous, stakeholder-ready, and it updates itself as conditions change.",
    name: "Peter Carlsson",
    role: "Head of Climate Strategy",
    avatar: "https://i.pravatar.cc/64?img=33",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=85",
    stats: [
      { value: "60%", label: "Faster reporting cycle" },
      { value: "100%", label: "Board-ready in one click" },
    ],
  },
  {
    company: "Vestas",
    companyInitial: "V",
    quote:
      "Our supply chain was a black box for emissions data. Verdant opened it up — we now attribute every tonne of CO₂ back to its source, automatically.",
    name: "Henrik Andersen",
    role: "VP Sustainability & ESG",
    avatar: "https://i.pravatar.cc/64?img=57",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=85",
    stats: [
      { value: "3×", label: "Supply chain visibility" },
      { value: "$8M", label: "Avoided compliance risk" },
    ],
  },
];

export default function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setActive((a) => (a + 1) % SLIDES.length);
  const s = SLIDES[active];

  return (
    <section className="bg-[#f7f7f5] py-[150px]">
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10">

          {/* Label */}
          <p className="mb-16 text-sm font-bold uppercase tracking-[0.18em] text-black/35">
            Customer stories
          </p>

          <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-[5fr_7fr]">

            {/* ── Left: editorial image ── */}
            <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: 520 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={active}
                src={s.image}
                alt={s.company}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* ── Right: content ── */}
            <div className="flex flex-col justify-between py-2">

              {/* Top row: company + nav */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-[#122023] text-sm font-bold text-[#e1fcad]">
                    {s.companyInitial}
                  </div>
                  <span className="text-lg font-semibold text-[#122023]">{s.company}</span>
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    aria-label="Previous"
                    className="flex size-11 items-center justify-center rounded-full bg-[#e1fcad] text-[#122023] transition-all duration-200 hover:bg-[#d4f59a] hover:scale-105 active:scale-95"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next"
                    className="flex size-11 items-center justify-center rounded-full bg-[#e1fcad] text-[#122023] transition-all duration-200 hover:bg-[#d4f59a] hover:scale-105 active:scale-95"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="my-10">
                <p className="text-2xl font-normal leading-[1.45] tracking-[-0.02em] text-[#122023] md:text-3xl">
                  &ldquo;{s.quote}&rdquo;
                </p>
              </blockquote>

              {/* Author + case study */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="size-11 rounded-full object-cover ring-2 ring-[#e1fcad] ring-offset-2 ring-offset-[#f7f7f5]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#122023]">{s.name}</p>
                    <p className="text-sm text-black/45">{s.role}</p>
                  </div>
                </div>

                <a
                  href="#"
                  className="group flex items-center gap-1.5 text-sm font-semibold text-[#122023]/60 transition-colors duration-200 hover:text-[#122023]"
                >
                  Case study
                  <span className="flex size-6 items-center justify-center rounded-full border border-[#122023]/20 transition-all duration-200 group-hover:bg-[#122023] group-hover:border-[#122023]">
                    <ArrowRight className="h-3 w-3 group-hover:text-white transition-colors duration-200" />
                  </span>
                </a>
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-black/[0.07] pt-10">
                {s.stats.map((stat) => (
                  <div key={stat.label} className="border-l-2 border-[#e1fcad] pl-5">
                    <p className="text-4xl font-normal tracking-[-0.03em] text-[#122023] md:text-5xl">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-sm text-black/45 leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Slide indicators */}
              <div className="mt-8 flex items-center gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-8 bg-[#122023]" : "w-2 bg-[#122023]/20"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
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
