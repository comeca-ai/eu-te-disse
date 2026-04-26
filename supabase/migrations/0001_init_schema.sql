-- ===========================================================================
-- Eutedisse — schema inicial
-- Mercados de previsão estilo Polymarket BR
-- ===========================================================================

-- Extensões úteis
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles  (1:1 com auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  balance_cents bigint not null default 100000, -- R$ 1000 de boas-vindas (mock)
  created_at timestamptz not null default now()
);

-- Trigger para criar profile quando user é criado
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id text primary key,
  label text not null,
  emoji text not null,
  sort int not null default 0
);

-- ---------------------------------------------------------------------------
-- markets
-- ---------------------------------------------------------------------------
create type public.market_type as enum ('binary', 'multi');
create type public.market_trend as enum ('up', 'down', 'flat');
create type public.market_status as enum ('active', 'resolved', 'cancelled');

create table if not exists public.markets (
  id text primary key,
  category_id text not null references public.categories(id),
  title text not null,
  emoji text,
  type public.market_type not null,
  status public.market_status not null default 'active',
  prob int,           -- só para binary; 0..100
  trend public.market_trend default 'flat',
  delta text,         -- ex: "+4"
  volume_cents bigint not null default 0,
  ends_at timestamptz not null,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists markets_category_idx on public.markets(category_id);
create index if not exists markets_featured_idx on public.markets(featured) where featured;
create index if not exists markets_status_idx on public.markets(status);

-- ---------------------------------------------------------------------------
-- market_options  (apenas para multi)
-- ---------------------------------------------------------------------------
create table if not exists public.market_options (
  id uuid primary key default gen_random_uuid(),
  market_id text not null references public.markets(id) on delete cascade,
  name text not null,
  initial text not null,
  color text not null,
  pct int not null,
  trend public.market_trend default 'flat',
  position int not null default 0
);

create index if not exists market_options_market_idx on public.market_options(market_id);

-- ---------------------------------------------------------------------------
-- watchlist  (mercados que o usuário acompanha)
-- ---------------------------------------------------------------------------
create table if not exists public.watchlist (
  user_id uuid not null references auth.users(id) on delete cascade,
  market_id text not null references public.markets(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, market_id)
);

-- ---------------------------------------------------------------------------
-- trades  (apostas)
-- ---------------------------------------------------------------------------
create type public.trade_side as enum ('yes', 'no');

create table if not exists public.trades (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  market_id text not null references public.markets(id) on delete cascade,
  option_id uuid references public.market_options(id) on delete set null,
  side public.trade_side not null,
  amount_cents bigint not null check (amount_cents > 0),
  price_cents int not null check (price_cents between 1 and 99),
  shares numeric(18,4) not null,
  created_at timestamptz not null default now()
);

create index if not exists trades_user_idx on public.trades(user_id);
create index if not exists trades_market_idx on public.trades(market_id);

-- ---------------------------------------------------------------------------
-- transactions  (movimentações de saldo: deposit/withdraw/trade/payout)
-- ---------------------------------------------------------------------------
create type public.tx_kind as enum ('deposit', 'withdraw', 'trade', 'payout');

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind public.tx_kind not null,
  amount_cents bigint not null,
  balance_after_cents bigint not null,
  ref_trade_id uuid references public.trades(id) on delete set null,
  description text,
  created_at timestamptz not null default now()
);

create index if not exists transactions_user_idx on public.transactions(user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.markets enable row level security;
alter table public.market_options enable row level security;
alter table public.watchlist enable row level security;
alter table public.trades enable row level security;
alter table public.transactions enable row level security;

-- categories e markets são públicos para leitura
create policy "categories são públicas" on public.categories for select using (true);
create policy "markets são públicos" on public.markets for select using (true);
create policy "market_options são públicos" on public.market_options for select using (true);

-- profiles: dono lê e atualiza o próprio
create policy "profile leitura própria" on public.profiles for select using (auth.uid() = id);
create policy "profile atualização própria" on public.profiles for update using (auth.uid() = id);

-- watchlist: dono CRUD
create policy "watchlist leitura própria" on public.watchlist for select using (auth.uid() = user_id);
create policy "watchlist insere próprio" on public.watchlist for insert with check (auth.uid() = user_id);
create policy "watchlist remove próprio" on public.watchlist for delete using (auth.uid() = user_id);

-- trades: dono lê e cria o próprio
create policy "trades leitura própria" on public.trades for select using (auth.uid() = user_id);
create policy "trades insere próprio" on public.trades for insert with check (auth.uid() = user_id);

-- transactions: dono apenas lê (criação via Server Actions com service role)
create policy "transactions leitura própria" on public.transactions for select using (auth.uid() = user_id);
