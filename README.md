# 🚗 Multipark Agências - Portal de Reservas

Um sistema completo de gestão de reservas para agências de viagem, com integração às três marcas do Multipark: **Airpark**, **Redpark** e **Skypark**.

## 📋 Índice

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Sistema](#estrutura-do-sistema)
- [Credenciais de Teste](#credenciais-de-teste)
- [Deployment](#deployment)

## ✨ Características

- **🔐 Sistema completo de autenticação** com níveis de acesso (Admin/Utilizador)
- **👥 Gestão de utilizadores** com aprovação de novos registos
- **🏙️ Multi-cidades** (Lisboa, Porto, Faro)
- **🏢 Multi-marcas** (Airpark, Redpark, Skypark)
- **📱 Interface responsive** e moderna
- **🔒 Controlo de acesso granular**
- **📊 Dashboard administrativo** completo

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de CSS
- **Shadcn/UI** - Componentes de interface

### Componentes e Ferramentas
- **React Router DOM** - Navegação
- **TanStack Query** - State management
- **Sonner** - Notificações
- **Lucide React** - Ícones
- **Date-fns** - Manipulação de datas

### Backend & Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - Base de dados (via Supabase)

## 🚀 Funcionalidades

### 👤 Sistema de Utilizadores

#### **Utilizadores Regulares (Agências)**
- ✅ **Login seguro** com credenciais únicas
- ✅ **Registo de novas agências** com validação completa
- ✅ **Recuperação de password** via administrador
- ✅ **Perfil do utilizador** com alteração de password
- ✅ **Dashboard personalizado** por agência
- ✅ **Acesso às três cidades** (Lisboa, Porto, Faro)
- ✅ **Redirecionamento automático** para links específicos das marcas

#### **Administrador**
- ✅ **Dashboard administrativo** completo
- ✅ **Gestão de pedidos pendentes** (aprovar/rejeitar novos utilizadores)
- ✅ **Gestão de utilizadores ativos** (ativar/desativar contas)
- ✅ **Configuração de links personalizados** por utilizador e marca
- ✅ **Reset de passwords** de utilizadores
- ✅ **Estatísticas do sistema** em tempo real

### 🏙️ Sistema Multi-Cidade

Cada agência tem acesso a reservas nas três principais cidades:
- **Lisboa** - Capital e maior hub de negócios
- **Porto** - Segundo maior centro urbano
- **Faro** - Gateway para o Algarve

### 🏢 Sistema Multi-Marca

Integração completa com as três marcas Multipark:
- **Airpark** - Estacionamento no aeroporto
- **Redpark** - Soluções urbanas de estacionamento  
- **Skypark** - Estacionamento premium

### 📊 Dashboard & Gestão

#### **Dashboard do Utilizador**
- Visão geral das três cidades disponíveis
- Acesso rápido aos serviços de cada marca
- Links informativos (preçário, diferenças, contacto)
- Interface intuitiva e fácil navegação

#### **Dashboard do Administrador**
- **Tab "Pedidos Pendentes"**: Visualização e gestão de novos registos
- **Tab "Utilizadores"**: Gestão completa de contas ativas
- **Tab "Estatísticas"**: Métricas do sistema em tempo real
- Ferramentas avançadas de configuração de links
- Sistema de reset de passwords

## 📥 Instalação

### Pré-requisitos
- **Node.js** (versão 16+)
- **npm** ou **bun**

### Passos de Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/JorgeTabuada/Multipark-Agencias.git
cd Multipark-Agencias

# 2. Instalar dependências
npm install
# ou
bun install

# 3. Iniciar servidor de desenvolvimento
npm run dev
# ou
bun dev
```

O projeto estará disponível em `http://localhost:5173`

## ⚙️ Configuração

### Variáveis de Ambiente

Criar ficheiro `.env.local`:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Configuração do Supabase

O sistema está configurado para funcionar com Supabase como backend. As configurações estão em:
- `src/integrations/supabase/`
- `supabase/` (configurações do projeto)

## 🏗️ Estrutura do Sistema

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Cabeçalho com navegação
│   └── ui/             # Biblioteca de componentes Shadcn/UI
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Gestão de autenticação e utilizadores
├── pages/              # Páginas da aplicação
│   ├── Login.tsx       # Página de login
│   ├── SignUp.tsx      # Registo de novas agências
│   ├── ForgotPassword.tsx # Recuperação de password
│   ├── Dashboard.tsx   # Dashboard do utilizador
│   ├── AdminDashboard.tsx # Dashboard administrativo
│   ├── UserProfile.tsx # Perfil do utilizador
│   ├── CityPage.tsx    # Seleção de marcas por cidade
│   └── ...             # Outras páginas (About, Contact, etc.)
├── utils/              # Utilitários
└── integrations/       # Integrações externas (Supabase)
```

## 🔑 Credenciais de Teste

### 👨‍💼 Conta Administrador
```
Email: Info@multipark.pt
Password: Multipark$25
```

**Funcionalidades do Admin:**
- Aprovar/rejeitar novos registos
- Gerir utilizadores existentes
- Configurar links personalizados
- Reset de passwords
- Visualizar estatísticas

### 🏢 Conta de Agência (Exemplo)
```
Email: guimaraes1@bestravel.pt
Password: Multipak*
```

**Funcionalidades da Agência:**
- Acesso às três cidades
- Reservas nas três marcas
- Gestão do perfil
- Alteração de password

## 🔄 Fluxos do Sistema

### 1. **Fluxo de Registo de Nova Agência**
```
1. Utilizador clica "Registar Nova Agência"
2. Preenche formulário (Nome, Email, Telefone, NIF, Observações)
3. Sistema valida dados e envia pedido
4. Admin recebe notificação no dashboard
5. Admin aprova/rejeita o pedido
6. Se aprovado: conta é criada com links automáticos
7. Agência pode fazer login e aceder ao sistema
```

### 2. **Fluxo de Recuperação de Password**
```
1. Utilizador clica "Esqueci-me da password"
2. Insere email da conta
3. Sistema valida se email existe
4. Admin é notificado do pedido
5. Admin contacta utilizador com nova password
6. Utilizador faz login e pode alterar password no perfil
```

### 3. **Fluxo de Reserva**
```
1. Agência faz login → Dashboard
2. Seleciona cidade (Lisboa/Porto/Faro)
3. Escolhe marca (Airpark/Redpark/Skypark)
4. Sistema redireciona para link personalizado da agência
5. Processo de reserva continua no site da marca
```

## 🛡️ Segurança

- **Autenticação robusta** com verificação de credenciais
- **Controlo de acesso** baseado em roles (Admin/User)
- **Validação de formulários** client-side e server-side
- **Proteção de rotas** para páginas sensíveis
- **Sanitização de inputs** para prevenir ataques
- **Sistema de aprovação** para novos utilizadores

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (até 767px)

## 🎨 Design System

### Cores Principais
- **Azul**: `#2563eb` (Primary)
- **Roxo**: `#7c3aed` (Secondary)
- **Verde**: `#16a34a` (Success)
- **Vermelho**: `#dc2626` (Error)
- **Laranja**: `#ea580c` (Warning)

### Componentes
- Todos os componentes seguem o design system Shadcn/UI
- Consistência visual em toda a aplicação
- Animações suaves e feedback visual
- Estados de loading e erro bem definidos

## 🚀 Deployment

### Opções de Deploy

1. **Vercel** (Recomendado)
```bash
npm run build
# Deploy para Vercel
```

2. **Netlify**
```bash
npm run build
# Upload da pasta dist/
```

3. **Manual**
```bash
npm run build
# Servir ficheiros da pasta dist/
```

### Variáveis de Produção
Configurar no serviço de deploy:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🤝 Contribuição

1. Fork do projeto
2. Criar branch para feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit das alterações (`git commit -m 'Adicionar nova funcionalidade'`)
4. Push para branch (`git push origin feature/nova-funcionalidade`)
5. Abrir Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Ver ficheiro `LICENSE` para mais detalhes.

---

## 📞 Suporte

Para suporte técnico ou questões sobre o sistema:

**Email**: Info@multipark.pt  
**Desenvolvido por**: Jorge Tabuada  
**Empresa**: Multipark

---

*Sistema desenvolvido com ❤️ para as agências parceiras do Multipark*