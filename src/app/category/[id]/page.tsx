import { notFound } from "next/navigation";
import { Crumbs } from "@/components/Crumbs";
import { MarketGrid } from "@/components/market/MarketGrid";
import { CATEGORIES } from "@/lib/markets-data";
import { getMarketsByCategory } from "@/lib/db/markets";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cat = CATEGORIES.find((c) => c.id === id);
  return { title: `${cat?.label || id} — eutedisse` };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cat = CATEGORIES.find((c) => c.id === id);
  if (!cat) notFound();
  const list = await getMarketsByCategory(id);

  return (
    <div className="page">
      <Crumbs items={[{ label: "Início", href: "/" }, { label: cat.label }]} />
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 20px", letterSpacing: "-0.01em" }}>
        {cat.emoji} {cat.label}{" "}
        <span className="muted" style={{ fontSize: 14, fontWeight: 500 }}>
          ({list.length})
        </span>
      </h1>
      <MarketGrid markets={list} />
    </div>
  );
}
