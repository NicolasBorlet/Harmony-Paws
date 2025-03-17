// styles.ts
import { Colors } from '@/constants/Colors'
import { StyleSheet } from 'react-native'

export const ITEM_HEIGHT = 44

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  columnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_HEIGHT * 5,
  },
  column: {
    flex: 1,
    height: '100%',
  },
  item: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedItem: {
    fontWeight: 'bold',
  },
  selectionIndicator: {
    position: 'absolute',
    height: ITEM_HEIGHT,
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.orange[500],
    backgroundColor: 'rgba(247, 164, 0, 0.05)', // Changed from Colors.orange[500]
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: Colors.orange[500],
    borderWidth: 1,
    borderColor: Colors.orange[500],
  },
  confirmText: {
    color: 'white',
    fontFamily: 'Montserrat_700Bold',
    fontWeight: 'bold',
  },
  cancelButton: {
    // backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: Colors.orange[500],
  },
  cancelText: {
    color: Colors.orange[500],
    fontFamily: 'Montserrat_400Regular',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
})
