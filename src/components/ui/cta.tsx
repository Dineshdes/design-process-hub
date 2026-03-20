import { ArrowUpRight, Leaf, CircleCheck } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  Shared CTA components — used across every page for consistency
//  Pattern: lime text area (#e1fcad) + dark arrow circle (#122023)
// ─────────────────────────────────────────────────────────────────────────────

/** Primary CTA — lime text + dark arrow circle (works on light & dark bgs) */
export function PrimaryCTA({
  label,
  href = "/hero",
}: {
  label: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group flex cursor-pointer items-center gap-0 overflow-hidden rounded-full"
    >
      <span className="rounded-l-full bg-[#e1fcad] py-4 pl-8 pr-6 text-sm font-semibold text-black transition-colors duration-300 group-hover:bg-[#d4f59a]">
        {label}
      </span>
      <div className="relative flex size-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#122023] text-[#e1fcad] transition-colors duration-300 group-hover:bg-[#1a2f33]">
        <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 group-hover:translate-x-10" />
        <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 group-hover:-translate-x-1/2" />
      </div>
    </a>
  );
}

/** Secondary CTA — ghost/outline, for dark backgrounds */
export function SecondaryCTA({
  label,
  href = "#",
}: {
  label: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group flex cursor-pointer items-center gap-0 overflow-hidden rounded-full border border-white/20"
    >
      <span className="rounded-l-full py-4 pl-8 pr-6 text-sm font-semibold text-white/70 transition-colors duration-300 group-hover:text-white">
        {label}
      </span>
      <div className="relative flex size-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full text-white/50 transition-colors duration-300 group-hover:text-white">
        <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 group-hover:translate-x-10" />
        <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 group-hover:-translate-x-1/2" />
      </div>
    </a>
  );
}

/** Ghost CTA — outline on light backgrounds (feature detail sections) */
export function GhostCTA({
  label,
  href = "#",
}: {
  label: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group flex w-fit cursor-pointer items-center gap-0 overflow-hidden rounded-full border border-black/10"
    >
      <span className="rounded-l-full bg-transparent py-3.5 pl-7 pr-5 text-sm font-semibold text-[#122023] transition-colors duration-300 group-hover:bg-black/[0.03]">
        {label}
      </span>
      <div className="relative flex size-[46px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#122023] text-[#e1fcad]">
        <ArrowUpRight className="absolute h-4 w-4 -translate-x-1/2 transition-all duration-500 group-hover:translate-x-10" />
        <ArrowUpRight className="absolute h-4 w-4 -translate-x-10 transition-all duration-500 group-hover:-translate-x-1/2" />
      </div>
    </a>
  );
}

/** Small inline CTA — used in section header rows (eg "See the platform") */
export function InlineCTA({
  label,
  href = "#",
}: {
  label: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group mb-1 hidden shrink-0 cursor-pointer items-center gap-0 overflow-hidden rounded-full border border-black/10 bg-transparent transition-colors hover:border-black/30 md:flex"
    >
      <span className="pl-5 pr-4 text-sm font-medium text-black">{label}</span>
      <div className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-[#122023] text-[#e1fcad]">
        <ArrowUpRight className="absolute h-4 w-4 -translate-x-1/2 transition-all duration-500 group-hover:translate-x-10" />
        <ArrowUpRight className="absolute h-4 w-4 -translate-x-10 transition-all duration-500 group-hover:-translate-x-1/2" />
      </div>
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Pre-footer CTA banner — centered dark section above the footer
// ─────────────────────────────────────────────────────────────────────────────
export function PreFooterBanner() {
  return (
    <section className="bg-[#0d1a1c] py-24">
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10 flex flex-col items-center text-center">
          {/* Leaf icon */}
          <div className="mb-8 flex size-14 items-center justify-center rounded-full bg-[#e1fcad]">
            <Leaf className="h-6 w-6 text-[#122023]" />
          </div>

          <h2 className="mb-5 max-w-2xl text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white md:text-5xl">
            Start talking to your sustainability data
          </h2>

          <p className="mb-10 max-w-xl text-base leading-relaxed text-white/45">
            No setup. No training data required. Connect your existing tools and
            Verdant AI is ready in minutes.
          </p>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-6">
            <PrimaryCTA label="Try Verdant AI free" href="/product" />
            <a
              href="/about"
              className="text-sm font-medium text-white/50 transition-colors duration-300 hover:text-white"
            >
              Book a demo
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/30">
            <span className="flex items-center gap-1.5">
              <CircleCheck className="h-3.5 w-3.5" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CircleCheck className="h-3.5 w-3.5" /> 14-day free trial
            </span>
            <span className="flex items-center gap-1.5">
              <CircleCheck className="h-3.5 w-3.5" /> Cancel anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
