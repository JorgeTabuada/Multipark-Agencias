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
      cash_records: {
        Row: {
          booking_price: number | null
          campaign: string | null
          created_at: string | null
          created_by: string | null
          driver: string | null
          id: string
          import_batch_id: string | null
          license_plate: string
          payment_method: string | null
          price_difference: number | null
          price_on_delivery: number | null
          updated_at: string | null
        }
        Insert: {
          booking_price?: number | null
          campaign?: string | null
          created_at?: string | null
          created_by?: string | null
          driver?: string | null
          id?: string
          import_batch_id?: string | null
          license_plate: string
          payment_method?: string | null
          price_difference?: number | null
          price_on_delivery?: number | null
          updated_at?: string | null
        }
        Update: {
          booking_price?: number | null
          campaign?: string | null
          created_at?: string | null
          created_by?: string | null
          driver?: string | null
          id?: string
          import_batch_id?: string | null
          license_plate?: string
          payment_method?: string | null
          price_difference?: number | null
          price_on_delivery?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cash_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_records_import_batch_id_fkey"
            columns: ["import_batch_id"]
            isOneToOne: false
            referencedRelation: "import_batches"
            referencedColumns: ["id"]
          },
        ]
      }
      comparisons: {
        Row: {
          created_at: string | null
          delivery_id: string | null
          id: string
          inconsistencies: Json | null
          license_plate: string
          resolution: string | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          sales_order_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_id?: string | null
          id?: string
          inconsistencies?: Json | null
          license_plate: string
          resolution?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          sales_order_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_id?: string | null
          id?: string
          inconsistencies?: Json | null
          license_plate?: string
          resolution?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          sales_order_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comparisons_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comparisons_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comparisons_sales_order_id_fkey"
            columns: ["sales_order_id"]
            isOneToOne: false
            referencedRelation: "sales_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      deliveries: {
        Row: {
          alocation: string | null
          booking_price: number | null
          campaign: string | null
          campaign_pay: boolean | null
          check_in: string | null
          created_at: string | null
          created_by: string | null
          driver: string | null
          has_online_payment: boolean | null
          id: string
          import_batch_id: string | null
          license_plate: string
          original_data: Json | null
          park_brand: string | null
          updated_at: string | null
        }
        Insert: {
          alocation?: string | null
          booking_price?: number | null
          campaign?: string | null
          campaign_pay?: boolean | null
          check_in?: string | null
          created_at?: string | null
          created_by?: string | null
          driver?: string | null
          has_online_payment?: boolean | null
          id?: string
          import_batch_id?: string | null
          license_plate: string
          original_data?: Json | null
          park_brand?: string | null
          updated_at?: string | null
        }
        Update: {
          alocation?: string | null
          booking_price?: number | null
          campaign?: string | null
          campaign_pay?: boolean | null
          check_in?: string | null
          created_at?: string | null
          created_by?: string | null
          driver?: string | null
          has_online_payment?: boolean | null
          id?: string
          import_batch_id?: string | null
          license_plate?: string
          original_data?: Json | null
          park_brand?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliveries_import_batch_id_fkey"
            columns: ["import_batch_id"]
            isOneToOne: false
            referencedRelation: "import_batches"
            referencedColumns: ["id"]
          },
        ]
      }
      exports: {
        Row: {
          created_at: string | null
          created_by: string | null
          export_data: Json | null
          export_date: string | null
          filename: string | null
          id: string
          record_count: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          export_data?: Json | null
          export_date?: string | null
          filename?: string | null
          id?: string
          record_count?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          export_data?: Json | null
          export_date?: string | null
          filename?: string | null
          id?: string
          record_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "exports_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      import_batches: {
        Row: {
          batch_date: string
          cash_count: number | null
          cash_filename: string | null
          created_at: string | null
          created_by: string | null
          deliveries_count: number | null
          deliveries_filename: string | null
          error_message: string | null
          id: string
          sales_count: number | null
          sales_filename: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          batch_date: string
          cash_count?: number | null
          cash_filename?: string | null
          created_at?: string | null
          created_by?: string | null
          deliveries_count?: number | null
          deliveries_filename?: string | null
          error_message?: string | null
          id?: string
          sales_count?: number | null
          sales_filename?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          batch_date?: string
          cash_count?: number | null
          cash_filename?: string | null
          created_at?: string | null
          created_by?: string | null
          deliveries_count?: number | null
          deliveries_filename?: string | null
          error_message?: string | null
          id?: string
          sales_count?: number | null
          sales_filename?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "import_batches_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_orders: {
        Row: {
          booking_date: string | null
          booking_price: number | null
          campaign: string | null
          campaign_pay: boolean | null
          check_in: string | null
          check_out: string | null
          created_at: string | null
          created_by: string | null
          driver: string | null
          has_online_payment: boolean | null
          id: string
          import_batch_id: string | null
          license_plate: string
          original_data: Json | null
          park_brand: string | null
          payment_method: string | null
          price_on_delivery: number | null
          share: number | null
          updated_at: string | null
        }
        Insert: {
          booking_date?: string | null
          booking_price?: number | null
          campaign?: string | null
          campaign_pay?: boolean | null
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          created_by?: string | null
          driver?: string | null
          has_online_payment?: boolean | null
          id?: string
          import_batch_id?: string | null
          license_plate: string
          original_data?: Json | null
          park_brand?: string | null
          payment_method?: string | null
          price_on_delivery?: number | null
          share?: number | null
          updated_at?: string | null
        }
        Update: {
          booking_date?: string | null
          booking_price?: number | null
          campaign?: string | null
          campaign_pay?: boolean | null
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          created_by?: string | null
          driver?: string | null
          has_online_payment?: boolean | null
          id?: string
          import_batch_id?: string | null
          license_plate?: string
          original_data?: Json | null
          park_brand?: string | null
          payment_method?: string | null
          price_on_delivery?: number | null
          share?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_orders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_orders_import_batch_id_fkey"
            columns: ["import_batch_id"]
            isOneToOne: false
            referencedRelation: "import_batches"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          id: string
          leader_id: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          leader_id?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          leader_id?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: string
          team_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role: string
          team_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string
          team_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      validations: {
        Row: {
          cash_record_id: string | null
          comparison_id: string | null
          corrected_payment_method: string | null
          corrected_price: number | null
          created_at: string | null
          id: string
          inconsistency_type: string | null
          license_plate: string
          notes: string | null
          original_payment_method: string | null
          original_price: number | null
          status: string | null
          updated_at: string | null
          validated_at: string | null
          validated_by: string | null
        }
        Insert: {
          cash_record_id?: string | null
          comparison_id?: string | null
          corrected_payment_method?: string | null
          corrected_price?: number | null
          created_at?: string | null
          id?: string
          inconsistency_type?: string | null
          license_plate: string
          notes?: string | null
          original_payment_method?: string | null
          original_price?: number | null
          status?: string | null
          updated_at?: string | null
          validated_at?: string | null
          validated_by?: string | null
        }
        Update: {
          cash_record_id?: string | null
          comparison_id?: string | null
          corrected_payment_method?: string | null
          corrected_price?: number | null
          created_at?: string | null
          id?: string
          inconsistency_type?: string | null
          license_plate?: string
          notes?: string | null
          original_payment_method?: string | null
          original_price?: number | null
          status?: string | null
          updated_at?: string | null
          validated_at?: string | null
          validated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "validations_cash_record_id_fkey"
            columns: ["cash_record_id"]
            isOneToOne: false
            referencedRelation: "cash_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "validations_comparison_id_fkey"
            columns: ["comparison_id"]
            isOneToOne: false
            referencedRelation: "comparisons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "validations_validated_by_fkey"
            columns: ["validated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
