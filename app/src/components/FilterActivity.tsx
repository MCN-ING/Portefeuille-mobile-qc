import { useTheme } from '@hyperledger/aries-bifold-core'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated } from 'react-native'

import CheckBoxList from './CheckBoxList'

const FilterActivity = () => {
  const { ColorPallet, TextTheme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({}) // Objet pour suivre les éléments sélectionnés
  const [animation] = useState(new Animated.Value(0))

  const items = [
    { id: '1', title: 'Option 1', content: '...' },
    { id: '2', title: 'Option 2', content: '...' },
    { id: '3', title: 'Option 3', content: '...' },
    { id: '4', title: 'Option 4', content: '...' },
  ]

  const toggleDropdown = () => {
    if (isVisible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
    setIsVisible(!isVisible)
  }

  const handleSelectItem = (id: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }
  const handleDeselectAll = () => {
    setSelectedItems({})
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      width: '90%',
      paddingHorizontal: 10,
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
      color: '#000',
    },
    button: {
      backgroundColor: '#fff',
    },
    buttonText: {
      color: '#000',
      fontSize: 18,
    },
    dropdownContainer: {
      position: 'absolute',
      top: 45, // Positionner la liste sous le champ de texte
      left: 20,
      right: 20,
      backgroundColor: '#fff',
      borderRadius: 5,
      overflow: 'hidden',
      zIndex: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      borderLeftWidth: 1,
      borderLeftColor: '#ddd',
      borderRightWidth: 1,
      borderRightColor: '#ddd',
    },
    dropdownItem: {
      padding: 10,
    },
    dropdownItemText: {
      fontSize: 16,
      color: TextTheme.labelTitle.color,
    },
    deleteFilter: {
      fontSize: 16,
      color: ColorPallet.brand.primary,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value="Filtres"
          editable={false} // Empêche la saisie de texte dans l'input
        />
        <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
          <Text style={styles.buttonText}>^</Text>
        </TouchableOpacity>
      </View>

      {/* Animation de la liste déroulante */}
      <Animated.View
        style={[
          styles.dropdownContainer,
          {
            transform: [
              {
                scaleY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1], // L'élément passe de 0 à 1 en taille verticale
                }),
              },
            ],
            opacity: animation, // Ajouter l'animation d'opacité
          },
        ]}
      >
        <View>
          <TouchableOpacity style={styles.dropdownItem} onPress={handleDeselectAll}>
            <Text style={styles.deleteFilter}>Effacer les filtres</Text>
          </TouchableOpacity>
        </View>
        {isVisible && <CheckBoxList data={items} selectedItems={selectedItems} handleSelect={handleSelectItem} />}
      </Animated.View>
    </View>
  )
}

export default FilterActivity
