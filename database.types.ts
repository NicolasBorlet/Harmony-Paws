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
          type: Database['public']['Enums']['activity_type']
          updated_at: string | null
          visibility: Database['public']['Enums']['activity_visibility']
        }
        Insert: {
          created_at?: string | null
          creator_id?: number | null
          date: string
          duration?: string | null
          id?: number
          place?: string | null
          type: Database['public']['Enums']['activity_type']
          updated_at?: string | null
          visibility: Database['public']['Enums']['activity_visibility']
        }
        Update: {
          created_at?: string | null
          creator_id?: number | null
          date?: string
          duration?: string | null
          id?: number
          place?: string | null
          type?: Database['public']['Enums']['activity_type']
          updated_at?: string | null
          visibility?: Database['public']['Enums']['activity_visibility']
        }
        Relationships: [
          {
            foreignKeyName: 'activities_creator_id_users_id_fk'
            columns: ['creator_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
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
            foreignKeyName: 'conversation_participants_conversation_id_fkey'
            columns: ['conversation_id']
            isOneToOne: false
            referencedRelation: 'conversations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'conversation_participants_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
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
            foreignKeyName: 'dog_behaviors_behavior_id_behavior_id_fk'
            columns: ['behavior_id']
            isOneToOne: false
            referencedRelation: 'behavior'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'dog_behaviors_dog_id_dogs_id_fk'
            columns: ['dog_id']
            isOneToOne: false
            referencedRelation: 'dogs'
            referencedColumns: ['id']
          },
        ]
      }
      dogs: {
        Row: {
          age: number | null
          breed_id: number | null
          created_at: string | null
          description: string | null
          dominance: Database['public']['Enums']['dog_dominance'] | null
          id: number
          name: string
          owner_id: number | null
          sex: Database['public']['Enums']['dog_sex'] | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          breed_id?: number | null
          created_at?: string | null
          description?: string | null
          dominance?: Database['public']['Enums']['dog_dominance'] | null
          id?: number
          name: string
          owner_id?: number | null
          sex?: Database['public']['Enums']['dog_sex'] | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          breed_id?: number | null
          created_at?: string | null
          description?: string | null
          dominance?: Database['public']['Enums']['dog_dominance'] | null
          id?: number
          name?: string
          owner_id?: number | null
          sex?: Database['public']['Enums']['dog_sex'] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'dogs_breed_id_breeds_id_fk'
            columns: ['breed_id']
            isOneToOne: false
            referencedRelation: 'breeds'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'dogs_owner_id_users_id_fk'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      formations: {
        Row: {
          animator_name: string | null
          created_at: string | null
          date: string | null
          description: string | null
          duration: number | null
          id: number
          participant_limit: number | null
          place: string | null
          price: number | null
          updated_at: string | null
        }
        Insert: {
          animator_name?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          duration?: number | null
          id?: number
          participant_limit?: number | null
          place?: string | null
          price?: number | null
          updated_at?: string | null
        }
        Update: {
          animator_name?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          duration?: number | null
          id?: number
          participant_limit?: number | null
          place?: string | null
          price?: number | null
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
          status: Database['public']['Enums']['friend_request_status']
        }
        Insert: {
          created_at?: string
          id?: number
          recipient_id: number
          sender_id: number
          status: Database['public']['Enums']['friend_request_status']
        }
        Update: {
          created_at?: string
          id?: number
          recipient_id?: number
          sender_id?: number
          status: Database['public']['Enums']['friend_request_status']
        }
        Relationships: [
          {
            foreignKeyName: 'friend_requests_recipient_id_fkey'
            columns: ['recipient_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'friend_requests_sender_id_fkey'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      module_materials: {
        Row: {
          created_at: string | null
          id: number
          module_id: number
          material_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          module_id: number
          material_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          module_id?: number
          material_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'module_materials_module_id_modules_id_fk'
            columns: ['module_id']
            isOneToOne: false
            referencedRelation: 'modules'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'module_materials_material_id_materials_id_fk'
            columns: ['material_id']
            isOneToOne: false
            referencedRelation: 'materials'
            referencedColumns: ['id']
          },
        ]
      }
      lessons: {
        Row: {
          created_at: string | null
          id: number
          module_id: number | null
          name: string
          order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          module_id?: number | null
          name: string
          order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          module_id?: number | null
          name?: string
          order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'lessons_module_id_modules_id_fk'
            columns: ['module_id']
            isOneToOne: false
            referencedRelation: 'modules'
            referencedColumns: ['id']
          },
        ]
      }
      materials: {
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
      medical_form: {
        Row: {
          dog_id: number | null
          id: number
        }
        Insert: {
          dog_id?: number | null
          id?: number
        }
        Update: {
          dog_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'medical_form_dog_id_dogs_id_fk'
            columns: ['dog_id']
            isOneToOne: false
            referencedRelation: 'dogs'
            referencedColumns: ['id']
          },
        ]
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
            foreignKeyName: 'messages_conversation_id_fkey'
            columns: ['conversation_id']
            isOneToOne: false
            referencedRelation: 'conversations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'messages_sender_id_fkey'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      modules: {
        Row: {
          created_at: string | null
          id: number
          formation_id: number | null
          name: string
          description: string | null
          duration: number | null
          price: number | null
          stripe_item_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          formation_id?: number | null
          name: string
          description?: string | null
          duration?: number | null
          price?: number | null
          stripe_item_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          formation_id?: number | null
          name?: string
          description?: string | null
          duration?: number | null
          price?: number | null
          stripe_item_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'modules_formation_id_formations_id_fk'
            columns: ['formation_id']
            isOneToOne: false
            referencedRelation: 'formations'
            referencedColumns: ['id']
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
            foreignKeyName: 'opinions_formation_id_formations_id_fk'
            columns: ['formation_id']
            isOneToOne: false
            referencedRelation: 'formations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'opinions_user_id_users_id_fk'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      purchases: {
        Row: {
          created_at: string | null
          id: string
          payment_intent_id: string
          price_id: string
          product_id: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          payment_intent_id: string
          price_id: string
          product_id: string
          status: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          payment_intent_id?: string
          price_id?: string
          product_id?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
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
            foreignKeyName: 'steps_activity_id_activities_id_fk'
            columns: ['activity_id']
            isOneToOne: false
            referencedRelation: 'activities'
            referencedColumns: ['id']
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
            foreignKeyName: 'user_activities_activity_id_activities_id_fk'
            columns: ['activity_id']
            isOneToOne: false
            referencedRelation: 'activities'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_activities_user_id_users_id_fk'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      activity_invitations: {
        Row: {
          created_at: string | null
          id: number
          updated_at: string | null
          sender_id: number | null
          receiver_id: number | null
          activity_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
          sender_id?: number | null
          receiver_id?: number | null
          activity_id?: number | null
          status: Database['public']['Enums']['activity_invitation_status']
        }
        Update: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
          sender_id?: number | null
          receiver_id?: number | null
          activity_id?: number | null
          status: Database['public']['Enums']['activity_invitation_status']
        }
        Relationships: [
          {
            foreignKeyName: 'activity_invitations_sender_id_users_id_fk'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'activity_invitations_receiver_id_users_id_fk'
            columns: ['receiver_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'activity_invitations_activity_id_activities_id_fk'
            columns: ['activity_id']
            isOneToOne: false
            referencedRelation: 'activities'
            referencedColumns: ['id']
          },
        ]
      }
      user_formations: {
        Row: {
          created_at: string | null
          formation_id: number | null
          id: number
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          formation_id?: number | null
          id?: number
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          formation_id?: number | null
          id?: number
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'user_formations_formation_id_formations_id_fk'
            columns: ['formation_id']
            isOneToOne: false
            referencedRelation: 'formations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_formations_user_id_users_id_fk'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      user_purchases: {
        Row: {
          created_at: string | null
          formation_id: number | null
          id: number
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          formation_id?: number | null
          id?: number
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          formation_id?: number | null
          id?: number
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'user_purchases_formation_id_formations_id_fk'
            columns: ['formation_id']
          },
        ]
      }
      users: {
        Row: {
          age: number | null
          created_at: string | null
          description: string | null
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
            foreignKeyName: 'users_role_id_roles_id_fk'
            columns: ['role_id']
            isOneToOne: false
            referencedRelation: 'roles'
            referencedColumns: ['id']
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
      activity_type: 'forest' | 'city' | 'plage'
      activity_visibility: 'private' | 'public'
      dog_dominance: 'neutral' | 'dominant' | 'dominated'
      dog_sex: 'male' | 'female'
      friend_request_status: 'pending' | 'accepted' | 'rejected'
      activity_invitation_status: 'pending' | 'accepted' | 'rejected'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
