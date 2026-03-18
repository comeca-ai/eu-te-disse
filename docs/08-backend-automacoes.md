# ⚙️ Backend & Automações

## Edge Functions

### `expire-missions`

**Propósito:** Expirar missões cujo prazo (`expires_at`) já passou.

**Runtime:** Deno (Supabase Edge Functions)

**Lógica:**
```
1. Conecta ao Supabase com SERVICE_ROLE_KEY
2. UPDATE missions SET status = 'expired'
   WHERE status = 'active' AND expires_at < now()
3. Retorna quantidade de missões expiradas
```

**Endpoint:** `POST /functions/v1/expire-missions`

**Resposta:**
```json
{
  "expired": 3,
  "missions": [
    { "id": "uuid", "title": "Missão X" }
  ]
}
```

## Cron Jobs (pg_cron)

### `expire-missions-every-5min`

**Frequência:** A cada 5 minutos (`*/5 * * * *`)

**SQL executado:**
```sql
UPDATE public.missions 
SET status = 'expired' 
WHERE status = 'active' 
AND expires_at < now();
```

**Objetivo:** Garantir que missões expiradas sejam marcadas automaticamente sem depender de ação do usuário ou chamada à Edge Function.

## Triggers do Banco

### `handle_new_user`
- **Evento:** AFTER INSERT em auth.users
- **Ação:** Cria registro em profiles com dados do signup metadata
- **Security:** DEFINER (executa com privilégios do owner)

### `update_updated_at_column`
- **Evento:** BEFORE UPDATE
- **Ação:** Atualiza coluna `updated_at` para `now()`

## Automações Planejadas

| Automação | Tipo | Descrição |
|-----------|------|-----------|
| Resetar streak | pg_cron (diário) | Zerar streak de quem não acessou ontem |
| Resolver mercados | Edge Function | Consultar fontes e resolver mercados automaticamente |
| Distribuir XP | Trigger | Ao completar missão, adicionar XP ao perfil |
| Notificações | Edge Function + pg_cron | Lembrete de streak e missões expirando |
| Atualizar ranking | pg_cron (horário) | Recalcular ranking baseado em acurácia |

## Secrets Configurados

| Nome | Uso |
|------|-----|
| SUPABASE_URL | URL do projeto |
| SUPABASE_ANON_KEY | Chave pública |
| SUPABASE_SERVICE_ROLE_KEY | Chave admin (Edge Functions) |
| SUPABASE_DB_URL | Conexão direta ao banco |
| SUPABASE_PUBLISHABLE_KEY | Chave publicável |
| LOVABLE_API_KEY | API da plataforma Lovable |
