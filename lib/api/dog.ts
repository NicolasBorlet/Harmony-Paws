import { supabase } from '../supabase';
import { SQLiteDatabase } from 'expo-sqlite';
import { Dog } from './types';

export const dogApi = {
  async getDog(dogId: string): Promise<Dog> {
    const { data, error } = await supabase
      .from('dogs')
      .select('*')
      .eq('id', dogId)
      .single();
    
    if (error) throw error;
    return {
      ...data,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at)
    };
  },

  async getDogsByOwner(ownerId: string): Promise<Dog[]> {
    const { data, error } = await supabase
      .from('dogs')
      .select('*')
      .eq('owner_id', ownerId);
    
    if (error) throw error;
    return data.map(dog => ({
      ...dog,
      created_at: new Date(dog.created_at),
      updated_at: new Date(dog.updated_at)
    }));
  },

  async createDog(dog: Omit<Dog, 'id' | 'created_at' | 'updated_at'>): Promise<Dog> {
    const { data, error } = await supabase
      .from('dogs')
      .insert(dog)
      .select()
      .single();
    
    if (error) throw error;
    return {
      ...data,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at)
    };
  },

  async updateDog(dogId: string, updates: Partial<Omit<Dog, 'id' | 'created_at' | 'updated_at'>>): Promise<Dog> {
    const { data, error } = await supabase
      .from('dogs')
      .update(updates)
      .eq('id', dogId)
      .select()
      .single();
    
    if (error) throw error;
    return {
      ...data,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at)
    };
  },

  async deleteDog(dogId: string): Promise<void> {
    const { error } = await supabase
      .from('dogs')
      .delete()
      .eq('id', dogId);
    
    if (error) throw error;
  }
};

export const dogLocalStorage = {
  async syncDogs(db: SQLiteDatabase, ownerId: string): Promise<void> {
    try {
      const dogs = await dogApi.getDogsByOwner(ownerId);
      
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS dogs (
          id INTEGER PRIMARY KEY,
          owner_id INTEGER,
          name TEXT,
          breed TEXT,
          description TEXT,
          dominance TEXT,
          sex TEXT,
          age INTEGER,
          image TEXT,
          created_at TEXT,
          updated_at TEXT
        )
      `);

      for (const dog of dogs) {
        await db.runAsync(
          `INSERT OR REPLACE INTO dogs (
            id, owner_id, name, breed, description, dominance, sex, age, image, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            dog.id,
            dog.owner_id,
            dog.name,
            dog.breed,
            dog.description,
            dog.dominance,
            dog.sex,
            dog.age,
            dog.image,
            dog.created_at.toISOString(),
            dog.updated_at.toISOString()
          ]
        );
      }
    } catch (error) {
      console.error('Error syncing dogs:', error);
      throw error;
    }
  },

  async getLocalDogs(db: SQLiteDatabase, ownerId: string): Promise<Dog[]> {
    const results = await db.getAllAsync<any>(
      'SELECT * FROM dogs WHERE owner_id = ? ORDER BY updated_at DESC',
      [ownerId]
    );

    return results.map(dog => ({
      ...dog,
      created_at: new Date(dog.created_at),
      updated_at: new Date(dog.updated_at)
    }));
  }
};
