export interface Database {
  public: {
    Tables: {
      agencias: {
        Row: {
          id: string
          email: string
          password_hash: string
          nome_agencia: string
          nif: string | null
          status: 'ativa' | 'inativa'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          nome_agencia: string
          nif?: string | null
          status?: 'ativa' | 'inativa'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          nome_agencia?: string
          nif?: string | null
          status?: 'ativa' | 'inativa'
          created_at?: string
          updated_at?: string
        }
      }
      agencias_pendentes: {
        Row: {
          id: string
          email: string
          password_hash: string
          nome_agencia: string
          nif: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          nome_agencia: string
          nif?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          nome_agencia?: string
          nif?: string | null
          created_at?: string
        }
      }
      agencias_links: {
        Row: {
          id: string
          agencia_id: string
          cidade: 'lisboa' | 'porto' | 'faro'
          marca: 'airpark' | 'redpark' | 'skypark'
          link_url: string
          campaign_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agencia_id: string
          cidade: 'lisboa' | 'porto' | 'faro'
          marca: 'airpark' | 'redpark' | 'skypark'
          link_url: string
          campaign_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agencia_id?: string
          cidade?: 'lisboa' | 'porto' | 'faro'
          marca?: 'airpark' | 'redpark' | 'skypark'
          link_url?: string
          campaign_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Tipos derivados para uso na aplicação
export type Agencia = Database['public']['Tables']['agencias']['Row']
export type AgenciaPendente = Database['public']['Tables']['agencias_pendentes']['Row']
export type AgenciaLink = Database['public']['Tables']['agencias_links']['Row']

// Tipos para inserção
export type AgenciaInsert = Database['public']['Tables']['agencias']['Insert']
export type AgenciaPendenteInsert = Database['public']['Tables']['agencias_pendentes']['Insert']
export type AgenciaLinkInsert = Database['public']['Tables']['agencias_links']['Insert']

// Tipos para atualização
export type AgenciaUpdate = Database['public']['Tables']['agencias']['Update']
export type AgenciaLinkUpdate = Database['public']['Tables']['agencias_links']['Update']

// Tipos de conveniência para a aplicação
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  nif?: string
  role: 'admin' | 'user'
  status: 'active' | 'pending' | 'inactive'
  observations?: string
  links?: {
    lisbon: { airpark: string; redpark: string; skypark: string }
    porto: { airpark: string; redpark: string; skypark: string }
    faro: { airpark: string; redpark: string; skypark: string }
  }
}

export interface PendingUser {
  id: string
  name: string
  email: string
  phone: string
  nif: string
  observations: string
  createdAt: Date
}
