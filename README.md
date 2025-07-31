# 🚗 Multipark Agências - Portal de Reservas

Um sistema completo de gestão de reservas para agências de viagem, com integração às três marcas do Multipark: **Airpark**, **Redpark** e **Skypark**.

## 📋 Índice

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Funcionalidades](#funcionalidades)
- [Sistema de Links Personalizados](#sistema-de-links-personalizados)
- [Instalação](#instalação)
- [Credenciais de Teste](#credenciais-de-teste)
- [Fluxos do Sistema](#fluxos-do-sistema)

## ✨ Características

- **🔐 Sistema completo de autenticação** com níveis de acesso (Admin/Utilizador)
- **👥 Gestão de utilizadores** com aprovação de novos registos
- **🔗 Links personalizados únicos** por agência/cidade/marca
- **🏙️ Multi-cidades** (Lisboa, Porto, Faro)
- **🏢 Multi-marcas** (Airpark, Redpark, Skypark)
- **📱 Interface responsive** e moderna
- **💾 Persistência de dados** (localStorage)
- **🔒 Controlo de acesso granular**

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de CSS
- **Shadcn/UI** - Componentes de interface

### Componentes Principais
- **React Router DOM** - Navegação
- **Sonner** - Notificações toast
- **Lucide React** - Ícones
- **localStorage** - Persistência de dados

## 🚀 Funcionalidades

### 👤 Sistema de Utilizadores

#### **Utilizadores Regulares (Agências)**
- ✅ **Login seguro** com credenciais únicas
- ✅ **Registo de novas agências** com validação completa
- ✅ **Recuperação de password** via administrador
- ✅ **Perfil do utilizador** com alteração de password
- ✅ **Dashboard personalizado** por agência
- ✅ **Redirecionamento automático** para links específicos da agência

#### **Administrador**
- ✅ **Dashboard administrativo** completo
- ✅ **Aprovação de novos utilizadores** com configuração obrigatória de links
- ✅ **Gestão de utilizadores ativos** (ativar/desativar contas)
- ✅ **Configuração manual de links únicos** (9 links por agência)
- ✅ **Reset de passwords** de utilizadores
- ✅ **Estatísticas do sistema** em tempo real

## 🔗 Sistema de Links Personalizados

### **Como Funciona**

Cada agência tem **9 links únicos** (3 cidades × 3 marcas):

```
Lisboa:
├── Airpark   → Link único com comissões específicas
├── Redpark   → Link único com comissões específicas  
└── Skypark   → Link único com comissões específicas

Porto:
├── Airpark   → Link único com comissões específicas
├── Redpark   → Link único com comissões específicas
└── Skypark   → Link único com comissões específicas

Faro:
├── Airpark   → Link único com comissões específicas
├── Redpark   → Link único com comissões específicas
└── Skypark   → Link único com comissões específicas
```

### **Exemplo de Link**
```
https://multipark.pt/book?city=lisbon&parkBrand=redpark&campaignId=ZOJniuQ4WvDtOUU8HfbV
```

### **Processo de Criação**

1. **Admin recebe pedido** de nova agência
2. **Admin cria links externamente** no sistema de reservas
3. **Admin configura os 9 links** no painel administrativo
4. **Agência aprovada** pode fazer reservas com os seus links únicos

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

## 🔑 Credenciais de Teste

### 👨‍💼 Conta Administrador
```
Email: Info@multipark.pt
Password: Multipark$25
```

**Funcionalidades do Admin:**
- Aprovar/rejeitar novos registos **COM CONFIGURAÇÃO OBRIGATÓRIA DE LINKS**
- Gerir utilizadores existentes
- Configurar/alterar links personalizados
- Reset de passwords
- Visualizar estatísticas

### 🏢 Conta de Agência (Exemplo)
```
Email: guimaraes1@bestravel.pt
Password: Multipak*
```

**Funcionalidades da Agência:**
- Acesso às três cidades
- **Reservas através dos links personalizados**
- Gestão do perfil
- Alteração de password

## 🔄 Fluxos do Sistema

### 1. **Fluxo de Registo e Aprovação de Nova Agência**
```
1. Utilizador clica "Registar Nova Agência"
2. Preenche formulário (Nome, Email, Telefone, NIF, Observações)
3. Sistema valida dados e envia pedido
4. Admin recebe notificação no dashboard
5. Admin clica "Aprovar & Configurar Links"
6. 📋 OBRIGATÓRIO: Admin preenche os 9 links únicos
   ├── Lisboa: Airpark, Redpark, Skypark
   ├── Porto: Airpark, Redpark, Skypark  
   └── Faro: Airpark, Redpark, Skypark
7. Só após preencher todos os links, pode aprovar
8. Agência criada com acesso total às reservas
```

### 2. **Fluxo de Reserva com Links Personalizados**
```
1. Agência faz login → Dashboard
2. Seleciona cidade (Lisboa/Porto/Faro)
3. Sistema verifica se tem links configurados
4. Se tem: Mostra as 3 marcas disponíveis
5. Agência clica numa marca (ex: Redpark)
6. Sistema abre link específico da agência para essa cidade/marca
7. Reserva continua no site da marca com comissões específicas
```

### 3. **Gestão de Links pelo Admin**
```
1. Admin acede ao dashboard
2. Tab "Utilizadores" → Seleciona agência
3. Clica "Links" para gerir
4. Pode alterar qualquer dos 9 links
5. Links são atualizados imediatamente
6. Agência usa novos links na próxima reserva
```

## 🛡️ Persistência de Dados

O sistema usa **localStorage** para manter os dados:

- **Utilizadores ativos** (`multipark_users`)
- **Pedidos pendentes** (`multipark_pending_users`) 
- **Passwords** (`multipark_passwords`)

### **Nota Importante**
Os dados persistem entre sessões, mas são locais ao browser. Para produção, recomenda-se integração com base de dados real.

## 🎯 **Fluxo Completo de Teste**

### **Como Admin:**

1. **Login como admin:**
   ```
   Email: Info@multipark.pt
   Password: Multipark$25
   ```

2. **Criar utilizador de teste:**
   - Logout e ir para `/signup`
   - Registar nova agência fictícia
   - Login como admin novamente

3. **Aprovar com links:**
   - Dashboard Admin → Tab "Pedidos Pendentes"
   - Clicar "Aprovar & Configurar Links"
   - **Preencher os 9 links obrigatórios**
   - Aprovar

### **Como Agência:**

1. **Login com nova conta aprovada**
2. **Testar reservas:**
   - Clicar numa cidade
   - Ver se links estão configurados
   - Clicar numa marca → Deve abrir link específico

## 🔧 Funcionalidades Técnicas

### **Validações**
- ✅ Email único por agência
- ✅ NIF com 9 dígitos
- ✅ Telefone válido
- ✅ **Todos os 9 links obrigatórios antes de aprovar**
- ✅ Passwords com critérios de segurança

### **Feedback Visual**
- ✅ Notificações toast para todas as ações
- ✅ Loading states
- ✅ Estados de error
- ✅ **Indicadores visuais de links configurados/não configurados**

### **Segurança**
- ✅ Validação de sessions
- ✅ Proteção de rotas
- ✅ Sanitização de inputs
- ✅ Controlo de acesso baseado em roles

## 🎨 Design & UX

### **Interface Intuitiva**
- Cards coloridos por cidade/marca
- Feedback visual para links configurados
- **Alertas quando links não estão disponíveis**
- Interface responsiva para mobile/desktop

### **Estados dos Links**
- ✅ **Verde:** Link configurado e funcional
- ⚠️ **Amarelo:** Aviso se links não configurados
- ❌ **Cinza:** Marca indisponível (link em falta)

## 📞 Suporte

Para suporte técnico ou questões sobre o sistema:

**Email**: Info@multipark.pt  
**Desenvolvido por**: Jorge Tabuada  
**Empresa**: Multipark

---

## 🚀 **RESUMO DO QUE FOI IMPLEMENTADO**

✅ **Persistência de dados** - Não perde informações no refresh  
✅ **Sistema de aprovação com links obrigatórios** - Admin deve configurar os 9 links  
✅ **Links únicos por agência/cidade/marca** - Cada combinação tem o seu link  
✅ **Validação completa** - Não aprova sem todos os links preenchidos  
✅ **Interface melhorada** - Mostra status dos links visualmente  
✅ **Redirecionamento personalizado** - Cada agência usa os seus links específicos

O sistema está **100% funcional** e resolve exatamente o problema que descreveste: **cada agência tem os seus links únicos com as suas comissões específicas** para cada cidade e marca! 🎉

---

*Sistema desenvolvido com ❤️ para as agências parceiras do Multipark*