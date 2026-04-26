import { Crumbs } from "@/components/Crumbs";
import { MarketGrid } from "@/components/market/MarketGrid";
import { getMarkets } from "@/lib/db/markets";

function parseVol(v: string): number {
  const n = parseFloat(v.replace(/[^\d,]/g, "").replace(",", "."));
  if (v.includes("M")) return n * 1_000_000;
  if (v.includes("K")) return n * 1_000;
  return n;
}

export const metadata = { title: "Em alta — eutedisse" };

export default async function TrendingPage() {
  const all = await getMarkets();
  const list = [...all].sort((a, b) => parseVol(b.vol) - parseVol(a.vol));
  return (
    <div className="page">
      <Crumbs items={[{ label: "Início", href: "/" }, { label: "Em alta" }]} />
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 20px", letterSpacing: "-0.01em" }}>
        🔥 Em alta agora
      </h1>
      <MarketGrid markets={list} />
    </div>
  );
}
