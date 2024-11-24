import { ActivityVisibility, ActivityType, DogDominance, DogSex } from './enums';

export interface BaseEntity {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface User extends BaseEntity {
  uid: string;
  role_id: number;
  age: number;
  place: string;
  description: string;
  first_name: string;
  last_name: string;
  on_boarding: boolean;
  role?: Role;
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
  breed_id: string;
  name: string;
  description: string;
  dominance: DogDominance;
  sex: DogSex;
  age: number;
  image: string;
  breed?: Breed;
  owner?: Owner;
}

export interface Owner {
  id: number;
  name: string;
}

export interface Breed {
  id: number;
  name: string;
}

export interface Role extends BaseEntity {
  name: string;
}

export interface Behavor extends BaseEntity {
  name: string;
}

export interface DogBehavor extends BaseEntity {
  dog_id: number;
  behavor_id: number;
}
