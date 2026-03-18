# 🔐 Autenticação & Segurança

## Fluxo de Autenticação

### Cadastro (Signup)
```
1. Usuário preenche: nome, email, CPF, sexo, UF, nascimento, senha
2. CPF validado no frontend (algoritmo de dígitos verificadores)
3. supabase.auth.signUp() com metadata (full_name, cpf, sex, uf, birth_date)
4. Trigger handle_new_user() cria perfil automaticamente
5. Email de confirmação enviado
6. Usuário confirma email → pode fazer login
```

### Login
```
1. Usuário insere email + senha
2. supabase.auth.signInWithPassword()
3. AuthContext carrega session, profile e roles
4. Redirecionado para home ou rota protegida
```

### Logout
```
1. supabase.auth.signOut()
2. Profile e isAdmin resetados
3. Redirecionado para login
```

## AuthContext

O contexto global fornece:

```typescript
interface AuthContextType {
  session: Session | null;     // Sessão Supabase
  user: User | null;           // Dados do auth.users
  profile: Profile | null;     // Dados da tabela profiles
  loading: boolean;            // Estado de carregamento
  isAdmin: boolean;            // Verificação de role admin
  signOut: () => Promise<void>;
}
```

**Verificação de admin:** Consulta `user_roles` table com `role = 'admin'`.

## Proteção de Rotas

### Rotas Públicas
- `/` (Index/Landing)
- `/login`
- `/cadastro`

### Rotas Protegidas (requer login)
- `/mercado/:id`, `/ranking`, `/missoes`, `/carteira`, `/perfil`, `/como-funciona`
- Componente `ProtectedRoutes` verifica `user` no AuthContext
- Redireciona para `/login` se não autenticado

### Rota Admin (requer role)
- `/admin`
- Verifica `isAdmin` no AuthContext
- Redireciona para `/` se não é admin

## Segurança

### Row Level Security (RLS)
- **Todas as tabelas** têm RLS habilitado
- Usuários só acessam seus próprios dados
- Admins têm acesso expandido via `has_role()`
- Função `has_role()` usa SECURITY DEFINER para evitar recursão

### Roles em Tabela Separada
- Roles **NÃO** ficam na tabela profiles (evita privilege escalation)
- Tabela `user_roles` dedicada
- Sem INSERT/UPDATE/DELETE para usuários comuns
- Apenas SELECT do próprio role

### Validação de CPF
- Algoritmo completo de validação (dois dígitos verificadores)
- Rejeita CPFs com todos os dígitos iguais
- Formatação automática (XXX.XXX.XXX-XX)

### Boas Práticas
- Sem chaves privadas no código
- Sem verificação de admin via localStorage
- Auto-confirm de email **desabilitado** por padrão
- Tokens gerenciados pelo Supabase Auth
- CORS configurado nas Edge Functions
