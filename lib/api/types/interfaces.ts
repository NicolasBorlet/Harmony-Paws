import { ActivityVisibility, ActivityType, DogDominance, DogSex } from './enums';

export interface BaseEntity {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface User extends BaseEntity {
  // Add user properties based on your needs
  email: string;
  name: string;
}

export interface UserFormation extends BaseEntity {
  user_id: number;
  formation_id: number;
}

export interface Opinion extends BaseEntity {
  user_id: number;
  formation_id: number;
  grade: number;
  description: string;
}

export interface Formation extends BaseEntity {
  animator_name: string;
  price: number;
  description: string;
  place: string;
  date: Date;
  participant_limit: number;
  duration: number;
}

export interface Step extends BaseEntity {
  activity_id: number;
  place: string;
  estimated_hour: Date;
}

export interface Activity extends BaseEntity {
  creator_id: number;
  place: string;
  visibility: ActivityVisibility;
  type: ActivityType;
  date: Date;
  duration: string;
}

export interface UserActivity extends BaseEntity {
  user_id: number;
  activity_id: number;
}

export interface MedicalForm extends BaseEntity {
  dog_id: number;
}

export interface Dog extends BaseEntity {
  owner_id: number;
  name: string;
  breed: string;
  description: string;
  dominance: DogDominance;
  sex: DogSex;
  age: number;
  image: string;
}
