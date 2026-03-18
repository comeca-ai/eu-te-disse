# 🏗️ Arquitetura do Sistema

## Estrutura de Pastas

```
src/
├── assets/                  # Imagens e recursos estáticos
│   └── logo-eu-te-disse.png
├── components/
│   ├── gamification/        # Componentes de gamificação
│   │   ├── MissionCard.tsx   # Card individual de missão
│   │   ├── StreakWidget.tsx   # Widget de sequência diária
│   │   └── XPWidget.tsx      # Widget de nível/XP
│   ├── layout/
│   │   ├── AppLayout.tsx     # Layout principal com outlet
│   │   └── BottomNav.tsx     # Navegação inferior mobile
│   ├── market/
│   │   ├── CategoryBadge.tsx # Badge de categoria
│   │   ├── MarketCard.tsx    # Card de mercado/palpite
│   │   └── MiniSparkline.tsx # Gráfico sparkline mini
│   └── ui/                  # shadcn/ui components (~50+)
├── contexts/
│   └── AuthContext.tsx       # Contexto de autenticação global
├── data/
│   └── mockData.ts           # Dados mock (mercados, ranking, badges)
├── hooks/
│   ├── use-mobile.tsx        # Detecção de mobile
│   ├── use-theme.ts          # Tema claro/escuro
│   └── use-toast.ts          # Hook de toast
├── integrations/
│   └── supabase/
│       ├── client.ts         # Cliente Supabase (auto-gerado)
│       └── types.ts          # Tipos do banco (auto-gerado)
├── lib/
│   └── utils.ts              # Utilitários (cn, etc.)
├── pages/
│   ├── Index.tsx             # Landing / Home
│   ├── Login.tsx             # Tela de login
│   ├── Signup.tsx            # Tela de cadastro (com CPF)
│   ├── Admin.tsx             # Painel administrativo
│   ├── MarketDetail.tsx      # Detalhe de mercado individual
│   ├── Missions.tsx          # Desafios/Missões com timer
│   ├── Ranking.tsx           # Ranking de usuários
│   ├── Portfolio.tsx         # Carteira de palpites
│   ├── Profile.tsx           # Perfil do usuário
│   ├── HowItWorks.tsx        # Como funciona
│   ├── PendingApproval.tsx   # Aprovação pendente
│   └── NotFound.tsx          # 404
└── App.tsx                   # Rotas e providers

supabase/
├── config.toml               # Configuração Supabase
├── functions/
│   └── expire-missions/
│       └── index.ts          # Edge Function de expiração
└── migrations/               # Migrações SQL
```

## Fluxo de Rotas

```
/ (público)            → Index (Landing Page)
/login                 → Login
/cadastro              → Signup
/admin                 → Admin (protegido por role)

Rotas protegidas (requer autenticação):
/mercado/:id           → MarketDetail
/ranking               → Ranking
/missoes               → Missions
/carteira              → Portfolio
/perfil                → Profile
/como-funciona         → HowItWorks
```

## Navegação Mobile (Bottom Nav)

| Posição | Ícone | Label | Rota |
|---------|-------|-------|------|
| 1 | Home | Início | `/` |
| 2 | Trophy | Ranking | `/ranking` |
| 3 | Target | Desafios | `/missoes` |
| 4 | Compass | Palpites | `/carteira` |
| 5 | User | Perfil | `/perfil` |

## Providers (App.tsx)

```
QueryClientProvider
  └── TooltipProvider
       └── BrowserRouter
            └── AuthProvider
                 └── Routes
```
