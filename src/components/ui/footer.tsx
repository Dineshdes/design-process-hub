"use client";

import { useState } from "react";
import { Leaf, ArrowUpRight, Send } from "lucide-react";
import { PrimaryCTA } from "@/components/ui/cta";

// ─────────────────────────────────────────────────────────────────────────────
//  Footer — PlasmaOne-style layout:
//  • Large centred heading (lime accent word)
//  • Inline e-mail + CTA row
//  • Three-stat row separated by pipes
//  • Big product dashboard card rising from the bottom-centre
//  • Scenic landscape image fills the lower half
//  • Thin bottom bar: nav links + copyright
// ─────────────────────────────────────────────────────────────────────────────

const SOLUTION_LINKS = [
  { label: "Clean Energy",       href: "/product" },
  { label: "Carbon Strategy",    href: "/solutions" },
  { label: "Community Programs", href: "#" },
  { label: "Blog",               href: "/blog" },
  { label: "Contact Us",         href: "#" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn",   href: "#" },
  { label: "Twitter",    href: "#" },
  { label: "YouTube",    href: "#" },
  { label: "Instagram",  href: "#" },
];

const STATS = [
  { value: "2.4M", label: "tonnes CO₂ avoided" },
  { value: "15K+", label: "Teams connected" },
  { value: "42",   label: "Countries" },
];


// ── Newsletter form ────────────────────────────────────────────────────────
function NewsletterForm() {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-white/60">
        <Send className="h-4 w-4 text-[#e1fcad]" />
        You&apos;re in — weekly climate intelligence incoming.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
      className="flex w-full max-w-md items-center overflow-hidden rounded-full border border-white/[0.15] bg-white/[0.07] shadow-sm transition-shadow focus-within:border-white/30 focus-within:shadow-md"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="min-w-0 flex-1 bg-transparent px-6 py-3.5 text-sm text-white outline-none placeholder:text-white/50"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="m-1 flex shrink-0 items-center gap-2 rounded-full bg-[#e1fcad] px-5 py-2.5 text-sm font-semibold text-[#122023] transition-colors duration-200 hover:bg-[#d4f59a]"
      >
        Join <ArrowUpRight className="h-4 w-4" />
      </button>
    </form>
  );
}

// ── Main Footer ────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0a1618]">

      {/* ── Full-height background image — spans the entire footer ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=90"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[center_60%]"
      />

      {/* Top gradient — dark bg bleeds into the image seamlessly */}
      <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#0a1618] via-[#0a1618]/75 to-transparent" />

      {/* ── Top CTA section — sits over the gradient ── */}
      <div className="relative z-10 px-6 pt-24 pb-0 text-center md:pt-32">

        {/* Leaf badge */}
        <div className="mx-auto mb-7 flex size-12 items-center justify-center rounded-full bg-[#e1fcad]/10 ring-1 ring-[#e1fcad]/20">
          <Leaf className="h-5 w-5 text-[#e1fcad]" />
        </div>

        {/* Heading */}
        <h2 className="mx-auto mb-6 max-w-2xl text-4xl font-normal leading-[1.06] tracking-[-0.03em] text-white md:text-5xl lg:text-[56px]">
          Start talking to your{" "}
          <span className="text-[#e1fcad]">sustainability&nbsp;data</span>
        </h2>

        <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-white/40">
          No setup. No training data required. Connect your existing tools and
          Verdant AI is ready in minutes.
        </p>

        {/* E-mail + CTA row */}
        <div className="mx-auto mb-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <NewsletterForm />
        </div>

        {/* Trust tags */}
        <p className="mb-14 text-xs text-white/50">
          No credit card required &nbsp;·&nbsp; 14-day free trial &nbsp;·&nbsp; Cancel anytime
        </p>

        {/* Stats row — three metrics with pipe separators */}
        <div className="mx-auto mb-0 flex max-w-lg items-center justify-center divide-x divide-white/10">
          {STATS.map((s) => (
            <div key={s.value} className="flex flex-col items-center px-8 py-2">
              <span className="text-2xl font-semibold tracking-tight text-[#e1fcad]">{s.value}</span>
              <span className="mt-0.5 text-xs text-white/65">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom navigation card ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 pb-10 pt-16">
        <div className="rounded-3xl bg-[#111f22] px-8 py-10 ring-1 ring-white/[0.07] md:px-12">

          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

            {/* Brand */}
            <div className="min-w-0 max-w-xs flex-1">
              <div className="mb-1 flex items-center gap-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e1fcad]">
                  <Leaf className="h-4 w-4 text-[#122023]" />
                </div>
                <span className="text-2xl font-semibold tracking-tight text-white">Verdant</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/30">
                Empowering a just and sustainable future through clean energy solutions.
              </p>
            </div>

            {/* Nav columns */}
            <div className="flex shrink-0 gap-14 md:gap-20">
              <div>
                <h4 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/25">
                  Solutions
                </h4>
                <ul className="space-y-3">
                  {SOLUTION_LINKS.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group flex items-center gap-1 text-sm text-white/45 transition-colors duration-200 hover:text-white"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-70" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/25">
                  Follow us
                </h4>
                <ul className="space-y-3">
                  {SOCIAL_LINKS.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group flex items-center gap-1 text-sm text-white/45 transition-colors duration-200 hover:text-white"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-70" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-7 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-6">
              {["Cookies policy", "Privacy policy", "Terms"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-sm text-white/25 transition-colors duration-200 hover:text-white/55"
                >
                  {l}
                </a>
              ))}
            </div>
            <span className="text-sm text-white/20">&copy; 2026 Verdant Energy Ltd.</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
