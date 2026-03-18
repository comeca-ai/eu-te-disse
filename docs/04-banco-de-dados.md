# 🗄️ Banco de Dados

## Diagrama de Tabelas

```
┌─────────────────┐     ┌──────────────────┐
│   auth.users    │     │     profiles      │
│ (gerenciado)    │◄────│                   │
│                 │     │ id (PK)           │
│ id              │     │ user_id (FK→auth) │
│ email           │     │ full_name         │
│ raw_user_meta   │     │ cpf               │
└────────┬────────┘     │ status            │
         │              │ sex               │
         │              │ uf                │
         │              │ birth_date        │
         │              │ created_at        │
         │              │ updated_at        │
         │              └──────────────────┘
         │
         │              ┌──────────────────┐
         ├─────────────►│   user_roles     │
         │              │                  │
         │              │ id (PK)          │
         │              │ user_id          │
         │              │ role (enum)      │
         │              └──────────────────┘
         │
         │              ┌──────────────────┐
         └─────────────►│  user_missions   │
                        │                  │
                        │ id (PK)          │
                        │ user_id          │
                        │ mission_id (FK)──┼──┐
                        │ progress         │  │
                        │ completed        │  │
                        │ completed_at     │  │
                        │ created_at       │  │
                        └──────────────────┘  │
                                              │
                        ┌──────────────────┐  │
                        │    missions      │◄─┘
                        │                  │
                        │ id (PK)          │
                        │ title            │
                        │ description      │
                        │ xp               │
                        │ total            │
                        │ type (enum-like) │
                        │ icon             │
                        │ status           │
                        │ expires_at       │
                        │ created_at       │
                        └──────────────────┘
```

## Tabelas em Detalhe

### `profiles`
Armazena dados complementares do usuário. Criada automaticamente via trigger `handle_new_user` quando um usuário se registra no auth.

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | Não | gen_random_uuid() | PK |
| user_id | uuid | Não | - | Referência ao auth.users |
| full_name | text | Não | - | Nome completo |
| cpf | text | Não | - | CPF (validado no frontend) |
| status | text | Não | 'approved' | pending / approved / rejected |
| sex | text | Sim | null | Sexo |
| uf | text | Sim | null | Estado (UF) |
| birth_date | date | Sim | null | Data de nascimento |
| created_at | timestamptz | Não | now() | Criação |
| updated_at | timestamptz | Não | now() | Última atualização |

### `user_roles`
Tabela separada de roles para segurança (evita privilege escalation).

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | Não | gen_random_uuid() | PK |
| user_id | uuid | Não | - | Referência ao auth.users |
| role | app_role | Não | - | admin / moderator / user |

**Enum `app_role`:** `admin`, `moderator`, `user`

### `missions`
Templates de missões/desafios criados pelo admin.

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | Não | gen_random_uuid() | PK |
| title | text | Não | - | Título da missão |
| description | text | Não | - | Descrição |
| xp | integer | Não | 50 | XP concedido ao completar |
| total | integer | Não | 1 | Meta numérica (ex: 5 palpites) |
| type | text | Não | 'daily' | daily / weekly / special |
| icon | text | Não | '🎯' | Emoji ícone |
| status | text | Não | 'active' | active / expired |
| expires_at | timestamptz | Não | - | Data/hora de expiração |
| created_at | timestamptz | Não | now() | Criação |

### `user_missions`
Progresso individual de cada usuário nas missões.

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | Não | gen_random_uuid() | PK |
| user_id | uuid | Não | - | Referência ao auth.users |
| mission_id | uuid | Não | FK→missions | Missão relacionada |
| progress | integer | Não | 0 | Progresso atual |
| completed | boolean | Não | false | Se foi completada |
| completed_at | timestamptz | Sim | null | Quando completou |
| created_at | timestamptz | Não | now() | Criação |

**Unique constraint:** `(user_id, mission_id)`

## Row Level Security (RLS)

### profiles
| Política | Comando | Quem | Condição |
|----------|---------|------|----------|
| Users can view own profile | SELECT | public | auth.uid() = user_id |
| Users can insert own profile | INSERT | public | auth.uid() = user_id |
| Users can update own profile | UPDATE | public | auth.uid() = user_id |
| Admins can view all profiles | SELECT | authenticated | has_role(auth.uid(), 'admin') |
| Admins can update all profiles | UPDATE | authenticated | has_role(auth.uid(), 'admin') |

### user_roles
| Política | Comando | Quem | Condição |
|----------|---------|------|----------|
| Users can view own roles | SELECT | authenticated | auth.uid() = user_id |
| Admins can view all roles | SELECT | authenticated | has_role(auth.uid(), 'admin') |

### missions
| Política | Comando | Quem | Condição |
|----------|---------|------|----------|
| Anyone can view missions | SELECT | authenticated | true |
| Admins can insert missions | INSERT | authenticated | has_role(auth.uid(), 'admin') |
| Admins can update missions | UPDATE | authenticated | has_role(auth.uid(), 'admin') |
| Admins can delete missions | DELETE | authenticated | has_role(auth.uid(), 'admin') |

### user_missions
| Política | Comando | Quem | Condição |
|----------|---------|------|----------|
| Users can view own progress | SELECT | authenticated | auth.uid() = user_id |
| Users can insert own progress | INSERT | authenticated | auth.uid() = user_id |
| Users can update own progress | UPDATE | authenticated | auth.uid() = user_id |

## Funções do Banco

### `handle_new_user()`
- **Tipo:** Trigger function (SECURITY DEFINER)
- **Gatilho:** Após INSERT em auth.users
- **Ação:** Cria automaticamente um registro em `profiles` com dados do metadata do signup

### `has_role(_user_id, _role)`
- **Tipo:** SQL function (SECURITY DEFINER)
- **Uso:** Verificação de role sem recursão de RLS
- **Retorno:** boolean

### `update_updated_at_column()`
- **Tipo:** Trigger function
- **Ação:** Atualiza `updated_at` automaticamente em UPDATE

## Extensões Habilitadas

- `pg_cron` — Jobs agendados (expiração automática de missões)
- `pg_net` — Requisições HTTP do banco (para chamar Edge Functions)
