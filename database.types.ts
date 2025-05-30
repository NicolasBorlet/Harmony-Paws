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
      activities: {
        Row: {
          created_at: string | null
          creator_id: number | null
          date: string
          duration: string | null
          id: number
          place: string | null
          status: Database["public"]["Enums"]["activity_status"]
          type: Database["public"]["Enums"]["activity_type"]
          updated_at: string | null
          visibility: Database["public"]["Enums"]["activity_visibility"]
        }
        Insert: {
          created_at?: string | null
          creator_id?: number | null
          date: string
          duration?: string | null
          id?: number
          place?: string | null
          status?: Database["public"]["Enums"]["activity_status"]
          type: Database["public"]["Enums"]["activity_type"]
          updated_at?: string | null
          visibility: Database["public"]["Enums"]["activity_visibility"]
        }
        Update: {
          created_at?: string | null
          creator_id?: number | null
          date?: string
          duration?: string | null
          id?: number
          place?: string | null
          status?: Database["public"]["Enums"]["activity_status"]
          type?: Database["public"]["Enums"]["activity_type"]
          updated_at?: string | null
          visibility?: Database["public"]["Enums"]["activity_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "activities_creator_id_users_id_fk"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_invitations: {
        Row: {
          activity_id: number
          created_at: string
          id: number
          receiver_id: number
          sender_id: number
          status: Database["public"]["Enums"]["friend_request_status"] | null
          updated_at: string | null
        }
        Insert: {
          activity_id: number
          created_at?: string
          id?: number
          receiver_id: number
          sender_id: number
          status?: Database["public"]["Enums"]["friend_request_status"] | null
          updated_at?: string | null
        }
        Update: {
          activity_id?: number
          created_at?: string
          id?: number
          receiver_id?: number
          sender_id?: number
          status?: Database["public"]["Enums"]["friend_request_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_invitations_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: true
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_invitations_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_invitations_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      behavior: {
        Row: {
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      breeds: {
        Row: {
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      conversation_participants: {
        Row: {
          conversation_id: number
          created_at: string
          id: number
          user_id: number | null
        }
        Insert: {
          conversation_id: number
          created_at?: string
          id?: number
          user_id?: number | null
        }
        Update: {
          conversation_id?: number
          created_at?: string
          id?: number
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          created_at: string
          id: string | null
          stripe_customer_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string | null
          stripe_customer_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string | null
          stripe_customer_id?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          document_type: Database["public"]["Enums"]["document_type"]
          dog_id: number
          file_name: string | null
          id: number
          place: string | null
          reason: string | null
        }
        Insert: {
          created_at?: string
          document_type: Database["public"]["Enums"]["document_type"]
          dog_id: number
          file_name?: string | null
          id?: number
          place?: string | null
          reason?: string | null
        }
        Update: {
          created_at?: string
          document_type?: Database["public"]["Enums"]["document_type"]
          dog_id?: number
          file_name?: string | null
          id?: number
          place?: string | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dogs"
            referencedColumns: ["id"]
          },
        ]
      }
      dog_behaviors: {
        Row: {
          behavior_id: number | null
          created_at: string | null
          dog_id: number | null
          id: number
          updated_at: string | null
        }
        Insert: {
          behavior_id?: number | null
          created_at?: string | null
          dog_id?: number | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          behavior_id?: number | null
          created_at?: string | null
          dog_id?: number | null
          id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dog_behaviors_behavior_id_fkey"
            columns: ["behavior_id"]
            isOneToOne: false
            referencedRelation: "behavior"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dog_behaviors_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dogs"
            referencedColumns: ["id"]
          },
        ]
      }
      dog_measurements: {
        Row: {
          created_at: string
          date: string
          dog_id: number
          height: number | null
          id: number
          weight: number | null
        }
        Insert: {
          created_at?: string
          date: string
          dog_id: number
          height?: number | null
          id?: number
          weight?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          dog_id?: number
          height?: number | null
          id?: number
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dog_measurements_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dogs"
            referencedColumns: ["id"]
          },
        ]
      }
      dogs: {
        Row: {
          age: number
          breed_id: number
          created_at: string | null
          description: string | null
          dominance: Database["public"]["Enums"]["dog_dominance"] | null
          id: number
          name: string
          owner_id: number
          sex: Database["public"]["Enums"]["dog_sex"]
          updated_at: string | null
        }
        Insert: {
          age: number
          breed_id: number
          created_at?: string | null
          description?: string | null
          dominance?: Database["public"]["Enums"]["dog_dominance"] | null
          id?: number
          name: string
          owner_id: number
          sex: Database["public"]["Enums"]["dog_sex"]
          updated_at?: string | null
        }
        Update: {
          age?: number
          breed_id?: number
          created_at?: string | null
          description?: string | null
          dominance?: Database["public"]["Enums"]["dog_dominance"] | null
          id?: number
          name?: string
          owner_id?: number
          sex?: Database["public"]["Enums"]["dog_sex"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dogs_breed_id_breeds_id_fk"
            columns: ["breed_id"]
            isOneToOne: false
            referencedRelation: "breeds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dogs_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      formations: {
        Row: {
          animator_name: string
          created_at: string | null
          description: string
          id: number
          name: string
          price: number
          stripe_item_id: number | null
          updated_at: string | null
        }
        Insert: {
          animator_name: string
          created_at?: string | null
          description: string
          id?: number
          name: string
          price: number
          stripe_item_id?: number | null
          updated_at?: string | null
        }
        Update: {
          animator_name?: string
          created_at?: string | null
          description?: string
          id?: number
          name?: string
          price?: number
          stripe_item_id?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      friend_requests: {
        Row: {
          created_at: string
          id: number
          recipient_id: number
          sender_id: number
          status: Database["public"]["Enums"]["friend_request_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          recipient_id: number
          sender_id: number
          status?: Database["public"]["Enums"]["friend_request_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          recipient_id?: number
          sender_id?: number
          status?: Database["public"]["Enums"]["friend_request_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "friend_requests_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friend_requests_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_steps: {
        Row: {
          content: string | null
          created_at: string
          id: number
          lesson_id: number
          order: number
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          lesson_id: number
          order: number
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          lesson_id?: number
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "lesson_steps_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          created_at: string
          id: number
          module_id: number
          order: number | null
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          module_id: number
          order?: number | null
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          module_id?: number
          order?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string | null
          conversation_id: number | null
          created_at: string
          id: number
          is_read: boolean | null
          sender_id: number | null
        }
        Insert: {
          content?: string | null
          conversation_id?: number | null
          created_at?: string
          id?: number
          is_read?: boolean | null
          sender_id?: number | null
        }
        Update: {
          content?: string | null
          conversation_id?: number | null
          created_at?: string
          id?: number
          is_read?: boolean | null
          sender_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      module_materials: {
        Row: {
          created_at: string
          id: number
          material_id: number | null
          module_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          material_id?: number | null
          module_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          material_id?: number | null
          module_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_materials_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_materials_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          created_at: string
          description: string | null
          duration: string | null
          formation_id: number
          id: number
          name: string
          price: number | null
          stripe_item_id: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration?: string | null
          formation_id: number
          id?: number
          name: string
          price?: number | null
          stripe_item_id?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          duration?: string | null
          formation_id?: number
          id?: number
          name?: string
          price?: number | null
          stripe_item_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "modules_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
        ]
      }
      opinions: {
        Row: {
          created_at: string | null
          description: string | null
          formation_id: number | null
          grade: number | null
          id: number
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          formation_id?: number | null
          grade?: number | null
          id?: number
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          formation_id?: number | null
          grade?: number | null
          id?: number
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "opinions_formation_id_formations_id_fk"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opinions_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      steps: {
        Row: {
          activity_id: number | null
          created_at: string | null
          estimated_hour: string | null
          id: number
          place: string | null
          updated_at: string | null
        }
        Insert: {
          activity_id?: number | null
          created_at?: string | null
          estimated_hour?: string | null
          id?: number
          place?: string | null
          updated_at?: string | null
        }
        Update: {
          activity_id?: number | null
          created_at?: string | null
          estimated_hour?: string | null
          id?: number
          place?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "steps_activity_id_activities_id_fk"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activities: {
        Row: {
          activity_id: number | null
          created_at: string | null
          id: number
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          activity_id?: number | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          activity_id?: number | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_activities_activity_id_activities_id_fk"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activities_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          content_type: Database["public"]["Enums"]["content_type"] | null
          created_at: string
          formation_id: number | null
          id: number
          lesson_id: number | null
          module_id: number | null
          progress_percentage: number | null
          user_id: number | null
        }
        Insert: {
          content_type?: Database["public"]["Enums"]["content_type"] | null
          created_at?: string
          formation_id?: number | null
          id?: number
          lesson_id?: number | null
          module_id?: number | null
          progress_percentage?: number | null
          user_id?: number | null
        }
        Update: {
          content_type?: Database["public"]["Enums"]["content_type"] | null
          created_at?: string
          formation_id?: number | null
          id?: number
          lesson_id?: number | null
          module_id?: number | null
          progress_percentage?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_purchases: {
        Row: {
          content_type: Database["public"]["Enums"]["content_type"] | null
          created_at: string
          formation_id: number | null
          id: number
          module_id: number | null
          stripe_purchase_id: number | null
          user_id: number | null
        }
        Insert: {
          content_type?: Database["public"]["Enums"]["content_type"] | null
          created_at?: string
          formation_id?: number | null
          id?: number
          module_id?: number | null
          stripe_purchase_id?: number | null
          user_id?: number | null
        }
        Update: {
          content_type?: Database["public"]["Enums"]["content_type"] | null
          created_at?: string
          formation_id?: number | null
          id?: number
          module_id?: number | null
          stripe_purchase_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_purchases_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_purchases_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          age: number | null
          created_at: string | null
          description: string | null
          expo_push_token: string | null
          first_name: string | null
          id: number
          last_name: string | null
          onBoarding: boolean
          place: string | null
          role_id: number | null
          uid: string
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          description?: string | null
          expo_push_token?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          onBoarding?: boolean
          place?: string | null
          role_id?: number | null
          uid: string
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          description?: string | null
          expo_push_token?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          onBoarding?: boolean
          place?: string | null
          role_id?: number | null
          uid?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_role_id_roles_id_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      vaccinations: {
        Row: {
          created_at: string
          date_administered: string | null
          dog_id: number | null
          id: number
          next_due_date: string | null
          vaccine_name: string | null
        }
        Insert: {
          created_at?: string
          date_administered?: string | null
          dog_id?: number | null
          id?: number
          next_due_date?: string | null
          vaccine_name?: string | null
        }
        Update: {
          created_at?: string
          date_administered?: string | null
          dog_id?: number | null
          id?: number
          next_due_date?: string | null
          vaccine_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vaccinations_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dogs"
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
      activity_status: "finished" | "in progress" | "not started"
      activity_type: "forest" | "city" | "plage"
      activity_visibility: "private" | "public"
      content_type: "formation" | "module" | "lesson"
      document_type: "invoice" | "prescription"
      dog_dominance: "neutral" | "dominant" | "dominated"
      dog_sex: "male" | "female"
      friend_request_status: "accepted" | "refused" | "pending"
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
    Enums: {
      activity_status: ["finished", "in progress", "not started"],
      activity_type: ["forest", "city", "plage"],
      activity_visibility: ["private", "public"],
      content_type: ["formation", "module", "lesson"],
      document_type: ["invoice", "prescription"],
      dog_dominance: ["neutral", "dominant", "dominated"],
      dog_sex: ["male", "female"],
      friend_request_status: ["accepted", "refused", "pending"],
    },
  },
} as const
