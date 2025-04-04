import { observable } from '@legendapp/state'

export const tabState = observable<'dog' | 'ride'>('dog')
