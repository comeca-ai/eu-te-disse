"use client";

import { useState } from "react";
import { MarketCard } from "./MarketCard";
import { MultiCard } from "./MultiCard";
import type { Market } from "@/lib/types";

export function MarketGrid({ markets }: { markets: Market[] }) {
  const [faves, setFaves] = useState<string[]>(["selic-set", "eleicao-pres", "copa-26"]);
  const toggleFav = (id: string) =>
    setFaves((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  if (markets.length === 0) {
    return (
      <div className="page empty">
        <div className="em">📭</div>
        <h3>Nenhum mercado por aqui</h3>
        <div>Volte mais tarde — novos mercados são criados toda semana.</div>
      </div>
    );
  }

  return (
    <div className="market-grid">
      {markets.map((m) =>
        m.type === "multi" ? (
          <MultiCard key={m.id} m={m} />
        ) : (
          <MarketCard key={m.id} m={m} faved={faves.includes(m.id)} onFav={toggleFav} />
        )
      )}
    </div>
  );
}
