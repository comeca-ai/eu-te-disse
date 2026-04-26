"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { MultiMarket } from "@/lib/types";

export function MultiCard({ m }: { m: MultiMarket }) {
  const top = m.options.slice(0, 4);
  return (
    <Link href={`/market/${m.id}`} className="multi-card">
      <div className="multi-head">
        <div className="multi-thumb">{m.emoji}</div>
        <div style={{ flex: 1 }}>
          <div className="multi-title">{m.title}</div>
          <div className="multi-vol">
            Vol. {m.vol} • Encerra {m.end}
          </div>
        </div>
      </div>
      {top.map((o, i) => (
        <div className="multi-row" key={i}>
          <div className="multi-name">
            <span className="multi-avatar" style={{ background: o.color, color: "#fff" }}>
              {o.initial}
            </span>
            {o.name}
          </div>
          <div className="multi-pct">{o.pct}%</div>
          <div className="multi-mini-yes">Sim {o.pct}¢</div>
          <div className="multi-mini-no">Não {100 - o.pct}¢</div>
        </div>
      ))}
      {m.options.length > 4 && (
        <div className="multi-more">
          <span>+{m.options.length - 4} opções</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            Ver todas <Icon name="chevron" size={12} />
          </span>
        </div>
      )}
    </Link>
  );
}
