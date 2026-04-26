#!/usr/bin/env bash
# ============================================================================
# Eutedisse — script de deploy Vercel (one-shot)
# Rode da pasta web/:  ./deploy.sh
# ============================================================================
set -e

cd "$(dirname "$0")"

echo "→ 1/4  Verificando dependências..."
if ! command -v node >/dev/null 2>&1; then
  echo "❌ Node não encontrado. Instale: https://nodejs.org/"
  exit 1
fi

echo "→ 2/4  Build local (sanity check)..."
[ ! -d node_modules ] && npm install
npm run build

echo "→ 3/4  Login + link Vercel (se necessário)..."
npx --yes vercel link --yes

echo "→ 4/4  Subindo envs e fazendo deploy production..."
# Sobe NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY se ainda não existirem
npx --yes vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development \
  <<< "https://ygibmcbaermwwjzwxmjb.supabase.co" 2>/dev/null || true
npx --yes vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development \
  <<< "sb_publishable_mpazcAth9XhG86oGNE4P2Q_YhqxJKud" 2>/dev/null || true

# Deploy production
URL=$(npx --yes vercel --prod --yes | tail -1)
echo ""
echo "✅ Deploy concluído: $URL"
echo ""
echo "Próximos passos manuais:"
echo "  1. Adicione $URL em https://supabase.com/dashboard/project/ygibmcbaermwwjzwxmjb/auth/url-configuration"
echo "     → Site URL e em Redirect URLs"
echo "  2. Defina NEXT_PUBLIC_SITE_URL=$URL no Vercel se quiser hardcode no client"
