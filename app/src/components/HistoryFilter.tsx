import { useTheme } from '@hyperledger/aries-bifold-core'
import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, FlatList } from 'react-native'

import Filters from '../assets/ActivityFilterConfig'
import ChevronDown from '../assets/img/icons/ChevronDown.svg'
import ChevronUp from '../assets/img/icons/ChevronUp.svg'

import CheckBoxList from './CheckBoxList'
import DisplayTypeList from './DisplayTypeList'

const NotificationFilter = () => {
  const { ColorPallet, TextTheme } = useTheme()
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [resetSelectedValue, setResetSelectedValue] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({})
  const [selectedSubItems, setSelectedSubItems] = useState<{ [key: string]: boolean }>({})
  const [inputPosition, setInputPosition] = useState({ top: 0 })
  const inputRef = useRef(null)
  const chevron = isVisible ? <ChevronUp /> : <ChevronDown />
  const items = Filters.History.HistoryOptions
  const CredentialOfferOptions = Filters.History.CredentialOfferOptions

  const toggleDropdown = () => {
    setIsVisible(!isVisible)
  }
  const handleSelectItem = (id: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }
  const handleSelectSubItem = (title: string) => {
    setSelectedSubItems((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }))
  }
  const handleDeselectAll = () => {
    setSelectedItems({})
    setSelectedSubItems({})
    setResetSelectedValue(!resetSelectedValue)
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      paddingHorizontal: 10,
      backgroundColor: ColorPallet.grayscale.veryLightGrey,
    },
    input: {
      flex: 1,
      height: 40,
      ...TextTheme.labelTitle,
      color: TextTheme.labelTitle.color,
    },
    button: {
      backgroundColor: ColorPallet.grayscale.veryLightGrey,
    },
    buttonText: {
      color: '#000',
      fontSize: 18,
    },
    title: {
      ...TextTheme.labelTitle,
      color: TextTheme.labelTitle.color,
      paddingVertical: 20,
      padding: 10,
    },
    subTitle: {
      ...TextTheme.labelSubtitle,
      color: TextTheme.labelTitle.color,

      padding: 10,
    },
    credentialOfferBox: {
      paddingStart: 20,
      paddingBottom: 20,
    },
    dropdownItem: {
      padding: 10,
      backgroundColor: ColorPallet.grayscale.veryLightGrey,
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
      flex: 1,
      position: 'absolute',
      width: '90%',
      top: inputPosition.top - 10,
      left: '5%',
      right: '5%',
      bottom: '4%',
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
      elevation: 5,
      width: '100%',
      maxHeight: '85%',
    },
    outsideListener: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
    checkBoxList: {
      paddingBottom: 20,
    },
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inputContainer} onPress={toggleDropdown} onLayout={handleInputLayout}>
        <TextInput ref={inputRef} style={styles.input} value={t('Filters.Filters')} editable={false} />
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
          {/* Remplacer le ScrollView par un FlatList */}
          <FlatList
            style={styles.modalView}
            data={[
              { type: 'deleteFilters' },
              { type: 'displayTypeList' },
              { type: 'credentialOffer' },
              { type: 'items' },
            ]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              switch (item.type) {
                case 'deleteFilters':
                  return (
                    <TouchableOpacity style={styles.dropdownItem} onPress={handleDeselectAll}>
                      <Text style={styles.deleteFilter}>{t('Filters.DeleteFilters')}</Text>
                    </TouchableOpacity>
                  )
                case 'displayTypeList':
                  return <DisplayTypeList resetSelectedValue={resetSelectedValue} />
                case 'credentialOffer':
                  return (
                    <View>
                      <Text style={styles.subTitle}>{t('Filters.CredentialOffer')}</Text>
                      <View style={styles.credentialOfferBox}>
                        <CheckBoxList
                          data={CredentialOfferOptions}
                          selectedItems={selectedSubItems}
                          handleSelect={handleSelectSubItem}
                        />
                      </View>
                    </View>
                  )
                case 'items':
                  return (
                    <View style={styles.checkBoxList}>
                      <CheckBoxList data={items} selectedItems={selectedItems} handleSelect={handleSelectItem} />
                    </View>
                  )
                default:
                  return null
              }
            }}
          />
        </View>
      </Modal>
    </View>
  )
}

export default NotificationFilter
