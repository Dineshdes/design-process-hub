"use client";

import { useEffect, useRef } from "react";

const TOKEN = process.env.NEXT_PUBLIC_LOGODEV_TOKEN ?? "";

const BRANDS = [
  { name: "Siemens",           domain: "siemens.com" },
  { name: "Vestas",            domain: "vestas.com" },
  { name: "Ørsted",            domain: "orsted.com" },
  { name: "IKEA",              domain: "ikea.com" },
  { name: "Maersk",            domain: "maersk.com" },
  { name: "Unilever",          domain: "unilever.com" },
  { name: "Schneider Electric",domain: "se.com" },
  { name: "BMW",               domain: "bmw.com" },
  { name: "Microsoft",         domain: "microsoft.com" },
  { name: "Salesforce",        domain: "salesforce.com" },
  { name: "Northvolt",         domain: "northvolt.com" },
  { name: "Enphase",           domain: "enphaseenergy.com" },
];

function LogoItem({ name, domain }: { name: string; domain: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3.5 px-10 opacity-35 grayscale transition-all duration-300 hover:opacity-75 hover:grayscale-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.logo.dev/${domain}?token=${TOKEN}&size=80&format=webp`}
        alt={name}
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <span className="whitespace-nowrap text-[16px] font-semibold tracking-tight text-[#122023]">
        {name}
      </span>
    </div>
  );
}

export default function TrustedBy() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef  = useRef<number>(0);
  const posRef   = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.5;

    const tick = () => {
      posRef.current += speed;
      const half = track.scrollWidth / 2;
      if (posRef.current >= half) posRef.current -= half;
      track.style.transform = `translateX(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    const pause  = () => cancelAnimationFrame(animRef.current);
    const resume = () => { animRef.current = requestAnimationFrame(tick); };
    track.parentElement?.addEventListener("mouseenter", pause);
    track.parentElement?.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animRef.current);
      track.parentElement?.removeEventListener("mouseenter", pause);
      track.parentElement?.removeEventListener("mouseleave", resume);
    };
  }, []);

  const items = [...BRANDS, ...BRANDS];

  return (
    <section className="border-b border-black/[0.07] bg-white py-9">
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10 flex items-center gap-8">

          {/* Label */}
          <div className="flex shrink-0 items-center gap-5">
            <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] text-black/30">
              Trusted by
            </span>
            <div className="h-6 w-px bg-black/[0.10]" />
          </div>

          {/* Scrolling track */}
          <div className="relative flex-1 overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />

            <div ref={trackRef} className="flex items-center will-change-transform">
              {items.map((brand, i) => (
                <LogoItem key={`${brand.domain}-${i}`} name={brand.name} domain={brand.domain} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
