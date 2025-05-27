export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      acessos_conteudo: {
        Row: {
          concluido: boolean | null
          conteudo_id: number | null
          data_acesso: string | null
          id: number
          tempo_visualizacao: number | null
          usuario_id: string | null
        }
        Insert: {
          concluido?: boolean | null
          conteudo_id?: number | null
          data_acesso?: string | null
          id?: number
          tempo_visualizacao?: number | null
          usuario_id?: string | null
        }
        Update: {
          concluido?: boolean | null
          conteudo_id?: number | null
          data_acesso?: string | null
          id?: number
          tempo_visualizacao?: number | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "acessos_conteudo_conteudo_id_fkey"
            columns: ["conteudo_id"]
            isOneToOne: false
            referencedRelation: "conteudos_formacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acessos_conteudo_conteudo_id_fkey"
            columns: ["conteudo_id"]
            isOneToOne: false
            referencedRelation: "view_conteudos_formacao"
            referencedColumns: ["id"]
          },
        ]
      }
      auditoria_anexos_audio: {
        Row: {
          created_at: string | null
          duracao_segundos: number | null
          ficheiro_url: string
          id: string
          nome_ficheiro_original: string
          sessao_auditoria_id: string
          storage_bucket_path: string
          transcricao: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          duracao_segundos?: number | null
          ficheiro_url: string
          id?: string
          nome_ficheiro_original: string
          sessao_auditoria_id: string
          storage_bucket_path: string
          transcricao?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          duracao_segundos?: number | null
          ficheiro_url?: string
          id?: string
          nome_ficheiro_original?: string
          sessao_auditoria_id?: string
          storage_bucket_path?: string
          transcricao?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auditoria_anexos_audio_sessao_auditoria_id_fkey"
            columns: ["sessao_auditoria_id"]
            isOneToOne: false
            referencedRelation: "auditoria_sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      auditoria_dados_importados: {
        Row: {
          created_at: string | null
          dados_json: Json
          excel_alocation: string | null
          excel_matricula: string | null
          excel_tipo_movimento: string | null
          gps_precisao_metros: number | null
          id: string
          latitude: number | null
          longitude: number | null
          profile_id_condutor: string
          sessao_auditoria_id: string
          telefone_ativo: boolean | null
          telefone_bateria_percentagem: number | null
          telefone_ultimo_ping_app: string | null
          timestamp_registo_original: string | null
          tipo_dado: string
          velocidade_kmh: number | null
        }
        Insert: {
          created_at?: string | null
          dados_json: Json
          excel_alocation?: string | null
          excel_matricula?: string | null
          excel_tipo_movimento?: string | null
          gps_precisao_metros?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          profile_id_condutor: string
          sessao_auditoria_id: string
          telefone_ativo?: boolean | null
          telefone_bateria_percentagem?: number | null
          telefone_ultimo_ping_app?: string | null
          timestamp_registo_original?: string | null
          tipo_dado: string
          velocidade_kmh?: number | null
        }
        Update: {
          created_at?: string | null
          dados_json?: Json
          excel_alocation?: string | null
          excel_matricula?: string | null
          excel_tipo_movimento?: string | null
          gps_precisao_metros?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          profile_id_condutor?: string
          sessao_auditoria_id?: string
          telefone_ativo?: boolean | null
          telefone_bateria_percentagem?: number | null
          telefone_ultimo_ping_app?: string | null
          timestamp_registo_original?: string | null
          tipo_dado?: string
          velocidade_kmh?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "auditoria_dados_importados_profile_id_condutor_fkey"
            columns: ["profile_id_condutor"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "auditoria_dados_importados_sessao_auditoria_id_fkey"
            columns: ["sessao_auditoria_id"]
            isOneToOne: false
            referencedRelation: "auditoria_sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      auditoria_metricas_calculadas: {
        Row: {
          bateria_media_percentagem: number | null
          created_at: string | null
          detalhes_disparidades: Json | null
          id: string
          num_alertas_velocidade: number | null
          num_carros_movimentados: number | null
          num_disparidades_picagem: number | null
          num_entregas: number | null
          num_perdidos_achados: number | null
          num_pings_app: number | null
          num_reclamacoes: number | null
          num_recolhas: number | null
          sessao_auditoria_id: string
          updated_at: string | null
          veiculos_conduzidos: Json | null
          velocidade_maxima: number | null
          velocidade_media: number | null
        }
        Insert: {
          bateria_media_percentagem?: number | null
          created_at?: string | null
          detalhes_disparidades?: Json | null
          id?: string
          num_alertas_velocidade?: number | null
          num_carros_movimentados?: number | null
          num_disparidades_picagem?: number | null
          num_entregas?: number | null
          num_perdidos_achados?: number | null
          num_pings_app?: number | null
          num_reclamacoes?: number | null
          num_recolhas?: number | null
          sessao_auditoria_id: string
          updated_at?: string | null
          veiculos_conduzidos?: Json | null
          velocidade_maxima?: number | null
          velocidade_media?: number | null
        }
        Update: {
          bateria_media_percentagem?: number | null
          created_at?: string | null
          detalhes_disparidades?: Json | null
          id?: string
          num_alertas_velocidade?: number | null
          num_carros_movimentados?: number | null
          num_disparidades_picagem?: number | null
          num_entregas?: number | null
          num_perdidos_achados?: number | null
          num_pings_app?: number | null
          num_reclamacoes?: number | null
          num_recolhas?: number | null
          sessao_auditoria_id?: string
          updated_at?: string | null
          veiculos_conduzidos?: Json | null
          velocidade_maxima?: number | null
          velocidade_media?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "auditoria_metricas_calculadas_sessao_auditoria_id_fkey"
            columns: ["sessao_auditoria_id"]
            isOneToOne: false
            referencedRelation: "auditoria_sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      auditoria_sessoes: {
        Row: {
          conclusoes: string | null
          created_at: string | null
          id: string
          observacoes: string | null
          periodo_fim_analise: string
          periodo_inicio_analise: string
          profile_id_auditado: string
          resultados_json: Json | null
          status: string | null
          updated_at: string | null
          user_id_auditor: string
        }
        Insert: {
          conclusoes?: string | null
          created_at?: string | null
          id?: string
          observacoes?: string | null
          periodo_fim_analise: string
          periodo_inicio_analise: string
          profile_id_auditado: string
          resultados_json?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id_auditor: string
        }
        Update: {
          conclusoes?: string | null
          created_at?: string | null
          id?: string
          observacoes?: string | null
          periodo_fim_analise?: string
          periodo_inicio_analise?: string
          profile_id_auditado?: string
          resultados_json?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id_auditor?: string
        }
        Relationships: [
          {
            foreignKeyName: "auditoria_sessoes_profile_id_auditado_fkey"
            columns: ["profile_id_auditado"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      caixa_sessoes_diarias: {
        Row: {
          created_at_db: string | null
          data_hora_fecho: string | null
          data_sessao: string
          estado: string
          id_pk: string
          observacoes_fecho: string | null
          parque_id: string
          total_geral_apurado: number | null
          total_multibanco_apurado: number | null
          total_numerario_apurado: number | null
          total_outros_pagamentos_apurado: number | null
          updated_at_db: string | null
          user_id_abertura: string | null
          user_id_fecho: string | null
        }
        Insert: {
          created_at_db?: string | null
          data_hora_fecho?: string | null
          data_sessao: string
          estado?: string
          id_pk?: string
          observacoes_fecho?: string | null
          parque_id: string
          total_geral_apurado?: number | null
          total_multibanco_apurado?: number | null
          total_numerario_apurado?: number | null
          total_outros_pagamentos_apurado?: number | null
          updated_at_db?: string | null
          user_id_abertura?: string | null
          user_id_fecho?: string | null
        }
        Update: {
          created_at_db?: string | null
          data_hora_fecho?: string | null
          data_sessao?: string
          estado?: string
          id_pk?: string
          observacoes_fecho?: string | null
          parque_id?: string
          total_geral_apurado?: number | null
          total_multibanco_apurado?: number | null
          total_numerario_apurado?: number | null
          total_outros_pagamentos_apurado?: number | null
          updated_at_db?: string | null
          user_id_abertura?: string | null
          user_id_fecho?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "caixa_sessoes_diarias_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "caixa_sessoes_diarias_user_id_abertura_fkey"
            columns: ["user_id_abertura"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caixa_sessoes_diarias_user_id_fecho_fkey"
            columns: ["user_id_fecho"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      caixa_transacoes_validadas: {
        Row: {
          caixa_sessao_diaria_id: string | null
          created_at_db: string | null
          data_validacao: string | null
          diferenca_valor: number | null
          foi_corrigido: boolean | null
          id_pk: string
          justificativa_correcao: string | null
          metodo_pagamento_corrigido: string
          metodo_pagamento_original: string | null
          parque_id: string | null
          profile_id_condutor: string | null
          profile_id_validador: string | null
          reserva_id: string | null
          updated_at_db: string | null
          valor_corrigido_recebido: number
          valor_original_reserva: number | null
        }
        Insert: {
          caixa_sessao_diaria_id?: string | null
          created_at_db?: string | null
          data_validacao?: string | null
          diferenca_valor?: number | null
          foi_corrigido?: boolean | null
          id_pk?: string
          justificativa_correcao?: string | null
          metodo_pagamento_corrigido: string
          metodo_pagamento_original?: string | null
          parque_id?: string | null
          profile_id_condutor?: string | null
          profile_id_validador?: string | null
          reserva_id?: string | null
          updated_at_db?: string | null
          valor_corrigido_recebido: number
          valor_original_reserva?: number | null
        }
        Update: {
          caixa_sessao_diaria_id?: string | null
          created_at_db?: string | null
          data_validacao?: string | null
          diferenca_valor?: number | null
          foi_corrigido?: boolean | null
          id_pk?: string
          justificativa_correcao?: string | null
          metodo_pagamento_corrigido?: string
          metodo_pagamento_original?: string | null
          parque_id?: string | null
          profile_id_condutor?: string | null
          profile_id_validador?: string | null
          reserva_id?: string | null
          updated_at_db?: string | null
          valor_corrigido_recebido?: number
          valor_original_reserva?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "caixa_transacoes_validadas_caixa_sessao_diaria_id_fkey"
            columns: ["caixa_sessao_diaria_id"]
            isOneToOne: false
            referencedRelation: "caixa_sessoes_diarias"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "caixa_transacoes_validadas_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "caixa_transacoes_validadas_profile_id_condutor_fkey"
            columns: ["profile_id_condutor"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caixa_transacoes_validadas_profile_id_validador_fkey"
            columns: ["profile_id_validador"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caixa_transacoes_validadas_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "caixa_transacoes_validadas_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas_with_id"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "caixa_transacoes_validadas_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas_with_id"
            referencedColumns: ["id"]
          },
        ]
      }
      campanhas_marketing: {
        Row: {
          canais_divulgacao: string[] | null
          created_at_db: string | null
          data_fim: string | null
          data_inicio: string | null
          descricao: string | null
          estado_campanha: string | null
          id: string
          nome_campanha: string
          orcamento: number | null
          parque_id: string | null
          publico_alvo: string | null
          updated_at_db: string | null
          user_id_responsavel: string | null
        }
        Insert: {
          canais_divulgacao?: string[] | null
          created_at_db?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          descricao?: string | null
          estado_campanha?: string | null
          id?: string
          nome_campanha: string
          orcamento?: number | null
          parque_id?: string | null
          publico_alvo?: string | null
          updated_at_db?: string | null
          user_id_responsavel?: string | null
        }
        Update: {
          canais_divulgacao?: string[] | null
          created_at_db?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          descricao?: string | null
          estado_campanha?: string | null
          id?: string
          nome_campanha?: string
          orcamento?: number | null
          parque_id?: string | null
          publico_alvo?: string | null
          updated_at_db?: string | null
          user_id_responsavel?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campanhas_marketing_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "campanhas_marketing_user_id_responsavel_fkey"
            columns: ["user_id_responsavel"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias_formacao: {
        Row: {
          ativo: boolean | null
          data_atualizacao: string | null
          data_criacao: string | null
          descricao: string | null
          id: number
          nome: string
        }
        Insert: {
          ativo?: boolean | null
          data_atualizacao?: string | null
          data_criacao?: string | null
          descricao?: string | null
          id?: number
          nome: string
        }
        Update: {
          ativo?: boolean | null
          data_atualizacao?: string | null
          data_criacao?: string | null
          descricao?: string | null
          id?: number
          nome?: string
        }
        Relationships: []
      }
      comentarios_reclamacoes: {
        Row: {
          alocation_veiculo: string | null
          contacto_cliente: string | null
          created_at: string | null
          data_reclamacao: string | null
          data_resolucao: string | null
          descricao_reclamacao: string
          detalhes_resolucao: string | null
          estado_reclamacao: string | null
          id: string
          matricula_veiculo: string | null
          nome_cliente: string | null
          notas_acompanhamento: string | null
          ocorrencias_associadas_ids: string[] | null
          origem_reclamacao: string | null
          parque_id_ocorrencia: string | null
          reserva_id: string | null
          reserva_tinha_avaliacao_obrigatoria: boolean | null
          tipo_reclamacao: string | null
          updated_at: string | null
          user_id_registo: string | null
          user_id_resolucao: string | null
        }
        Insert: {
          alocation_veiculo?: string | null
          contacto_cliente?: string | null
          created_at?: string | null
          data_reclamacao?: string | null
          data_resolucao?: string | null
          descricao_reclamacao: string
          detalhes_resolucao?: string | null
          estado_reclamacao?: string | null
          id?: string
          matricula_veiculo?: string | null
          nome_cliente?: string | null
          notas_acompanhamento?: string | null
          ocorrencias_associadas_ids?: string[] | null
          origem_reclamacao?: string | null
          parque_id_ocorrencia?: string | null
          reserva_id?: string | null
          reserva_tinha_avaliacao_obrigatoria?: boolean | null
          tipo_reclamacao?: string | null
          updated_at?: string | null
          user_id_registo?: string | null
          user_id_resolucao?: string | null
        }
        Update: {
          alocation_veiculo?: string | null
          contacto_cliente?: string | null
          created_at?: string | null
          data_reclamacao?: string | null
          data_resolucao?: string | null
          descricao_reclamacao?: string
          detalhes_resolucao?: string | null
          estado_reclamacao?: string | null
          id?: string
          matricula_veiculo?: string | null
          nome_cliente?: string | null
          notas_acompanhamento?: string | null
          ocorrencias_associadas_ids?: string[] | null
          origem_reclamacao?: string | null
          parque_id_ocorrencia?: string | null
          reserva_id?: string | null
          reserva_tinha_avaliacao_obrigatoria?: boolean | null
          tipo_reclamacao?: string | null
          updated_at?: string | null
          user_id_registo?: string | null
          user_id_resolucao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comentarios_reclamacoes_parque_id_ocorrencia_fkey"
            columns: ["parque_id_ocorrencia"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "comentarios_reclamacoes_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "comentarios_reclamacoes_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas_with_id"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "comentarios_reclamacoes_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas_with_id"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comentarios_reclamacoes_user_id_registo_fkey"
            columns: ["user_id_registo"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comentarios_reclamacoes_user_id_resolucao_fkey"
            columns: ["user_id_resolucao"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comentarios_reclamacoes_anexos: {
        Row: {
          created_at: string | null
          id: string
          nome_ficheiro: string
          path_storage: string
          reclamacao_id: string
          tipo_anexo: string | null
          url_anexo: string
          user_id_upload: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nome_ficheiro: string
          path_storage: string
          reclamacao_id: string
          tipo_anexo?: string | null
          url_anexo: string
          user_id_upload?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nome_ficheiro?: string
          path_storage?: string
          reclamacao_id?: string
          tipo_anexo?: string | null
          url_anexo?: string
          user_id_upload?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comentarios_reclamacoes_anexos_reclamacao_id_fkey"
            columns: ["reclamacao_id"]
            isOneToOne: false
            referencedRelation: "comentarios_reclamacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comentarios_reclamacoes_anexos_user_id_upload_fkey"
            columns: ["user_id_upload"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comportamentos_dados_uploads: {
        Row: {
          caminho_storage: string
          created_at: string | null
          id: string
          metadados: Json | null
          mime_type: string | null
          nome_ficheiro: string
          processado: boolean | null
          profile_id_analisado: string
          relatorio_id: string | null
          tamanho_bytes: number | null
          tipo_upload: string
          updated_at: string | null
          user_id_upload: string
        }
        Insert: {
          caminho_storage: string
          created_at?: string | null
          id?: string
          metadados?: Json | null
          mime_type?: string | null
          nome_ficheiro: string
          processado?: boolean | null
          profile_id_analisado: string
          relatorio_id?: string | null
          tamanho_bytes?: number | null
          tipo_upload: string
          updated_at?: string | null
          user_id_upload: string
        }
        Update: {
          caminho_storage?: string
          created_at?: string | null
          id?: string
          metadados?: Json | null
          mime_type?: string | null
          nome_ficheiro?: string
          processado?: boolean | null
          profile_id_analisado?: string
          relatorio_id?: string | null
          tamanho_bytes?: number | null
          tipo_upload?: string
          updated_at?: string | null
          user_id_upload?: string
        }
        Relationships: [
          {
            foreignKeyName: "comportamentos_dados_uploads_profile_id_analisado_fkey"
            columns: ["profile_id_analisado"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comportamentos_dados_uploads_relatorio_id_fkey"
            columns: ["relatorio_id"]
            isOneToOne: false
            referencedRelation: "comportamentos_relatorios_gerados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comportamentos_dados_uploads_user_id_upload_fkey"
            columns: ["user_id_upload"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comportamentos_metricas_diarias: {
        Row: {
          alertas_velocidade: number | null
          created_at: string | null
          data_registo: string
          id: string
          minutos_trabalhados: number | null
          num_despesas_registadas: number | null
          num_disparidades_picagem: number | null
          num_entregas_efetuadas: number | null
          num_faturas_nao_emitidas: number | null
          num_reclamacoes_nao_respondidas: number | null
          num_recolhas_efetuadas: number | null
          num_reservas_criadas: number | null
          num_tarefas_atrasadas: number | null
          num_tarefas_atribuidas: number | null
          profile_id: string
          updated_at: string | null
          valor_total_despesas: number | null
        }
        Insert: {
          alertas_velocidade?: number | null
          created_at?: string | null
          data_registo: string
          id?: string
          minutos_trabalhados?: number | null
          num_despesas_registadas?: number | null
          num_disparidades_picagem?: number | null
          num_entregas_efetuadas?: number | null
          num_faturas_nao_emitidas?: number | null
          num_reclamacoes_nao_respondidas?: number | null
          num_recolhas_efetuadas?: number | null
          num_reservas_criadas?: number | null
          num_tarefas_atrasadas?: number | null
          num_tarefas_atribuidas?: number | null
          profile_id: string
          updated_at?: string | null
          valor_total_despesas?: number | null
        }
        Update: {
          alertas_velocidade?: number | null
          created_at?: string | null
          data_registo?: string
          id?: string
          minutos_trabalhados?: number | null
          num_despesas_registadas?: number | null
          num_disparidades_picagem?: number | null
          num_entregas_efetuadas?: number | null
          num_faturas_nao_emitidas?: number | null
          num_reclamacoes_nao_respondidas?: number | null
          num_recolhas_efetuadas?: number | null
          num_reservas_criadas?: number | null
          num_tarefas_atrasadas?: number | null
          num_tarefas_atribuidas?: number | null
          profile_id?: string
          updated_at?: string | null
          valor_total_despesas?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comportamentos_metricas_diarias_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comportamentos_relatorios_gerados: {
        Row: {
          created_at: string | null
          data_geracao: string | null
          filtros_uploads_usados: Json | null
          id: string
          metricas_apuradas: Json
          observacoes_gerais: string | null
          periodo_fim_analise: string
          periodo_inicio_analise: string
          profile_id_analisado: string
          updated_at: string | null
          user_id_gerador: string
        }
        Insert: {
          created_at?: string | null
          data_geracao?: string | null
          filtros_uploads_usados?: Json | null
          id?: string
          metricas_apuradas: Json
          observacoes_gerais?: string | null
          periodo_fim_analise: string
          periodo_inicio_analise: string
          profile_id_analisado: string
          updated_at?: string | null
          user_id_gerador: string
        }
        Update: {
          created_at?: string | null
          data_geracao?: string | null
          filtros_uploads_usados?: Json | null
          id?: string
          metricas_apuradas?: Json
          observacoes_gerais?: string | null
          periodo_fim_analise?: string
          periodo_inicio_analise?: string
          profile_id_analisado?: string
          updated_at?: string | null
          user_id_gerador?: string
        }
        Relationships: [
          {
            foreignKeyName: "comportamentos_relatorios_gerados_profile_id_analisado_fkey"
            columns: ["profile_id_analisado"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comportamentos_relatorios_gerados_user_id_gerador_fkey"
            columns: ["user_id_gerador"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conteudos_formacao: {
        Row: {
          ativo: boolean | null
          categoria_id: number | null
          criado_por: string | null
          data_atualizacao: string | null
          data_criacao: string | null
          descricao: string | null
          id: number
          tipo_conteudo: string | null
          titulo: string
          url_conteudo: string | null
        }
        Insert: {
          ativo?: boolean | null
          categoria_id?: number | null
          criado_por?: string | null
          data_atualizacao?: string | null
          data_criacao?: string | null
          descricao?: string | null
          id?: number
          tipo_conteudo?: string | null
          titulo: string
          url_conteudo?: string | null
        }
        Update: {
          ativo?: boolean | null
          categoria_id?: number | null
          criado_por?: string | null
          data_atualizacao?: string | null
          data_criacao?: string | null
          descricao?: string | null
          id?: number
          tipo_conteudo?: string | null
          titulo?: string
          url_conteudo?: string | null
        }
        Relationships: []
      }
      dados_gps_condutor: {
        Row: {
          a_carregar_bateria: boolean | null
          created_at_db: string | null
          dados_json_original: Json | null
          id_pk: number
          latitude: number | null
          longitude: number | null
          nivel_bateria_percentagem: number | null
          precisao_gps_metros: number | null
          profile_id_condutor: string | null
          rtt_ms: number | null
          sessao_auditoria_id: string | null
          timestamp_registo: string
          velocidade_kmh: number | null
        }
        Insert: {
          a_carregar_bateria?: boolean | null
          created_at_db?: string | null
          dados_json_original?: Json | null
          id_pk?: number
          latitude?: number | null
          longitude?: number | null
          nivel_bateria_percentagem?: number | null
          precisao_gps_metros?: number | null
          profile_id_condutor?: string | null
          rtt_ms?: number | null
          sessao_auditoria_id?: string | null
          timestamp_registo: string
          velocidade_kmh?: number | null
        }
        Update: {
          a_carregar_bateria?: boolean | null
          created_at_db?: string | null
          dados_json_original?: Json | null
          id_pk?: number
          latitude?: number | null
          longitude?: number | null
          nivel_bateria_percentagem?: number | null
          precisao_gps_metros?: number | null
          profile_id_condutor?: string | null
          rtt_ms?: number | null
          sessao_auditoria_id?: string | null
          timestamp_registo?: string
          velocidade_kmh?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dados_gps_condutor_profile_id_condutor_fkey"
            columns: ["profile_id_condutor"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      despesas: {
        Row: {
          comprovativo_bucket_path: string | null
          comprovativo_url: string | null
          created_at_db: string | null
          data_despesa: string
          descricao_motivo: string | null
          id: string
          parque_id: string | null
          projeto_id: string | null
          tipo_despesa: string
          updated_at_db: string | null
          user_id_registo: string
          valor: number
        }
        Insert: {
          comprovativo_bucket_path?: string | null
          comprovativo_url?: string | null
          created_at_db?: string | null
          data_despesa?: string
          descricao_motivo?: string | null
          id?: string
          parque_id?: string | null
          projeto_id?: string | null
          tipo_despesa: string
          updated_at_db?: string | null
          user_id_registo: string
          valor: number
        }
        Update: {
          comprovativo_bucket_path?: string | null
          comprovativo_url?: string | null
          created_at_db?: string | null
          data_despesa?: string
          descricao_motivo?: string | null
          id?: string
          parque_id?: string | null
          projeto_id?: string | null
          tipo_despesa?: string
          updated_at_db?: string | null
          user_id_registo?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "despesas_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "despesas_projeto_id_fkey"
            columns: ["projeto_id"]
            isOneToOne: false
            referencedRelation: "projetos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "despesas_user_id_registo_fkey"
            columns: ["user_id_registo"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos_colaborador: {
        Row: {
          bucket_path: string
          created_at_db: string | null
          data_upload: string
          data_validade_documento: string | null
          ficheiro_url: string | null
          id: string
          nome_ficheiro_original: string | null
          observacoes: string | null
          profile_id: string
          tipo_documento: string
          updated_at_db: string | null
        }
        Insert: {
          bucket_path: string
          created_at_db?: string | null
          data_upload?: string
          data_validade_documento?: string | null
          ficheiro_url?: string | null
          id?: string
          nome_ficheiro_original?: string | null
          observacoes?: string | null
          profile_id: string
          tipo_documento: string
          updated_at_db?: string | null
        }
        Update: {
          bucket_path?: string
          created_at_db?: string | null
          data_upload?: string
          data_validade_documento?: string | null
          ficheiro_url?: string | null
          id?: string
          nome_ficheiro_original?: string | null
          observacoes?: string | null
          profile_id?: string
          tipo_documento?: string
          updated_at_db?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documentos_colaborador_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      formacao_categorias: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          created_by: string | null
          descricao: string | null
          id: string
          nome: string
          ordem_exibicao: number | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          created_by?: string | null
          descricao?: string | null
          id?: string
          nome: string
          ordem_exibicao?: number | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          created_by?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          ordem_exibicao?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      formacao_conteudos: {
        Row: {
          ativo: boolean | null
          categoria_id: string | null
          conteudo_faq: string | null
          created_at: string | null
          created_by: string | null
          descricao_curta: string | null
          ficheiro_nome_original: string | null
          ficheiro_storage_path: string | null
          ficheiro_url: string | null
          id: string
          palavras_chave: string[] | null
          tipo_conteudo: string
          titulo: string
          updated_at: string | null
          updated_by: string | null
          video_link_externo: string | null
        }
        Insert: {
          ativo?: boolean | null
          categoria_id?: string | null
          conteudo_faq?: string | null
          created_at?: string | null
          created_by?: string | null
          descricao_curta?: string | null
          ficheiro_nome_original?: string | null
          ficheiro_storage_path?: string | null
          ficheiro_url?: string | null
          id?: string
          palavras_chave?: string[] | null
          tipo_conteudo: string
          titulo: string
          updated_at?: string | null
          updated_by?: string | null
          video_link_externo?: string | null
        }
        Update: {
          ativo?: boolean | null
          categoria_id?: string | null
          conteudo_faq?: string | null
          created_at?: string | null
          created_by?: string | null
          descricao_curta?: string | null
          ficheiro_nome_original?: string | null
          ficheiro_storage_path?: string | null
          ficheiro_url?: string | null
          id?: string
          palavras_chave?: string[] | null
          tipo_conteudo?: string
          titulo?: string
          updated_at?: string | null
          updated_by?: string | null
          video_link_externo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formacao_conteudos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "formacao_categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      formacao_estatisticas_acesso: {
        Row: {
          conteudo_id: string
          data_acesso: string | null
          id: string
          ip_address: string | null
          tipo_acesso: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          conteudo_id: string
          data_acesso?: string | null
          id?: string
          ip_address?: string | null
          tipo_acesso: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          conteudo_id?: string
          data_acesso?: string | null
          id?: string
          ip_address?: string | null
          tipo_acesso?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formacao_estatisticas_acesso_conteudo_id_fkey"
            columns: ["conteudo_id"]
            isOneToOne: false
            referencedRelation: "formacao_conteudos"
            referencedColumns: ["id"]
          },
        ]
      }
      leads_marketing: {
        Row: {
          campanha_id: string | null
          created_at_db: string | null
          data_criacao_lead: string | null
          data_ultimo_contacto: string | null
          email_lead: string | null
          empresa_lead: string | null
          estado_lead: string | null
          id: string
          nome_lead: string | null
          notas_acompanhamento: string | null
          origem_lead: string | null
          pontuacao_lead: number | null
          telefone_lead: string | null
          updated_at_db: string | null
          user_id_responsavel_acompanhamento: string | null
        }
        Insert: {
          campanha_id?: string | null
          created_at_db?: string | null
          data_criacao_lead?: string | null
          data_ultimo_contacto?: string | null
          email_lead?: string | null
          empresa_lead?: string | null
          estado_lead?: string | null
          id?: string
          nome_lead?: string | null
          notas_acompanhamento?: string | null
          origem_lead?: string | null
          pontuacao_lead?: number | null
          telefone_lead?: string | null
          updated_at_db?: string | null
          user_id_responsavel_acompanhamento?: string | null
        }
        Update: {
          campanha_id?: string | null
          created_at_db?: string | null
          data_criacao_lead?: string | null
          data_ultimo_contacto?: string | null
          email_lead?: string | null
          empresa_lead?: string | null
          estado_lead?: string | null
          id?: string
          nome_lead?: string | null
          notas_acompanhamento?: string | null
          origem_lead?: string | null
          pontuacao_lead?: number | null
          telefone_lead?: string | null
          updated_at_db?: string | null
          user_id_responsavel_acompanhamento?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_marketing_campanha_id_fkey"
            columns: ["campanha_id"]
            isOneToOne: false
            referencedRelation: "campanhas_marketing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_marketing_user_id_responsavel_acompanhamento_fkey"
            columns: ["user_id_responsavel_acompanhamento"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      movimentacoes_veiculos: {
        Row: {
          alocation_veiculo: string | null
          created_at_db: string | null
          dados_ficheiro_original: Json | null
          data_hora_movimento: string | null
          id_pk: string
          localizacao_destino: string | null
          localizacao_origem: string | null
          matricula_veiculo: string
          observacoes: string | null
          parque_id: string | null
          profile_id_condutor: string | null
          reserva_id: string | null
          tipo_movimento: string
          updated_at_db: string | null
        }
        Insert: {
          alocation_veiculo?: string | null
          created_at_db?: string | null
          dados_ficheiro_original?: Json | null
          data_hora_movimento?: string | null
          id_pk?: string
          localizacao_destino?: string | null
          localizacao_origem?: string | null
          matricula_veiculo: string
          observacoes?: string | null
          parque_id?: string | null
          profile_id_condutor?: string | null
          reserva_id?: string | null
          tipo_movimento: string
          updated_at_db?: string | null
        }
        Update: {
          alocation_veiculo?: string | null
          created_at_db?: string | null
          dados_ficheiro_original?: Json | null
          data_hora_movimento?: string | null
          id_pk?: string
          localizacao_destino?: string | null
          localizacao_origem?: string | null
          matricula_veiculo?: string
          observacoes?: string | null
          parque_id?: string | null
          profile_id_condutor?: string | null
          reserva_id?: string | null
          tipo_movimento?: string
          updated_at_db?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movimentacoes_veiculos_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "movimentacoes_veiculos_profile_id_condutor_fkey"
            columns: ["profile_id_condutor"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_veiculos_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "movimentacoes_veiculos_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas_with_id"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "movimentacoes_veiculos_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas_with_id"
            referencedColumns: ["id"]
          },
        ]
      }
      ocorrencias_sistema: {
        Row: {
          anexos_url: Json | null
          created_at_db: string | null
          data_ocorrencia: string | null
          descricao: string
          estado_resolucao: string | null
          id_pk: string
          parque_id: string | null
          profile_id_envolvido: string | null
          profile_id_reportou: string | null
          reserva_id: string | null
          tipo_ocorrencia: string | null
          updated_at_db: string | null
        }
        Insert: {
          anexos_url?: Json | null
          created_at_db?: string | null
          data_ocorrencia?: string | null
          descricao: string
          estado_resolucao?: string | null
          id_pk?: string
          parque_id?: string | null
          profile_id_envolvido?: string | null
          profile_id_reportou?: string | null
          reserva_id?: string | null
          tipo_ocorrencia?: string | null
          updated_at_db?: string | null
        }
        Update: {
          anexos_url?: Json | null
          created_at_db?: string | null
          data_ocorrencia?: string | null
          descricao?: string
          estado_resolucao?: string | null
          id_pk?: string
          parque_id?: string | null
          profile_id_envolvido?: string | null
          profile_id_reportou?: string | null
          reserva_id?: string | null
          tipo_ocorrencia?: string | null
          updated_at_db?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ocorrencias_sistema_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "ocorrencias_sistema_profile_id_envolvido_fkey"
            columns: ["profile_id_envolvido"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ocorrencias_sistema_profile_id_reportou_fkey"
            columns: ["profile_id_reportou"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ocorrencias_sistema_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "ocorrencias_sistema_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas_with_id"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "ocorrencias_sistema_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas_with_id"
            referencedColumns: ["id"]
          },
        ]
      }
      ocupacao_diaria_parques: {
        Row: {
          data_ocupacao: string
          id: string
          ocupados_cobertos: number | null
          ocupados_descobertos: number | null
          ocupados_indoor: number | null
          parque_id: string
          percentual_ocupacao_cobertos: number | null
          percentual_ocupacao_descobertos: number | null
          percentual_ocupacao_indoor: number | null
          total_cobertos: number | null
          total_descobertos: number | null
          total_indoor: number | null
          ultima_atualizacao: string | null
        }
        Insert: {
          data_ocupacao: string
          id?: string
          ocupados_cobertos?: number | null
          ocupados_descobertos?: number | null
          ocupados_indoor?: number | null
          parque_id: string
          percentual_ocupacao_cobertos?: number | null
          percentual_ocupacao_descobertos?: number | null
          percentual_ocupacao_indoor?: number | null
          total_cobertos?: number | null
          total_descobertos?: number | null
          total_indoor?: number | null
          ultima_atualizacao?: string | null
        }
        Update: {
          data_ocupacao?: string
          id?: string
          ocupados_cobertos?: number | null
          ocupados_descobertos?: number | null
          ocupados_indoor?: number | null
          parque_id?: string
          percentual_ocupacao_cobertos?: number | null
          percentual_ocupacao_descobertos?: number | null
          percentual_ocupacao_indoor?: number | null
          total_cobertos?: number | null
          total_descobertos?: number | null
          total_indoor?: number | null
          ultima_atualizacao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ocupacao_diaria_parques_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
        ]
      }
      odoo_confirmacoes_importadas: {
        Row: {
          date_checkin: string | null
          date_checkout: string | null
          date_end: string | null
          id_pk: number
          imma: string | null
          imported_at: string | null
          parque_id: string | null
          partner_id: string | null
          price: number | null
          price_to_pay: number | null
          source_filename: string | null
          state: string | null
        }
        Insert: {
          date_checkin?: string | null
          date_checkout?: string | null
          date_end?: string | null
          id_pk?: number
          imma?: string | null
          imported_at?: string | null
          parque_id?: string | null
          partner_id?: string | null
          price?: number | null
          price_to_pay?: number | null
          source_filename?: string | null
          state?: string | null
        }
        Update: {
          date_checkin?: string | null
          date_checkout?: string | null
          date_end?: string | null
          id_pk?: number
          imma?: string | null
          imported_at?: string | null
          parque_id?: string | null
          partner_id?: string | null
          price?: number | null
          price_to_pay?: number | null
          source_filename?: string | null
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "odoo_confirmacoes_importadas_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
        ]
      }
      odoo_transacoes_importadas: {
        Row: {
          date_checkin: string | null
          date_end: string | null
          date_start: string | null
          id_pk: number
          imma: string | null
          imported_at: string | null
          parking_name: string | null
          parque_id: string | null
          price: number | null
          price_to_pay: number | null
          source_filename: string | null
        }
        Insert: {
          date_checkin?: string | null
          date_end?: string | null
          date_start?: string | null
          id_pk?: number
          imma?: string | null
          imported_at?: string | null
          parking_name?: string | null
          parque_id?: string | null
          price?: number | null
          price_to_pay?: number | null
          source_filename?: string | null
        }
        Update: {
          date_checkin?: string | null
          date_end?: string | null
          date_start?: string | null
          id_pk?: number
          imma?: string | null
          imported_at?: string | null
          parking_name?: string | null
          parque_id?: string | null
          price?: number | null
          price_to_pay?: number | null
          source_filename?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "odoo_transacoes_importadas_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
        ]
      }
      parques: {
        Row: {
          ativo: boolean | null
          capacidade_coberto: number | null
          capacidade_descoberto: number | null
          capacidade_indoor: number | null
          capacidade_total: number | null
          cidade: string | null
          codigo_parque: string | null
          codigo_postal: string | null
          created_at_db: string | null
          id_pk: string
          marca_parque: string | null
          morada: string | null
          nome_parque: string
          updated_at_db: string | null
        }
        Insert: {
          ativo?: boolean | null
          capacidade_coberto?: number | null
          capacidade_descoberto?: number | null
          capacidade_indoor?: number | null
          capacidade_total?: number | null
          cidade?: string | null
          codigo_parque?: string | null
          codigo_postal?: string | null
          created_at_db?: string | null
          id_pk?: string
          marca_parque?: string | null
          morada?: string | null
          nome_parque: string
          updated_at_db?: string | null
        }
        Update: {
          ativo?: boolean | null
          capacidade_coberto?: number | null
          capacidade_descoberto?: number | null
          capacidade_indoor?: number | null
          capacidade_total?: number | null
          cidade?: string | null
          codigo_parque?: string | null
          codigo_postal?: string | null
          created_at_db?: string | null
          id_pk?: string
          marca_parque?: string | null
          morada?: string | null
          nome_parque?: string
          updated_at_db?: string | null
        }
        Relationships: []
      }
      perdidos_achados_anexos: {
        Row: {
          caso_id: string
          created_at: string | null
          id: string
          nome_ficheiro: string
          path_storage: string
          tipo_anexo: string | null
          url_anexo: string
          user_id_upload: string | null
        }
        Insert: {
          caso_id: string
          created_at?: string | null
          id?: string
          nome_ficheiro: string
          path_storage: string
          tipo_anexo?: string | null
          url_anexo: string
          user_id_upload?: string | null
        }
        Update: {
          caso_id?: string
          created_at?: string | null
          id?: string
          nome_ficheiro?: string
          path_storage?: string
          tipo_anexo?: string | null
          url_anexo?: string
          user_id_upload?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "perdidos_achados_anexos_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "perdidos_achados_casos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perdidos_achados_anexos_user_id_upload_fkey"
            columns: ["user_id_upload"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      perdidos_achados_casos: {
        Row: {
          alocation_veiculo: string | null
          contacto_cliente: string | null
          created_at: string | null
          data_devolucao_entrega: string | null
          data_queixa: string | null
          descricao_queixa: string
          detalhes_item_perdido: string
          detalhes_resolucao: string | null
          estado_caso: string | null
          id: string
          local_exato_ocorrencia: string | null
          matricula_veiculo: string | null
          nome_cliente: string | null
          notas_investigacao: string | null
          origem_queixa: string | null
          parque_id_ocorrencia: string | null
          reserva_id_associada: string | null
          updated_at: string | null
          user_id_devolucao_entrega: string | null
          user_id_registo: string | null
        }
        Insert: {
          alocation_veiculo?: string | null
          contacto_cliente?: string | null
          created_at?: string | null
          data_devolucao_entrega?: string | null
          data_queixa?: string | null
          descricao_queixa: string
          detalhes_item_perdido: string
          detalhes_resolucao?: string | null
          estado_caso?: string | null
          id?: string
          local_exato_ocorrencia?: string | null
          matricula_veiculo?: string | null
          nome_cliente?: string | null
          notas_investigacao?: string | null
          origem_queixa?: string | null
          parque_id_ocorrencia?: string | null
          reserva_id_associada?: string | null
          updated_at?: string | null
          user_id_devolucao_entrega?: string | null
          user_id_registo?: string | null
        }
        Update: {
          alocation_veiculo?: string | null
          contacto_cliente?: string | null
          created_at?: string | null
          data_devolucao_entrega?: string | null
          data_queixa?: string | null
          descricao_queixa?: string
          detalhes_item_perdido?: string
          detalhes_resolucao?: string | null
          estado_caso?: string | null
          id?: string
          local_exato_ocorrencia?: string | null
          matricula_veiculo?: string | null
          nome_cliente?: string | null
          notas_investigacao?: string | null
          origem_queixa?: string | null
          parque_id_ocorrencia?: string | null
          reserva_id_associada?: string | null
          updated_at?: string | null
          user_id_devolucao_entrega?: string | null
          user_id_registo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "perdidos_achados_casos_parque_id_ocorrencia_fkey"
            columns: ["parque_id_ocorrencia"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "perdidos_achados_casos_reserva_id_associada_fkey"
            columns: ["reserva_id_associada"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "perdidos_achados_casos_reserva_id_associada_fkey"
            columns: ["reserva_id_associada"]
            isOneToOne: false
            referencedRelation: "reservas_with_id"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "perdidos_achados_casos_reserva_id_associada_fkey"
            columns: ["reserva_id_associada"]
            isOneToOne: false
            referencedRelation: "reservas_with_id"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perdidos_achados_casos_user_id_devolucao_entrega_fkey"
            columns: ["user_id_devolucao_entrega"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perdidos_achados_casos_user_id_registo_fkey"
            columns: ["user_id_registo"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      produtividade_auditorias_condutores: {
        Row: {
          auditor_id: string | null
          condutor_id: string
          created_at: string | null
          data_auditoria: string
          detalhes: Json | null
          id: string
          resultado: string
          resumo: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          auditor_id?: string | null
          condutor_id: string
          created_at?: string | null
          data_auditoria?: string
          detalhes?: Json | null
          id?: string
          resultado: string
          resumo: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          auditor_id?: string | null
          condutor_id?: string
          created_at?: string | null
          data_auditoria?: string
          detalhes?: Json | null
          id?: string
          resultado?: string
          resumo?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produtividade_auditorias_condutores_auditor_id_fkey"
            columns: ["auditor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produtividade_auditorias_condutores_condutor_id_fkey"
            columns: ["condutor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      produtividade_condutores_diaria: {
        Row: {
          condutor_id: string
          created_at: string | null
          data_registo: string
          id: string
          minutos_trabalhados: number | null
          notas: string | null
          num_entregas: number | null
          num_movimentacoes_extras: number | null
          num_recolhas: number | null
          parque_id: string | null
          updated_at: string | null
        }
        Insert: {
          condutor_id: string
          created_at?: string | null
          data_registo: string
          id?: string
          minutos_trabalhados?: number | null
          notas?: string | null
          num_entregas?: number | null
          num_movimentacoes_extras?: number | null
          num_recolhas?: number | null
          parque_id?: string | null
          updated_at?: string | null
        }
        Update: {
          condutor_id?: string
          created_at?: string | null
          data_registo?: string
          id?: string
          minutos_trabalhados?: number | null
          notas?: string | null
          num_entregas?: number | null
          num_movimentacoes_extras?: number | null
          num_recolhas?: number | null
          parque_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produtividade_condutores_diaria_condutor_id_fkey"
            columns: ["condutor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produtividade_condutores_diaria_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
        ]
      }
      produtividade_dados_uploads: {
        Row: {
          created_at: string | null
          dados_json: Json
          id: string
          periodo_analisado_fim: string
          periodo_analisado_inicio: string
          processado: boolean | null
          profile_id_condutor: string
          timestamp_registo_original: string | null
          tipo_dado: string
          updated_at: string | null
          user_id_upload: string | null
        }
        Insert: {
          created_at?: string | null
          dados_json: Json
          id?: string
          periodo_analisado_fim: string
          periodo_analisado_inicio: string
          processado?: boolean | null
          profile_id_condutor: string
          timestamp_registo_original?: string | null
          tipo_dado: string
          updated_at?: string | null
          user_id_upload?: string | null
        }
        Update: {
          created_at?: string | null
          dados_json?: Json
          id?: string
          periodo_analisado_fim?: string
          periodo_analisado_inicio?: string
          processado?: boolean | null
          profile_id_condutor?: string
          timestamp_registo_original?: string | null
          tipo_dado?: string
          updated_at?: string | null
          user_id_upload?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produtividade_dados_uploads_profile_id_condutor_fkey"
            columns: ["profile_id_condutor"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produtividade_dados_uploads_user_id_upload_fkey"
            columns: ["user_id_upload"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ativo: boolean | null
          auth_user_id: string | null
          blocked_by_rh_profile_id: string | null
          cidades_associadas: string[] | null
          contacto_telefonico_rh: string | null
          created_at_db: string | null
          data_admissao_rh: string | null
          data_nascimento_rh: string | null
          data_saida_empresa: string | null
          departamento_rh: string | null
          doc_identificacao_numero: string | null
          doc_identificacao_tipo: string | null
          email: string | null
          foto_url: string | null
          full_name: string | null
          horario_trabalho_default_json: Json | null
          iban: string | null
          id: string
          morada_rh: string | null
          nif_rh: string | null
          nivel_extra: number | null
          ordenado_bruto_base: number | null
          parque_associado_id: string | null
          parque_id_principal: string | null
          parques_associados_ids: string[] | null
          pontos_rh: number | null
          posicao_rh: string | null
          role: string
          supervisor_direto_id: string | null
          tipo_colaborador: string | null
          updated_at_db: string | null
          valor_hora_extra_definido: number | null
        }
        Insert: {
          ativo?: boolean | null
          auth_user_id?: string | null
          blocked_by_rh_profile_id?: string | null
          cidades_associadas?: string[] | null
          contacto_telefonico_rh?: string | null
          created_at_db?: string | null
          data_admissao_rh?: string | null
          data_nascimento_rh?: string | null
          data_saida_empresa?: string | null
          departamento_rh?: string | null
          doc_identificacao_numero?: string | null
          doc_identificacao_tipo?: string | null
          email?: string | null
          foto_url?: string | null
          full_name?: string | null
          horario_trabalho_default_json?: Json | null
          iban?: string | null
          id: string
          morada_rh?: string | null
          nif_rh?: string | null
          nivel_extra?: number | null
          ordenado_bruto_base?: number | null
          parque_associado_id?: string | null
          parque_id_principal?: string | null
          parques_associados_ids?: string[] | null
          pontos_rh?: number | null
          posicao_rh?: string | null
          role?: string
          supervisor_direto_id?: string | null
          tipo_colaborador?: string | null
          updated_at_db?: string | null
          valor_hora_extra_definido?: number | null
        }
        Update: {
          ativo?: boolean | null
          auth_user_id?: string | null
          blocked_by_rh_profile_id?: string | null
          cidades_associadas?: string[] | null
          contacto_telefonico_rh?: string | null
          created_at_db?: string | null
          data_admissao_rh?: string | null
          data_nascimento_rh?: string | null
          data_saida_empresa?: string | null
          departamento_rh?: string | null
          doc_identificacao_numero?: string | null
          doc_identificacao_tipo?: string | null
          email?: string | null
          foto_url?: string | null
          full_name?: string | null
          horario_trabalho_default_json?: Json | null
          iban?: string | null
          id?: string
          morada_rh?: string | null
          nif_rh?: string | null
          nivel_extra?: number | null
          ordenado_bruto_base?: number | null
          parque_associado_id?: string | null
          parque_id_principal?: string | null
          parques_associados_ids?: string[] | null
          pontos_rh?: number | null
          posicao_rh?: string | null
          role?: string
          supervisor_direto_id?: string | null
          tipo_colaborador?: string | null
          updated_at_db?: string | null
          valor_hora_extra_definido?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_blocked_by_rh_profile_id_fkey"
            columns: ["blocked_by_rh_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_parque_id_principal_fkey"
            columns: ["parque_id_principal"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "profiles_supervisor_direto_id_fkey"
            columns: ["supervisor_direto_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      projeto_membros: {
        Row: {
          id: string
          projeto_id: string
          role_no_projeto: string | null
          user_id_membro: string
        }
        Insert: {
          id?: string
          projeto_id: string
          role_no_projeto?: string | null
          user_id_membro: string
        }
        Update: {
          id?: string
          projeto_id?: string
          role_no_projeto?: string | null
          user_id_membro?: string
        }
        Relationships: [
          {
            foreignKeyName: "projeto_membros_projeto_id_fkey"
            columns: ["projeto_id"]
            isOneToOne: false
            referencedRelation: "projetos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projeto_membros_user_id_membro_fkey"
            columns: ["user_id_membro"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      projetos: {
        Row: {
          created_at: string
          data_inicio: string | null
          data_prazo: string | null
          descricao: string | null
          estado_projeto: string | null
          id: string
          nome_projeto: string
          orcamento_previsto: number | null
          parque_id: string | null
          tipo_projeto: string | null
          updated_at: string
          user_id_criador: string | null
          user_id_responsavel_principal: string | null
        }
        Insert: {
          created_at?: string
          data_inicio?: string | null
          data_prazo?: string | null
          descricao?: string | null
          estado_projeto?: string | null
          id?: string
          nome_projeto: string
          orcamento_previsto?: number | null
          parque_id?: string | null
          tipo_projeto?: string | null
          updated_at?: string
          user_id_criador?: string | null
          user_id_responsavel_principal?: string | null
        }
        Update: {
          created_at?: string
          data_inicio?: string | null
          data_prazo?: string | null
          descricao?: string | null
          estado_projeto?: string | null
          id?: string
          nome_projeto?: string
          orcamento_previsto?: number | null
          parque_id?: string | null
          tipo_projeto?: string | null
          updated_at?: string
          user_id_criador?: string | null
          user_id_responsavel_principal?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projetos_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "projetos_user_id_criador_fkey"
            columns: ["user_id_criador"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projetos_user_id_responsavel_principal_fkey"
            columns: ["user_id_responsavel_principal"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reservas: {
        Row: {
          action_date: string | null
          alocation: string
          booking_date: string | null
          booking_id: string | null
          booking_price: number | null
          campaign_id_aplicada: string | null
          campaign_pay: number | null
          campanha_fatura: string | null
          cancel_type: string | null
          car_info_brand: string | null
          car_info_color: string | null
          car_info_model: string | null
          check_in_previsto: string | null
          check_in_real: string | null
          check_out_previsto: string | null
          check_out_real: string | null
          checkin_video_url: string | null
          checkout_video_url: string | null
          cidade_cliente: string | null
          cliente_quer_fatura: boolean | null
          condutor_entrega_id: string | null
          condutor_movimentacao_id: string | null
          condutor_recolha_id: string | null
          corrected_price: number | null
          created_at_db: string | null
          danos_checkin: string | null
          danos_checkout: string | null
          data_cancelamento_registo: string | null
          data_emissao_fatura: string | null
          delivery_price: number | null
          email_cliente: string | null
          estado_reserva_atual: string | null
          extras_price: number | null
          fotos_checkin_urls: Json | null
          fotos_checkout_urls: Json | null
          has_online_payment: boolean | null
          id_cliente_externo: string | null
          id_pk: string
          kms_entrada: number | null
          kms_saida: number | null
          lang_cliente: string | null
          lastname_cliente: string | null
          license_plate: string
          morada_fatura: string | null
          motivo_cancelamento_texto: string | null
          name_cliente: string | null
          nif_cliente: string | null
          nif_fatura: string | null
          nome_fatura: string | null
          nome_fiscal_cliente: string | null
          numero_fatura: string | null
          observacoes_entrega: string | null
          observacoes_recolha: string | null
          parking_price: number | null
          parking_type: string | null
          parque_id: string | null
          payment_intent_id: string | null
          payment_method: string | null
          phone_number_cliente: string | null
          price_on_delivery: number | null
          remarks_cliente: string | null
          return_flight: string | null
          row_code: string | null
          source_file_imported: string | null
          spot_code: string | null
          status_fatura: string | null
          total_price: number | null
          transaction_id_pagamento: string | null
          updated_at_db: string | null
          user_id_cancelamento: string | null
          user_id_criacao_registo: string | null
          user_id_modificacao_registo: string | null
        }
        Insert: {
          action_date?: string | null
          alocation: string
          booking_date?: string | null
          booking_id?: string | null
          booking_price?: number | null
          campaign_id_aplicada?: string | null
          campaign_pay?: number | null
          campanha_fatura?: string | null
          cancel_type?: string | null
          car_info_brand?: string | null
          car_info_color?: string | null
          car_info_model?: string | null
          check_in_previsto?: string | null
          check_in_real?: string | null
          check_out_previsto?: string | null
          check_out_real?: string | null
          checkin_video_url?: string | null
          checkout_video_url?: string | null
          cidade_cliente?: string | null
          cliente_quer_fatura?: boolean | null
          condutor_entrega_id?: string | null
          condutor_movimentacao_id?: string | null
          condutor_recolha_id?: string | null
          corrected_price?: number | null
          created_at_db?: string | null
          danos_checkin?: string | null
          danos_checkout?: string | null
          data_cancelamento_registo?: string | null
          data_emissao_fatura?: string | null
          delivery_price?: number | null
          email_cliente?: string | null
          estado_reserva_atual?: string | null
          extras_price?: number | null
          fotos_checkin_urls?: Json | null
          fotos_checkout_urls?: Json | null
          has_online_payment?: boolean | null
          id_cliente_externo?: string | null
          id_pk?: string
          kms_entrada?: number | null
          kms_saida?: number | null
          lang_cliente?: string | null
          lastname_cliente?: string | null
          license_plate: string
          morada_fatura?: string | null
          motivo_cancelamento_texto?: string | null
          name_cliente?: string | null
          nif_cliente?: string | null
          nif_fatura?: string | null
          nome_fatura?: string | null
          nome_fiscal_cliente?: string | null
          numero_fatura?: string | null
          observacoes_entrega?: string | null
          observacoes_recolha?: string | null
          parking_price?: number | null
          parking_type?: string | null
          parque_id?: string | null
          payment_intent_id?: string | null
          payment_method?: string | null
          phone_number_cliente?: string | null
          price_on_delivery?: number | null
          remarks_cliente?: string | null
          return_flight?: string | null
          row_code?: string | null
          source_file_imported?: string | null
          spot_code?: string | null
          status_fatura?: string | null
          total_price?: number | null
          transaction_id_pagamento?: string | null
          updated_at_db?: string | null
          user_id_cancelamento?: string | null
          user_id_criacao_registo?: string | null
          user_id_modificacao_registo?: string | null
        }
        Update: {
          action_date?: string | null
          alocation?: string
          booking_date?: string | null
          booking_id?: string | null
          booking_price?: number | null
          campaign_id_aplicada?: string | null
          campaign_pay?: number | null
          campanha_fatura?: string | null
          cancel_type?: string | null
          car_info_brand?: string | null
          car_info_color?: string | null
          car_info_model?: string | null
          check_in_previsto?: string | null
          check_in_real?: string | null
          check_out_previsto?: string | null
          check_out_real?: string | null
          checkin_video_url?: string | null
          checkout_video_url?: string | null
          cidade_cliente?: string | null
          cliente_quer_fatura?: boolean | null
          condutor_entrega_id?: string | null
          condutor_movimentacao_id?: string | null
          condutor_recolha_id?: string | null
          corrected_price?: number | null
          created_at_db?: string | null
          danos_checkin?: string | null
          danos_checkout?: string | null
          data_cancelamento_registo?: string | null
          data_emissao_fatura?: string | null
          delivery_price?: number | null
          email_cliente?: string | null
          estado_reserva_atual?: string | null
          extras_price?: number | null
          fotos_checkin_urls?: Json | null
          fotos_checkout_urls?: Json | null
          has_online_payment?: boolean | null
          id_cliente_externo?: string | null
          id_pk?: string
          kms_entrada?: number | null
          kms_saida?: number | null
          lang_cliente?: string | null
          lastname_cliente?: string | null
          license_plate?: string
          morada_fatura?: string | null
          motivo_cancelamento_texto?: string | null
          name_cliente?: string | null
          nif_cliente?: string | null
          nif_fatura?: string | null
          nome_fatura?: string | null
          nome_fiscal_cliente?: string | null
          numero_fatura?: string | null
          observacoes_entrega?: string | null
          observacoes_recolha?: string | null
          parking_price?: number | null
          parking_type?: string | null
          parque_id?: string | null
          payment_intent_id?: string | null
          payment_method?: string | null
          phone_number_cliente?: string | null
          price_on_delivery?: number | null
          remarks_cliente?: string | null
          return_flight?: string | null
          row_code?: string | null
          source_file_imported?: string | null
          spot_code?: string | null
          status_fatura?: string | null
          total_price?: number | null
          transaction_id_pagamento?: string | null
          updated_at_db?: string | null
          user_id_cancelamento?: string | null
          user_id_criacao_registo?: string | null
          user_id_modificacao_registo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_reservas_user_id_modificacao"
            columns: ["user_id_modificacao_registo"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservas_condutor_entrega_id_fkey"
            columns: ["condutor_entrega_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservas_condutor_movimentacao_id_fkey"
            columns: ["condutor_movimentacao_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservas_condutor_recolha_id_fkey"
            columns: ["condutor_recolha_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservas_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "reservas_user_id_cancelamento_fkey"
            columns: ["user_id_cancelamento"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservas_user_id_criacao_registo_fkey"
            columns: ["user_id_criacao_registo"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      servicos_condutores: {
        Row: {
          condutor_id: string
          created_at: string | null
          data_servico: string
          id: number
          parque_id: string
          tipo_servico: string
          updated_at: string | null
        }
        Insert: {
          condutor_id: string
          created_at?: string | null
          data_servico: string
          id?: never
          parque_id: string
          tipo_servico: string
          updated_at?: string | null
        }
        Update: {
          condutor_id?: string
          created_at?: string | null
          data_servico?: string
          id?: never
          parque_id?: string
          tipo_servico?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_condutor"
            columns: ["condutor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_parque"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
        ]
      }
      system_logs: {
        Row: {
          action_type: string
          description: string | null
          id: number
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          timestamp: string
          user_agent: string | null
          user_email: string | null
          user_id: string | null
          user_role: string | null
        }
        Insert: {
          action_type: string
          description?: string | null
          id?: number
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          timestamp?: string
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Update: {
          action_type?: string
          description?: string | null
          id?: number
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          timestamp?: string
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "system_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_roles: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          hierarchy_level: number
          role_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          hierarchy_level: number
          role_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          hierarchy_level?: number
          role_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tarefas: {
        Row: {
          created_at_db: string | null
          data_criacao: string
          data_prazo: string | null
          descricao: string | null
          estado_tarefa: string | null
          etiquetas: string[] | null
          id: string
          prioridade: string | null
          projeto_id: string | null
          titulo: string
          updated_at_db: string | null
          user_id_criador: string
          user_id_responsavel: string | null
        }
        Insert: {
          created_at_db?: string | null
          data_criacao?: string
          data_prazo?: string | null
          descricao?: string | null
          estado_tarefa?: string | null
          etiquetas?: string[] | null
          id?: string
          prioridade?: string | null
          projeto_id?: string | null
          titulo: string
          updated_at_db?: string | null
          user_id_criador: string
          user_id_responsavel?: string | null
        }
        Update: {
          created_at_db?: string | null
          data_criacao?: string
          data_prazo?: string | null
          descricao?: string | null
          estado_tarefa?: string | null
          etiquetas?: string[] | null
          id?: string
          prioridade?: string | null
          projeto_id?: string | null
          titulo?: string
          updated_at_db?: string | null
          user_id_criador?: string
          user_id_responsavel?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tarefas_projeto_id_fkey"
            columns: ["projeto_id"]
            isOneToOne: false
            referencedRelation: "projetos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_user_id_criador_fkey"
            columns: ["user_id_criador"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_user_id_responsavel_fkey"
            columns: ["user_id_responsavel"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      bi_financeiro_diario: {
        Row: {
          data: string | null
          lucro: number | null
          parque_id: string | null
          parque_nome: string | null
          receita_bruta: number | null
          taxa_cancelamento: number | null
          tipo_despesa: string | null
          total_cancelamentos: number | null
          total_despesa: number | null
          total_reservas: number | null
        }
        Relationships: []
      }
      bi_ocupacao_diaria: {
        Row: {
          capacidade_total: number | null
          data: string | null
          parque_id: string | null
          parque_nome: string | null
          taxa_ocupacao: number | null
          total_ocupados: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reservas_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
        ]
      }
      bi_reservas_origem: {
        Row: {
          campaign_id_aplicada: string | null
          data: string | null
          parque_id: string | null
          total_reservas: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reservas_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
        ]
      }
      reservas_with_id: {
        Row: {
          action_date: string | null
          alocation: string | null
          booking_date: string | null
          booking_id: string | null
          booking_price: number | null
          campaign_id_aplicada: string | null
          campaign_pay: number | null
          campanha_fatura: string | null
          cancel_type: string | null
          car_info_brand: string | null
          car_info_color: string | null
          car_info_model: string | null
          check_in_previsto: string | null
          check_in_real: string | null
          check_out_previsto: string | null
          check_out_real: string | null
          checkin_video_url: string | null
          cidade_cliente: string | null
          cliente_quer_fatura: boolean | null
          condutor_entrega_id: string | null
          condutor_movimentacao_id: string | null
          condutor_recolha_id: string | null
          corrected_price: number | null
          created_at_db: string | null
          data_cancelamento_registo: string | null
          data_emissao_fatura: string | null
          delivery_price: number | null
          email_cliente: string | null
          estado_reserva_atual: string | null
          extras_price: number | null
          has_online_payment: boolean | null
          id: string | null
          id_cliente_externo: string | null
          id_pk: string | null
          lang_cliente: string | null
          lastname_cliente: string | null
          license_plate: string | null
          morada_fatura: string | null
          motivo_cancelamento_texto: string | null
          name_cliente: string | null
          nif_cliente: string | null
          nif_fatura: string | null
          nome_fatura: string | null
          nome_fiscal_cliente: string | null
          numero_fatura: string | null
          parking_price: number | null
          parking_type: string | null
          parque_id: string | null
          payment_intent_id: string | null
          payment_method: string | null
          phone_number_cliente: string | null
          price_on_delivery: number | null
          remarks_cliente: string | null
          return_flight: string | null
          row_code: string | null
          source_file_imported: string | null
          spot_code: string | null
          status_fatura: string | null
          total_price: number | null
          transaction_id_pagamento: string | null
          updated_at_db: string | null
          user_id_cancelamento: string | null
          user_id_criacao_registo: string | null
        }
        Insert: {
          action_date?: string | null
          alocation?: string | null
          booking_date?: string | null
          booking_id?: string | null
          booking_price?: number | null
          campaign_id_aplicada?: string | null
          campaign_pay?: number | null
          campanha_fatura?: string | null
          cancel_type?: string | null
          car_info_brand?: string | null
          car_info_color?: string | null
          car_info_model?: string | null
          check_in_previsto?: string | null
          check_in_real?: string | null
          check_out_previsto?: string | null
          check_out_real?: string | null
          checkin_video_url?: string | null
          cidade_cliente?: string | null
          cliente_quer_fatura?: boolean | null
          condutor_entrega_id?: string | null
          condutor_movimentacao_id?: string | null
          condutor_recolha_id?: string | null
          corrected_price?: number | null
          created_at_db?: string | null
          data_cancelamento_registo?: string | null
          data_emissao_fatura?: string | null
          delivery_price?: number | null
          email_cliente?: string | null
          estado_reserva_atual?: string | null
          extras_price?: number | null
          has_online_payment?: boolean | null
          id?: string | null
          id_cliente_externo?: string | null
          id_pk?: string | null
          lang_cliente?: string | null
          lastname_cliente?: string | null
          license_plate?: string | null
          morada_fatura?: string | null
          motivo_cancelamento_texto?: string | null
          name_cliente?: string | null
          nif_cliente?: string | null
          nif_fatura?: string | null
          nome_fatura?: string | null
          nome_fiscal_cliente?: string | null
          numero_fatura?: string | null
          parking_price?: number | null
          parking_type?: string | null
          parque_id?: string | null
          payment_intent_id?: string | null
          payment_method?: string | null
          phone_number_cliente?: string | null
          price_on_delivery?: number | null
          remarks_cliente?: string | null
          return_flight?: string | null
          row_code?: string | null
          source_file_imported?: string | null
          spot_code?: string | null
          status_fatura?: string | null
          total_price?: number | null
          transaction_id_pagamento?: string | null
          updated_at_db?: string | null
          user_id_cancelamento?: string | null
          user_id_criacao_registo?: string | null
        }
        Update: {
          action_date?: string | null
          alocation?: string | null
          booking_date?: string | null
          booking_id?: string | null
          booking_price?: number | null
          campaign_id_aplicada?: string | null
          campaign_pay?: number | null
          campanha_fatura?: string | null
          cancel_type?: string | null
          car_info_brand?: string | null
          car_info_color?: string | null
          car_info_model?: string | null
          check_in_previsto?: string | null
          check_in_real?: string | null
          check_out_previsto?: string | null
          check_out_real?: string | null
          checkin_video_url?: string | null
          cidade_cliente?: string | null
          cliente_quer_fatura?: boolean | null
          condutor_entrega_id?: string | null
          condutor_movimentacao_id?: string | null
          condutor_recolha_id?: string | null
          corrected_price?: number | null
          created_at_db?: string | null
          data_cancelamento_registo?: string | null
          data_emissao_fatura?: string | null
          delivery_price?: number | null
          email_cliente?: string | null
          estado_reserva_atual?: string | null
          extras_price?: number | null
          has_online_payment?: boolean | null
          id?: string | null
          id_cliente_externo?: string | null
          id_pk?: string | null
          lang_cliente?: string | null
          lastname_cliente?: string | null
          license_plate?: string | null
          morada_fatura?: string | null
          motivo_cancelamento_texto?: string | null
          name_cliente?: string | null
          nif_cliente?: string | null
          nif_fatura?: string | null
          nome_fatura?: string | null
          nome_fiscal_cliente?: string | null
          numero_fatura?: string | null
          parking_price?: number | null
          parking_type?: string | null
          parque_id?: string | null
          payment_intent_id?: string | null
          payment_method?: string | null
          phone_number_cliente?: string | null
          price_on_delivery?: number | null
          remarks_cliente?: string | null
          return_flight?: string | null
          row_code?: string | null
          source_file_imported?: string | null
          spot_code?: string | null
          status_fatura?: string | null
          total_price?: number | null
          transaction_id_pagamento?: string | null
          updated_at_db?: string | null
          user_id_cancelamento?: string | null
          user_id_criacao_registo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservas_condutor_entrega_id_fkey"
            columns: ["condutor_entrega_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservas_condutor_movimentacao_id_fkey"
            columns: ["condutor_movimentacao_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservas_condutor_recolha_id_fkey"
            columns: ["condutor_recolha_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservas_parque_id_fkey"
            columns: ["parque_id"]
            isOneToOne: false
            referencedRelation: "parques"
            referencedColumns: ["id_pk"]
          },
          {
            foreignKeyName: "reservas_user_id_cancelamento_fkey"
            columns: ["user_id_cancelamento"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservas_user_id_criacao_registo_fkey"
            columns: ["user_id_criacao_registo"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      view_categorias_formacao: {
        Row: {
          ativo: boolean | null
          data_atualizacao: string | null
          data_criacao: string | null
          descricao: string | null
          id: number | null
          nome: string | null
        }
        Insert: {
          ativo?: boolean | null
          data_atualizacao?: string | null
          data_criacao?: string | null
          descricao?: string | null
          id?: number | null
          nome?: string | null
        }
        Update: {
          ativo?: boolean | null
          data_atualizacao?: string | null
          data_criacao?: string | null
          descricao?: string | null
          id?: number | null
          nome?: string | null
        }
        Relationships: []
      }
      view_conteudos_formacao: {
        Row: {
          ativo: boolean | null
          categoria_id: number | null
          categoria_nome: string | null
          criado_por_email: string | null
          data_atualizacao: string | null
          data_criacao: string | null
          descricao: string | null
          id: number | null
          tipo_conteudo: string | null
          titulo: string | null
          url_conteudo: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      adicionar_anexo_comentario_reclamacao: {
        Args: {
          p_reclamacao_id: string
          p_user_id: string
          p_nome_ficheiro: string
          p_url_anexo: string
          p_path_storage: string
          p_tipo_anexo: string
        }
        Returns: string
      }
      adicionar_anexo_perdidos_achados: {
        Args: {
          p_caso_id: string
          p_user_id: string
          p_nome_ficheiro: string
          p_url_anexo: string
          p_path_storage: string
          p_tipo_anexo: string
        }
        Returns: string
      }
      atualizar_capacidade_parque: {
        Args: {
          p_parque_id: string
          p_capacidade_coberto: number
          p_capacidade_descoberto: number
          p_capacidade_indoor: number
          p_user_id: string
          p_user_role: string
        }
        Returns: boolean
      }
      atualizar_conclusoes_auditoria: {
        Args: {
          p_sessao_auditoria_id: string
          p_conclusoes: string
          p_observacoes: string
        }
        Returns: boolean
      }
      atualizar_estado_comentario_reclamacao: {
        Args: {
          p_reclamacao_id: string
          p_user_id: string
          p_user_role: string
          p_estado_reclamacao: string
          p_notas_acompanhamento?: string
          p_detalhes_resolucao?: string
        }
        Returns: boolean
      }
      atualizar_estado_perdidos_achados: {
        Args: {
          p_caso_id: string
          p_user_id: string
          p_user_role: string
          p_estado_caso: string
          p_notas_investigacao?: string
          p_detalhes_resolucao?: string
          p_data_devolucao_entrega?: string
        }
        Returns: boolean
      }
      atualizar_numero_fatura: {
        Args: {
          p_reserva_id: string
          p_numero_fatura: string
          p_user_id: string
        }
        Returns: boolean
      }
      atualizar_visoes_bi: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      calcular_metricas_auditoria: {
        Args: { p_sessao_auditoria_id: string }
        Returns: Json
      }
      calcular_ocupacao_parque_data: {
        Args: { p_parque_id: string; p_data: string }
        Returns: {
          parque_id: string
          data_ocupacao: string
          ocupados_cobertos: number
          ocupados_descobertos: number
          ocupados_indoor: number
          total_cobertos: number
          total_descobertos: number
          total_indoor: number
          percentual_ocupacao_cobertos: number
          percentual_ocupacao_descobertos: number
          percentual_ocupacao_indoor: number
        }[]
      }
      contar_reservas_por_hora_no_dia: {
        Args: { dia_param: string }
        Returns: {
          hora: number
          total_reservas: number
        }[]
      }
      contar_reservas_por_mes_no_ano: {
        Args: { ano_param: number }
        Returns: {
          mes: number
          total_reservas: number
        }[]
      }
      criar_sessao_auditoria: {
        Args: {
          p_profile_id_auditado: string
          p_user_id_auditor: string
          p_periodo_inicio_analise: string
          p_periodo_fim_analise: string
        }
        Returns: string
      }
      gerenciar_categoria_formacao: {
        Args: {
          p_id?: string
          p_nome?: string
          p_descricao?: string
          p_ordem_exibicao?: number
          p_ativo?: boolean
        }
        Returns: string
      }
      gerenciar_conteudo_formacao: {
        Args: {
          p_id?: string
          p_titulo?: string
          p_descricao_curta?: string
          p_categoria_id?: string
          p_tipo_conteudo?: string
          p_conteudo_faq?: string
          p_ficheiro_url?: string
          p_ficheiro_nome_original?: string
          p_ficheiro_storage_path?: string
          p_video_link_externo?: string
          p_palavras_chave?: string[]
          p_ativo?: boolean
        }
        Returns: string
      }
      get_bi_despesas_por_tipo: {
        Args: {
          p_data_inicio: string
          p_data_fim: string
          p_parque_ids?: string[]
        }
        Returns: {
          tipo_despesa: string
          total_valor: number
        }[]
      }
      get_bi_evolucao_receita_mensal: {
        Args: {
          p_data_inicio: string
          p_data_fim: string
          p_parque_ids?: string[]
        }
        Returns: {
          mes_ano: string
          mes_ano_label: string
          total_receita_mes: number
        }[]
      }
      get_bi_kpis_gerais: {
        Args: {
          p_data_inicio: string
          p_data_fim: string
          p_parque_ids?: string[]
          p_condutor_id?: string
        }
        Returns: {
          total_receita_bruta: number
          total_despesas: number
          total_lucro: number
          total_reservas_validas: number
          total_cancelamentos: number
          taxa_cancelamento: number
          taxa_ocupacao_media: number
        }[]
      }
      get_bi_receita_por_parque: {
        Args: {
          p_data_inicio: string
          p_data_fim: string
          p_parque_ids?: string[]
        }
        Returns: {
          parque_id: string
          parque_nome: string
          total_receita: number
        }[]
      }
      get_bi_reservas_por_origem: {
        Args: {
          p_data_inicio: string
          p_data_fim: string
          p_parque_ids?: string[]
        }
        Returns: {
          origem_reserva: string
          count_reservas: number
        }[]
      }
      get_bi_top_condutores_servicos: {
        Args: {
          p_data_inicio: string
          p_data_fim: string
          p_parque_ids?: string[]
        }
        Returns: {
          condutor_id: string
          condutor_nome: string
          total_servicos: number
          total_recolhas: number
          total_entregas: number
        }[]
      }
      get_comentario_reclamacao_detalhes: {
        Args: {
          p_reclamacao_id: string
          p_user_id: string
          p_user_role: string
        }
        Returns: {
          id: string
          reserva_id: string
          matricula_veiculo: string
          alocation_veiculo: string
          nome_cliente: string
          contacto_cliente: string
          data_reclamacao: string
          user_id_registo: string
          nome_user_registo: string
          tipo_reclamacao: string
          descricao_reclamacao: string
          origem_reclamacao: string
          parque_id_ocorrencia: string
          nome_parque: string
          estado_reclamacao: string
          reserva_tinha_avaliacao_obrigatoria: boolean
          ocorrencias_associadas_ids: string[]
          notas_acompanhamento: string
          detalhes_resolucao: string
          data_resolucao: string
          user_id_resolucao: string
          nome_user_resolucao: string
          created_at: string
          updated_at: string
          anexos: Json
        }[]
      }
      get_comentarios_reclamacoes: {
        Args: {
          p_user_id: string
          p_user_role: string
          p_filtro_matricula?: string
          p_filtro_alocation?: string
          p_filtro_cliente?: string
          p_filtro_tipo?: string
          p_filtro_estado?: string
          p_items_per_page?: number
          p_page_number?: number
        }
        Returns: {
          id: string
          reserva_id: string
          matricula_veiculo: string
          alocation_veiculo: string
          nome_cliente: string
          contacto_cliente: string
          data_reclamacao: string
          user_id_registo: string
          nome_user_registo: string
          tipo_reclamacao: string
          descricao_reclamacao: string
          origem_reclamacao: string
          parque_id_ocorrencia: string
          nome_parque: string
          estado_reclamacao: string
          created_at: string
          updated_at: string
          total_records: number
        }[]
      }
      get_comportamento_apanhado: {
        Args: {
          p_profile_id_analisado: string
          p_data_inicio: string
          p_data_fim: string
          p_referencias_uploads_json?: Json
        }
        Returns: Json
      }
      get_distinct_tipos_projeto: {
        Args: Record<PropertyKey, never>
        Returns: {
          tipo_projeto: string
        }[]
      }
      get_estatisticas_tarefas_por_estado: {
        Args: { p_user_id: string; p_user_role: string; p_projeto_id?: string }
        Returns: {
          estado_tarefa: string
          quantidade: number
        }[]
      }
      get_my_assigned_cities: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      get_my_assigned_parques_ids: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      get_my_claim: {
        Args: { claim: string }
        Returns: string
      }
      get_my_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_perdidos_achados_caso_detalhes: {
        Args: { p_caso_id: string; p_user_id: string; p_user_role: string }
        Returns: {
          id: string
          matricula_veiculo: string
          alocation_veiculo: string
          nome_cliente: string
          contacto_cliente: string
          data_queixa: string
          user_id_registo: string
          nome_user_registo: string
          descricao_queixa: string
          origem_queixa: string
          detalhes_item_perdido: string
          parque_id_ocorrencia: string
          nome_parque: string
          local_exato_ocorrencia: string
          estado_caso: string
          reserva_id_associada: string
          notas_investigacao: string
          detalhes_resolucao: string
          data_devolucao_entrega: string
          user_id_devolucao_entrega: string
          nome_user_devolucao: string
          created_at: string
          updated_at: string
          anexos: Json
        }[]
      }
      get_perdidos_achados_casos: {
        Args: {
          p_user_id: string
          p_user_role: string
          p_filtro_matricula?: string
          p_filtro_alocation?: string
          p_filtro_cliente?: string
          p_filtro_estado?: string
          p_items_per_page?: number
          p_page_number?: number
        }
        Returns: {
          id: string
          matricula_veiculo: string
          alocation_veiculo: string
          nome_cliente: string
          contacto_cliente: string
          data_queixa: string
          user_id_registo: string
          nome_user_registo: string
          descricao_queixa: string
          origem_queixa: string
          detalhes_item_perdido: string
          parque_id_ocorrencia: string
          nome_parque: string
          estado_caso: string
          created_at: string
          updated_at: string
          total_records: number
        }[]
      }
      get_produtividade_condutor_periodo: {
        Args: {
          p_condutor_id: string
          p_data_inicio: string
          p_data_fim: string
        }
        Returns: {
          total_minutos_trabalhados: number
          num_recolhas: number
          num_entregas: number
          num_movimentacoes_condutor: number
          data_ultima_auditoria: string
          resumo_ultima_auditoria: string
        }[]
      }
      get_produtividade_geral_periodo: {
        Args: { p_data_inicio: string; p_data_fim: string }
        Returns: {
          total_entregas: number
          total_recolhas: number
          total_movimentacoes_gerais: number
        }[]
      }
      get_projetos_para_utilizador: {
        Args: {
          p_user_id: string
          p_user_role: string
          p_filtro_estado?: string
          p_filtro_tipo?: string
          p_filtro_parque_id?: string
          p_filtro_nome_projeto?: string
          p_items_per_page?: number
          p_page_number?: number
        }
        Returns: {
          id: string
          nome_projeto: string
          tipo_projeto: string
          descricao: string
          user_id_responsavel_principal: string
          responsavel_principal_nome: string
          data_inicio: string
          data_prazo: string
          orcamento_previsto: number
          estado_projeto: string
          parque_id: string
          nome_parque: string
          user_id_criador: string
          criador_nome: string
          created_at: string
          updated_at: string
          total_records: number
        }[]
      }
      get_reservas_para_faturacao: {
        Args: {
          p_user_id: string
          p_user_role: string
          p_filtro_campanha?: string
          p_filtro_parque_id?: string
          p_filtro_status?: string
          p_items_per_page?: number
          p_page_number?: number
        }
        Returns: {
          id: string
          license_plate: string
          name_cliente: string
          lastname_cliente: string
          check_in_real: string
          check_out_real: string
          total_price: number
          nif_cliente: string
          nome_fiscal_cliente: string
          cliente_quer_fatura: boolean
          numero_fatura: string
          data_emissao_fatura: string
          status_fatura: string
          campanha_fatura: string
          nif_fatura: string
          nome_fatura: string
          morada_fatura: string
          parque_id: string
          nome_parque: string
          status_cor: string
          horas_desde_saida: number
          total_records: number
        }[]
      }
      get_tarefas_para_utilizador: {
        Args: {
          p_user_id: string
          p_user_role: string
          p_filtro_estado_tarefa?: string
          p_filtro_prioridade?: string
          p_filtro_projeto_id?: string
          p_filtro_titulo_descricao?: string
          p_items_per_page?: number
          p_page_number?: number
        }
        Returns: {
          id: string
          titulo: string
          descricao: string
          projeto_id: string
          nome_projeto: string
          user_id_responsavel: string
          responsavel_nome: string
          user_id_criador: string
          criador_nome: string
          data_criacao: string
          data_prazo: string
          prioridade: string
          estado_tarefa: string
          etiquetas: string[]
          created_at_db: string
          updated_at_db: string
          total_records: number
        }[]
      }
      get_tarefas_por_projeto: {
        Args: {
          p_projeto_id: string
          p_user_id: string
          p_user_role: string
          p_filtro_estado_tarefa?: string
          p_filtro_prioridade?: string
          p_filtro_responsavel_id?: string
          p_items_per_page?: number
          p_page_number?: number
        }
        Returns: {
          id: string
          titulo: string
          descricao: string
          user_id_responsavel: string
          responsavel_nome: string
          user_id_criador: string
          criador_nome: string
          data_criacao: string
          data_prazo: string
          prioridade: string
          estado_tarefa: string
          etiquetas: string[]
          created_at_db: string
          updated_at_db: string
          total_records: number
        }[]
      }
      inserir_dados_auditoria: {
        Args: {
          p_sessao_auditoria_id: string
          p_profile_id_condutor: string
          p_tipo_dado: string
          p_dados_json: Json
        }
        Returns: boolean
      }
      insert_or_update_user_role: {
        Args: {
          p_user_id: string
          p_user_name: string
          p_user_role: string
          p_user_email?: string
        }
        Returns: {
          id: string
          full_name: string
          role: string
          email: string
          operation: string
        }[]
      }
      is_role_in: {
        Args: { allowed_roles: string[] }
        Returns: boolean
      }
      list_available_employees_for_system_users: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          full_name: string
          username: string
          email: string
        }[]
      }
      list_system_logs: {
        Args: {
          p_start_date?: string
          p_end_date?: string
          p_user_search?: string
          p_subapp?: string
          p_action_type?: string
          p_resource_id?: string
          p_limit?: number
          p_offset?: number
        }
        Returns: {
          id: string
          log_timestamp: string
          user_id: string
          user_email: string
          user_name: string
          subapp: string
          action_type: string
          resource_type: string
          resource_id: string
          details: Json
          ip_address: string
          total_count: number
        }[]
      }
      list_system_subapps: {
        Args: Record<PropertyKey, never>
        Returns: {
          subapp: string
          count: number
        }[]
      }
      list_system_users: {
        Args: {
          p_search?: string
          p_role?: string
          p_limit?: number
          p_offset?: number
        }
        Returns: {
          id: string
          auth_user_id: string
          full_name: string
          username: string
          email: string
          role: string
          role_display: string
          last_sign_in_at: string
          created_at: string
          total_count: number
        }[]
      }
      listar_categorias_formacao: {
        Args: { p_ativas_apenas?: boolean }
        Returns: {
          id: string
          nome: string
          descricao: string
          ordem_exibicao: number
          ativo: boolean
          created_at: string
          updated_at: string
          created_by: string
          nome_criador: string
        }[]
      }
      listar_comportamento_relatorios: {
        Args: {
          p_profile_id_analisado?: string
          p_data_geracao_inicio?: string
          p_limit?: number
          p_offset?: number
        }
        Returns: {
          id: string
          profile_id_analisado: string
          nome_analisado: string
          user_id_gerador: string
          nome_gerador: string
          data_geracao: string
          periodo_inicio_analise: string
          periodo_fim_analise: string
          observacoes_gerais: string
        }[]
      }
      listar_conteudos_formacao_gestao: {
        Args: {
          p_incluir_inativos?: boolean
          p_limit?: number
          p_offset?: number
        }
        Returns: {
          id: string
          titulo: string
          descricao_curta: string
          categoria_id: string
          categoria_nome: string
          tipo_conteudo: string
          conteudo_faq: string
          ficheiro_url: string
          ficheiro_nome_original: string
          ficheiro_storage_path: string
          video_link_externo: string
          palavras_chave: string[]
          ativo: boolean
          created_at: string
          updated_at: string
          created_by: string
          updated_by: string
          nome_criador: string
          nome_atualizador: string
          total_count: number
        }[]
      }
      listar_sessoes_auditoria: {
        Args: {
          p_profile_id_auditado?: string
          p_user_id_auditor?: string
          p_status?: string
          p_data_inicio?: string
          p_data_fim?: string
          p_limit?: number
          p_offset?: number
        }
        Returns: {
          id: string
          profile_id_auditado: string
          nome_auditado: string
          user_id_auditor: string
          nome_auditor: string
          periodo_inicio_analise: string
          periodo_fim_analise: string
          status: string
          conclusoes: string
          observacoes: string
          resultados_json: Json
          created_at: string
          updated_at: string
          total_count: number
        }[]
      }
      log_content_access: {
        Args: {
          p_conteudo_id: number
          p_concluido?: boolean
          p_tempo_visualizacao?: number
        }
        Returns: boolean
      }
      log_system_action: {
        Args: {
          p_action_type: string
          p_action_description?: string
          p_entity_type?: string
          p_entity_id?: string
          p_ip_address?: string
          p_user_agent?: string
        }
        Returns: number
      }
      manage_content: {
        Args: {
          p_operacao: string
          p_id?: number
          p_titulo?: string
          p_descricao?: string
          p_categoria_id?: number
          p_url_conteudo?: string
          p_tipo_conteudo?: string
          p_ativo?: boolean
        }
        Returns: {
          id: number
          titulo: string
          descricao: string
          categoria_id: number
          url_conteudo: string
          tipo_conteudo: string
          ativo: boolean
          operacao_realizada: string
        }[]
      }
      manage_system_user: {
        Args: {
          p_profile_id: string
          p_auth_user_id?: string
          p_email?: string
          p_role?: string
          p_password?: string
        }
        Returns: Json
      }
      manage_training_categories: {
        Args: {
          p_operacao: string
          p_id?: number
          p_nome?: string
          p_descricao?: string
          p_ativo?: boolean
        }
        Returns: {
          id: number
          nome: string
          descricao: string
          ativo: boolean
          operacao_realizada: string
        }[]
      }
      obter_comportamento_relatorio_detalhes: {
        Args: { p_relatorio_id: string }
        Returns: {
          id: string
          profile_id_analisado: string
          nome_analisado: string
          user_id_gerador: string
          nome_gerador: string
          data_geracao: string
          periodo_inicio_analise: string
          periodo_fim_analise: string
          metricas_apuradas: Json
          observacoes_gerais: string
          uploads_associados: Json
        }[]
      }
      obter_condutor_id_por_nome: {
        Args: { p_nome_condutor: string }
        Returns: string
      }
      obter_detalhes_sessao_auditoria: {
        Args: { p_sessao_auditoria_id: string }
        Returns: {
          id: string
          profile_id_auditado: string
          nome_auditado: string
          user_id_auditor: string
          nome_auditor: string
          periodo_inicio_analise: string
          periodo_fim_analise: string
          status: string
          conclusoes: string
          observacoes: string
          resultados_json: Json
          created_at: string
          updated_at: string
          anexos_audio: Json
          dados_velocidade: Json
          dados_movimentacoes: Json
        }[]
      }
      obter_ocupacao_parque_range: {
        Args: { p_parque_id: string; p_data_inicio: string; p_data_fim: string }
        Returns: {
          data_ocupacao: string
          ocupados_cobertos: number
          ocupados_descobertos: number
          ocupados_indoor: number
          total_cobertos: number
          total_descobertos: number
          total_indoor: number
          percentual_ocupacao_cobertos: number
          percentual_ocupacao_descobertos: number
          percentual_ocupacao_indoor: number
        }[]
      }
      obter_parque_id_por_codigo: {
        Args: { p_codigo_ou_nome: string }
        Returns: string
      }
      pesquisar_conteudos_formacao: {
        Args: {
          p_termo_pesquisa?: string
          p_categoria_id?: string
          p_tipo_conteudo?: string
          p_limit?: number
          p_offset?: number
        }
        Returns: {
          id: string
          titulo: string
          descricao_curta: string
          categoria_id: string
          categoria_nome: string
          tipo_conteudo: string
          conteudo_faq: string
          ficheiro_url: string
          ficheiro_nome_original: string
          video_link_externo: string
          palavras_chave: string[]
          created_at: string
          updated_at: string
          created_by: string
          nome_criador: string
          total_count: number
        }[]
      }
      processar_upload_comportamento: {
        Args: {
          p_relatorio_id: string
          p_profile_id_analisado: string
          p_user_id_upload: string
          p_tipo_upload: string
          p_nome_ficheiro: string
          p_caminho_storage: string
          p_tamanho_bytes: number
          p_mime_type: string
          p_metadados?: Json
        }
        Returns: string
      }
      processar_upload_produtividade: {
        Args: {
          p_condutor_id: string
          p_data_inicio: string
          p_data_fim: string
          p_tipo_dado: string
          p_dados_json: Json
          p_user_id: string
        }
        Returns: boolean
      }
      register_system_log: {
        Args: {
          p_user_id: string
          p_profile_id: string
          p_ip_address: string
          p_subapp: string
          p_action_type: string
          p_resource_type: string
          p_resource_id: string
          p_details: Json
        }
        Returns: string
      }
      registrar_acesso_conteudo_formacao: {
        Args: {
          p_conteudo_id: string
          p_tipo_acesso: string
          p_ip_address?: string
          p_user_agent?: string
        }
        Returns: boolean
      }
      registrar_anexo_audio_auditoria: {
        Args: {
          p_sessao_auditoria_id: string
          p_nome_ficheiro_original: string
          p_ficheiro_url: string
          p_storage_bucket_path: string
          p_duracao_segundos?: number
          p_transcricao?: string
        }
        Returns: string
      }
      registrar_auditoria_condutor: {
        Args: {
          p_condutor_id: string
          p_auditor_id: string
          p_resultado: string
          p_resumo: string
          p_detalhes?: Json
        }
        Returns: string
      }
      salvar_comportamento_relatorio: {
        Args: {
          p_profile_id_analisado: string
          p_user_id_gerador: string
          p_periodo_inicio_analise: string
          p_periodo_fim_analise: string
          p_metricas_apuradas: Json
          p_observacoes_gerais?: string
          p_filtros_uploads_usados?: Json
        }
        Returns: string
      }
      search_content: {
        Args: {
          p_termo_pesquisa?: string
          p_categoria_id?: number
          p_tipo_conteudo?: string
          p_apenas_ativos?: boolean
        }
        Returns: {
          id: number
          titulo: string
          descricao: string
          categoria_nome: string
          url_conteudo: string
          tipo_conteudo: string
          data_criacao: string
        }[]
      }
      verify_and_update_user_role: {
        Args: { p_user_id: string; p_new_role?: string }
        Returns: {
          id: string
          full_name: string
          role: string
          email: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
