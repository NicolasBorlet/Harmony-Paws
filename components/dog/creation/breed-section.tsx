import { i18n } from '@/app/_layout'
import CustomPicker from '@/components/picker'
import { Body } from '@/components/ui/text'
import { Database } from '@/database.types'
import { storage } from '@/lib/utils/storage'
import { useCallback, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

type Breed = Database['public']['Tables']['breeds']['Row']

interface Props {
  breeds: Breed[] | undefined
}

export default function DogBreedSection({ breeds }: Props) {
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null)
  const [isPickerVisible, setIsPickerVisible] = useState(false)

  const handleBreedSelect = useCallback(
    (values: any[]) => {
      console.log('Selected values:', values)
      const selectedValue = values[0]
      console.log('Selected value:', selectedValue)

      const breed = breeds?.find(b => b.id.toString() === selectedValue)
      console.log('Found breed:', breed)

      if (!breed) return

      setSelectedBreed(breed)
      const existingData = storage.getString('dog')
      console.log('Existing data:', existingData)

      const dogData = existingData ? JSON.parse(existingData) : {}
      console.log('Parsed dog data:', dogData)

      const updatedData = {
        ...dogData,
        breed_id: breed.id,
      }
      console.log('Updated data:', updatedData)

      storage.set('dog', JSON.stringify(updatedData))
      setIsPickerVisible(false)
    },
    [breeds],
  )

  const breedColumns = [
    {
      items:
        breeds?.map(breed => ({
          label: breed.name,
          value: breed.id.toString(),
        })) || [],
    },
  ]

  return (
    <View style={styles.container}>
      <Body color='black'>{i18n.t('dogCreation.dogBreedQuestion')}</Body>
      <CustomPicker
        isVisible={isPickerVisible}
        onClose={() => setIsPickerVisible(false)}
        onConfirm={handleBreedSelect}
        type='custom'
        initialValue={selectedBreed?.id.toString()}
        columns={breedColumns}
        confirmText='OK'
        cancelText='Annuler'
      />
      <Pressable style={styles.input} onPress={() => setIsPickerVisible(true)}>
        <Body color='#696969'>
          {selectedBreed
            ? selectedBreed.name
            : i18n.t('dogCreation.addDogBreed')}
        </Body>
      </Pressable>
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
