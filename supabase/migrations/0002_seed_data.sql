-- ===========================================================================
-- Eutedisse — seed de categorias e mercados (mirror dos mocks do protótipo)
-- ===========================================================================

insert into public.categories (id, label, emoji, sort) values
  ('politica',  'Política',     '🏛️', 1),
  ('economia',  'Economia',     '📈', 2),
  ('esportes',  'Esportes',     '⚽', 3),
  ('cultura',   'Cultura Pop',  '🎬', 4),
  ('tech',      'Tech',         '💻', 5),
  ('clima',     'Clima',        '🌎', 6),
  ('mundo',     'Mundo',        '🌐', 7)
on conflict (id) do nothing;

-- Mercados binários
insert into public.markets (id, category_id, title, emoji, type, prob, trend, delta, volume_cents, ends_at, featured) values
  ('selic-set',           'economia', 'Copom vai cortar a Selic na reunião de setembro?',           '🏦', 'binary', 68, 'up',   '+4',  1240000000, '2026-09-17', true),
  ('fla-bra',             'esportes', 'Flamengo vai ser campeão do Brasileirão 2026?',              '⚽', 'binary', 41, 'down', '-3',   890000000, '2026-12-07', false),
  ('dolar-fim',           'economia', 'Dólar vai fechar 2026 acima de R$ 6,00?',                    '💵', 'binary', 31, 'down', '-7',   510000000, '2026-12-31', false),
  ('ipca-mar',            'economia', 'IPCA de março fica abaixo de 0,4%?',                         '📊', 'binary', 54, 'up',   '+2',   180000000, '2026-04-11', false),
  ('pix-internacional',   'tech',     'Pix internacional será lançado até dezembro?',               '📱', 'binary', 22, 'down', '-5',    74000000, '2026-12-31', false),
  ('amazonia-queimadas',  'clima',    'Queimadas na Amazônia bater recorde em 2026?',               '🔥', 'binary', 47, 'up',   '+9',    92000000, '2026-10-31', false),
  ('copa-26',             'esportes', 'Brasil vai ganhar a Copa do Mundo 2026?',                    '🏆', 'binary', 18, 'flat', '0',   2260000000, '2026-07-19', true),
  ('petrobras-div',       'economia', 'Petrobras vai pagar dividendo extraordinário no Q2?',        '🛢️', 'binary', 73, 'up',   '+11',  470000000, '2026-06-30', false),
  ('msi-tech',            'tech',     'Algum CEO de Big Tech vai renunciar até dezembro?',          '🤖', 'binary', 39, 'flat', '+1',   210000000, '2026-12-31', false),
  ('sp-gov',              'politica', 'Tarcísio vai concorrer à reeleição em SP?',                  '🏛️', 'binary', 12, 'down', '-8',   340000000, '2026-08-10', false)
on conflict (id) do nothing;

-- Mercados multi
insert into public.markets (id, category_id, title, emoji, type, volume_cents, ends_at, featured) values
  ('eleicao-pres', 'politica', 'Quem será o próximo presidente do Brasil em 2026?', '🗳️', 'multi', 4720000000, '2026-10-04', true),
  ('bbb-final',    'cultura',  'Quem vai ganhar o BBB 26?',                          '📺', 'multi',  320000000, '2026-04-15', false)
on conflict (id) do nothing;

-- Opções multi: eleição
insert into public.market_options (market_id, name, initial, color, pct, trend, position) values
  ('eleicao-pres', 'Lula (PT)',                'L', '#ef4444', 38, 'flat', 1),
  ('eleicao-pres', 'Tarcísio (Republicanos)',  'T', '#3b82f6', 27, 'up',   2),
  ('eleicao-pres', 'Ratinho Jr (PSD)',         'R', '#10b981', 11, 'up',   3),
  ('eleicao-pres', 'Zema (Novo)',              'Z', '#f59e0b',  9, 'flat', 4),
  ('eleicao-pres', 'Pacheco (PSD)',            'P', '#8b5cf6',  6, 'down', 5),
  ('eleicao-pres', 'Outro',                    '?', '#64748b',  9, 'flat', 6);

-- Opções multi: BBB
insert into public.market_options (market_id, name, initial, color, pct, trend, position) values
  ('bbb-final', 'Camila',  'C', '#ec4899', 34, 'up',   1),
  ('bbb-final', 'Diego',   'D', '#06b6d4', 28, 'flat', 2),
  ('bbb-final', 'Bia',     'B', '#a855f7', 19, 'down', 3),
  ('bbb-final', 'Rafael',  'R', '#f97316', 12, 'up',   4),
  ('bbb-final', 'Outros',  '+', '#64748b',  7, 'flat', 5);
