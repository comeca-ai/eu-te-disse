"use client";

import { useState } from "react";
import Link from "next/link";
import { Crumbs } from "@/components/Crumbs";
import { MarketCard } from "@/components/market/MarketCard";
import { MultiCard } from "@/components/market/MultiCard";
import { MARKETS } from "@/lib/markets-data";

export default function WatchlistPage() {
  const [faves, setFaves] = useState<string[]>(["selic-set", "eleicao-pres", "copa-26"]);
  const list = MARKETS.filter((m) => faves.includes(m.id));
  const toggleFav = (id: string) =>
    setFaves((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <div className="page">
      <Crumbs items={[{ label: "Início", href: "/" }, { label: "Acompanhando" }]} />
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 20px", letterSpacing: "-0.01em" }}>
        Acompanhando{" "}
        <span className="muted" style={{ fontSize: 14, fontWeight: 500 }}>
          ({list.length})
        </span>
      </h1>
      {list.length === 0 ? (
        <div className="empty">
          <div className="em">🔖</div>
          <h3>Nada por aqui ainda</h3>
          <div>Toque no marcador em qualquer mercado para acompanhar.</div>
          <Link href="/" className="btn btn-primary" style={{ marginTop: 16 }}>
            Explorar mercados
          </Link>
        </div>
      ) : (
        <div className="market-grid">
          {list.map((m) =>
            m.type === "multi" ? (
              <MultiCard key={m.id} m={m} />
            ) : (
              <MarketCard key={m.id} m={m} faved onFav={toggleFav} />
            )
          )}
        </div>
      )}
    </div>
  );
}
