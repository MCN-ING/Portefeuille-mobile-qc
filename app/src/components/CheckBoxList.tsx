import React from 'react'
import { View, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native'

import CustomCheckBox from './CustomCheckBox'

const CheckBoxList: React.FC<{
  data: Array<{ id: string; title: string }>
  selectedItems: { [key: string]: boolean } // Objet d'état des éléments sélectionnés
  handleSelect: (id: string) => void // Fonction pour changer l'état de sélection
}> = ({ data, selectedItems, handleSelect }) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      width: '50%',
    },
    title: {
      flex: 1,
      fontSize: 18,
      color: '#333',
    },
  })

  const renderItem: ListRenderItem<{ id: string; title: string }> = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.title}>{item.title}</Text>
      <CustomCheckBox
        selected={selectedItems[item.id] || false} // Vérifie si l'élément est sélectionné
        setSelected={() => handleSelect(item.id)} // Met à jour l'état dans le parent
      />
    </View>
  )

  return <FlatList data={data} keyExtractor={(item) => item.id} renderItem={renderItem} />
}

export default CheckBoxList
