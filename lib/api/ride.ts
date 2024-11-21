import { supabase } from '../supabase';
import { SQLiteDatabase } from 'expo-sqlite';
import { Activity, Step } from './types';

export interface Ride {
  id: string;
  title: string;
  description?: string;
  start_time: Date;
  duration_minutes: number;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  owner_id: string;
  dog_id: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

export const rideApi = {
  async getRide(rideId: string): Promise<Activity> {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('id', rideId)
      .single();
    
    if (error) throw error;
    return {
      ...data,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
      date: new Date(data.date)
    };
  },

  async getRidesByCreator(creatorId: string): Promise<Activity[]> {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('creator_id', creatorId);
    
    if (error) throw error;
    return data.map(activity => ({
      ...activity,
      created_at: new Date(activity.created_at),
      updated_at: new Date(activity.updated_at),
      date: new Date(activity.date)
    }));
  },

  async createRide(activity: Omit<Activity, 'id' | 'created_at' | 'updated_at'>): Promise<Activity> {
    const { data, error } = await supabase
      .from('activities')
      .insert(activity)
      .select()
      .single();
    
    if (error) throw error;
    return {
      ...data,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
      date: new Date(data.date)
    };
  },

  async updateRide(rideId: string, updates: Partial<Omit<Activity, 'id' | 'created_at' | 'updated_at'>>): Promise<Activity> {
    const { data, error } = await supabase
      .from('activities')
      .update(updates)
      .eq('id', rideId)
      .select()
      .single();
    
    if (error) throw error;
    return {
      ...data,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
      date: new Date(data.date)
    };
  },

  async deleteRide(rideId: string): Promise<void> {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', rideId);
    
    if (error) throw error;
  },

  // Steps management
  async addStep(step: Omit<Step, 'id' | 'created_at' | 'updated_at'>): Promise<Step> {
    const { data, error } = await supabase
      .from('steps')
      .insert(step)
      .select()
      .single();
    
    if (error) throw error;
    return {
      ...data,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
      estimated_hour: new Date(data.estimated_hour)
    };
  },

  async getSteps(activityId: string): Promise<Step[]> {
    const { data, error } = await supabase
      .from('steps')
      .select('*')
      .eq('activity_id', activityId);
    
    if (error) throw error;
    return data.map(step => ({
      ...step,
      created_at: new Date(step.created_at),
      updated_at: new Date(step.updated_at),
      estimated_hour: new Date(step.estimated_hour)
    }));
  }
};

export const rideLocalStorage = {
  async syncRides(db: SQLiteDatabase, creatorId: string): Promise<void> {
    try {
      const activities = await rideApi.getRidesByCreator(creatorId);
      
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS activities (
          id INTEGER PRIMARY KEY,
          creator_id INTEGER,
          place TEXT,
          visibility TEXT,
          type TEXT,
          date TEXT,
          duration TEXT,
          created_at TEXT,
          updated_at TEXT
        )
      `);

      for (const activity of activities) {
        await db.runAsync(
          `INSERT OR REPLACE INTO activities (
            id, creator_id, place, visibility, type, date, duration, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            activity.id,
            activity.creator_id,
            activity.place,
            activity.visibility,
            activity.type,
            activity.date.toISOString(),
            activity.duration,
            activity.created_at.toISOString(),
            activity.updated_at.toISOString()
          ]
        );
      }
    } catch (error) {
      console.error('Error syncing activities:', error);
      throw error;
    }
  },

  async getLocalRides(db: SQLiteDatabase, creatorId: string): Promise<Activity[]> {
    const results = await db.getAllAsync<any>(
      'SELECT * FROM activities WHERE creator_id = ?',
      [creatorId]
    );

    return results.map(activity => ({
      ...activity,
      created_at: new Date(activity.created_at),
      updated_at: new Date(activity.updated_at),
      date: new Date(activity.date)
    }));
  }
};
