"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface RotatingGlobeProps {
  width?: number;
  height?: number;
  className?: string;
}

const COUNTRY_INFO: Record<string, { name: string; flag: string }> = {
  GBR: { name: "United Kingdom", flag: "🇬🇧" },
  DEU: { name: "Germany",        flag: "🇩🇪" },
  FRA: { name: "France",         flag: "🇫🇷" },
  NLD: { name: "Netherlands",    flag: "🇳🇱" },
  SWE: { name: "Sweden",         flag: "🇸🇪" },
  NOR: { name: "Norway",         flag: "🇳🇴" },
  DNK: { name: "Denmark",        flag: "🇩🇰" },
  FIN: { name: "Finland",        flag: "🇫🇮" },
  CHE: { name: "Switzerland",    flag: "🇨🇭" },
  BEL: { name: "Belgium",        flag: "🇧🇪" },
  IND: { name: "India",          flag: "🇮🇳" },
  AUS: { name: "Australia",      flag: "🇦🇺" },
  BRA: { name: "Brazil",         flag: "🇧🇷" },
  JPN: { name: "Japan",          flag: "🇯🇵" },
  ZAF: { name: "South Africa",   flag: "🇿🇦" },
  USA: { name: "United States",  flag: "🇺🇸" },
  CAN: { name: "Canada",         flag: "🇨🇦" },
  SGP: { name: "Singapore",      flag: "🇸🇬" },
  MYS: { name: "Malaysia",       flag: "🇲🇾" },
  IDN: { name: "Indonesia",      flag: "🇮🇩" },
};

const HIGHLIGHTED = new Set(Object.keys(COUNTRY_INFO));

export default function RotatingGlobe({
  width = 1000,
  height = 580,
  className = "",
}: RotatingGlobeProps) {
  const canvasRef        = useRef<HTMLCanvasElement>(null);
  const labelsRef        = useRef<HTMLDivElement>(null);   // overlay container
  const labelDivsRef     = useRef<Map<string, HTMLDivElement>>(new Map());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas  = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const containerWidth  = canvas.parentElement?.clientWidth ?? width;
    const containerHeight = height;
    const radius = Math.min(containerWidth, containerHeight) * 0.46;

    const dpr = window.devicePixelRatio || 1;
    canvas.width  = containerWidth  * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width  = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    // ── Point-in-polygon ────────────────────────────────────────────────
    const pointInPolygon = (point: [number, number], ring: number[][]): boolean => {
      const [px, py] = point;
      let inside = false;
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i];
        const [xj, yj] = ring[j];
        if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
      }
      return inside;
    };

    const pointInFeature = (pt: [number, number], f: GeoJSON.Feature): boolean => {
      const geo = f.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon;
      if (geo.type === "Polygon") {
        if (!pointInPolygon(pt, geo.coordinates[0] as number[][])) return false;
        for (let i = 1; i < geo.coordinates.length; i++)
          if (pointInPolygon(pt, geo.coordinates[i] as number[][])) return false;
        return true;
      }
      for (const poly of geo.coordinates) {
        if (pointInPolygon(pt, poly[0] as number[][])) {
          let hole = false;
          for (let i = 1; i < poly.length; i++)
            if (pointInPolygon(pt, poly[i] as number[][])) { hole = true; break; }
          if (!hole) return true;
        }
      }
      return false;
    };

    const generateDots = (feature: GeoJSON.Feature, spacing = 9): [number, number][] => {
      const dots: [number, number][] = [];
      const [[mnLng, mnLat], [mxLng, mxLat]] = d3.geoBounds(feature as d3.GeoPermissibleObjects);
      const step = spacing * 0.08;
      for (let lng = mnLng; lng <= mxLng; lng += step)
        for (let lat = mnLat; lat <= mxLat; lat += step) {
          const pt: [number, number] = [lng, lat];
          if (pointInFeature(pt, feature)) dots.push(pt);
        }
      return dots;
    };

    interface DotData { lng: number; lat: number; }
    const allDots: DotData[] = [];
    let landFeatures: GeoJSON.FeatureCollection | null = null;
    const countryFeatureMap = new Map<string, GeoJSON.Feature>();
    const centroids         = new Map<string, [number, number]>();

    // ── Build label DOM elements (once, after data loads) ───────────────
    const buildLabelDivs = () => {
      const container = labelsRef.current;
      if (!container) return;
      container.innerHTML = "";
      labelDivsRef.current.clear();

      centroids.forEach((_, iso) => {
        const info = COUNTRY_INFO[iso];
        const el   = document.createElement("div");

        // Base styles applied inline so no Tailwind purge issues at runtime
        el.style.cssText = [
          "position:absolute",
          "pointer-events:none",
          "display:flex",
          "align-items:center",
          "gap:7px",
          "padding:5px 11px 5px 8px",
          "border-radius:999px",
          "border:1px solid rgba(255,255,255,0.13)",
          "background:rgba(10,22,24,0.82)",
          "backdrop-filter:blur(14px)",
          "-webkit-backdrop-filter:blur(14px)",
          "box-shadow:0 4px 24px rgba(0,0,0,0.5)",
          "white-space:nowrap",
          "opacity:0",
          // GPU-composited properties only → zero layout thrash
          "transform:translate(-50%,-50%)",
          "transition:opacity 0.55s cubic-bezier(0.4,0,0.2,1)",
          "will-change:opacity,transform",
          "top:0",
          "left:0",
        ].join(";");

        el.innerHTML =
          `<span style="font-size:15px;line-height:1;display:block">${info.flag}</span>` +
          `<span style="font-size:11px;font-weight:600;letter-spacing:-0.01em;color:rgba(255,255,255,0.88)">${info.name}</span>`;

        container.appendChild(el);
        labelDivsRef.current.set(iso, el);
      });
    };

    // ── Update label positions — called every frame, zero React overhead ─
    const updateLabels = () => {
      const rot    = projection.rotate();
      const center: [number, number] = [-rot[0], -rot[1]];

      centroids.forEach((centroid, iso) => {
        const el = labelDivsRef.current.get(iso);
        if (!el) return;

        const dist      = d3.geoDistance(centroid, center); // radians
        const threshold = (Math.PI / 180) * 72;            // within 72° of centre

        if (dist >= threshold) {
          if (el.style.opacity !== "0") el.style.opacity = "0";
          return;
        }

        const proj = projection(centroid);
        if (!proj) { el.style.opacity = "0"; return; }

        // depth 1 = dead centre, 0 = at horizon
        const depth   = 1 - dist / (Math.PI / 2);
        const opacity = Math.min(1, Math.max(0, (depth - 0.08) / 0.28));

        // Move via transform (GPU-composited, no layout) — update left/top as
        // the anchor and keep translate(-50%,-50%) constant in the CSS above.
        el.style.left    = `${proj[0]}px`;
        el.style.top     = `${proj[1]}px`;
        el.style.opacity = opacity.toFixed(3);
      });
    };

    // ── Render loop ────────────────────────────────────────────────────
    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);
      const s  = projection.scale();
      const sf = s / radius;
      const cx = containerWidth  / 2;
      const cy = containerHeight / 2;

      // Ocean
      context.beginPath();
      context.arc(cx, cy, s, 0, 2 * Math.PI);
      const grad = context.createRadialGradient(cx - s * 0.28, cy - s * 0.28, s * 0.05, cx, cy, s);
      grad.addColorStop(0,   "#0f2a38");
      grad.addColorStop(0.6, "#071c26");
      grad.addColorStop(1,   "#040f15");
      context.fillStyle = grad;
      context.fill();

      // Atmosphere glow
      const atmo = context.createRadialGradient(cx, cy, s * 0.92, cx, cy, s * 1.04);
      atmo.addColorStop(0,   "rgba(225,252,173,0.10)");
      atmo.addColorStop(0.5, "rgba(225,252,173,0.04)");
      atmo.addColorStop(1,   "rgba(225,252,173,0)");
      context.beginPath();
      context.arc(cx, cy, s * 1.04, 0, 2 * Math.PI);
      context.fillStyle = atmo;
      context.fill();

      // Globe rim
      context.beginPath();
      context.arc(cx, cy, s, 0, 2 * Math.PI);
      context.strokeStyle = "rgba(225,252,173,0.18)";
      context.lineWidth = 1.2 * sf;
      context.stroke();

      if (landFeatures) {
        // Graticule
        const graticule = d3.geoGraticule().step([30, 30]);
        context.beginPath();
        path(graticule());
        context.strokeStyle = "rgba(225,252,173,0.06)";
        context.lineWidth = 0.5 * sf;
        context.stroke();

        // Equator
        const equator: GeoJSON.Feature = {
          type: "Feature",
          geometry: { type: "LineString", coordinates: Array.from({ length: 361 }, (_, i) => [i - 180, 0]) },
          properties: {},
        };
        context.beginPath();
        path(equator as d3.GeoPermissibleObjects);
        context.strokeStyle = "rgba(225,252,173,0.18)";
        context.lineWidth = 0.8 * sf;
        context.stroke();

        // Base land fill
        context.beginPath();
        (landFeatures.features as GeoJSON.Feature[]).forEach((f) => path(f as d3.GeoPermissibleObjects));
        context.fillStyle = "rgba(225,252,173,0.05)";
        context.fill();

        // Base land outlines
        context.beginPath();
        (landFeatures.features as GeoJSON.Feature[]).forEach((f) => path(f as d3.GeoPermissibleObjects));
        context.strokeStyle = "rgba(225,252,173,0.18)";
        context.lineWidth = 0.55 * sf;
        context.stroke();

        // Highlighted country fills
        countryFeatureMap.forEach((f) => {
          context.beginPath();
          path(f as d3.GeoPermissibleObjects);
          context.fillStyle = "rgba(225,252,173,0.14)";
          context.fill();

          context.beginPath();
          path(f as d3.GeoPermissibleObjects);
          context.strokeStyle = "rgba(225,252,173,0.50)";
          context.lineWidth = 0.9 * sf;
          context.stroke();
        });

        // Dots — reduced intensity
        allDots.forEach(({ lng, lat }) => {
          const proj = projection([lng, lat]);
          if (!proj) return;
          const [px, py] = proj;
          if (px < 0 || px > containerWidth || py < 0 || py > containerHeight) return;
          const lambda = (lng - (-projection.rotate()[0])) * (Math.PI / 180);
          const phi    = lat * (Math.PI / 180);
          const depth  = Math.cos(phi) * Math.cos(lambda);
          const alpha  = 0.12 + 0.26 * Math.max(0, depth);
          context.beginPath();
          context.arc(px, py, 2.2 * sf, 0, 2 * Math.PI);
          context.fillStyle = `rgba(225,252,173,${alpha.toFixed(2)})`;
          context.fill();
        });
      }

      // Labels: direct DOM, no React, no re-renders
      updateLabels();
    };

    // ── Load GeoJSON ───────────────────────────────────────────────────
    const loadData = async () => {
      try {
        const [landResp, countriesResp] = await Promise.all([
          fetch("https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"),
          fetch("https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/cultural/ne_110m_admin_0_countries.json"),
        ]);

        if (!landResp.ok) throw new Error("land fetch failed");
        landFeatures = (await landResp.json()) as GeoJSON.FeatureCollection;
        (landFeatures.features as GeoJSON.Feature[]).forEach((f) => {
          generateDots(f, 9).forEach(([lng, lat]) => allDots.push({ lng, lat }));
        });

        if (countriesResp.ok) {
          const geo = (await countriesResp.json()) as GeoJSON.FeatureCollection;
          (geo.features as GeoJSON.Feature[]).forEach((f) => {
            const iso = f.properties?.["ISO_A3"] as string;
            if (HIGHLIGHTED.has(iso)) {
              countryFeatureMap.set(iso, f);
              centroids.set(iso, d3.geoCentroid(f as d3.GeoPermissibleObjects) as [number, number]);
            }
          });
        }

        buildLabelDivs();
        render();
      } catch {
        setError("Globe data unavailable");
      }
    };

    // ── Auto-rotation ──────────────────────────────────────────────────
    const rotation: [number, number, number] = [-15, -30, 0];
    let autoRotate = true;

    const timer = d3.timer(() => {
      if (autoRotate) {
        rotation[0] += 0.35;
        projection.rotate(rotation);
        render();
      }
    });

    // ── Drag to spin ───────────────────────────────────────────────────
    const handleMouseDown = (e: MouseEvent) => {
      autoRotate = false;
      const [sx, sy] = [e.clientX, e.clientY];
      const sr = [...rotation] as [number, number, number];
      const onMove = (me: MouseEvent) => {
        rotation[0] = sr[0] + (me.clientX - sx) * 0.42;
        rotation[1] = Math.max(-80, Math.min(80, sr[1] - (me.clientY - sy) * 0.42));
        projection.rotate(rotation);
        render();
      };
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        setTimeout(() => { autoRotate = true; }, 80);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    loadData();

    return () => {
      timer.stop();
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [width, height]);

  if (error) {
    return (
      <div className={`flex items-center justify-center rounded-3xl bg-[#0a1618] p-12 ${className}`}>
        <p className="text-sm text-white/30">Globe unavailable — check network connection</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#040f15] ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full cursor-grab active:cursor-grabbing"
        style={{ height: `${height}px` }}
      />

      {/* Label overlay — all DOM updates happen here, bypassing React state */}
      <div
        ref={labelsRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* Drag hint */}
      <div className="pointer-events-none absolute bottom-5 right-5 flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/40 px-3 py-1.5 backdrop-blur-sm">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4" stroke="rgba(225,252,173,0.4)" strokeWidth="1"/>
          <path d="M3 5h4M5 3v4" stroke="rgba(225,252,173,0.4)" strokeWidth="1" strokeLinecap="round"/>
        </svg>
        <span className="text-[9px] uppercase tracking-[0.16em] text-white/25">Drag to rotate</span>
      </div>
    </div>
  );
}
