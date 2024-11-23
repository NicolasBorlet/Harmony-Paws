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

export interface DogCardInterface {
  id: number;
  name: string;
  age: number;
  sex: string;
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

  async getDogs(page: number = 0, limit: number = 5): Promise<{ dogs: DogCardInterface[], hasMore: boolean }> {
    const offset = page * limit;
    
    try {
      const { data, error, count } = await supabase
        .from('dogs')
        .select('id, name, age, sex, image, created_at, updated_at', { count: 'exact' })
        .range(offset, offset + limit - 1);
      
      if (error) {
        if (error.code === 'PGRST103') {
          return { dogs: [], hasMore: false };
        }
        throw error;
      }
      
      if (!data) return { dogs: [], hasMore: false };
      
      const dogs = data.map(dog => ({
        ...dog,
        created_at: new Date(dog.created_at),
        updated_at: new Date(dog.updated_at)
      }));

      const hasMore = count ? offset + limit < count : false;
      
      return { dogs, hasMore };
    } catch (error) {
      console.error('Error in getDogs:', error);
      return { dogs: [], hasMore: false };
    }
  },

  async getAllDogsForSync(): Promise<DogCardInterface[]> {
    const { data, error } = await supabase
      .from('dogs')
      .select('id, name, age, sex, image, created_at, updated_at', { count: 'exact' })
    
    if (error) throw error;
    if (!data) return [];

    console.log('All dogs for sync:', data);
    
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
      const dogs = await dogApi.getAllDogsForSync();
      
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
            `INSERT OR REPLACE INTO dogs (
              id, owner_id, name, breed_id, description, dominance, sex, age, image, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              dog.id,
              null, // owner_id will be updated later with full data
              dog.name,
              null, // breed_id will be updated later with full data
              null, // description will be updated later with full data
              null, // dominance will be updated later with full data
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
        }
      }
    } catch (error) {
      console.error('Error in syncAllDogs:', error);
      throw error;
    }
  },

  async syncLocalDog(db: SQLiteDatabase, dog: Dog): Promise<void> {
    try {
      console.log('Syncing local dog:', dog);
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
      console.log('Successfully synced local dog:', dog.id);
    } catch (error) {
      console.error('Error syncing local dog:', error);
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

  async getLocalDog(db: SQLiteDatabase, dogId: string): Promise<Dog | null> {
    const result = await db.getFirstAsync<any>(
      'SELECT * FROM dogs WHERE id = ?',
      [dogId]
    );
    if (!result) return null;
    return {
      ...result,
      created_at: new Date(result.created_at),
      updated_at: new Date(result.updated_at)
    };
  },

  async syncDog(db: SQLiteDatabase, dogId: string): Promise<void> {
    try {
      const dog = await dogApi.getDog(dogId);
      
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
    } catch (error) {
      console.error('Error syncing dog:', error);
      throw error;
    }
  },

  async syncOwnerDogs(db: SQLiteDatabase, ownerId: string): Promise<void> {
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

  async getLocalOwnerDogs(db: SQLiteDatabase, ownerId: string): Promise<Dog[]> {
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
