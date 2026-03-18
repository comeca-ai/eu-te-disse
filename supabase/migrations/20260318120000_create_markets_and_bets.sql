-- ============================================================
-- Markets table: prediction markets created by admins
-- ============================================================
CREATE TABLE public.markets (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question    TEXT NOT NULL,
  description TEXT,
  category    TEXT NOT NULL DEFAULT 'geral',
  category_icon TEXT NOT NULL DEFAULT '🔥',
  source      TEXT,                              -- official resolution source
  probability INTEGER NOT NULL DEFAULT 50 CHECK (probability BETWEEN 0 AND 100),
  volume      INTEGER NOT NULL DEFAULT 0,        -- total number of bets
  status      TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'cancelled')),
  outcome     BOOLEAN,                           -- NULL while open; true = Sim, false = Não
  hot         BOOLEAN NOT NULL DEFAULT false,
  deadline    TIMESTAMPTZ NOT NULL,
  resolved_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE TRIGGER markets_updated_at
  BEFORE UPDATE ON public.markets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE public.markets ENABLE ROW LEVEL SECURITY;

-- Everyone can read open markets
CREATE POLICY "Markets are publicly readable"
  ON public.markets FOR SELECT
  USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can manage markets"
  ON public.markets FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- ============================================================
-- Bets table: user predictions (cotas)
-- ============================================================
CREATE TABLE public.bets (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id),
  market_id       UUID NOT NULL REFERENCES public.markets(id) ON DELETE CASCADE,
  position        TEXT NOT NULL CHECK (position IN ('sim', 'nao')),
  amount          INTEGER NOT NULL CHECK (amount > 0),         -- number of cotas
  price_at_purchase INTEGER NOT NULL CHECK (price_at_purchase BETWEEN 1 AND 99), -- price in cents
  payout          INTEGER,                                      -- NULL until resolved; cents per cota (0 or 100)
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.bets ENABLE ROW LEVEL SECURITY;

-- Users can read their own bets
CREATE POLICY "Users can read own bets"
  ON public.bets FOR SELECT
  USING (auth.uid() = user_id);

-- Users can place bets on open markets
CREATE POLICY "Users can place bets"
  ON public.bets FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.markets WHERE id = market_id AND status = 'open')
  );

-- Admins can read all bets (for stats/resolution)
CREATE POLICY "Admins can read all bets"
  ON public.bets FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- ============================================================
-- Function: recalculate market probability based on bets
-- ============================================================
CREATE OR REPLACE FUNCTION recalculate_market_probability()
RETURNS TRIGGER AS $$
DECLARE
  _sim_count INTEGER;
  _total_count INTEGER;
  _new_prob INTEGER;
BEGIN
  SELECT
    COALESCE(SUM(CASE WHEN position = 'sim' THEN amount ELSE 0 END), 0),
    COALESCE(SUM(amount), 0)
  INTO _sim_count, _total_count
  FROM public.bets
  WHERE market_id = NEW.market_id;

  IF _total_count > 0 THEN
    _new_prob := ROUND((_sim_count::NUMERIC / _total_count) * 100);
  ELSE
    _new_prob := 50;
  END IF;

  UPDATE public.markets
  SET probability = _new_prob,
      volume = _total_count
  WHERE id = NEW.market_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_bet_recalc_probability
  AFTER INSERT ON public.bets
  FOR EACH ROW
  EXECUTE FUNCTION recalculate_market_probability();

-- ============================================================
-- Function: resolve market and set payouts
-- ============================================================
CREATE OR REPLACE FUNCTION resolve_market(_market_id UUID, _outcome BOOLEAN)
RETURNS void AS $$
BEGIN
  -- Mark market as resolved
  UPDATE public.markets
  SET status = 'resolved',
      outcome = _outcome,
      resolved_at = now()
  WHERE id = _market_id AND status = 'open';

  -- Set payout: winners get 100 cents per cota, losers get 0
  UPDATE public.bets
  SET payout = CASE
    WHEN (position = 'sim' AND _outcome = true) THEN 100
    WHEN (position = 'nao' AND _outcome = false) THEN 100
    ELSE 0
  END
  WHERE market_id = _market_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- Indexes for performance
-- ============================================================
CREATE INDEX idx_markets_status ON public.markets(status);
CREATE INDEX idx_markets_category ON public.markets(category);
CREATE INDEX idx_markets_deadline ON public.markets(deadline);
CREATE INDEX idx_bets_user_id ON public.bets(user_id);
CREATE INDEX idx_bets_market_id ON public.bets(market_id);
