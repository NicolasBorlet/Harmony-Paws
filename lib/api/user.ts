import { supabase } from '../supabase';
import { SQLiteDatabase } from 'expo-sqlite';
import { User } from './types';

export interface Profile {
  id: string;
  username: string;
  website?: string;
  avatar_url?: string;
  updated_at: Date;
}

export const userApi = {
  async getUserIdByUid(uid: string): Promise<number> {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('uid', uid)
      .single();
    
    if (error) throw error;
    return data.id;
  },

  async getProfile(userId: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProfile(user: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(user)
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  }
};

export const userLocalStorage = {
  async syncProfile(db: SQLiteDatabase, userId: string): Promise<void> {
    try {
      const profile = await userApi.getProfile(userId);
      
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          email TEXT,
          name TEXT,
          created_at TEXT,
          updated_at TEXT
        )
      `);

      await db.runAsync(
        'INSERT OR REPLACE INTO users (id, email, name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
        [
          profile.id,
          profile.email,
          profile.name,
          profile.created_at.toISOString(),
          profile.updated_at.toISOString()
        ]
      );
    } catch (error) {
      console.error('Error syncing profile:', error);
      throw error;
    }
  },

  async getLocalProfile(db: SQLiteDatabase, userId: string): Promise<User | null> {
    const result = await db.getFirstAsync<any>(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );

    if (!result) return null;

    return {
      ...result,
      created_at: new Date(result.created_at),
      updated_at: new Date(result.updated_at)
    };
  }
};
