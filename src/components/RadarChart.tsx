import { RADAR_AXES } from "@/lib/shoe-helpers";
import { useId } from "react";
import type { RadarAxisKey } from "@/lib/shoe-helpers";

type RadarSeries = {
  label: string;
  values: Record<RadarAxisKey, number>;
  color: string;
};

type RadarChartProps = {
  series: RadarSeries[];
  size?: number;
  title?: string;
  showLegend?: boolean;
};

function polarToCartesian(center: number, radius: number, angle: number) {
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle)
  };
}

function polygonPoints(center: number, radius: number, values: number[]) {
  const total = values.length;
  return values
    .map((value, index) => {
      const angle = -Math.PI / 2 + (index * (2 * Math.PI)) / total;
      const point = polarToCartesian(center, radius * (value / 10), angle);
      return `${point.x},${point.y}`;
    })
    .join(" ");
}

export function RadarChart({ series, size = 360, title = "Radar", showLegend = true }: RadarChartProps) {
  const titleId = useId();
  const center = size / 2;
  const maxRadius = size * 0.32;
  const rings = [2, 4, 6, 8, 10];

  return (
    <figure className="rounded-2xl border border-[var(--border)] bg-white p-4" aria-label={title}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-auto w-full" role="img" aria-labelledby={titleId}>
        <title id={titleId}>{title}</title>

        {rings.map((ring) => {
          const values = Array.from({ length: RADAR_AXES.length }).map(() => ring);
          return (
            <polygon
              key={ring}
              points={polygonPoints(center, maxRadius, values)}
              fill="none"
              stroke="#d0d4d9"
              strokeWidth={ring === 10 ? 1.5 : 1}
            />
          );
        })}

        {RADAR_AXES.map((axis, index) => {
          const angle = -Math.PI / 2 + (index * (2 * Math.PI)) / RADAR_AXES.length;
          const edge = polarToCartesian(center, maxRadius, angle);
          const labelPos = polarToCartesian(center, maxRadius + 22, angle);

          return (
            <g key={axis.key}>
              <line x1={center} y1={center} x2={edge.x} y2={edge.y} stroke="#d0d4d9" strokeWidth={1} />
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fill="#0c0d0d"
                style={{ letterSpacing: "0.04em" }}
              >
                {axis.label}
              </text>
            </g>
          );
        })}

        {series.map((item) => {
          const values = RADAR_AXES.map((axis) => item.values[axis.key]);
          return (
            <g key={item.label}>
              <polygon
                points={polygonPoints(center, maxRadius, values)}
                fill={item.color}
                fillOpacity={0.22}
                stroke={item.color}
                strokeWidth={2}
              />
            </g>
          );
        })}
      </svg>

      {showLegend && (
        <figcaption className="mt-3 flex flex-wrap gap-3 text-xs">
          {series.map((item) => (
            <span key={item.label} className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} aria-hidden />
              {item.label}
            </span>
          ))}
        </figcaption>
      )}
    </figure>
  );
}
