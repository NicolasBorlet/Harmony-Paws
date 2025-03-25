export interface Dog {
  id: number
  name: string
  image: string
  sex: 'male' | 'female'
  age: number
  owner_id: number
  breed_id: number
  description: string
  dominance: string
}

export interface DogListingInterface extends Dog {
  active?: boolean
}
