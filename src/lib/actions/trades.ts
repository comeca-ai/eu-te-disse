"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export const tradeSchema = z.object({
  marketId: z.string().min(1),
  side: z.enum(["yes", "no"]),
  amountCents: z
    .number()
    .int("Valor deve ser inteiro em centavos")
    .min(100, "Aposta mínima é R$ 1,00")
    .max(10_000_000, "Aposta máxima é R$ 100.000,00"),
  priceCents: z.number().int().min(1).max(99)
});

export type TradeInput = z.infer<typeof tradeSchema>;

export type TradeResult =
  | { ok: true; tradeId: string }
  | { ok: false; error: string };

export async function placeTrade(input: TradeInput): Promise<TradeResult> {
  const parsed = tradeSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }
  const { marketId, side, amountCents, priceCents } = parsed.data;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Faça login para apostar" };

  const shares = amountCents / priceCents;

  const { data, error } = await supabase
    .from("trades")
    .insert({
      user_id: user.id,
      market_id: marketId,
      side,
      amount_cents: amountCents,
      price_cents: priceCents,
      shares
    })
    .select("id")
    .single();

  if (error) return { ok: false, error: error.message };

  revalidatePath(`/market/${marketId}`);
  revalidatePath("/wallet");
  return { ok: true, tradeId: data.id };
}
