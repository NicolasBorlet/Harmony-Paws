import { DogListingInterface } from '@/lib/api/types'
import Foundation from '@expo/vector-icons/Foundation'
import { Image } from 'expo-image'
import { memo, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { DogCard } from '../ui/card'
import { CardTitle } from '../ui/text'

const blurhash =
  'L6Pj0^jE.AyE_3t7t7R**0o#DgR4'

const DogItemListing = memo(function DogItemListing({ dog }: { dog: DogListingInterface }) {
  const genderIcon = useMemo(() => {
    if (dog.sex === 'male') {
      return (
        <View style={{ paddingLeft: 10 }}>
          <Foundation name='male-symbol' size={24} color='white' />
        </View>
      )
    }
    return (
      <View style={{ paddingLeft: 10 }}>
        <Foundation name='female-symbol' size={24} color='white' />
      </View>
    )
  }, [dog.sex])

  return (
    <DogCard>
      <Image
        style={styles.image}
        source={dog.image || 'https://picsum.photos/200'}
        placeholder={{ blurhash }}
        contentFit='cover'
        transition={1000}
      />
      <CardTitle style={{ color: '#fff' }}>
        {dog.name}, {dog.age} ans
        {genderIcon}
      </CardTitle>
    </DogCard>
  )
})

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default DogItemListing
