"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleWatchlist(marketId: string): Promise<{ ok: boolean; faved: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, faved: false, error: "Faça login para acompanhar" };

  const { data: existing } = await supabase
    .from("watchlist")
    .select("market_id")
    .eq("user_id", user.id)
    .eq("market_id", marketId)
    .maybeSingle();

  if (existing) {
    await supabase.from("watchlist").delete().eq("user_id", user.id).eq("market_id", marketId);
    revalidatePath("/watchlist");
    return { ok: true, faved: false };
  }
  const { error } = await supabase.from("watchlist").insert({ user_id: user.id, market_id: marketId });
  if (error) return { ok: false, faved: false, error: error.message };
  revalidatePath("/watchlist");
  return { ok: true, faved: true };
}

export async function getWatchlistIds(): Promise<string[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase.from("watchlist").select("market_id").eq("user_id", user.id);
  return (data ?? []).map((w) => w.market_id as string);
}
