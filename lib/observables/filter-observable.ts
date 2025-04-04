import { observable } from '@legendapp/state'

export const dogFilters = observable({
  sex: null as 'male' | 'female' | null,
  age: null as number | null,
  dominance: null as 'neutral' | 'dominant' | 'dominated' | null,
  temp: {
    sex: null as 'male' | 'female' | null,
    age: null as number | null,
    dominance: null as 'neutral' | 'dominant' | 'dominated' | null,
  },
})

export const rideFilters = observable({
  type: null as 'forest' | 'city' | 'plage' | null,
  date: null as string | null,
  duration: null as string | null,
  temp: {
    type: null as 'forest' | 'city' | 'plage' | null,
    date: null as string | null,
    duration: null as string | null,
  },
})
