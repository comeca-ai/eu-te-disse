import { notFound } from "next/navigation";
import { Crumbs } from "@/components/Crumbs";
import { Icon } from "@/components/Icon";
import { LineChart } from "@/components/market/LineChart";
import { OrderPanel } from "@/components/market/OrderPanel";
import { MarketTabs } from "@/components/market/MarketTabs";
import { MultiOptions } from "@/components/market/MultiOptions";
import { MARKET_DETAIL } from "@/lib/markets-data";
import { getMarketById } from "@/lib/db/markets";
import type { ChartSeries } from "@/lib/types";

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = await getMarketById(id);
  return { title: m ? `${m.title} — eutedisse` : "Mercado — eutedisse" };
}

function genSeries(seed: number, base: number, vol: number, drift: number): number[] {
  const points: number[] = [];
  let v = base;
  for (let i = 0; i < 90; i++) {
    const noise = (Math.sin(seed * i * 0.31) + Math.cos(seed * i * 0.17)) * vol;
    v += drift + noise * 0.3;
    v = Math.max(2, Math.min(98, v));
    points.push(Math.round(v * 10) / 10);
  }
  return points;
}

export default async function MarketPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ side?: string }>;
}) {
  const { id } = await params;
  const { side } = await searchParams;
  const market = await getMarketById(id);
  if (!market) notFound();

  const detail = MARKET_DETAIL[id];
  const isMulti = market.type === "multi";

  let series: ChartSeries[];
  if (detail?.series) {
    series = detail.series;
  } else if (market.type === "binary") {
    const driftSim = market.trend === "up" ? 0.1 : market.trend === "down" ? -0.1 : 0;
    series = [
      { name: "Sim", color: "#2bc48a", pts: genSeries(7, market.prob, 3, driftSim) },
      { name: "Não", color: "#f04f5f", pts: genSeries(8, 100 - market.prob, 3, -driftSim) }
    ];
  } else {
    series = market.options.slice(0, 4).map((o, i) => ({
      name: o.name,
      color: o.color,
      pts: genSeries(10 + i, o.pct, 3, 0)
    }));
  }

  const initialProb = isMulti ? market.options[0].pct : market.prob;

  return (
    <div className="page">
      <Crumbs
        items={[
          { label: "Início", href: "/" },
          { label: market.catLabel, href: `/category/${market.cat}` },
          { label: market.title }
        ]}
      />

      <div className="detail-grid">
        <div>
          <div className="detail-card" style={{ marginBottom: 16 }}>
            <div className="detail-head">
              <div className="d-thumb">{market.emoji}</div>
              <div>
                <h1>{market.title}</h1>
                <div className="detail-meta">
                  <span>
                    <Icon name="chart" size={12} /> Vol. {market.vol}
                  </span>
                  <span>
                    <Icon name="clock" size={12} /> Encerra {market.end}
                  </span>
                  <span className="mc-cat" style={{ background: "var(--bg-2)" }}>
                    {market.catLabel}
                  </span>
                </div>
              </div>
              <div className="detail-actions">
                <button className="iconbtn">
                  <Icon name="bookmark" size={16} />
                </button>
                <button className="iconbtn">
                  <Icon name="share" size={16} />
                </button>
              </div>
            </div>

            <div style={{ display: "flex", gap: 24, alignItems: "baseline", marginBottom: 16 }}>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 44,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color:
                      market.type === "binary" && market.trend === "up"
                        ? "var(--yes)"
                        : market.type === "binary" && market.trend === "down"
                        ? "var(--no)"
                        : "var(--text-0)",
                    lineHeight: 1
                  }}
                >
                  {initialProb}
                  <span style={{ fontSize: 24, color: "var(--text-2)" }}>%</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 6, fontWeight: 600 }}>
                  {isMulti ? market.options[0].name : "Probabilidade"}
                  {market.type === "binary" && market.delta && (
                    <span
                      style={{
                        color:
                          market.trend === "up"
                            ? "var(--yes)"
                            : market.trend === "down"
                            ? "var(--no)"
                            : "var(--text-2)",
                        marginLeft: 8
                      }}
                    >
                      {market.trend === "up" ? "↑" : market.trend === "down" ? "↓" : "→"}{" "}
                      {market.delta} pp esta semana
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="legend">
              {series.map((s) => (
                <span key={s.name} className="legend-dot" style={{ ["--clr" as string]: s.color }}>
                  {s.name}
                </span>
              ))}
            </div>

            <LineChart series={series} range="1M" />
          </div>

          {isMulti && <MultiOptions market={market} />}

          <MarketTabs detail={detail} />
        </div>

        <OrderPanel market={market} initialSide={side === "no" ? "no" : "yes"} prob={initialProb} />
      </div>
    </div>
  );
}
