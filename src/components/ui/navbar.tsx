"use client";

import { useEffect, useRef, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  Dropdown content data
// ─────────────────────────────────────────────────────────────────────────────
const SOLUTIONS_ITEMS = [
  {
    name: "Carbon Intelligence",
    desc: "Real-time Scope 1, 2 & 3 tracking",
    href: "/solutions",
  },
  {
    name: "Compliance Reporting",
    desc: "CSRD, CDP, GRI filed in hours",
    href: "/solutions",
  },
  {
    name: "Supply Chain",
    desc: "Full Scope 3 visibility, no surveys",
    href: "/solutions",
  },
  {
    name: "Strategy Planner",
    desc: "Financially rigorous net-zero roadmaps",
    href: "/solutions",
  },
];

const BLOG_ITEMS = [
  {
    name: "Net-Zero Strategy",
    desc: "Science-based targets & planning",
    href: "/blog",
  },
  {
    name: "Carbon Markets",
    desc: "Voluntary & compliance credits",
    href: "/blog",
  },
  {
    name: "Reporting & Compliance",
    desc: "CSRD, GHG Protocol, SBTi",
    href: "/blog",
  },
  {
    name: "Technology",
    desc: "AI, data & the future of ESG",
    href: "/blog",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Dropdown panel — most.io style
//  Left: "/ label" path prefix  |  Right: 4 items with bullet + name + desc
// ─────────────────────────────────────────────────────────────────────────────
function DropdownPanel({
  label,
  items,
  open,
  onMouseEnter,
  onMouseLeave,
}: {
  label: string;
  items: { name: string; desc: string; href: string }[];
  open: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute inset-x-0 top-full border-b border-black/[0.08] bg-white transition-all duration-200 ${
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      }`}
    >
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10 flex items-start gap-16 py-7">

          {/* ── Left: path label ── */}
          <div className="w-40 shrink-0 pt-0.5">
            <span className="font-mono text-base font-semibold text-[#122023]">
              / {label}
            </span>
          </div>

          {/* ── Right: items ── */}
          <div className="flex flex-1 gap-10">
            {items.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex flex-1 flex-col gap-1.5"
              >
                {/* Bullet + name row */}
                <div className="flex items-center gap-2.5">
                  {/* Small filled pill bullet — matches most.io */}
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-[#122023]">
                    <Leaf className="h-2.5 w-2.5 text-[#e1fcad]" />
                  </span>
                  <span className="text-sm font-semibold text-[#122023] transition-colors duration-150 group-hover:text-[#4a7c59]">
                    {item.name}
                  </span>
                </div>
                {/* Description */}
                <p className="pl-[26px] text-xs leading-relaxed text-black/40 transition-colors duration-150 group-hover:text-black/60">
                  {item.desc}
                </p>
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Navbar
// ─────────────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Solutions", href: "/solutions", dropdown: "solutions" },
  { label: "Product",   href: "/product",   dropdown: null },
  { label: "Impact",    href: "/impact",    dropdown: null },
  { label: "Blog",      href: "/blog",      dropdown: "blog" },
  { label: "About",     href: "/about",     dropdown: null },
];

export default function Navbar({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const [scrolled,        setScrolled]        = useState(false);
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [activeDropdown,  setActiveDropdown]  = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Debounced close — gives cursor time to move from nav item to dropdown
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const openDropdown  = (key: string) => { cancelClose(); setActiveDropdown(key); };
  const handleLeave   = () => scheduleClose();
  const handleEnter   = (key: string) => openDropdown(key);

  const hasOpenDropdown = activeDropdown !== null;
  // On light-theme pages the navbar starts with dark text even before scrolling
  const isLight = theme === "light";
  const solidBar = scrolled || hasOpenDropdown;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solidBar
          ? "bg-white/98 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.06)]"
          : isLight
            ? "bg-[#f7f7f5]/80 backdrop-blur-md border-b border-black/[0.06]"
            : "bg-transparent"
      }`}
    >
      {/* ── Main bar ── */}
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10 flex h-[68px] items-center justify-between">

          {/* Logo */}
          <a href="/hero" className="group flex items-center gap-3">
            <div
              className={`relative flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:shadow-[0_0_0_5px_rgba(18,32,35,0.08)] ${
                solidBar || isLight
                  ? "bg-[#122023] shadow-[0_0_0_3px_rgba(18,32,35,0.06)]"
                  : "bg-[#e1fcad] shadow-[0_0_0_3px_rgba(225,252,173,0.15)]"
              }`}
            >
              <Leaf
                className={`h-[18px] w-[18px] transition-colors duration-300 ${
                  solidBar || isLight ? "text-[#e1fcad]" : "text-[#122023]"
                }`}
              />
            </div>
            <span
              className={`text-base font-semibold tracking-tight transition-colors duration-300 ${
                solidBar || isLight ? "text-[#122023]" : "text-white"
              }`}
            >
              Verdant
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeDropdown === link.dropdown && link.dropdown !== null;
              return (
                <a
                  key={link.label}
                  href={link.dropdown ? undefined : link.href}
                  onMouseEnter={() => link.dropdown ? handleEnter(link.dropdown) : setActiveDropdown(null)}
                  onMouseLeave={link.dropdown ? handleLeave : undefined}
                  onClick={link.dropdown ? (e) => e.preventDefault() : undefined}
                  className={`rounded-full px-4 py-2 text-base font-medium transition-colors duration-200 cursor-pointer select-none ${
                    solidBar || isLight
                      ? isActive
                        ? "bg-black/[0.05] text-[#122023]"
                        : "text-[#122023]/70 hover:bg-black/[0.04] hover:text-[#122023]"
                      : "text-white hover:bg-white/[0.07]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#"
              className={`text-base font-medium transition-colors duration-200 ${
                solidBar || isLight
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
                  width="14" height="14"
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

          {/* Mobile hamburger */}
          <button
            className={`flex size-9 items-center justify-center rounded-full transition-colors md:hidden ${
              solidBar || isLight
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

      {/* ── Dropdown panels ── */}
      <DropdownPanel
        label="solutions"
        items={SOLUTIONS_ITEMS}
        open={activeDropdown === "solutions"}
        onMouseEnter={() => handleEnter("solutions")}
        onMouseLeave={handleLeave}
      />
      <DropdownPanel
        label="insights"
        items={BLOG_ITEMS}
        open={activeDropdown === "blog"}
        onMouseEnter={() => handleEnter("blog")}
        onMouseLeave={handleLeave}
      />

      {/* ── Mobile drawer ── */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`space-y-1 border-t px-6 py-5 backdrop-blur-xl ${
            scrolled
              ? "border-black/[0.06] bg-white/98"
              : "border-white/[0.08] bg-[#0d1a1c]/95"
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

          {/* Mobile solutions sub-items */}
          <div className={`border-t pt-3 mt-1 ${scrolled ? "border-black/[0.06]" : "border-white/[0.08]"}`}>
            <p className={`px-4 pb-2 text-xs font-bold uppercase tracking-[0.14em] ${scrolled ? "text-black/30" : "text-white/30"}`}>Solutions</p>
            {SOLUTIONS_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 transition-colors ${
                  scrolled
                    ? "text-[#122023]/65 hover:bg-black/[0.04] hover:text-[#122023]"
                    : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-[#122023]">
                  <Leaf className="h-2.5 w-2.5 text-[#e1fcad]" />
                </span>
                <span className="text-sm font-medium">{item.name}</span>
              </a>
            ))}
          </div>

          <div
            className={`mt-3 flex flex-col gap-2 border-t pt-3 ${
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
            <a
              href="#"
              className="flex items-center justify-center rounded-full bg-[#122023] py-3 text-base font-semibold text-[#e1fcad]"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
