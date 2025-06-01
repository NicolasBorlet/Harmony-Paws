import { i18n } from '@/app/_layout'
import CustomPicker from '@/components/picker'
import { Body } from '@/components/ui/text'
import { Database } from '@/database.types'
import { storage } from '@/lib/utils/storage'
import { useCallback, useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

type Breed = Database['public']['Tables']['breeds']['Row']

interface Props {
  breeds: Breed[] | undefined
  initialBreed?: Breed | null
  onBreedChange?: (breed: Breed) => void
  isModifying?: boolean
}

export default function DogBreedSection({
  breeds,
  initialBreed,
  onBreedChange,
  isModifying = false,
}: Props) {
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(
    initialBreed || null,
  )
  const [isPickerVisible, setIsPickerVisible] = useState(false)

  useEffect(() => {
    setSelectedBreed(initialBreed || null)
  }, [initialBreed])

  const handleBreedSelect = useCallback(
    (values: any[]) => {
      const selectedValue = values[0]
      const breed = breeds?.find(b => b.id.toString() === selectedValue)

      if (!breed) return

      setSelectedBreed(breed)

      if (!isModifying) {
        const existingData = storage.getString('dog')
        const dogData = existingData ? JSON.parse(existingData) : {}
        storage.set(
          'dog',
          JSON.stringify({
            ...dogData,
            breed_id: breed.id,
          }),
        )
      }

      onBreedChange?.(breed)
      setIsPickerVisible(false)
    },
    [breeds, isModifying, onBreedChange],
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
    <View style={[styles.container, isModifying && { paddingHorizontal: 0 }]}>
      <Body color='black'>{i18n.t('dogCreation.dogBreedQuestion')}</Body>
      <CustomPicker
        isVisible={isPickerVisible}
        onClose={() => setIsPickerVisible(false)}
        onConfirm={handleBreedSelect}
        type='custom'
        initialValue={selectedBreed?.id?.toString() || ''}
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
