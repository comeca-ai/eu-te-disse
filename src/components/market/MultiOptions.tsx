"use client";

import { useState } from "react";
import type { MultiMarket } from "@/lib/types";

export function MultiOptions({ market }: { market: MultiMarket }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="detail-card" style={{ marginBottom: 16 }}>
      <div className="spread" style={{ marginBottom: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>Opções ({market.options.length})</div>
        <div className="muted" style={{ fontSize: 12 }}>
          Selecione para ver no gráfico
        </div>
      </div>
      {market.options.map((o, i) => (
        <div
          key={i}
          className="outcome-row"
          data-active={selected === i}
          onClick={() => setSelected(i)}
        >
          <div className="outcome-color" style={{ background: o.color }} />
          <div>
            <div className="outcome-name">{o.name}</div>
          </div>
          <div
            className="outcome-pct"
            style={{
              color:
                o.trend === "up"
                  ? "var(--yes)"
                  : o.trend === "down"
                  ? "var(--no)"
                  : "var(--text-0)"
            }}
          >
            {o.pct}%
          </div>
          <div className="outcome-buys">
            <button className="multi-mini-yes">Sim {o.pct}¢</button>
            <button className="multi-mini-no">Não {100 - o.pct}¢</button>
          </div>
        </div>
      ))}
    </div>
  );
}
