"use client";

import { useEffect, useRef, useState } from "react";

export default function AmChartsGlobe({ className = "" }: { className?: string }) {
  const chartDivRef = useRef<HTMLDivElement>(null);
  const rootRef     = useRef<any>(null);
  const chartRef    = useRef<any>(null);
  const isDragging  = useRef(false);
  const rafRef      = useRef<number | null>(null);
  const lastTs      = useRef<number>(0);

  const [sliderVal, setSliderVal] = useState(0);
  const [mounted, setMounted]     = useState(false);

  // ── Init amCharts 5 ────────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);

    async function init() {
      if (!chartDivRef.current) return;

      const am5          = await import("@amcharts/amcharts5");
      const am5map       = await import("@amcharts/amcharts5/map");
      const worldLow     = (await import("@amcharts/amcharts5-geodata/worldLow")).default;
      const AnimatedTheme = (await import("@amcharts/amcharts5/themes/Animated")).default;

      // Bail if component was unmounted while imports were in-flight
      if (!chartDivRef.current) return;

      const root = am5.Root.new(chartDivRef.current);
      rootRef.current = root;

      // Remove the amCharts branding
      if ((root as any)._logo) (root as any)._logo.dispose();

      root.setThemes([AnimatedTheme.new(root)]);

      // ── Chart ──────────────────────────────────────────────────────────────
      const chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "rotateX",
          panY: "rotateY",
          projection: am5map.geoOrthographic(),
          paddingBottom: 0,
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
        })
      );
      chartRef.current = chart;

      // ── Background sphere (depth fill) ────────────────────────────────────
      const bgSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {})
      );
      bgSeries.mapPolygons.template.setAll({
        fill: am5.color(0x0d1f24),
        fillOpacity: 1,
        strokeOpacity: 0,
      });
      bgSeries.data.push({
        geometry: am5map.getGeoRectangle(90, 180, -90, -180),
      });

      // ── Graticule grid ────────────────────────────────────────────────────
      const graticule = chart.series.push(
        am5map.GraticuleSeries.new(root, { step: 30 })
      );
      graticule.mapLines.template.setAll({
        stroke: am5.color(0xe1fcad),
        strokeOpacity: 0.08,
        strokeWidth: 0.5,
      });

      // ── Country polygons ──────────────────────────────────────────────────
      const polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: worldLow,
          exclude: ["AQ"],
        })
      );

      polygonSeries.mapPolygons.template.setAll({
        fill: am5.color(0x1a3a40),
        stroke: am5.color(0xe1fcad),
        strokeOpacity: 0.18,
        strokeWidth: 0.6,
        interactive: true,
        cursorOverStyle: "pointer",
        tooltipText: "{name}",
      });

      // Tooltip styling
      polygonSeries.mapPolygons.template.set(
        "tooltip",
        am5.Tooltip.new(root, {
          labelText: "{name}",
          getFillFromSprite: false,
          background: am5.RoundedRectangle.new(root, {
            fill: am5.color(0x0a1618),
            stroke: am5.color(0xe1fcad),
            strokeOpacity: 0.25,
            cornerRadiusTL: 6,
            cornerRadiusTR: 6,
            cornerRadiusBL: 6,
            cornerRadiusBR: 6,
          }),
        })
      );

      // Hover state
      polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(0x2a5a45),
        strokeOpacity: 0.4,
      });

      // Active (clicked) state
      polygonSeries.mapPolygons.template.states.create("active", {
        fill: am5.color(0x4a8a60),
        strokeOpacity: 0.7,
      });

      // Click → toggle active
      let activePolygon: any = null;
      polygonSeries.mapPolygons.template.events.on("click", (ev: any) => {
        if (activePolygon && activePolygon !== ev.target) {
          activePolygon.states.applyAnimate("default");
        }
        if (activePolygon === ev.target) {
          ev.target.states.applyAnimate("default");
          activePolygon = null;
        } else {
          ev.target.states.applyAnimate("active");
          activePolygon = ev.target;
        }
      });

      // ── Auto-rotation (360° every 30 s) ───────────────────────────────────
      const DEG_PER_SEC = 360 / 30; // 12°/s

      function tick(timestamp: number) {
        if (!isDragging.current) {
          const elapsed = lastTs.current ? (timestamp - lastTs.current) / 1000 : 0;
          lastTs.current = timestamp;
          if (elapsed > 0 && elapsed < 0.5) {          // skip large gaps (tab hidden)
            const cur = (chart.get("rotationX") as number) ?? 0;
            chart.set("rotationX", cur - DEG_PER_SEC * elapsed);
          }
        } else {
          lastTs.current = timestamp;                  // keep timestamp fresh
        }
        rafRef.current = requestAnimationFrame(tick);
      }
      rafRef.current = requestAnimationFrame(tick);

      // Pause auto-rotation while user drags (DOM pointer events on the chart div)
      const el = chartDivRef.current!;
      const onDown = () => { isDragging.current = true; };
      const onUp   = () => { isDragging.current = false; };
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointerup",   onUp);
      el.addEventListener("pointercancel", onUp);

      // ── Entrance animation ────────────────────────────────────────────────
      chart.appear(1200, 150);
    }

    init();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (rootRef.current) {
        rootRef.current.dispose();
        rootRef.current = null;
        chartRef.current = null;
      }
    };
  }, []);

  // ── Slider: adjusts globe's horizontal rotation (longitude) ───────────────
  function handleSlider(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    setSliderVal(val);
    if (chartRef.current) {
      chartRef.current.set("rotationX", val);
    }
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* amCharts mount point */}
      <div ref={chartDivRef} className="h-full w-full" />

      {/* Horizontal-position slider */}
      {mounted && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <input
            type="range"
            min="-180"
            max="180"
            step="1"
            value={sliderVal}
            onChange={handleSlider}
            className="h-1 w-36 cursor-pointer appearance-none rounded-full bg-white/10
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:h-3
                       [&::-webkit-slider-thumb]:w-3
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-[#e1fcad]
                       [&::-webkit-slider-thumb]:shadow-[0_0_6px_#e1fcad66]
                       opacity-50 transition-opacity duration-200 hover:opacity-100 focus:opacity-100"
          />
          <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 select-none">
            rotate
          </span>
        </div>
      )}
    </div>
  );
}
