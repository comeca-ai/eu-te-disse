# 📈 Evolução do Produto

## Histórico de Desenvolvimento

### Sprint 1 — Fundação (Março 2026)
- ✅ Setup do projeto: React + Vite + TypeScript + Tailwind + shadcn/ui
- ✅ Design system completo com tema claro/escuro
- ✅ Landing page com hero, categorias e cards de mercado
- ✅ Dados mock: 12 mercados, 8 missões, 10 usuários no ranking, 12 badges
- ✅ Navegação mobile com bottom nav
- ✅ Componentes de gamificação: StreakWidget, XPWidget, MissionCard

### Sprint 2 — Autenticação & Admin
- ✅ Login e cadastro com email/senha
- ✅ Validação de CPF (algoritmo completo)
- ✅ Campos: nome, email, CPF, sexo, UF, nascimento
- ✅ Tabela profiles com trigger automático
- ✅ Sistema de roles (user_roles + has_role)
- ✅ Painel admin para aprovar/rejeitar usuários
- ✅ RLS completo em todas as tabelas

### Sprint 3 — Missões com Timer
- ✅ Tabelas missions e user_missions no banco
- ✅ Missões com expiração temporal (expires_at)
- ✅ Countdown visual em tempo real
- ✅ Edge Function para expiração
- ✅ pg_cron job a cada 5 minutos
- ✅ Integração frontend ↔ banco real

### Sprint 4 — Refinamentos
- ✅ Aprovação automática de usuários no cadastro
- ✅ Ajustes de UX e navegação
- ✅ Página "Como funciona"
- ✅ Gerenciamento de usuários via admin

## Roadmap Futuro

### Fase 2 — Mercados Reais (Q2 2026)
- [ ] Migrar mercados de mockData para banco de dados
- [ ] CRUD de mercados pelo admin
- [ ] Sistema de previsões com saldo virtual
- [ ] Resolução de mercados (manual e automática)
- [ ] Cálculo de acurácia real
- [ ] Notificações (in-app e push)

### Fase 3 — Social & Competição (Q3 2026)
- [ ] Comentários em tempo real (Realtime)
- [ ] Desafios 1v1 entre amigos
- [ ] Compartilhamento social (WhatsApp, Twitter)
- [ ] Liga/temporadas com ranking sazonal
- [ ] Mercados criados pela comunidade (com moderação)
- [ ] Feed de atividade

### Fase 4 — Monetização (Q4 2026)
- [ ] Plano premium (acesso antecipado, analytics avançado)
- [ ] Marketplace de badges/cosméticos
- [ ] Mercados patrocinados por marcas
- [ ] Parcerias com veículos de mídia
- [ ] API pública para embedar probabilidades

### Fase 5 — Escala (2027)
- [ ] PWA com suporte offline
- [ ] App React Native
- [ ] Integração com fontes oficiais (CBF, BCB, IBGE, TSE)
- [ ] Machine learning para sugestão de mercados
- [ ] Internacionalização (LATAM)
