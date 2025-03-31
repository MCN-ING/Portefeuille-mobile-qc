import { useTheme } from '@hyperledger/aries-bifold-core'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native'

import ChevronDown from '../assets/img/icons/ChevronDown.svg'
import ChevronUp from '../assets/img/icons/ChevronUp.svg'
import { Filters } from '../constants'
import { ActivityOrderType } from '../types/activities'

const DisplayTypeList = ({
  onSelect,
  initialSelectedValue = '',
}: {
  onSelect: (item: ActivityOrderType) => void
  initialSelectedValue?: string
}) => {
  const { ColorPallet, TextTheme } = useTheme()
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  const [selectedValue, setSelectedValue] = useState(initialSelectedValue || '')
  const [inputPosition, setInputPosition] = useState({ top: 0 })

  const inputRef = useRef(null)
  const chevron = isVisible ? <ChevronUp /> : <ChevronDown />

  const items = Filters.SortOptions as { id: ActivityOrderType; title: string }[]

  const handleSelect = (item: { title: string }) => {
    setSelectedValue(t(item.title))
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
      paddingStart: 16,
      paddingEnd: 16,
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
      paddingHorizontal: 8,
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
    },
    button: {
      backgroundColor: ColorPallet.grayscale.veryLightGrey,
    },
    dropdownItem: {
      padding: 5,
      color: TextTheme.labelTitle.color,
    },
    dropdownItemText: {
      fontSize: 16,
      color: TextTheme.labelTitle.color,
    },

    centeredView: {
      position: 'absolute',
      top: inputPosition.top - 5,
      left: 18,
      right: 18,
      justifyContent: 'flex-start',
      zIndex: 2,
    },
    modalView: {
      backgroundColor: ColorPallet.grayscale.white,
      shadowColor: '#000',
      padding: 2,
      paddingVertical: 10,
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
          placeholderTextColor={TextTheme.labelTitle.color}
          editable={false}
          pointerEvents="none"
        />
        <View>{chevron}</View>
      </TouchableOpacity>
      <Modal transparent={true} visible={isVisible} onRequestClose={toggleDropdown} accessible={false}>
        <TouchableOpacity
          style={styles.outsideListener}
          onPress={toggleDropdown}
          accessible={true}
          accessibilityLabel={t('Filters.Filters')}
          accessibilityRole="button"
        />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              {items.map((item: { id: ActivityOrderType; title: string }) => (
                <TouchableOpacity
                  key={item.id} // Utilisez l'id de chaque élément comme clé unique
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleSelect(item)
                    onSelect(item.id)
                    toggleDropdown()
                  }}
                >
                  <Text style={styles.dropdownItemText}>{t(item.title)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default DisplayTypeList
