
-- Mission templates (admin creates these)
CREATE TABLE public.missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  xp integer NOT NULL DEFAULT 50,
  total integer NOT NULL DEFAULT 1,
  type text NOT NULL DEFAULT 'daily' CHECK (type IN ('daily', 'weekly', 'special')),
  icon text NOT NULL DEFAULT '🎯',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired')),
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Per-user mission progress
CREATE TABLE public.user_missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  mission_id uuid NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
  progress integer NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, mission_id)
);

ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_missions ENABLE ROW LEVEL SECURITY;

-- Everyone can read active missions
CREATE POLICY "Anyone can view missions" ON public.missions
  FOR SELECT TO authenticated USING (true);

-- Admins can manage missions
CREATE POLICY "Admins can insert missions" ON public.missions
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update missions" ON public.missions
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete missions" ON public.missions
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Users can view own progress
CREATE POLICY "Users can view own progress" ON public.user_missions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Users can insert own progress
CREATE POLICY "Users can insert own progress" ON public.user_missions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Users can update own progress
CREATE POLICY "Users can update own progress" ON public.user_missions
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Enable pg_cron and pg_net for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
