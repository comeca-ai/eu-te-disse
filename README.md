# Brasil Palpite Club — "Eu te disse"

Plataforma de mercados de palpites onde usuários fazem previsões sobre futebol, política, economia, entretenimento e mais. Sistema de gamificação com XP, missões, ranking e badges.

## Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions + RLS)
- **UI**: Tailwind CSS + shadcn/ui + Radix UI
- **Charts**: Recharts
- **Routing**: React Router DOM 6
- **State**: TanStack React Query

## Como rodar

```sh
git clone <URL_DO_REPO>
cd brasil-palpite-club
npm install
npm run dev        # Servidor de desenvolvimento na porta 8080
```

### Variáveis de ambiente

Criar `.env` na raiz:

```
VITE_SUPABASE_URL=<url-do-projeto-supabase>
VITE_SUPABASE_PUBLISHABLE_KEY=<chave-anon-publica>
```

### Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Dev server com hot reload |
| `npm run build` | Build de produção |
| `npm run lint` | Lint com ESLint |
| `npm run test` | Testes com Vitest |

## Estrutura do projeto

```
src/
├── pages/                  # Páginas da aplicação
│   ├── Index.tsx           # Home — feed de mercados, categorias, widgets
│   ├── Login.tsx           # Login com email/senha
│   ├── Signup.tsx          # Cadastro (nome, CPF, sexo, UF, nascimento)
│   ├── MarketDetail.tsx    # Detalhe do mercado — gráfico, sentimento, comentários
│   ├── Ranking.tsx         # Leaderboard global (semanal/mensal)
│   ├── Missions.tsx        # Missões diárias/semanais/especiais com XP
│   ├── Portfolio.tsx       # Carteira — posições ativas, P&L
│   ├── Profile.tsx         # Perfil — stats, badges, nível
│   ├── HowItWorks.tsx      # Tutorial — 3 passos, pilares, FAQ
│   ├── Admin.tsx           # Painel admin — gestão de usuários e roles
│   ├── Planos.tsx          # Planos de assinatura (Free, Pro, VIP)
│   └── NotFound.tsx        # Página 404
├── components/
│   ├── layout/             # AppLayout, BottomNav
│   ├── market/             # MarketCard, CategoryBadge, MiniSparkline
│   ├── gamification/       # StreakWidget, XPWidget, MissionCard
│   └── ui/                 # 50+ componentes shadcn/ui
├── contexts/
│   └── AuthContext.tsx      # Auth state, profile, admin check
├── hooks/                  # use-toast, use-theme, use-mobile
├── integrations/
│   └── supabase/           # Client e tipos gerados
├── data/
│   └── mockData.ts         # 12 mercados de exemplo
└── App.tsx                 # Rotas e providers
```

## Banco de dados (Supabase)

### Tabelas

**profiles**
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID (PK) | ID do perfil |
| user_id | UUID (FK → auth.users) | Usuário Supabase |
| full_name | TEXT | Nome completo |
| cpf | TEXT (UNIQUE) | CPF |
| status | TEXT | 'approved' (default) |
| sex | TEXT | 'M', 'F', 'O' |
| uf | TEXT | Estado (sigla) |
| birth_date | DATE | Data de nascimento |

**user_roles**
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID (PK) | — |
| user_id | UUID (FK) | Usuário |
| role | app_role | 'admin', 'moderator', 'user' |

**missions**
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID (PK) | — |
| title | TEXT | Título da missão |
| description | TEXT | Descrição |
| xp | INTEGER | Recompensa em XP (default: 50) |
| total | INTEGER | Meta de conclusão |
| type | TEXT | 'daily', 'weekly', 'special' |
| icon | TEXT | Emoji (default: 🎯) |
| status | TEXT | 'active', 'expired' |
| expires_at | TIMESTAMPTZ | Expiração |

**user_missions**
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID (PK) | — |
| user_id | UUID (FK) | Usuário |
| mission_id | UUID (FK → missions) | Missão |
| progress | INTEGER | Progresso atual |
| completed | BOOLEAN | Se concluiu |

**markets** *(migration pendente de aplicar)*
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID (PK) | — |
| question | TEXT | Pergunta do mercado |
| description | TEXT | Descrição detalhada |
| category | TEXT | Categoria (futebol, politica, etc.) |
| category_icon | TEXT | Emoji da categoria |
| source | TEXT | Fonte oficial de resolução |
| probability | INTEGER | Probabilidade atual (0-100) |
| volume | INTEGER | Total de cotas apostadas |
| status | TEXT | 'open', 'resolved', 'cancelled' |
| outcome | BOOLEAN | Resultado (null enquanto aberto) |
| hot | BOOLEAN | Se está em destaque |
| deadline | TIMESTAMPTZ | Prazo para resolução |

**bets** *(migration pendente de aplicar)*
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID (PK) | — |
| user_id | UUID (FK → auth.users) | Usuário que apostou |
| market_id | UUID (FK → markets) | Mercado |
| position | TEXT | 'sim' ou 'nao' |
| amount | INTEGER | Quantidade de cotas |
| price_at_purchase | INTEGER | Preço pago por cota (1-99 centavos) |
| payout | INTEGER | Pagamento após resolução (0 ou 100) |

### Triggers e Functions

- **handle_new_user()**: Cria perfil automaticamente no signup com status='approved'
- **update_updated_at_column()**: Atualiza timestamp em mudanças no perfil
- **recalculate_market_probability()**: Recalcula probabilidade do mercado a cada nova aposta
- **resolve_market(market_id, outcome)**: Resolve mercado e calcula payouts dos apostadores

### RLS (Row Level Security)

- Perfis: usuário lê/edita o próprio; admin lê todos
- Roles: usuário vê as próprias; admin vê todas
- Missões: leitura pública; admin gerencia
- User missions: usuário gerencia as próprias
- Markets: leitura pública; admin cria/edita
- Bets: usuário lê/cria as próprias; admin lê todas

## Funcionalidades

### Para usuários
- **Mercados**: Navegar por categorias (⚽ Futebol, 🏛️ Política, 📈 Economia, 📺 BBB/TV, 💻 Tech, 🌦️ Clima, 🎬 Cultura Pop, 🏅 Esportes)
- **Palpites**: Comprar cotas "Sim" ou "Não" na probabilidade atual
- **Carteira**: Acompanhar posições, lucro/prejuízo, acurácia
- **Ranking**: Competir no leaderboard global semanal/mensal
- **Missões**: Completar desafios diários/semanais para ganhar XP
- **Perfil**: Ver estatísticas, badges, nível, conquistas
- **Social**: Comentar em mercados, ver sentimento da comunidade

### Para admins
- Gerenciar usuários e roles
- Criar/editar/expirar missões
- Criar/editar/resolver mercados de palpites

### Planos de assinatura
| Plano | Preço | Destaques |
|-------|-------|-----------|
| **Free** | R$ 0 | 5 palpites/dia, mercados públicos, missões básicas |
| **Pro** | R$ 19,90/mês | Ilimitado, mercados exclusivos, XP dobrado |
| **VIP** | R$ 49,90/mês | Tudo do Pro + mercados customizados, suporte prioritário, grupo Telegram |

## Autenticação

- Signup com email/senha + dados (nome, CPF, sexo, UF, nascimento)
- Confirmação por email
- Perfil criado automaticamente via trigger
- Acesso imediato após confirmação (sem aprovação manual)
- Admin verificado via tabela `user_roles`

## Edge Functions

### expire-missions
Função agendada (Deno) que marca missões com `expires_at < now()` como `status = 'expired'`.

## Tema

- Modo claro/escuro automático (segue sistema)
- Fontes: Space Grotesk (títulos) + DM Sans (corpo)
- Cores principais: roxo (primary), ciano (secondary), dourado (gold)
- Efeitos: glass blur, gradientes, glow, animações (float, slide-up, fade-in)
