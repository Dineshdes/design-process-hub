"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  rootMargin = "0px",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** IntersectionObserver rootMargin. Use e.g. "0px 0px -35% 0px" to trigger near the viewport centre. */
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
