import { Hero } from "@/components/Hero";
import { CategoryRail } from "@/components/CategoryRail";
import { MarketGrid } from "@/components/market/MarketGrid";
import { Icon } from "@/components/Icon";
import { getMarkets } from "@/lib/db/markets";

function parseVol(v: string): number {
  const n = parseFloat(v.replace(/[^\d,]/g, "").replace(",", "."));
  if (v.includes("M")) return n * 1_000_000;
  if (v.includes("K")) return n * 1_000;
  return n;
}

export default async function HomePage() {
  const all = await getMarkets();
  const sorted = [...all].sort((a, b) => parseVol(b.vol) - parseVol(a.vol));

  return (
    <div className="page">
      <Hero />
      <CategoryRail />
      <div className="section">
        <div className="section-head">
          <div className="section-title">
            <Icon name="flame" size={18} /> Em alta agora
            <span className="section-sub">{sorted.length} mercados ativos</span>
          </div>
        </div>
        <MarketGrid markets={sorted} />
      </div>
    </div>
  );
}
