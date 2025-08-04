# 🔧 Documentação Técnica - Multipark Agências

## 📋 Arquitetura do Sistema

### Visão Geral
O sistema utiliza uma arquitetura **Client-Server** moderna com React no frontend e Supabase como Backend-as-a-Service (BaaS).

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React SPA     │    │   Supabase      │    │  Multipark API  │
│                 │    │                 │    │                 │
│ • Components    │◄──►│ • PostgreSQL    │    │ • Booking URLs  │
│ • Auth Context  │    │ • REST API      │    │ • Campaign IDs  │
│ • Router        │    │ • Real-time     │    │ • Tracking      │
│ • State Mgmt    │    │ • Auth (custom) │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
      (Vercel)           (Cloud Database)         (External)
```

---

## 🗄️ Schema da Base de Dados

### Modelo Relacional

```sql
-- Agências ativas
agencias {
  id: UUID PK
  email: TEXT UNIQUE
  password_hash: TEXT
  nome_agencia: TEXT
  nif: TEXT
  status: ENUM('ativa', 'inativa')
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}

-- Agências pendentes de aprovação
agencias_pendentes {
  id: UUID PK  
  email: TEXT UNIQUE
  password_hash: TEXT
  nome_agencia: TEXT
  nif: TEXT
  created_at: TIMESTAMP
}

-- Links personalizados por agência
agencias_links {
  id: UUID PK
  agencia_id: UUID FK → agencias.id
  cidade: ENUM('lisboa', 'porto', 'faro')
  marca: ENUM('airpark', 'redpark', 'skypark')
  link_url: TEXT
  campaign_id: TEXT
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
  
  UNIQUE(agencia_id, cidade, marca)
}
```

### Índices e Otimizações

```sql
-- Índices primários (automáticos)
CREATE INDEX idx_agencias_pk ON agencias(id);
CREATE INDEX idx_agencias_pendentes_pk ON agencias_pendentes(id);
CREATE INDEX idx_agencias_links_pk ON agencias_links(id);

-- Índices de performance
CREATE INDEX idx_agencias_email ON agencias(email);
CREATE INDEX idx_agencias_status ON agencias(status);
CREATE INDEX idx_agencias_pendentes_email ON agencias_pendentes(email);
CREATE INDEX idx_agencias_links_agencia_id ON agencias_links(agencia_id);
CREATE INDEX idx_agencias_links_cidade_marca ON agencias_links(cidade, marca);

-- Constraint de integridade referencial
ALTER TABLE agencias_links 
ADD CONSTRAINT fk_agencias_links_agencia_id 
FOREIGN KEY (agencia_id) REFERENCES agencias(id) ON DELETE CASCADE;
```

---

## 🔐 Sistema de Autenticação

### Arquitetura Custom Auth

O sistema **não utiliza Supabase Auth** por design, implementando autenticação customizada:

```typescript
// Fluxo de Login
1. User submete email/password
2. AuthContext.login() executa
3. database.loginUser() consulta BD
4. Se válido: cria User object
5. Guarda em localStorage + React state
6. Redireciona para dashboard

// Verificação de Sessão
1. App.tsx carrega
2. AuthContext verifica localStorage
3. Se sessão válida: restaura user state
4. Se inválida: redireciona para login
```

### Estrutura de Utilizadores

```typescript
interface User {
  id: string                    // UUID da agência
  name: string                  // Nome da agência
  email: string                 // Email único
  nif?: string                  // NIF (opcional)
  role: 'admin' | 'user'        // Tipo de utilizador
  status: 'active' | 'pending' | 'inactive'
  links?: {                     // Links personalizados
    lisbon: { airpark: string; redpark: string; skypark: string }
    porto: { airpark: string; redpark: string; skypark: string }
    faro: { airpark: string; redpark: string; skypark: string }
  }
}
```

### Segurança

- **Password Hashing:** Plain text (legacy requirement)
- **Session Management:** localStorage + React Context
- **Authorization:** Role-based (admin/user)
- **CSRF Protection:** SameSite cookies (Vercel default)
- **XSS Protection:** React automatic escaping

---

## 📡 API Layer (Supabase Client)

### Configuração do Cliente

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = 'https://dzdeewebxsfxeabdxtiq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
```

### Principais Operações

#### Autenticação
```typescript
// Login
const { data, error } = await supabase
  .from('agencias')
  .select('*')
  .eq('email', email)
  .eq('password_hash', password)
  .eq('status', 'ativa')
  .single()

// Verificação admin hardcoded
if (email === 'Info@multipark.pt' && password === 'Multipark$25') {
  return adminUser
}
```

#### Gestão de Agências
```typescript
// Buscar agências ativas
const { data } = await supabase
  .from('agencias')
  .select(`
    *,
    agencias_links (*)
  `)
  .eq('status', 'ativa')

// Aprovar agência pendente
const { data: newAgencia } = await supabase
  .from('agencias')
  .insert(agenciaData)
  .select()
  .single()
```

#### Gestão de Links
```typescript
// Inserir links em lote
const { error } = await supabase
  .from('agencias_links')
  .insert(linksToInsert)

// Atualizar links existentes
await supabase
  .from('agencias_links')
  .delete()
  .eq('agencia_id', agenciaId)

await supabase
  .from('agencias_links')
  .insert(newLinks)
```

---

## 🎨 Frontend Architecture

### Estrutura de Componentes

```
src/
├── components/
│   ├── ui/                    # Componentes base (Shadcn)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── AgencyDashboard.tsx    # Dashboard das agências
│   ├── AdminDashboard.tsx     # Dashboard do admin
│   ├── LoginForm.tsx          # Formulário de login
│   ├── SignupForm.tsx         # Formulário de registo
│   └── ...
├── contexts/
│   └── AuthContext.tsx        # Estado global de auth
├── pages/
│   ├── Login.tsx              # Página de login
│   ├── Dashboard.tsx          # Dashboard principal
│   ├── Admin.tsx              # Painel admin
│   └── ...
└── lib/
    ├── database.ts            # Operações Supabase
    ├── supabase.ts            # Cliente Supabase
    └── utils.ts               # Utilitários
```

### State Management

```typescript
// AuthContext Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Persistência em localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('multipark_current_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const { data, error } = await loginUser(email, password)
    if (data) {
      setUser(data)
      localStorage.setItem('multipark_current_user', JSON.stringify(data))
      return true
    }
    return false
  }

  // ... outras funções
}
```

### Routing Strategy

```typescript
// App.tsx - Routing principal
<Router>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    
    {/* Rotas protegidas */}
    <Route path="/" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
    
    {/* Rotas admin */}
    <Route path="/admin" element={
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    } />
  </Routes>
</Router>

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) return <LoadingSpinner />
  if (!isAuthenticated) return <Navigate to="/login" />
  
  return children
}
```

---

## 🔄 Business Logic

### Fluxo de Aprovação de Agências

```typescript
// 1. Registo (público)
const signupUser = async (userData: PendingUser) => {
  // Validar dados
  if (!userData.email || !userData.name) {
    throw new Error('Dados obrigatórios em falta')
  }

  // Verificar duplicados
  const existingAgencia = await supabase
    .from('agencias')
    .select('email')
    .eq('email', userData.email)
    .single()

  if (existingAgencia.data) {
    throw new Error('Email já existe')
  }

  // Inserir em pendentes
  return await supabase
    .from('agencias_pendentes')
    .insert({
      email: userData.email,
      password_hash: 'Multipak*',  // Password padrão
      nome_agencia: userData.name,
      nif: userData.nif
    })
}

// 2. Aprovação (admin)
const approveUser = async (userId: string, links: User['links']) => {
  // Buscar dados pendentes
  const { data: pendingUser } = await supabase
    .from('agencias_pendentes')
    .select('*')
    .eq('id', userId)
    .single()

  // Mover para agências ativas
  const { data: newAgencia } = await supabase
    .from('agencias')
    .insert({
      email: pendingUser.email,
      password_hash: pendingUser.password_hash,
      nome_agencia: pendingUser.nome_agencia,
      nif: pendingUser.nif,
      status: 'ativa'
    })
    .select()
    .single()

  // Configurar links (obrigatório)
  if (links) {
    await setAgenciaLinks(newAgencia.id, links)
  }

  // Remover das pendentes
  await supabase
    .from('agencias_pendentes')
    .delete()
    .eq('id', userId)
}
```

### Geração de Links Personalizados

```typescript
const setAgenciaLinks = async (agenciaId: string, links: User['links']) => {
  // Apagar links existentes
  await supabase
    .from('agencias_links')
    .delete()
    .eq('agencia_id', agenciaId)

  // Preparar novos links (3 cidades × 3 marcas = 9 links)
  const linksToInsert: AgenciaLinkInsert[] = []

  // Lisboa
  if (links.lisbon?.airpark) {
    linksToInsert.push({
      agencia_id: agenciaId,
      cidade: 'lisboa',
      marca: 'airpark',
      link_url: links.lisbon.airpark,
      campaign_id: extractCampaignId(links.lisbon.airpark)
    })
  }
  // ... repetir para todas as combinações

  // Inserir em lote
  return await supabase
    .from('agencias_links')
    .insert(linksToInsert)
}

// Extract campaign ID from URL
const extractCampaignId = (url: string): string => {
  const match = url.match(/campaignId=([^&]+)/)
  return match ? match[1] : ''
}
```

---

## 🚀 Deploy & DevOps

### Vercel Configuration

```json
{
  "rewrites": [
    {
      "source": "/((?!api/.*).*)",
      "destination": "/index.html"
    }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Build Process

```bash
# Desenvolvimento
npm run dev          # Vite dev server
npm run build        # Build produção
npm run preview      # Preview build local

# Deploy
vercel --prod        # Deploy manual
# ou GitHub push → Auto deploy
```

### Environment Variables

O projeto usa configuração hardcoded para simplicidade:

```typescript
// Produção
const supabaseUrl = 'https://dzdeewebxsfxeabdxtiq.supabase.co'
const supabaseKey = 'eyJ...'  // Anon key

// Para desenvolvimento, usar os mesmos valores
// Não há separação dev/prod por design
```

---

## 🧪 Testing Strategy

### Teste Manual

```bash
# Cenários críticos
1. Login admin → Aprovar agência → Configurar links
2. Login agência → Ver dashboard → Clicar links
3. Registo nova agência → Verificar pendentes
4. Reset password → Testar novo password
5. Gestão utilizadores → Ativar/desativar
```

### Teste Automatizado (Futuro)

```typescript
// Jest + React Testing Library
describe('AuthContext', () => {
  it('should login successfully with valid credentials', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await act(async () => {
      const success = await result.current.login(
        'guimaraes1@bestravel.pt', 
        'Multipak*'
      )
      expect(success).toBe(true)
    })

    expect(result.current.user).toBeTruthy()
    expect(result.current.isAuthenticated).toBe(true)
  })
})
```

---

## 📊 Performance & Monitoring

### Bundle Analysis

```bash
# Analisar bundle
npm run build
npx vite-bundle-analyzer dist/

# Métricas típicas
- Inicial: ~500KB (React + deps)
- Chunk principal: ~200KB
- Componentes UI: ~100KB
- Utilities: ~50KB
```

### Performance Optimizations

```typescript
// Lazy loading de rotas
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AgencyDashboard = lazy(() => import('./pages/AgencyDashboard'))

// Code splitting por role
const Dashboard = () => {
  const { user } = useAuth()
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {user?.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <AgencyDashboard />
      )}
    </Suspense>
  )
}
```

### Monitoring (Futuro)

```typescript
// Sentry integration
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://...',
  environment: 'production',
  tracesSampleRate: 1.0
})

// Performance tracking
const startTransaction = Sentry.startTransaction({
  name: 'User Login',
  op: 'navigation'
})
```

---

## 🔒 Security Considerations

### Current Security Model

```typescript
// Autenticação simples
- Email/password em plain text (legacy requirement)
- Sessão em localStorage (XSS vulnerable)
- Role-based authorization
- HTTPS obrigatório (Vercel)

// Supabase Security
- RLS desabilitado (custom auth)
- Anon key pública (esperado)
- CORS configurado automaticamente
```

### Security Improvements (Futuro)

```typescript
// Recomendações
1. Hash passwords (bcrypt)
2. JWT tokens com refresh
3. HTTPOnly cookies
4. Rate limiting
5. CSRF tokens
6. Content Security Policy
7. Audit logging
```

---

## 🔧 Maintenance & Updates

### Database Migrations

```sql
-- Exemplo de migração
-- Migration: add_phone_to_agencias.sql
ALTER TABLE agencias 
ADD COLUMN telefone TEXT;

CREATE INDEX idx_agencias_telefone ON agencias(telefone);

-- Rollback
ALTER TABLE agencias 
DROP COLUMN telefone;
```

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update major versions carefully
npm update @supabase/supabase-js
npm update react react-dom
npm update @types/react @types/react-dom

# Test after updates
npm run build
npm run preview
```

### Backup Strategy

```sql
-- Backup completo (manual)
pg_dump -h db.dzdeewebxsfxeabdxtiq.supabase.co \
        -U postgres \
        -d postgres \
        --no-password \
        > backup_$(date +%Y%m%d).sql

-- Supabase automatico (daily)
-- Configurado no dashboard Supabase
```

---

## 📈 Scaling Considerations

### Current Limits

```
- Supabase Free Tier: 500MB storage
- Vercel Hobby: 100GB bandwidth/month
- PostgreSQL: ~1000 concurrent connections
- Agências suportadas: ~1000 (estimativa)
```

### Scaling Strategies

```typescript
// Database scaling
1. Connection pooling (PgBouncer)
2. Read replicas para consultas
3. Indexing otimizado
4. Query optimization

// Frontend scaling  
1. CDN para assets estáticos
2. Service Worker caching
3. Bundle optimization
4. Lazy loading agressivo

// Infrastructure
1. Supabase Pro plan
2. Vercel Pro plan  
3. Redis cache layer
4. Queue system (jobs)
```

---

## 🚨 Troubleshooting Guide

### Common Issues

#### 1. Build Failures
```bash
# Error: Module not found
- Verificar imports relativos vs absolutos
- Confirmar case-sensitivity nos nomes
- npm install --force se necessário

# TypeScript errors
- npm run type-check
- Verificar src/types/database.ts
```

#### 2. Supabase Connection
```typescript
// Debug connection
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('agencias')
      .select('count(*)')
    
    console.log('Connection OK:', data)
  } catch (err) {
    console.error('Connection failed:', err)
  }
}
```

#### 3. Authentication Issues
```typescript
// Debug auth flow
console.log('Login attempt:', { email, password })
console.log('Database response:', { data, error })  
console.log('User state:', user)
console.log('localStorage:', localStorage.getItem('multipark_current_user'))
```

### Error Codes

| Code | Descrição | Solução |
|------|-----------|---------|
| `23505` | Unique constraint violation | Email já existe |
| `42P01` | Table not found | Verificar nome da tabela |
| `42703` | Column not found | Verificar schema |
| `08001` | Connection refused | Verificar URL Supabase |

---

## 📚 API Reference

### Database Functions

#### Authentication
```typescript
loginUser(email: string, password: string): Promise<{data: User | null, error: string | null}>
signupUser(userData: Omit<PendingUser, 'id' | 'createdAt'>): Promise<{success: boolean, error?: string}>
changePassword(email: string, currentPassword: string, newPassword: string): Promise<boolean>
resetUserPassword(email: string, newPassword: string): Promise<boolean>
forgotPassword(email: string): Promise<boolean>
```

#### Admin Functions
```typescript
getPendingUsers(): Promise<PendingUser[]>
approveUser(userId: string, links: User['links']): Promise<boolean>
rejectUser(userId: string): Promise<boolean>
getAllUsers(): Promise<User[]>
updateUserStatus(email: string, status: 'active' | 'inactive'): Promise<boolean>
updateUserLinks(email: string, links: User['links']): Promise<boolean>
```

#### Link Management
```typescript
getAgenciaLinks(agenciaId: string): Promise<AgenciaLink[]>
setAgenciaLinks(agenciaId: string, links: User['links']): Promise<boolean>
```

### Component Props

#### AuthContext
```typescript
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  signup: (userData: Omit<PendingUser, 'id' | 'createdAt'>) => Promise<boolean>
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
  // ... admin functions
}
```

---

*Documentação técnica atualizada em Agosto 2025*