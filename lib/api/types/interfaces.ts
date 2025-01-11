import { ActivityType, ActivityVisibility, DogDominance, DogSex } from './enums';

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
  name: string;
  subject: string;
  image: string;
  animator_name: string;
  price: number;
  old_price?: number;
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

export interface Advice extends BaseEntity {
  title: string;
  description: string;
  rating: number;
  date: Date;
  creator: {
    id: number;
    name: string;
    image: string;
  }
}

export interface Dog extends BaseEntity {
  owner_id: number;
  breed_id: number;
  name: string;
  description: string;
  dominance: DogDominance;
  sex: DogSex;
  age: number;
  image: string;
  breed?: Breed;
  owner?: Owner;
}

export interface DogDetailsInterface extends Dog {
  owner: Owner;
  breed: Breed;
}

export interface DogListingInterface extends BaseEntity {
  name: string;
  age: number;
  sex: DogSex;
  image: string;
}

export interface Owner {
  id: number;
  first_name: string;
  last_name: string;
}

export interface Breed {
  name: string;
}

export interface Role extends BaseEntity {
  name: string;
}

export type Behavior = {
  id: string;
  name: string;
}

type DogBehavior = {
  behavor: {
    id: string;
    name: string;
  }
}

export type DogDetailsResponse = {
  id: string;
  name: string;
  age: number;
  sex: string;
  image: string;
  description: string;
  dominance: string;
  created_at: string;
  updated_at: string;
  owner: {
    id: string;
    first_name: string;
    last_name: string;
    image: string;
  };
  breed: {
    name: string;
  };
  dog_behaviors: DogBehavior[];
}

export interface DogBehavor extends BaseEntity {
  dog_id: number;
  behavor_id: number;
}

export interface ActivityListingInterface extends BaseEntity {
  place: string;
  date: Date;
  duration: string;
}