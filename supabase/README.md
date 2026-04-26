# Supabase — eutedisse

Projeto: `eu-te-disse` (`ygibmcbaermwwjzwxmjb`, sa-east-1)

## Status atual

✅ **Ativo** — `ACTIVE_HEALTHY`. Schema + seed aplicados em 25-abr-2026.
- 7 categorias
- 12 mercados (10 binary + 2 multi)
- 11 opções de mercados multi
- RLS habilitada em todas as tabelas
- `.env.local` já criado em `web/` com a publishable key

## Como aplicar mudanças futuras

```bash
# Opção A — via Supabase CLI
supabase link --project-ref ygibmcbaermwwjzwxmjb
supabase db push

# Opção B — colar no SQL Editor
# https://supabase.com/dashboard/project/ygibmcbaermwwjzwxmjb/sql
```

## Service role key (opcional)

Se você quiser fazer escritas que ignoram RLS (ex: backoffice de moderação),
pegue em **Project Settings → API** → `service_role` e cole no `.env.local`
em `SUPABASE_SERVICE_ROLE_KEY=`. Por enquanto não é necessário — todas as
escritas vão pelo cliente autenticado e respeitam RLS.

## Schema

- `profiles` (1:1 com `auth.users`, criado via trigger)
- `categories` — público
- `markets` + `market_options` — público
- `watchlist` — RLS por `user_id`
- `trades` — RLS por `user_id`
- `transactions` — RLS por `user_id`, escrita via Server Actions (service role)

Todas as tabelas têm RLS habilitada e políticas escritas. Veja `migrations/0001_init_schema.sql`.

## Seed

`migrations/0002_seed_data.sql` insere as 7 categorias e os 12 mercados (10 binary + 2 multi)
mirrorando exatamente os mocks usados no protótipo.
