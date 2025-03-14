import { useTheme } from '@hyperledger/aries-bifold-core'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Modal } from 'react-native'

import Filters from '../assets/ActivityFilterConfig'
import ChevronDown from '../assets/img/icons/ChevronDown.svg'
import ChevronUp from '../assets/img/icons/ChevronUp.svg'

const DisplayTypeList = ({ resetSelectedValue }: { resetSelectedValue: boolean }) => {
  const { ColorPallet, TextTheme } = useTheme()
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  const [selectedValue, setSelectedValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [inputPosition, setInputPosition] = useState({ top: 0 })

  const inputRef = useRef(null)
  const chevron = isVisible ? <ChevronUp /> : <ChevronDown />

  /*const items = [
    { id: '1', title: t('Filters.NewestFirst'), content: '...' },
    { id: '2', title: t('Filters.OldestFirst'), content: '...' },
    { id: '3', title: t('Filters.ContactAToZ'), content: '...' },
    { id: '4', title: t('Filters.ContactZToA'), content: '...' },
  ]*/
  const items = Filters.DisplayTypeOptions

  useEffect(() => {
    setSelectedValue('')
  }, [resetSelectedValue])

  const handleSelect = (item: { title: string }) => {
    setSelectedValue(t(item.title))
    setShowDropdown(!showDropdown)
  }

  const toggleDropdown = () => {
    setIsVisible(!isVisible)
  }
  const handleInputLayout = () => {
    if (inputRef.current) {
      ;(inputRef.current as TextInput).measure((fx, fy, width, height, px, py) => {
        setInputPosition({ top: py + height + 10 })
      })
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingStart: 10,
      paddingEnd: 10,
      paddingTop: 10,
      paddingBottom: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: ColorPallet.grayscale.mediumGrey,
      backgroundColor: ColorPallet.grayscale.white,
      width: '100%',
      paddingHorizontal: 10,
    },
    titleInput: {
      ...TextTheme.labelTitle,
      color: TextTheme.labelTitle.color,
      paddingBottom: 10,
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
      color: TextTheme.labelTitle.color,
      paddingEnd: 10,
    },
    button: {
      backgroundColor: ColorPallet.grayscale.veryLightGrey,
    },
    dropdownItem: {
      padding: 10,
      color: TextTheme.labelTitle.color,
    },
    dropdownItemText: {
      fontSize: 16,
      color: TextTheme.labelTitle.color,
    },
    deleteFilter: {
      fontSize: 16,
      color: ColorPallet.brand.primary,
    },
    centeredView: {
      position: 'absolute',
      top: inputPosition.top - 9,
      left: 54,
      right: 54,
      justifyContent: 'flex-start',
      zIndex: 2,
    },
    modalView: {
      backgroundColor: ColorPallet.grayscale.veryLightGrey,
      shadowColor: '#000',
      padding: 20,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 2,
      width: '100%',
    },
    outsideListener: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.titleInput}>{t('Filters.Display')}</Text>
      <TouchableOpacity style={styles.inputContainer} onPress={toggleDropdown} onLayout={handleInputLayout}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={selectedValue}
          placeholder={t('Filters.DisplayPlaceHolder')}
          editable={false}
        />
        <View>{chevron}</View>
      </TouchableOpacity>
      {/* Animation de la liste déroulante */}
      <Modal transparent={true} visible={isVisible} onRequestClose={toggleDropdown} accessible={false}>
        <TouchableOpacity
          style={styles.outsideListener}
          onPress={toggleDropdown}
          accessible={true}
          accessibilityLabel={t('Filters.Filters')}
          accessibilityRole="button"
        />
        <View style={styles.centeredView}>
          {/* Suppression de l'animation d'opacité */}

          <View style={styles.modalView}>
            <View>
              <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      handleSelect(item)
                      toggleDropdown()
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{t(item.title)}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default DisplayTypeList
