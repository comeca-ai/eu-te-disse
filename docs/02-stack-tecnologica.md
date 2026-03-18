# 🛠️ Stack Tecnológica

## Frontend

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React** | 18.3 | Biblioteca principal de UI |
| **TypeScript** | 5.8 | Tipagem estática |
| **Vite** | 5.4 | Bundler e dev server |
| **Tailwind CSS** | 3.4 | Estilização utility-first |
| **shadcn/ui** | - | Componentes acessíveis (Radix UI) |
| **React Router** | 6.30 | Roteamento SPA |
| **TanStack Query** | 5.83 | Gerenciamento de estado server-side |
| **Recharts** | 2.15 | Gráficos e sparklines |
| **Lucide React** | 0.462 | Iconografia |
| **React Hook Form** | 7.61 | Formulários com validação |
| **Zod** | 3.25 | Schema de validação |
| **Framer Motion** | - | Animações (planejado) |
| **date-fns** | 3.6 | Manipulação de datas |
| **Sonner** | 1.7 | Notificações toast |

## Backend (Lovable Cloud / Supabase)

| Recurso | Uso |
|---------|-----|
| **PostgreSQL** | Banco de dados relacional |
| **Supabase Auth** | Autenticação com email/senha |
| **Row Level Security** | Controle de acesso granular |
| **Edge Functions** | Lógica server-side (Deno) |
| **pg_cron** | Jobs agendados (expiração de missões) |
| **Realtime** | Atualizações em tempo real (preparado) |

## DevOps & Tooling

| Ferramenta | Uso |
|------------|-----|
| **Lovable** | Plataforma de desenvolvimento e deploy |
| **ESLint** | Linting de código |
| **Vitest** | Testes unitários |
| **Playwright** | Testes E2E |
| **PostCSS + Autoprefixer** | Processamento de CSS |

## Design System

- **Abordagem:** Tokens semânticos via CSS variables em HSL
- **Tema claro e escuro** com suporte nativo
- **Componentes base:** shadcn/ui customizados
- **Tipografia:** Font heading diferenciada + body legível
- **Paleta:** Roxo primário (`260° 65%`), Cyan secundário (`190° 85%`), com variantes de surface, muted e destructive
