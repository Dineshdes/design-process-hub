"use client";

import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Solutions", href: "#" },
  { label: "Impact",    href: "#" },
  { label: "Process",   href: "#" },
  { label: "About",     href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0d1a1c]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10 flex h-[68px] items-center justify-between">

          {/* ── Logo ── */}
          <a href="#" className="group flex items-center gap-3">
            <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e1fcad] shadow-[0_0_0_3px_rgba(225,252,173,0.15)] transition-all duration-300 group-hover:shadow-[0_0_0_5px_rgba(225,252,173,0.2)]">
              <Leaf className="h-[18px] w-[18px] text-[#122023]" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              Verdant
            </span>
          </a>

          {/* ── Desktop nav links ── */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-4 py-2 text-[13px] font-medium text-white/60 transition-colors duration-200 hover:bg-white/[0.07] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── CTA ── */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#"
              className="text-[13px] font-medium text-white/50 transition-colors duration-200 hover:text-white"
            >
              Sign in
            </a>
            <a
              href="#"
              className="group flex items-center overflow-hidden rounded-full bg-[#e1fcad] transition-all duration-300 hover:bg-white"
            >
              <span className="pl-5 pr-4 text-[13px] font-semibold text-[#122023]">
                Get started
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-[#122023] text-[#e1fcad] transition-colors duration-300 group-hover:bg-[#e1fcad] group-hover:text-[#122023]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="flex size-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/[0.08] bg-[#0d1a1c]/95 backdrop-blur-xl px-6 py-5 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block rounded-xl px-4 py-3 text-[14px] font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/[0.08] mt-3 flex flex-col gap-2">
            <a href="#" className="block rounded-xl px-4 py-3 text-[14px] font-medium text-white/50 hover:text-white transition-colors">
              Sign in
            </a>
            <a href="#" className="flex items-center justify-center rounded-full bg-[#e1fcad] py-3 text-[14px] font-semibold text-[#122023]">
              Get started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
