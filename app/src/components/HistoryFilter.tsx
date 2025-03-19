import { useTheme } from '@hyperledger/aries-bifold-core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import Filters from '../assets/ActivityFilterConfig'

import CheckBoxList from './CheckBoxList'
import DisplayTypeList from './DisplayTypeList'

const HistoryFilter = () => {
  const { ColorPallet, TextTheme } = useTheme()
  const { t } = useTranslation()
  const [resetSelectedValue, setResetSelectedValue] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({})
  const [selectedSubItems, setSelectedSubItems] = useState<{ [key: string]: boolean }>({})

  const items = Filters.History.HistoryOptions
  const CredentialOfferOptions = Filters.History.CredentialOfferOptions

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      marginVertical: 24,
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
    },
    dropdownItem: {
      padding: 10,
    },
    deleteFilter: {
      fontSize: 16,
      color: ColorPallet.brand.primary,
    },
    displaySort: {
      paddingVertical: 20,
      height: 130,
    },
    checkBoxList: {
      paddingVertical: 20,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.dropdownItem} onPress={handleDeselectAll}>
          <Text style={styles.deleteFilter}>{t('Filters.DeleteFilters')}</Text>
        </TouchableOpacity>
        <View style={styles.displaySort}>
          <DisplayTypeList resetSelectedValue={resetSelectedValue} />
        </View>
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
        <View style={styles.checkBoxList}>
          <CheckBoxList data={items} selectedItems={selectedItems} handleSelect={handleSelectItem} />
        </View>
      </View>
    </View>
  )
}

export default HistoryFilter
