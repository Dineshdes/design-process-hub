"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface RotatingGlobeProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function RotatingGlobe({
  width = 1000,
  height = 580,
  className = "",
}: RotatingGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Fill the parent container width
    const containerWidth = canvas.parentElement?.clientWidth ?? width;
    const containerHeight = height;

    // ── Globe radius: fills ~2/3 of the canvas area ──────────────────────────
    // Max radius is constrained so the sphere fits cleanly inside the canvas.
    // We use 96% of the smaller dimension's half so there's a tiny breathing gap.
    const radius = Math.min(containerWidth, containerHeight) * 0.46;

    const dpr = window.devicePixelRatio || 1;
    canvas.width  = containerWidth  * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width  = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    // ── D3 orthographic projection ────────────────────────────────────────────
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    // ── Point-in-polygon (ray-casting) ────────────────────────────────────────
    const pointInPolygon = (point: [number, number], ring: number[][]): boolean => {
      const [px, py] = point;
      let inside = false;
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i];
        const [xj, yj] = ring[j];
        if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: GeoJSON.Feature): boolean => {
      const geo = feature.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon;
      if (geo.type === "Polygon") {
        const c = geo.coordinates;
        if (!pointInPolygon(point, c[0] as number[][])) return false;
        for (let i = 1; i < c.length; i++) {
          if (pointInPolygon(point, c[i] as number[][])) return false;
        }
        return true;
      }
      if (geo.type === "MultiPolygon") {
        for (const poly of geo.coordinates) {
          if (pointInPolygon(point, poly[0] as number[][])) {
            let inHole = false;
            for (let i = 1; i < poly.length; i++) {
              if (pointInPolygon(point, poly[i] as number[][])) { inHole = true; break; }
            }
            if (!inHole) return true;
          }
        }
      }
      return false;
    };

    // ── Dot generation: denser step = more visible dots ──────────────────────
    //   spacing = 9 → step ≈ 0.72° → ~1 dot per 80 km at equator
    const generateDots = (feature: GeoJSON.Feature, spacing = 9): [number, number][] => {
      const dots: [number, number][] = [];
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature as d3.GeoPermissibleObjects);
      const step = spacing * 0.08;
      for (let lng = minLng; lng <= maxLng; lng += step) {
        for (let lat = minLat; lat <= maxLat; lat += step) {
          const pt: [number, number] = [lng, lat];
          if (pointInFeature(pt, feature)) dots.push(pt);
        }
      }
      return dots;
    };

    interface DotData { lng: number; lat: number; }
    const allDots: DotData[] = [];
    let landFeatures: GeoJSON.FeatureCollection | null = null;

    // ── Render loop ───────────────────────────────────────────────────────────
    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);
      const s  = projection.scale();
      const sf = s / radius;           // scale factor for line widths / dot radius
      const cx = containerWidth  / 2;
      const cy = containerHeight / 2;

      // ── Ocean — deep-space teal radial gradient ───────────────────────────
      context.beginPath();
      context.arc(cx, cy, s, 0, 2 * Math.PI);
      const grad = context.createRadialGradient(
        cx - s * 0.28, cy - s * 0.28, s * 0.05,
        cx, cy, s
      );
      grad.addColorStop(0,   "#0f2a38");
      grad.addColorStop(0.6, "#071c26");
      grad.addColorStop(1,   "#040f15");
      context.fillStyle = grad;
      context.fill();

      // ── Atmosphere glow ring ──────────────────────────────────────────────
      const atmo = context.createRadialGradient(cx, cy, s * 0.92, cx, cy, s * 1.04);
      atmo.addColorStop(0,   "rgba(225,252,173,0.10)");
      atmo.addColorStop(0.5, "rgba(225,252,173,0.04)");
      atmo.addColorStop(1,   "rgba(225,252,173,0)");
      context.beginPath();
      context.arc(cx, cy, s * 1.04, 0, 2 * Math.PI);
      context.fillStyle = atmo;
      context.fill();

      // ── Globe rim ─────────────────────────────────────────────────────────
      context.beginPath();
      context.arc(cx, cy, s, 0, 2 * Math.PI);
      context.strokeStyle = "rgba(225,252,173,0.18)";
      context.lineWidth = 1.2 * sf;
      context.stroke();

      if (landFeatures) {
        // ── Graticule (lat/lon grid) — very subtle ──────────────────────────
        const graticule = d3.geoGraticule().step([30, 30]);
        context.beginPath();
        path(graticule());
        context.strokeStyle = "rgba(225,252,173,0.07)";
        context.lineWidth = 0.5 * sf;
        context.stroke();

        // ── Equator — slightly brighter ─────────────────────────────────────
        const equator: GeoJSON.Feature = {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: Array.from({ length: 361 }, (_, i) => [i - 180, 0]),
          },
          properties: {},
        };
        context.beginPath();
        path(equator as d3.GeoPermissibleObjects);
        context.strokeStyle = "rgba(225,252,173,0.20)";
        context.lineWidth = 0.8 * sf;
        context.stroke();

        // ── Land fill — subtle teal tint ────────────────────────────────────
        context.beginPath();
        (landFeatures.features as GeoJSON.Feature[]).forEach((f) => {
          path(f as d3.GeoPermissibleObjects);
        });
        context.fillStyle = "rgba(225,252,173,0.07)";
        context.fill();

        // ── Land outlines ───────────────────────────────────────────────────
        context.beginPath();
        (landFeatures.features as GeoJSON.Feature[]).forEach((f) => {
          path(f as d3.GeoPermissibleObjects);
        });
        context.strokeStyle = "rgba(225,252,173,0.30)";
        context.lineWidth = 0.65 * sf;
        context.stroke();

        // ── Land dots — prominent lime halftone ─────────────────────────────
        allDots.forEach(({ lng, lat }) => {
          const proj = projection([lng, lat]);
          if (!proj) return;
          const [px, py] = proj;
          if (px < 0 || px > containerWidth || py < 0 || py > containerHeight) return;

          // Brightness based on how close the dot is to the "front" face
          // (higher when near centre of visible hemisphere → nicer depth)
          const lambda = (lng - (-projection.rotate()[0])) * (Math.PI / 180);
          const phi    = lat * (Math.PI / 180);
          const depth  = Math.cos(phi) * Math.cos(lambda); // 1 = facing viewer
          const alpha  = 0.45 + 0.55 * Math.max(0, depth); // range 0.45–1.0

          context.beginPath();
          context.arc(px, py, 2.5 * sf, 0, 2 * Math.PI);
          context.fillStyle = `rgba(225,252,173,${alpha.toFixed(2)})`;
          context.fill();
        });
      }
    };

    // ── Load GeoJSON land data ────────────────────────────────────────────────
    const loadData = async () => {
      try {
        const resp = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        );
        if (!resp.ok) throw new Error("fetch failed");
        landFeatures = (await resp.json()) as GeoJSON.FeatureCollection;
        (landFeatures.features as GeoJSON.Feature[]).forEach((feature) => {
          generateDots(feature, 9).forEach(([lng, lat]) =>
            allDots.push({ lng, lat })
          );
        });
        render();
      } catch {
        setError("Globe data unavailable");
      }
    };

    // ── Rotation — start facing Europe / India / Australia region ────────────
    //   D3 rotate([lambda, phi]) — negative lambda = rotate eastward
    //   lambda = -15 centres on ~15°E (Europe/Africa/India visible)
    //   phi    = -30 tilts slightly north so Europe is prominent
    const rotation: [number, number, number] = [-15, -30, 0];
    let autoRotate = true;
    const rotationSpeed = 0.35;   // deg/frame — leisurely spin

    const rotate = () => {
      if (autoRotate) {
        rotation[0] += rotationSpeed;
        projection.rotate(rotation);
        render();
      }
    };

    const timer = d3.timer(rotate);

    // ── Drag to spin ──────────────────────────────────────────────────────────
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
