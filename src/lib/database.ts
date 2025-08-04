import { supabase } from './supabase'
import type { 
  Agencia, 
  AgenciaPendente, 
  AgenciaLink, 
  AgenciaInsert, 
  AgenciaPendenteInsert, 
  AgenciaLinkInsert,
  User,
  PendingUser
} from '../types/database'

// ===== AUTENTICAÇÃO =====

export async function loginUser(email: string, password: string): Promise<{ data: User | null; error: string | null }> {
  try {
    // Verificar se é admin
    if (email === 'Info@multipark.pt' && password === 'Multipark$25') {
      return {
        data: {
          id: 'admin',
          name: 'Administrador Multipark',
          email: 'Info@multipark.pt',
          role: 'admin',
          status: 'active'
        },
        error: null
      }
    }

    // Verificar agências ativas
    const { data: agencia, error } = await supabase
      .from('agencias')
      .select('*')
      .eq('email', email)
      .eq('password_hash', password)
      .eq('status', 'ativa')
      .single()

    if (error || !agencia) {
      return { data: null, error: 'Email ou password incorretos' }
    }

    // Buscar links da agência
    const { data: links } = await supabase
      .from('agencias_links')
      .select('*')
      .eq('agencia_id', agencia.id)

    // Converter para formato da aplicação
    const userLinks = links ? convertLinksToUserFormat(links) : undefined

    const user: User = {
      id: agencia.id,
      name: agencia.nome_agencia,
      email: agencia.email,
      nif: agencia.nif || undefined,
      role: 'user',
      status: 'active',
      links: userLinks
    }

    return { data: user, error: null }
  } catch (error) {
    console.error('Erro no login:', error)
    return { data: null, error: 'Erro interno do servidor' }
  }
}

// ===== REGISTO =====

export async function signupUser(userData: Omit<PendingUser, 'id' | 'createdAt'>): Promise<{ success: boolean; error?: string }> {
  try {
    // Verificar se email já existe
    const { data: existingAgencia } = await supabase
      .from('agencias')
      .select('email')
      .eq('email', userData.email)
      .single()

    const { data: existingPending } = await supabase
      .from('agencias_pendentes')
      .select('email')
      .eq('email', userData.email)
      .single()

    if (existingAgencia || existingPending) {
      return { success: false, error: 'Email já existe' }
    }

    // Inserir na tabela de pendentes
    const pendingData: AgenciaPendenteInsert = {
      email: userData.email,
      password_hash: 'Multipak*', // Password padrão
      nome_agencia: userData.name,
      nif: userData.nif
    }

    const { error } = await supabase
      .from('agencias_pendentes')
      .insert(pendingData)

    if (error) {
      console.error('Erro ao registar:', error)
      return { success: false, error: 'Erro ao registar utilizador' }
    }

    return { success: true }
  } catch (error) {
    console.error('Erro no registo:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

// ===== GESTÃO DE PASSWORDS =====

export async function changePassword(email: string, currentPassword: string, newPassword: string): Promise<boolean> {
  try {
    // Verificar password atual
    const { data: agencia } = await supabase
      .from('agencias')
      .select('*')
      .eq('email', email)
      .eq('password_hash', currentPassword)
      .single()

    if (!agencia) {
      return false
    }

    // Atualizar password
    const { error } = await supabase
      .from('agencias')
      .update({ password_hash: newPassword })
      .eq('email', email)

    return !error
  } catch (error) {
    console.error('Erro ao alterar password:', error)  
    return false
  }
}

export async function resetUserPassword(email: string, newPassword: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('agencias')
      .update({ password_hash: newPassword })
      .eq('email', email)

    return !error
  } catch (error) {
    console.error('Erro ao resetar password:', error)
    return false
  }
}

// ===== FUNÇÕES ADMIN =====

export async function getPendingUsers(): Promise<PendingUser[]> {
  try {
    const { data, error } = await supabase
      .from('agencias_pendentes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar pendentes:', error)
      return []
    }

    return data.map(item => ({
      id: item.id,
      name: item.nome_agencia,
      email: item.email,
      phone: '+351 900 000 000', // Placeholder
      nif: item.nif || '',
      observations: '',
      createdAt: new Date(item.created_at)
    }))
  } catch (error) {
    console.error('Erro ao buscar pendentes:', error)
    return []
  }
}

export async function approveUser(userId: string, links: User['links']): Promise<boolean> {
  try {
    // Buscar dados da agência pendente
    const { data: pendingUser, error: fetchError } = await supabase
      .from('agencias_pendentes')
      .select('*')
      .eq('id', userId)
      .single()

    if (fetchError || !pendingUser) {
      console.error('Agência pendente não encontrada:', fetchError)
      return false
    }

    // Mover para agências ativas
    const agenciaData: AgenciaInsert = {
      email: pendingUser.email,
      password_hash: pendingUser.password_hash,
      nome_agencia: pendingUser.nome_agencia,
      nif: pendingUser.nif,
      status: 'ativa'
    }

    const { data: newAgencia, error: insertError } = await supabase
      .from('agencias')
      .insert(agenciaData)
      .select()
      .single()

    if (insertError || !newAgencia) {
      console.error('Erro ao criar agência:', insertError)
      return false
    }

    // Inserir links se fornecidos
    if (links) {
      const success = await setAgenciaLinks(newAgencia.id, links)
      if (!success) {
        console.error('Erro ao inserir links')
        return false
      }
    }

    // Remover das pendentes
    const { error: deleteError } = await supabase
      .from('agencias_pendentes')
      .delete()
      .eq('id', userId)

    if (deleteError) {
      console.error('Erro ao remover das pendentes:', deleteError)
      return false
    }

    return true
  } catch (error) {
    console.error('Erro ao aprovar utilizador:', error)
    return false
  }
}

export async function rejectUser(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('agencias_pendentes')
      .delete()
      .eq('id', userId)

    return !error
  } catch (error) {
    console.error('Erro ao rejeitar utilizador:', error)
    return false
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const { data, error } = await supabase
      .from('agencias')
      .select(`
        *,
        agencias_links (*)
      `)
      .neq('email', 'Info@multipark.pt')
      .eq('status', 'ativa')

    if (error) {
      console.error('Erro ao buscar utilizadores:', error)
      return []
    }

    return data.map(agencia => ({
      id: agencia.id,
      name: agencia.nome_agencia,
      email: agencia.email,
      nif: agencia.nif || undefined,
      role: 'user' as const,
      status: 'active' as const,
      links: agencia.agencias_links ? convertLinksToUserFormat(agencia.agencias_links) : undefined
    }))
  } catch (error) {
    console.error('Erro ao buscar utilizadores:', error)
    return []
  }
}

export async function updateUserStatus(email: string, status: 'active' | 'inactive'): Promise<boolean> {
  try {
    const dbStatus = status === 'active' ? 'ativa' : 'inativa'
    const { error } = await supabase
      .from('agencias')
      .update({ status: dbStatus })
      .eq('email', email)

    return !error
  } catch (error) {
    console.error('Erro ao atualizar status:', error)
    return false
  }
}

// ===== GESTÃO DE LINKS =====

export async function getAgenciaLinks(agenciaId: string): Promise<AgenciaLink[]> {
  try {
    const { data, error } = await supabase
      .from('agencias_links')
      .select('*')
      .eq('agencia_id', agenciaId)
      .order('cidade', { ascending: true })

    if (error) {
      console.error('Erro ao buscar links:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro ao buscar links:', error)
    return []
  }
}

export async function setAgenciaLinks(agenciaId: string, links: User['links']): Promise<boolean> {
  try {
    if (!links) return true

    // Apagar links existentes
    await supabase
      .from('agencias_links')
      .delete()
      .eq('agencia_id', agenciaId)

    // Preparar novos links
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
    if (links.lisbon?.redpark) {
      linksToInsert.push({
        agencia_id: agenciaId,
        cidade: 'lisboa',
        marca: 'redpark',
        link_url: links.lisbon.redpark,
        campaign_id: extractCampaignId(links.lisbon.redpark)
      })
    }
    if (links.lisbon?.skypark) {
      linksToInsert.push({
        agencia_id: agenciaId,
        cidade: 'lisboa',
        marca: 'skypark',
        link_url: links.lisbon.skypark,
        campaign_id: extractCampaignId(links.lisbon.skypark)
      })
    }

    // Porto
    if (links.porto?.airpark) {
      linksToInsert.push({
        agencia_id: agenciaId,
        cidade: 'porto',
        marca: 'airpark',
        link_url: links.porto.airpark,
        campaign_id: extractCampaignId(links.porto.airpark)
      })
    }
    if (links.porto?.redpark) {
      linksToInsert.push({
        agencia_id: agenciaId,
        cidade: 'porto',
        marca: 'redpark',
        link_url: links.porto.redpark,
        campaign_id: extractCampaignId(links.porto.redpark)
      })
    }
    if (links.porto?.skypark) {
      linksToInsert.push({
        agencia_id: agenciaId,
        cidade: 'porto',
        marca: 'skypark',
        link_url: links.porto.skypark,
        campaign_id: extractCampaignId(links.porto.skypark)
      })
    }

    // Faro
    if (links.faro?.airpark) {
      linksToInsert.push({
        agencia_id: agenciaId,
        cidade: 'faro',
        marca: 'airpark',
        link_url: links.faro.airpark,
        campaign_id: extractCampaignId(links.faro.airpark)
      })
    }
    if (links.faro?.redpark) {
      linksToInsert.push({
        agencia_id: agenciaId,
        cidade: 'faro',
        marca: 'redpark',
        link_url: links.faro.redpark,
        campaign_id: extractCampaignId(links.faro.redpark)
      })
    }
    if (links.faro?.skypark) {
      linksToInsert.push({
        agencia_id: agenciaId,
        cidade: 'faro',
        marca: 'skypark',
        link_url: links.faro.skypark,
        campaign_id: extractCampaignId(links.faro.skypark)
      })
    }

    // Inserir novos links
    if (linksToInsert.length > 0) {
      const { error } = await supabase
        .from('agencias_links')
        .insert(linksToInsert)

      if (error) {
        console.error('Erro ao inserir links:', error)
        return false
      }
    }

    return true
  } catch (error) {
    console.error('Erro ao configurar links:', error)
    return false
  }
}

export async function updateUserLinks(email: string, links: User['links']): Promise<boolean> {
  try {
    // Buscar ID da agência
    const { data: agencia } = await supabase
      .from('agencias')
      .select('id')
      .eq('email', email)
      .single()

    if (!agencia) {
      return false
    }

    return await setAgenciaLinks(agencia.id, links)
  } catch (error) {
    console.error('Erro ao atualizar links:', error)
    return false
  }
}

// ===== FUNÇÕES AUXILIARES =====

function convertLinksToUserFormat(links: AgenciaLink[]): User['links'] {
  const userLinks: User['links'] = {
    lisbon: { airpark: '', redpark: '', skypark: '' },
    porto: { airpark: '', redpark: '', skypark: '' },
    faro: { airpark: '', redpark: '', skypark: '' }
  }

  links.forEach(link => {
    const cidade = link.cidade === 'lisboa' ? 'lisbon' : link.cidade
    if (userLinks[cidade as keyof User['links']]) {
      userLinks[cidade as keyof User['links']]![link.marca] = link.link_url
    }
  })

  return userLinks
}

function extractCampaignId(url: string): string {
  try {
    const match = url.match(/campaignId=([^&]+)/)
    return match ? match[1] : ''
  } catch {
    return ''
  }
}

export async function forgotPassword(email: string): Promise<boolean> {
  try {
    const { data } = await supabase
      .from('agencias')
      .select('email')
      .eq('email', email)
      .single()

    return !!data
  } catch {
    return false
  }
}
