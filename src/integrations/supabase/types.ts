export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          actual_end: string | null
          actual_start: string | null
          appointment_code: string
          appointment_type: Database["public"]["Enums"]["appointment_type"]
          base_price: number
          client_id: string
          created_at: string | null
          discount_amount: number | null
          employee_id: string
          final_price: number
          id: string
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          room_id: string | null
          scheduled_end: string
          scheduled_start: string
          session_notes: string | null
          status: Database["public"]["Enums"]["appointment_status"] | null
          updated_at: string | null
        }
        Insert: {
          actual_end?: string | null
          actual_start?: string | null
          appointment_code: string
          appointment_type: Database["public"]["Enums"]["appointment_type"]
          base_price: number
          client_id: string
          created_at?: string | null
          discount_amount?: number | null
          employee_id: string
          final_price: number
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          room_id?: string | null
          scheduled_end: string
          scheduled_start: string
          session_notes?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string | null
        }
        Update: {
          actual_end?: string | null
          actual_start?: string | null
          appointment_code?: string
          appointment_type?: Database["public"]["Enums"]["appointment_type"]
          base_price?: number
          client_id?: string
          created_at?: string | null
          discount_amount?: number | null
          employee_id?: string
          final_price?: number
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          room_id?: string | null
          scheduled_end?: string
          scheduled_start?: string
          session_notes?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      client_feedback: {
        Row: {
          appointment_id: string
          client_id: string
          created_at: string | null
          employee_id: string
          feedback_text: string | null
          id: string
          rating: number | null
          would_recommend: boolean | null
        }
        Insert: {
          appointment_id: string
          client_id: string
          created_at?: string | null
          employee_id: string
          feedback_text?: string | null
          id?: string
          rating?: number | null
          would_recommend?: boolean | null
        }
        Update: {
          appointment_id?: string
          client_id?: string
          created_at?: string | null
          employee_id?: string
          feedback_text?: string | null
          id?: string
          rating?: number | null
          would_recommend?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "client_feedback_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_feedback_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_feedback_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          client_code: string
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          first_visit_date: string | null
          full_name: string
          id: string
          insurance_provider: string | null
          is_active: boolean | null
          last_visit_date: string | null
          medical_notes: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          client_code: string
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          first_visit_date?: string | null
          full_name: string
          id?: string
          insurance_provider?: string | null
          is_active?: boolean | null
          last_visit_date?: string | null
          medical_notes?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          client_code?: string
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          first_visit_date?: string | null
          full_name?: string
          id?: string
          insurance_provider?: string | null
          is_active?: boolean | null
          last_visit_date?: string | null
          medical_notes?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      daily_metrics: {
        Row: {
          cancelled_appointments: number | null
          completed_appointments: number | null
          created_at: string | null
          employee_id: string | null
          id: string
          metric_date: string
          no_shows: number | null
          room_id: string | null
          room_utilization_rate: number | null
          total_appointments: number | null
          total_hours_worked: number | null
          total_revenue: number | null
          unique_clients: number | null
        }
        Insert: {
          cancelled_appointments?: number | null
          completed_appointments?: number | null
          created_at?: string | null
          employee_id?: string | null
          id?: string
          metric_date: string
          no_shows?: number | null
          room_id?: string | null
          room_utilization_rate?: number | null
          total_appointments?: number | null
          total_hours_worked?: number | null
          total_revenue?: number | null
          unique_clients?: number | null
        }
        Update: {
          cancelled_appointments?: number | null
          completed_appointments?: number | null
          created_at?: string | null
          employee_id?: string | null
          id?: string
          metric_date?: string
          no_shows?: number | null
          room_id?: string | null
          room_utilization_rate?: number | null
          total_appointments?: number | null
          total_hours_worked?: number | null
          total_revenue?: number | null
          unique_clients?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_metrics_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_metrics_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_performance: {
        Row: {
          appointments_completed: number | null
          client_satisfaction_avg: number | null
          commission_earned: number | null
          created_at: string | null
          employee_id: string
          hours_worked: number | null
          id: string
          performance_date: string
          retention_factor: number | null
          revenue_generated: number | null
          salary_component: number | null
          total_compensation: number | null
        }
        Insert: {
          appointments_completed?: number | null
          client_satisfaction_avg?: number | null
          commission_earned?: number | null
          created_at?: string | null
          employee_id: string
          hours_worked?: number | null
          id?: string
          performance_date: string
          retention_factor?: number | null
          revenue_generated?: number | null
          salary_component?: number | null
          total_compensation?: number | null
        }
        Update: {
          appointments_completed?: number | null
          client_satisfaction_avg?: number | null
          commission_earned?: number | null
          created_at?: string | null
          employee_id?: string
          hours_worked?: number | null
          id?: string
          performance_date?: string
          retention_factor?: number | null
          revenue_generated?: number | null
          salary_component?: number | null
          total_compensation?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_performance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_work_schedules: {
        Row: {
          created_at: string
          employee_id: string
          end_time: string
          id: string
          start_time: string
          updated_at: string
          weekday: number
        }
        Insert: {
          created_at?: string
          employee_id: string
          end_time: string
          id?: string
          start_time: string
          updated_at?: string
          weekday: number
        }
        Update: {
          created_at?: string
          employee_id?: string
          end_time?: string
          id?: string
          start_time?: string
          updated_at?: string
          weekday?: number
        }
        Relationships: [
          {
            foreignKeyName: "employee_work_schedules_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          base_salary: number | null
          commission_rate: number | null
          created_at: string | null
          email: string
          employee_code: string
          full_name: string
          hire_date: string
          id: string
          is_active: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["employee_role"]
          specializations: string[] | null
          updated_at: string | null
        }
        Insert: {
          base_salary?: number | null
          commission_rate?: number | null
          created_at?: string | null
          email: string
          employee_code: string
          full_name: string
          hire_date?: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role: Database["public"]["Enums"]["employee_role"]
          specializations?: string[] | null
          updated_at?: string | null
        }
        Update: {
          base_salary?: number | null
          commission_rate?: number | null
          created_at?: string | null
          email?: string
          employee_code?: string
          full_name?: string
          hire_date?: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["employee_role"]
          specializations?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      equipment_usage: {
        Row: {
          appointment_id: string | null
          created_at: string | null
          equipment_name: string
          id: string
          maintenance_cost: number | null
          room_id: string
          usage_end: string | null
          usage_start: string
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string | null
          equipment_name: string
          id?: string
          maintenance_cost?: number | null
          room_id: string
          usage_end?: string | null
          usage_start: string
        }
        Update: {
          appointment_id?: string | null
          created_at?: string | null
          equipment_name?: string
          id?: string
          maintenance_cost?: number | null
          room_id?: string
          usage_end?: string | null
          usage_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_usage_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_usage_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_transactions: {
        Row: {
          amount: number
          appointment_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          payment_method: string | null
          reference_number: string | null
          transaction_date: string | null
          transaction_type: string
        }
        Insert: {
          amount: number
          appointment_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_method?: string | null
          reference_number?: string | null
          transaction_date?: string | null
          transaction_type: string
        }
        Update: {
          amount?: number
          appointment_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_method?: string | null
          reference_number?: string | null
          transaction_date?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_transactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          capacity: number | null
          created_at: string | null
          equipment: string[] | null
          hourly_cost: number | null
          id: string
          is_available: boolean | null
          room_name: string
          room_number: string
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          equipment?: string[] | null
          hourly_cost?: number | null
          id?: string
          is_available?: boolean | null
          room_name: string
          room_number: string
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          equipment?: string[] | null
          hourly_cost?: number | null
          id?: string
          is_available?: boolean | null
          room_name?: string
          room_number?: string
        }
        Relationships: []
      }
      schedule_exceptions: {
        Row: {
          created_at: string
          employee_id: string
          end_time: string | null
          exception_date: string
          id: string
          is_available: boolean
          reason: string | null
          start_time: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          end_time?: string | null
          exception_date: string
          id?: string
          is_available?: boolean
          reason?: string | null
          start_time?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          end_time?: string | null
          exception_date?: string
          id?: string
          is_available?: boolean
          reason?: string | null
          start_time?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_exceptions_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      service_catalog: {
        Row: {
          base_price: number
          code: string
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          base_price?: number
          code: string
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          base_price?: number
          code?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      appointment_status: "scheduled" | "completed" | "cancelled" | "no_show"
      appointment_type:
        | "physiotherapy"
        | "massage"
        | "gym_session"
        | "consultation"
        | "follow_up"
      employee_role:
        | "junior"
        | "junior_associate"
        | "associate"
        | "manager"
        | "team_leader"
        | "partner"
      payment_status: "pending" | "paid" | "overdue" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      appointment_status: ["scheduled", "completed", "cancelled", "no_show"],
      appointment_type: [
        "physiotherapy",
        "massage",
        "gym_session",
        "consultation",
        "follow_up",
      ],
      employee_role: [
        "junior",
        "junior_associate",
        "associate",
        "manager",
        "team_leader",
        "partner",
      ],
      payment_status: ["pending", "paid", "overdue", "cancelled"],
    },
  },
} as const
