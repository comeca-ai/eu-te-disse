import { createClient } from "@/lib/supabase/server";
import { CATEGORIES, MARKETS, getMarketsByCategory as mockByCat, getMarketById as mockById } from "@/lib/markets-data";
import type { Category, Market } from "@/lib/types";

// Quando a env do Supabase não está configurada, voltamos para os mocks
function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function formatBRL(cents: number): string {
  const reais = cents / 100;
  if (reais >= 1_000_000) return `R$ ${(reais / 1_000_000).toFixed(1).replace(".", ",")}M`;
  if (reais >= 1_000) return `R$ ${Math.round(reais / 1_000)}K`;
  return `R$ ${reais.toFixed(2).replace(".", ",")}`;
}

function formatEnd(date: string): string {
  const d = new Date(date);
  const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return `${String(d.getUTCDate()).padStart(2, "0")} ${meses[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

interface DbMarketRow {
  id: string;
  category_id: string;
  title: string;
  emoji: string | null;
  type: "binary" | "multi";
  prob: number | null;
  trend: "up" | "down" | "flat" | null;
  delta: string | null;
  volume_cents: number;
  ends_at: string;
  featured: boolean;
}

interface DbOptionRow {
  market_id: string;
  name: string;
  initial: string;
  color: string;
  pct: number;
  trend: "up" | "down" | "flat" | null;
  position: number;
}

interface DbCategoryRow {
  id: string;
  label: string;
  emoji: string;
}

function rowsToMarket(row: DbMarketRow, opts: DbOptionRow[], catLabel: string): Market {
  const base = {
    id: row.id,
    cat: row.category_id,
    catLabel,
    emoji: row.emoji || "🎯",
    title: row.title,
    vol: formatBRL(row.volume_cents),
    end: formatEnd(row.ends_at),
    featured: row.featured
  };
  if (row.type === "multi") {
    return {
      ...base,
      type: "multi",
      options: opts
        .filter((o) => o.market_id === row.id)
        .sort((a, b) => a.position - b.position)
        .map((o) => ({
          name: o.name,
          initial: o.initial,
          color: o.color,
          pct: o.pct,
          trend: (o.trend ?? "flat") as Market extends { type: "multi" } ? never : never & "flat"
        }))
    } as Market;
  }
  return {
    ...base,
    type: "binary",
    prob: row.prob ?? 50,
    trend: (row.trend ?? "flat") as "up" | "down" | "flat",
    delta: row.delta ?? "0"
  } as Market;
}

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return CATEGORIES.filter((c) => c.id !== "trending");
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("id,label,emoji")
      .order("sort", { ascending: true });
    if (error || !data?.length) return CATEGORIES.filter((c) => c.id !== "trending");
    return (data as DbCategoryRow[]).map((c) => ({ id: c.id, label: c.label, emoji: c.emoji }));
  } catch {
    return CATEGORIES.filter((c) => c.id !== "trending");
  }
}

export async function getMarkets(): Promise<Market[]> {
  if (!isSupabaseConfigured()) return MARKETS;
  try {
    const supabase = await createClient();
    const [{ data: marketRows }, { data: optRows }, { data: catRows }] = await Promise.all([
      supabase.from("markets").select("*").eq("status", "active").order("volume_cents", { ascending: false }),
      supabase.from("market_options").select("*"),
      supabase.from("categories").select("id,label")
    ]);
    if (!marketRows?.length) return MARKETS;
    const catMap = new Map((catRows ?? []).map((c) => [c.id as string, c.label as string]));
    return (marketRows as DbMarketRow[]).map((r) =>
      rowsToMarket(r, (optRows as DbOptionRow[]) ?? [], catMap.get(r.category_id) ?? r.category_id)
    );
  } catch {
    return MARKETS;
  }
}

export async function getMarketsByCategory(catId: string): Promise<Market[]> {
  if (catId === "trending") {
    const all = await getMarkets();
    return all.filter((m) => m.featured);
  }
  if (!isSupabaseConfigured()) return mockByCat(catId);
  const all = await getMarkets();
  return all.filter((m) => m.cat === catId);
}

export async function getMarketById(id: string): Promise<Market | undefined> {
  if (!isSupabaseConfigured()) return mockById(id);
  const all = await getMarkets();
  return all.find((m) => m.id === id);
}
