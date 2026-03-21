"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface RotatingGlobeProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function RotatingGlobe({
  width = 900,
  height = 500,
  className = "",
}: RotatingGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const containerWidth = Math.min(width, (canvas.parentElement?.clientWidth ?? width));
    const containerHeight = height;
    const radius = Math.min(containerWidth, containerHeight) / 2.2;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    // Point-in-polygon helpers
    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: GeoJSON.Feature): boolean => {
      const geometry = feature.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon;
      if (geometry.type === "Polygon") {
        const coords = geometry.coordinates;
        if (!pointInPolygon(point, coords[0] as number[][])) return false;
        for (let i = 1; i < coords.length; i++) {
          if (pointInPolygon(point, coords[i] as number[][])) return false;
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0] as number[][])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i] as number[][])) { inHole = true; break; }
            }
            if (!inHole) return true;
          }
        }
        return false;
      }
      return false;
    };

    const generateDots = (feature: GeoJSON.Feature, spacing = 14): [number, number][] => {
      const dots: [number, number][] = [];
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature as d3.GeoPermissibleObjects);
      const step = spacing * 0.09;
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
    // eslint-disable-next-line prefer-const
    let landFeatures: GeoJSON.FeatureCollection | null = null;

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);
      const s = projection.scale();
      const sf = s / radius;

      // Ocean sphere — deep teal
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, s, 0, 2 * Math.PI);
      const oceanGrad = context.createRadialGradient(
        containerWidth / 2 - s * 0.3, containerHeight / 2 - s * 0.3, s * 0.1,
        containerWidth / 2, containerHeight / 2, s
      );
      oceanGrad.addColorStop(0, "#0d2230");
      oceanGrad.addColorStop(1, "#060f13");
      context.fillStyle = oceanGrad;
      context.fill();

      // Globe rim
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, s, 0, 2 * Math.PI);
      context.strokeStyle = "rgba(225,252,173,0.12)";
      context.lineWidth = 1.5 * sf;
      context.stroke();

      if (landFeatures) {
        // Graticule — subtle lime grid lines
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = "rgba(225,252,173,0.09)";
        context.lineWidth = 0.6 * sf;
        context.stroke();

        // Equator — slightly brighter
        context.beginPath();
        path({ type: "Feature", geometry: { type: "LineString", coordinates: Array.from({ length: 361 }, (_, i) => [i - 180, 0]) }, properties: {} } as GeoJSON.Feature);
        context.strokeStyle = "rgba(225,252,173,0.22)";
        context.lineWidth = 0.8 * sf;
        context.stroke();

        // Land outlines — lime green
        context.beginPath();
        (landFeatures.features as GeoJSON.Feature[]).forEach((feature) => {
          path(feature as d3.GeoPermissibleObjects);
        });
        context.strokeStyle = "rgba(225,252,173,0.35)";
        context.lineWidth = 0.7 * sf;
        context.stroke();

        // Land fill — very subtle
        context.beginPath();
        (landFeatures.features as GeoJSON.Feature[]).forEach((feature) => {
          path(feature as d3.GeoPermissibleObjects);
        });
        context.fillStyle = "rgba(225,252,173,0.05)";
        context.fill();

        // Halftone dots — lime
        allDots.forEach((dot) => {
          const proj = projection([dot.lng, dot.lat]);
          if (proj && proj[0] >= 0 && proj[0] <= containerWidth && proj[1] >= 0 && proj[1] <= containerHeight) {
            context.beginPath();
            context.arc(proj[0], proj[1], 1.1 * sf, 0, 2 * Math.PI);
            context.fillStyle = "rgba(225,252,173,0.75)";
            context.fill();
          }
        });
      }
    };

    const loadData = async () => {
      try {
        const resp = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        );
        if (!resp.ok) throw new Error("fetch failed");
        landFeatures = await resp.json() as GeoJSON.FeatureCollection;
        (landFeatures.features as GeoJSON.Feature[]).forEach((feature) => {
          generateDots(feature, 14).forEach(([lng, lat]) => allDots.push({ lng, lat }));
        });
        render();
      } catch {
        setError("Map data unavailable");
      }
    };

    const rotation: [number, number, number] = [0, -20, 0];
    let autoRotate = true;

    const rotate = () => {
      if (autoRotate) {
        rotation[0] += 0.4;
        projection.rotate(rotation);
        render();
      }
    };

    const timer = d3.timer(rotate);

    const handleMouseDown = (e: MouseEvent) => {
      autoRotate = false;
      const sx = e.clientX, sy = e.clientY;
      const sr = [...rotation] as [number, number, number];
      const onMove = (me: MouseEvent) => {
        rotation[0] = sr[0] + (me.clientX - sx) * 0.45;
        rotation[1] = Math.max(-80, Math.min(80, sr[1] - (me.clientY - sy) * 0.45));
        projection.rotate(rotation);
        render();
      };
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        setTimeout(() => { autoRotate = true; }, 50);
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
        <p className="text-sm text-white/40">Globe unavailable — check network connection</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/[0.07] ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full cursor-grab active:cursor-grabbing"
        style={{ height: `${height}px` }}
      />
      <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-white/30 backdrop-blur-sm">
        Drag to rotate
      </div>
    </div>
  );
}
