# 🎮 Sistema de Gamificação

## Visão Geral

A gamificação é o coração do engajamento da plataforma. O sistema foi projetado para criar loops de retenção diários e semanais, incentivando participação contínua.

## Elementos de Gamificação

### 1. XP (Experiência)

- Cada ação concede XP
- XP acumulado determina o nível do usuário
- Barra de progresso visual (XPWidget)
- Exibido no header e no perfil

| Ação | XP |
|------|-----|
| Primeiro palpite do dia | 50 |
| Comentar em mercado | 20 |
| Explorar categorias | 30 |
| Missão diária completa | 50-100 |
| Missão semanal completa | 150-200 |
| Missão especial completa | 300-500 |
| Acertar palpite | Variável |

### 2. Streak (Sequência Diária)

- Contador de dias consecutivos com atividade
- Widget visual com ícone de fogo 🔥
- Exibido no header (compact) e na home (expandido)
- Perder um dia reseta a sequência
- Missão "Tá on fire" recompensa 7 dias seguidos

### 3. Missões/Desafios

Três categorias com características distintas:

| Tipo | Duração | XP Médio | Exemplo |
|------|---------|----------|---------|
| **Diária** | 24h | 20-100 | "Dê 1 palpite hoje" |
| **Semanal** | 7 dias | 150-200 | "Palpite em 5 categorias" |
| **Especial** | Variável | 300-500 | "5 palpites de futebol" |

**Funcionalidades:**
- Timer visual com countdown (horas:minutos)
- Barra de progresso (ex: 2/5)
- Expiração automática via pg_cron
- Estado persistido no banco (user_missions)
- Tabs para filtrar por tipo

### 4. Badges/Conquistas

12 badges disponíveis em categorias:

| Badge | Categoria | Condição |
|-------|-----------|----------|
| ⚽ Oráculo do Futebol | Futebol | 10 acertos |
| 🏛️ Radar Político | Política | 20 palpites |
| 📺 Mestre do BBB | BBB | Acertar vencedor |
| 📈 Macro Guru | Economia | 5 acertos seguidos |
| 🌦️ Meteorologista | Clima | 10 acertos |
| 🎬 Crítico de Cinema | Cultura | 15 palpites |
| 🔥 On Fire | Geral | 30 dias de streak |
| 🎯 Primeiro Palpite | Geral | Primeiro palpite |
| 🏆 Top 10 Semanal | Geral | Ranking top 10 |
| 💻 Tech Visionary | Tech | 5 acertos |
| 🏅 Atleta Digital | Esportes | Todas as categorias |
| 💬 Voz Ativa | Geral | 100 comentários |

### 5. Ranking

- Top 10 por acurácia de previsões
- Métricas: acurácia (%), lucro, nível
- Filtro por região (UF)
- Avatares com emojis
- Atualização periódica

## Loop de Engajamento

```
Usuário abre o app
    ↓
Vê streak atual → motivação para manter
    ↓
Vê missões com timer → urgência para completar
    ↓
Dá palpites → ganha XP + progresso em missões
    ↓
Sobe de nível / ganha badge → dopamina
    ↓
Vê ranking → competição social
    ↓
Compartilha → traz mais usuários
    ↓
Volta no dia seguinte → streak continua
```
