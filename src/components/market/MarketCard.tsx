"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { formatPct } from "@/lib/markets-data";
import type { BinaryMarket } from "@/lib/types";

interface MarketCardProps {
  m: BinaryMarket;
  faved?: boolean;
  onFav?: (id: string) => void;
}

export function MarketCard({ m, faved, onFav }: MarketCardProps) {
  return (
    <Link href={`/market/${m.id}`} className="market-card">
      <button
        className="fav-btn"
        data-faved={faved}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onFav?.(m.id);
        }}
        aria-label="Favoritar"
        type="button"
      >
        <Icon name="bookmark" size={14} stroke={2} />
      </button>
      <div className="mc-head">
        <div className="mc-thumb">{m.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mc-title">{m.title}</div>
        </div>
        <div className="mc-prob" data-trend={m.trend}>
          {m.prob}
          <span className="pct">%</span>
        </div>
      </div>
      <div className="mc-bar">
        <div className="mc-bar-fill" style={{ width: `${m.prob}%` }} />
      </div>
      <div className="mc-actions">
        <Link
          href={`/market/${m.id}?side=yes`}
          className="btn-yes-soft"
          onClick={(e) => e.stopPropagation()}
        >
          Sim {formatPct(m.prob)}
        </Link>
        <Link
          href={`/market/${m.id}?side=no`}
          className="btn-no-soft"
          onClick={(e) => e.stopPropagation()}
        >
          Não {formatPct(100 - m.prob)}
        </Link>
      </div>
      <div className="mc-foot">
        <span className="mc-cat">{m.catLabel}</span>
        <span>Vol. {m.vol}</span>
        <span className="dotsep">•</span>
        <span>
          <Icon name="clock" size={11} /> {m.end}
        </span>
      </div>
    </Link>
  );
}
