import { Database } from '@/database.types'

export type Message = Database['public']['Tables']['messages']['Row'] & {
  sender: Database['public']['Tables']['users']['Row']
}

export type Conversation = Database['public']['Tables']['conversations']['Row']

export type GiftedChatMessage = {
  _id: number
  text: string | null
  createdAt: Date
  user: {
    _id: number
    name: string | null
  }
} 