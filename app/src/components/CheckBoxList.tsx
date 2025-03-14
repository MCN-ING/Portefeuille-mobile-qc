import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native'

import CustomCheckBox from './CustomCheckBox'

const CheckBoxList: React.FC<{
  data: Array<{ id: string; title: string }>
  selectedItems: { [key: string]: boolean }
  handleSelect: (id: string) => void
}> = ({ data, selectedItems, handleSelect }) => {
  const { t } = useTranslation()
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
      color: '#333',
      paddingLeft: 10,
    },
  })

  const renderItem: ListRenderItem<{ id: string; title: string }> = ({ item }) => (
    <View style={styles.row}>
      <CustomCheckBox
        selected={selectedItems[item.id] || false} // Vérifie si l'élément est sélectionné
        setSelected={() => handleSelect(item.id)} // Met à jour l'état dans le parent
      />
      <Text style={styles.title}>{t(item.title)}</Text>
    </View>
  )

  return <FlatList data={data} keyExtractor={(item) => item.id} renderItem={renderItem} />
}

export default CheckBoxList
