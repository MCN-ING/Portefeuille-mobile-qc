import { Button, ButtonType, testIdWithKey, useTheme } from '@hyperledger/aries-bifold-core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Filters from '../assets/ActivityFilterConfig'

import CheckBoxList from './CheckBoxList'
import DisplayTypeList from './DisplayTypeList'

const HistoryFilter = ({ setCanSeeFilters }: { setCanSeeFilters: (value: boolean) => void }) => {
  const { ColorPallet, TextTheme } = useTheme()
  const { t } = useTranslation()
  const [resetSelectedValue, setResetSelectedValue] = useState<boolean>(false)
  const [canSeeButtonApply, setCanSeeButtonApply] = useState<boolean>(false)
  const [canSeeButtonClose, setCanSeeButtonClose] = useState<boolean>(true)
  const [canSeeButtonCancel, setCanSeeButtonCancel] = useState<boolean>(false)
  const [canSeeButtonDelete, setCanSeeButtonDelete] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({})
  const [selectedSubItems, setSelectedSubItems] = useState<{ [key: string]: boolean }>({})
  const [selectedListItem, setSelectedListItem] = useState<{ [key: string]: boolean }>({})

  const isAnyItemSelected = Object.values(selectedItems).includes(true)
  const isAnySubItemSelected = Object.values(selectedSubItems).includes(true)
  const isAnyListItemSelected = Object.values(selectedListItem).includes(true)

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
  const handleListItemSelect = (item: { title: string }) => {
    setSelectedListItem({ [item.title]: true }) // Update the selected item
  }
  const handleDeselectAll = () => {
    setSelectedItems({})
    setSelectedSubItems({})
    setSelectedListItem({})
    setResetSelectedValue(!resetSelectedValue)
    setCanSeeButtonDelete(false)
  }
  useEffect(() => {
    if (isAnyItemSelected || isAnySubItemSelected || isAnyListItemSelected) {
      setCanSeeButtonApply(true)
      setCanSeeButtonCancel(true)
      setCanSeeButtonDelete(true)
      setCanSeeButtonClose(false)
    }
  }, [isAnyItemSelected, isAnySubItemSelected, isAnyListItemSelected])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      bottom: 10,
    },
    title: {
      ...TextTheme.labelTitle,
      color: TextTheme.labelTitle.color,
      left: 8,
    },
    subTitle: {
      ...TextTheme.labelSubtitle,
      color: TextTheme.labelTitle.color,
      padding: 8,
    },
    credentialOfferBox: {
      paddingStart: 28,
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
    checkBoxContainer: {
      left: 8,
    },
    checkBoxList: {
      paddingBottom: 20,
    },
    buttonSection: {
      paddingHorizontal: 16,
      bottom: 20,
    },
    button: {
      paddingBottom: 16,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <View style={styles.displaySort}>
            <DisplayTypeList onSelect={handleListItemSelect} resetSelectedValue={resetSelectedValue} />
          </View>
          <View style={styles.checkBoxContainer}>
            <Text style={styles.title}>{t('Filters.DisplayOrder')}</Text>
            <Text style={styles.subTitle}>{t('Filters.CredentialOffer')}</Text>
            <View style={styles.credentialOfferBox}>
              <CheckBoxList
                data={CredentialOfferOptions}
                selectedItems={selectedSubItems}
                handleSelect={handleSelectSubItem}
              />
            </View>
            <View style={styles.checkBoxList}>
              <CheckBoxList data={items} selectedItems={selectedItems} handleSelect={handleSelectItem} />
            </View>
          </View>
        </View>
        <View style={styles.buttonSection}>
          {canSeeButtonClose && (
            <View style={styles.button}>
              <Button
                buttonType={ButtonType.Primary}
                testID={testIdWithKey('Close')}
                accessibilityLabel={t('Filters.ButtonClose')}
                title={t('Filters.ButtonClose')}
                onPress={() => {
                  setCanSeeFilters(false)
                }}
              />
            </View>
          )}
          {canSeeButtonDelete && (
            <View style={styles.button}>
              <Button
                buttonType={ButtonType.Secondary}
                testID={testIdWithKey('Delete')}
                accessibilityLabel={t('Filters.ButtonDeleteFilters')}
                title={t('Filters.ButtonDeleteFilters')}
                onPress={handleDeselectAll}
              />
            </View>
          )}
          {canSeeButtonApply && (
            <View style={styles.button}>
              <Button
                buttonType={ButtonType.Primary}
                testID={testIdWithKey('Apply')}
                accessibilityLabel={t('Filters.ButtonApplyFilters')}
                title={t('Filters.ButtonApplyFilters')}
                onPress={() => {
                  setCanSeeFilters(false)
                }}
              />
            </View>
          )}
          {canSeeButtonCancel && (
            <Button
              buttonType={ButtonType.Secondary}
              testID={testIdWithKey('Cancel')}
              accessibilityLabel={t('Filters.ButtonCancel')}
              title={t('Filters.ButtonCancel')}
              onPress={() => {
                setCanSeeFilters(false)
                handleDeselectAll
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HistoryFilter
