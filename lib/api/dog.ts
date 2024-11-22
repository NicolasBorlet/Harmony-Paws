import { supabase } from '../supabase';
import { SQLiteDatabase } from 'expo-sqlite';
import { userApi } from './user';

export interface Dog {
  id: number;
  owner_id: number;
  name: string;
  breed_id: number;
  description: string;
  dominance: string;
  sex: string;
  age: number;
  image: string;
  created_at: Date;
  updated_at: Date;
}

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

  async getDogs(): Promise<Dog[]> {
    const { data, error } = await supabase
      .from('dogs')
      .select('*');
    
    if (error) throw error;
    if (!data) return [];
    
    return data.map(dog => ({
      ...dog,
      created_at: new Date(dog.created_at),
      updated_at: new Date(dog.updated_at)
    }));
  },

  async getDogsByOwner(ownerUid: string): Promise<Dog[]> {
    // First get the numeric user ID
    const ownerId = await userApi.getUserIdByUid(ownerUid);
    
    const { data, error } = await supabase
      .from('dogs')
      .select('*')
      .eq('owner_id', ownerId);
    
    if (error) throw error;
    if (!data) return [];

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
  async syncAllDogs(db: SQLiteDatabase): Promise<void> {
    try {
      console.log('Starting sync for all dogs');
      const dogs = await dogApi.getDogs();
      console.log('Fetched all dogs from Supabase:', dogs.length);
      
      // Create the table if it doesn't exist (don't drop it)
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS dogs (
          id INTEGER PRIMARY KEY,
          owner_id INTEGER,
          name TEXT,
          breed_id INTEGER,
          description TEXT,
          dominance TEXT,
          sex TEXT,
          age INTEGER,
          image TEXT,
          created_at TEXT,
          updated_at TEXT
        )
      `);
      console.log('Ensured dogs table exists');

      // Clear existing data
      await db.execAsync('DELETE FROM dogs');

      for (const dog of dogs) {
        try {
          await db.runAsync(
            `INSERT INTO dogs (
              id, owner_id, name, breed_id, description, dominance, sex, age, image, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              dog.id,
              dog.owner_id,
              dog.name,
              dog.breed_id,
              dog.description,
              dog.dominance,
              dog.sex,
              dog.age,
              dog.image,
              dog.created_at.toISOString(),
              dog.updated_at.toISOString()
            ]
          );
        } catch (insertError) {
          console.error('Error inserting dog:', {
            dogId: dog.id,
            error: insertError
          });
          throw insertError;
        }
      }
      console.log('Successfully synced all dogs');
    } catch (error) {
      console.error('Error syncing all dogs:', error);
      throw error;
    }
  },

  async getAllLocalDogs(db: SQLiteDatabase): Promise<Dog[]> {
    const result = await db.getAllAsync<any>('SELECT * FROM dogs');
    return result.map(row => ({
      ...row,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at)
    }));
  },

  async syncDogs(db: SQLiteDatabase, ownerId: string): Promise<void> {
    try {
      console.log('Starting dog sync for owner:', ownerId);
      const dogs = await dogApi.getDogsByOwner(ownerId);
      console.log('Fetched dogs from Supabase:', dogs.length);
      
      // Drop the existing table to avoid schema conflicts
      await db.execAsync('DROP TABLE IF EXISTS dogs');
      
      // Create the table with correct types
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS dogs (
          id INTEGER PRIMARY KEY,
          owner_id INTEGER,
          name TEXT,
          breed_id INTEGER,
          description TEXT,
          dominance TEXT,
          sex TEXT,
          age INTEGER,
          image TEXT,
          created_at TEXT,
          updated_at TEXT
        )
      `);
      console.log('Created dogs table');

      for (const dog of dogs) {
        try {
          await db.runAsync(
            `INSERT OR REPLACE INTO dogs (
              id, owner_id, name, breed_id, description, dominance, sex, age, image, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              dog.id,
              dog.owner_id,
              dog.name,
              dog.breed_id,
              dog.description,
              dog.dominance,
              dog.sex,
              dog.age,
              dog.image,
              dog.created_at.toISOString(),
              dog.updated_at.toISOString()
            ]
          );
        } catch (insertError) {
          console.error('Error inserting dog:', {
            dogId: dog.id,
            ownerId: dog.owner_id,
            error: insertError
          });
          throw insertError;
        }
      }
      console.log('Successfully synced all dogs');
    } catch (error) {
      console.error('Error syncing dogs:', error);
      throw error;
    }
  },

  async getLocalDogs(db: SQLiteDatabase, ownerId: string): Promise<Dog[]> {
    try {
      const results = await db.getAllAsync<any>(
        'SELECT * FROM dogs WHERE owner_id = ? ORDER BY updated_at DESC',
        [ownerId]
      );

      if (!results) return [];

      return results.map(dog => ({
        ...dog,
        created_at: new Date(dog.created_at),
        updated_at: new Date(dog.updated_at)
      }));
    } catch (error) {
      console.error('Error getting local dogs:', error);
      return [];
    }
  }
};
