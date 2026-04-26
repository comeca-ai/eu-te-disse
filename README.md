# Eutedisse — Polymarket BR

Primeiro site brasileiro de mercados de previsão. Stack: **Next.js 15 (App Router) + TypeScript + Tailwind + Supabase + Vercel**.

## Estrutura

```
web/
├── src/
│   ├── app/                      # Rotas (App Router)
│   │   ├── page.tsx              # Home
│   │   ├── market/[id]/          # Detalhe de mercado
│   │   ├── category/[id]/        # Listagem por categoria
│   │   ├── trending/             # Em alta
│   │   ├── watchlist/            # Acompanhando
│   │   ├── wallet/               # Carteira
│   │   ├── auth/callback/        # OAuth callback Supabase
│   │   ├── globals.css           # Tokens + reset
│   │   └── _prototype-styles.css # CSS do design system (vars + componentes)
│   ├── components/
│   │   ├── shell/                # AppShell, Topbar, Sidebar, Drawer, TabBar, Search
│   │   ├── market/               # MarketCard, MultiCard, LineChart, OrderPanel, Tabs
│   │   ├── auth/                 # AuthProvider, AuthModal
│   │   ├── ui/                   # ToastProvider
│   │   ├── Icon.tsx
│   │   ├── Hero.tsx
│   │   ├── Crumbs.tsx
│   │   └── CategoryRail.tsx
│   ├── lib/
│   │   ├── supabase/             # client.ts (browser) + server.ts
│   │   ├── db/markets.ts         # Fetchers com fallback para mocks
│   │   ├── actions/              # Server Actions (trades, watchlist)
│   │   ├── markets-data.ts       # Mocks + helpers
│   │   └── types.ts
│   └── middleware.ts             # Refresh de sessão Supabase
├── supabase/
│   ├── migrations/               # 0001_init_schema.sql, 0002_seed_data.sql
│   └── README.md
├── .env.example
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Como rodar local

```bash
cd web
npm install
cp .env.example .env.local
# preencha NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY (ver supabase/README.md)
npm run dev
```

Sem chaves do Supabase, o app já funciona com **dados mockados** — você consegue navegar todas as páginas e o protótipo está visualmente fiel ao design original. Auth e trades ficam desabilitados até você plugar o Supabase.

## Deploy Vercel

```bash
# 1) Suba para o GitHub
git init && git add . && git commit -m "init: eutedisse"
git remote add origin <seu-repo>
git push -u origin main

# 2) No Vercel
# - Import do repo
# - Root Directory: web/
# - Framework: Next.js (autodetect)
# - Adicione as Environment Variables (mesmas do .env.local)
# - Deploy

# Ou via CLI:
npx vercel --prod
```

## Próximos passos (depois que o Supabase voltar a estar ativo)

1. Aplicar migrações: `supabase db push` (ou colar no SQL Editor)
2. Pegar as chaves em **Settings → API** e setar no `.env.local` + Vercel
3. O app automaticamente passa a usar dados reais (o fallback de mock só roda se as envs estiverem vazias)
4. Testar fluxo: criar conta → confirmar email → fazer aposta de R$ 10 → ver na carteira

## Validação e segurança

- Forms validados com **Zod** + **react-hook-form** (`AuthModal`)
- Server Actions com Zod no schema (`actions/trades.ts`)
- RLS habilitada em todas as tabelas (`profiles`, `watchlist`, `trades`, `transactions`)
- Middleware refresca sessão a cada navegação
- Error boundaries: `app/error.tsx`, `app/not-found.tsx`

## Tema, densidade e acessibilidade

O CSS usa CSS custom properties — você troca `data-theme="light|dark"` e `data-density="cozy|compact"` no `<html>` em runtime. Layout responsivo com sidebar no desktop e tabbar + drawer no mobile (breakpoint 900px).
