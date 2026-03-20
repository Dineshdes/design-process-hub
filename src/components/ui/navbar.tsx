"use client";

import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Solutions", href: "#" },
  { label: "Product",   href: "/product" },
  { label: "Impact",    href: "#" },
  { label: "About",     href: "/about" },
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
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10 flex h-[68px] items-center justify-between">

          {/* ── Logo ── */}
          <a href="/hero" className="group flex items-center gap-3">
            <div
              className={`relative flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:shadow-[0_0_0_5px_rgba(18,32,35,0.08)] ${
                scrolled
                  ? "bg-[#122023] shadow-[0_0_0_3px_rgba(18,32,35,0.06)]"
                  : "bg-[#e1fcad] shadow-[0_0_0_3px_rgba(225,252,173,0.15)]"
              }`}
            >
              <Leaf
                className={`h-[18px] w-[18px] transition-colors duration-300 ${
                  scrolled ? "text-[#e1fcad]" : "text-[#122023]"
                }`}
              />
            </div>
            <span
              className={`text-base font-semibold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-[#122023]" : "text-white"
              }`}
            >
              Verdant
            </span>
          </a>

          {/* ── Desktop nav links ── */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-full px-4 py-2 text-base font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-[#122023]/70 hover:bg-black/[0.04] hover:text-[#122023]"
                    : "text-white hover:bg-white/[0.07]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── CTA ── */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#"
              className={`text-base font-medium transition-colors duration-200 ${
                scrolled
                  ? "text-[#122023]/50 hover:text-[#122023]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Sign in
            </a>
            <a
              href="#"
              className="group flex items-center overflow-hidden rounded-full bg-[#122023] transition-all duration-300 hover:bg-[#1a2f33]"
            >
              <span className="pl-5 pr-4 text-base font-semibold text-[#e1fcad]">
                Get started
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-[#e1fcad] text-[#122023] transition-colors duration-300 group-hover:bg-[#d4f59a]">
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
            className={`flex size-9 items-center justify-center rounded-full transition-colors md:hidden ${
              scrolled
                ? "text-[#122023]/60 hover:bg-black/[0.05] hover:text-[#122023]"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
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
        <div
          className={`px-6 py-5 space-y-1 border-t backdrop-blur-xl ${
            scrolled
              ? "bg-white/98 border-black/[0.06]"
              : "bg-[#0d1a1c]/95 border-white/[0.08]"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                scrolled
                  ? "text-[#122023]/70 hover:bg-black/[0.04] hover:text-[#122023]"
                  : "text-white/70 hover:bg-white/[0.06] hover:text-white"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div
            className={`pt-3 mt-3 flex flex-col gap-2 border-t ${
              scrolled ? "border-black/[0.06]" : "border-white/[0.08]"
            }`}
          >
            <a
              href="#"
              className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                scrolled ? "text-[#122023]/50 hover:text-[#122023]" : "text-white/50 hover:text-white"
              }`}
            >
              Sign in
            </a>
            <a href="#" className="flex items-center justify-center rounded-full bg-[#122023] py-3 text-base font-semibold text-[#e1fcad]">
              Get started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
