import { i18n } from '@/lib/i18n'
import Prescription from '@/assets/svg/documents/prescription'
import { Colors } from '@/constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import EvilIcons from '@expo/vector-icons/build/EvilIcons'
import { StyleSheet, View } from 'react-native'
import { BodySemiBold, ExtraSmall } from '../ui/text'

export default function ItemListing({ item }: { item?: any }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Prescription />
      </View>
      <View style={styles.contentContainer}>
        <BodySemiBold color={Colors.white}>
          {item.type === 'prescription'
            ? i18n.t('documents.prescription')
            : i18n.t('documents.facture')}
        </BodySemiBold>
        <View>
          <View style={styles.iconTextContainer}>
            <EvilIcons name='calendar' size={16} color={Colors.white} />
            <ExtraSmall color={Colors.white}>
              {item.created_at.toLocaleDateString('fr-FR')}
            </ExtraSmall>
          </View>
          <View style={styles.iconTextContainer}>
            <MaterialCommunityIcons
              name='map-marker-outline'
              size={16}
              color={Colors.white}
            />
            <ExtraSmall color={Colors.white}>{item.place}</ExtraSmall>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.purple[500],
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: Colors.white,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    gap: 6,
  },
  iconTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
})
