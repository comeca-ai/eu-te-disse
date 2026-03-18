# ✨ Features

## Implementadas ✅

### 1. Landing Page Pública
- Hero com call-to-action
- Pilares de confiança (sabedoria da galera, transparência, social, recompensas)
- Seção "Tá pegando fogo" (mercados em alta)
- Seção "Fecha hoje" (mercados resolvendo hoje)
- Seção "Palpites do dia" com filtro por categoria
- Seção "Primeira vez aqui?" com onboarding
- Widgets de streak e XP no header

### 2. Sistema de Categorias
- 9 categorias: Futebol, Política, Economia, BBB/TV, Tech, Clima, Cultura Pop, Esportes + "Tudo"
- Filtro horizontal scrollável com badges
- Cada mercado associado a uma categoria com emoji

### 3. Cards de Mercado
- Probabilidade em destaque com variação 24h
- Sparkline mini-gráfico de tendência
- Volume de participação
- Quantidade de comentários
- Prazo/deadline
- Fonte de dados
- Flags: hot 🔥, resolvendo hoje ⏰

### 4. Detalhe do Mercado
- Gráfico de probabilidade expandido (AreaChart)
- Botões Sim/Não para palpitar
- Seção de comentários
- Mercados relacionados
- Ações: compartilhar, salvar

### 5. Autenticação Completa
- Login com email/senha
- Cadastro com: nome, email, CPF (validação algoritmo), sexo, UF, data nascimento, senha
- Confirmação de email obrigatória
- Criação automática de perfil via trigger no banco
- Controle de sessão via AuthContext

### 6. Sistema de Roles
- Enum `app_role`: admin, moderator, user
- Tabela separada `user_roles` (segurança contra privilege escalation)
- Função `has_role()` com SECURITY DEFINER
- Verificação server-side via RLS

### 7. Painel Administrativo
- Listagem de todos os perfis cadastrados
- Aprovar/rejeitar usuários
- Visualização de status e data de cadastro
- Protegido por verificação de role admin

### 8. Missões/Desafios com Timer
- 3 tipos: Diária, Semanal, Especial
- Countdown em tempo real (horas e minutos restantes)
- Barra de progresso
- XP por missão completada
- Dados reais do banco de dados
- Expiração automática via pg_cron (a cada 5 minutos)
- Edge Function para expiração sob demanda

### 9. Ranking
- Top 10 usuários por acurácia
- Métricas: accuracy %, profit, level
- Filtro por região (UF)
- Avatares e badges de nível

### 10. Carteira (Portfolio)
- Posições abertas do usuário
- Investido vs Valor atual
- Lucro/prejuízo por posição
- Categorizado por mercado

### 11. Perfil do Usuário
- Dados pessoais
- Estatísticas: nível, XP, streak, acurácia
- Badges conquistadas
- Histórico

### 12. Navegação Mobile
- Bottom navigation fixa com 5 itens
- Indicador de item ativo
- Safe area para notch/barra de gestos
- Glassmorphism no header e nav

### 13. Design System
- Tema claro e escuro completo
- Tokens semânticos HSL
- Glassmorphism (backdrop-blur)
- Gradientes customizados
- Animações CSS (shimmer, pulse, float)
- Responsivo: mobile-first até desktop

## Planejadas 🚧

### Fase 2
- [ ] Mercados reais no banco de dados (migrar de mockData)
- [ ] Sistema de apostas/palpites com saldo virtual
- [ ] Resolução automática de mercados
- [ ] Notificações push
- [ ] Compartilhamento social
- [ ] Comentários em tempo real (Realtime)

### Fase 3
- [ ] Criação de mercados pela comunidade
- [ ] Desafios entre amigos (1v1)
- [ ] Liga/temporadas com premiação
- [ ] API pública de probabilidades
- [ ] Integração com fontes de dados (CBF, BCB, IBGE)
- [ ] App nativo (PWA ou React Native)

### Fase 4
- [ ] Monetização (marketplace de badges, premium)
- [ ] Parcerias com veículos de mídia
- [ ] Mercados patrocinados
- [ ] Analytics avançado para criadores
