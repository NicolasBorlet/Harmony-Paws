import { i18n } from '@/app/_layout'
import Dropdown from '@/components/dropdown/animated-dropdown'
import { Body } from '@/components/ui/text'
import { Database } from '@/database.types'
import { IOption } from '@/lib/utils/drop-down'
import { storage } from '@/lib/utils/storage'
import { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'

type Breed = Database['public']['Tables']['breeds']['Row']

interface Props {
  breeds: Breed[] | undefined
}

export default function DogBreedSection({ breeds }: Props) {
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null)

  const handleBreedSelect = useCallback(
    (option: IOption) => {
      const breed = breeds?.find(b => b.id.toString() === option.value)
      if (!breed) return

      setSelectedBreed(breed)
      const existingData = storage.getString('dog')
      const dogData = existingData ? JSON.parse(existingData) : {}

      storage.set(
        'dog',
        JSON.stringify({
          ...dogData,
          breed_id: breed.id,
        }),
      )
    },
    [breeds],
  )

  const breedOptions =
    breeds?.map(breed => ({
      id: breed.id.toString(),
      label: breed.name,
      value: breed.id.toString(),
    })) || []

  return (
    <View style={styles.container}>
      <Body color='black'>{i18n.t('dogCreation.dogBreedQuestion')}</Body>
      <Dropdown
        options={breedOptions}
        placeholder={i18n.t('dogCreation.addDogBreed')}
        onSelect={handleBreedSelect}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingHorizontal: 16,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    color: '#696969',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
  },
})
