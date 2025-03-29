import { observable } from '@legendapp/state'

export interface DogMedicalState {
  selectedDogId: string | null
}

export const dogMedical$ = observable<DogMedicalState>({
  selectedDogId: null,
})
