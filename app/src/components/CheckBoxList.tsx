import { useTheme } from '@hyperledger/aries-bifold-core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native'

import { SelectedFilterType } from '../types/activities'

import CustomCheckBox from './CustomCheckBox'
interface CheckBoxListProps {
  data: SelectedFilterType[]
  selectedItems: { [key: string]: boolean }
  handleSelect: (id: string) => void
}
const CheckBoxList: React.FC<CheckBoxListProps> = ({ data, selectedItems, handleSelect }) => {
  const { t } = useTranslation()
  const { TextTheme } = useTheme()
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      width: '100%',
    },
    title: {
      flex: 1,
      fontSize: 18,
      color: TextTheme.labelTitle.color,
      paddingLeft: 10,
    },
  })

  const renderItem: ListRenderItem<SelectedFilterType> = ({ item }) => (
    <View style={styles.row}>
      <CustomCheckBox selected={selectedItems[item.id] || false} setSelected={() => handleSelect(item.id)} />
      <Text style={styles.title}>{t(item.title)}</Text>
    </View>
  )

  return <FlatList data={data} keyExtractor={(item) => item.id} renderItem={renderItem} />
}

export default CheckBoxList
