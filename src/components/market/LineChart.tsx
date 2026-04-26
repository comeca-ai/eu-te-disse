"use client";

import { useMemo, useState } from "react";
import type { ChartSeries } from "@/lib/types";

const RANGE_MAP: Record<string, number> = {
  "1H": 6,
  "6H": 12,
  "1D": 24,
  "1S": 36,
  "1M": 60,
  TUDO: 90
};

interface HoverState {
  i: number;
  x: number;
  values: { name: string; color: string; v: number }[];
}

export function LineChart({ series, range = "1M" }: { series: ChartSeries[]; range?: string }) {
  const [hover, setHover] = useState<HoverState | null>(null);
  const W = 800,
    H = 280,
    padL = 36,
    padR = 12,
    padT = 12,
    padB = 28;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const slice = useMemo(() => {
    const n = RANGE_MAP[range] || 90;
    return series.map((s) => ({ ...s, pts: s.pts.slice(-n) }));
  }, [series, range]);
  const N = slice[0]?.pts.length || 0;

  const x = (i: number) => padL + (i / (N - 1)) * innerW;
  const y = (v: number) => padT + (1 - v / 100) * innerH;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const ratio = (px - padL) / innerW;
    const i = Math.max(0, Math.min(N - 1, Math.round(ratio * (N - 1))));
    setHover({
      i,
      x: x(i),
      values: slice.map((s) => ({ name: s.name, color: s.color, v: s.pts[i] }))
    });
  };

  return (
    <div className="chart-wrap" onMouseLeave={() => setHover(null)} onMouseMove={onMove}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {[0, 25, 50, 75, 100].map((g) => (
          <g key={g}>
            <line
              x1={padL}
              x2={W - padR}
              y1={y(g)}
              y2={y(g)}
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="2 4"
            />
            <text
              x={padL - 6}
              y={y(g) + 3}
              fill="var(--text-3)"
              fontSize="9"
              textAnchor="end"
              fontFamily="var(--font-mono)"
            >
              {g}%
            </text>
          </g>
        ))}
        {slice.map((s) => {
          const d = s.pts
            .map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
            .join(" ");
          return (
            <g key={s.name}>
              <path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={x(N - 1)} cy={y(s.pts[N - 1])} r={3} fill={s.color} />
            </g>
          );
        })}
        {hover && (
          <g>
            <line
              x1={hover.x}
              x2={hover.x}
              y1={padT}
              y2={H - padB}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={1}
              strokeDasharray="2 3"
            />
            {hover.values.map((v, idx) => (
              <circle
                key={idx}
                cx={hover.x}
                cy={y(v.v)}
                r={4}
                fill={v.color}
                stroke="var(--bg-1)"
                strokeWidth={1.5}
              />
            ))}
          </g>
        )}
      </svg>
      {hover && (
        <div className="chart-tooltip" style={{ left: `${(hover.x / W) * 100}%`, top: 8 }}>
          {hover.values.map((v) => (
            <div
              key={v.name}
              style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 50,
                    background: v.color,
                    display: "inline-block"
                  }}
                />
                {v.name}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                {v.v.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
