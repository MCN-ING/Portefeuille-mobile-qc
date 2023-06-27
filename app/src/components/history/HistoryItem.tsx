import { useTheme } from 'aries-bifold'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { HistoryRecord } from '../../screens/History'

interface Props<T> {
  item: T
  renderItem: (item: T) => React.ReactNode
  onPress: (item: T) => void
  setDisabled?: (item: T) => boolean
}

export function HistoryItem<T extends HistoryRecord>({
  item,
  renderItem,
  onPress,
  setDisabled = () => false,
}: Props<T>) {
  const { ListItems } = useTheme()

  const styles = StyleSheet.create({
    container: {
      ...ListItems.requestTemplateBackground,
      flexGrow: 1,
      flexDirection: 'row',
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
    },
    iconContainer: {
      paddingHorizontal: 0,
      marginRight: 10,
      paddingVertical: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 5,
    },
    state: {
      marginBottom: 5,
    },
  })

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)} disabled={setDisabled(item)}>
      {renderItem(item)}
    </TouchableOpacity>
  )
}
