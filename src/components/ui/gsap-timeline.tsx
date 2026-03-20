"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DATA = [
  { year: "2018", label: "Founded in Copenhagen with a team of 6" },
  { year: "2019", label: "First 50 enterprise clients across Europe" },
  { year: "2021", label: "Expanded to North America & APAC" },
  { year: "2023", label: "Launched the Verdant carbon data platform" },
  { year: "2025", label: "2.4M tonnes CO₂ avoided — and counting" },
];

export function GsapTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Center line draws from top on scroll
      gsap.fromTo(
        ".tl-center-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".tl-center-line",
            start: "top 65%",
            end: "bottom 35%",
            scrub: 1.2,
          },
        }
      );

      // Items slide in from their side
      const items = gsap.utils.toArray<HTMLElement>(".tl-item", ref.current);
      items.forEach((item, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          item,
          { opacity: 0, x: fromLeft ? -70 : 70 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 60%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Dots pop in with spring
      const dots = gsap.utils.toArray<HTMLElement>(".tl-dot", ref.current);
      dots.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: "back.out(2.5)",
            scrollTrigger: {
              trigger: dot,
              start: "top 62%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-3xl py-4">
      {/* Vertical center line */}
      <div className="tl-center-line absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/10" />

      {DATA.map((item, i) => {
        const isLeft = i % 2 === 0;
        return (
          <div
            key={item.year}
            className="tl-item relative mb-16 flex items-start last:mb-0"
            style={{ opacity: 0 }}
          >
            {isLeft ? (
              <>
                {/* Text — right-aligned on left side */}
                <div className="w-1/2 pr-12 text-right">
                  <span className="block font-mono text-sm font-bold tracking-[0.14em] text-black/30 uppercase">
                    {item.year}
                  </span>
                  <p className="mt-2 text-[18px] font-medium leading-snug text-black">
                    {item.label}
                  </p>
                </div>
                {/* Dot */}
                <div className="tl-dot absolute left-1/2 top-2 size-[18px] -translate-x-1/2 rounded-full border-2 border-[#122023] bg-[#e1fcad]" />
                <div className="w-1/2" />
              </>
            ) : (
              <>
                <div className="w-1/2" />
                {/* Dot */}
                <div className="tl-dot absolute left-1/2 top-2 size-[18px] -translate-x-1/2 rounded-full border-2 border-[#122023] bg-[#e1fcad]" />
                {/* Text — left-aligned on right side */}
                <div className="w-1/2 pl-12">
                  <span className="block font-mono text-sm font-bold tracking-[0.14em] text-black/30 uppercase">
                    {item.year}
                  </span>
                  <p className="mt-2 text-[18px] font-medium leading-snug text-black">
                    {item.label}
                  </p>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
