import { Button, ButtonType, testIdWithKey, useTheme } from '@hyperledger/aries-bifold-core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Filters from '../assets/ActivityFilterConfig'
import { SelectedItemsType } from '../types/activities'

import CheckBoxList from './CheckBoxList'
import DisplayTypeList from './DisplayTypeList'

const HistoryFilter = ({
  setCanSeeFilters,
  onFilterChange,
  selectedOptions,
  selectedSortOrder,
  selectedCredentialOffer,
  resetSelections,
}: {
  setCanSeeFilters: (value: boolean) => void
  onFilterChange: (
    selectedOptions: SelectedItemsType,
    selectedCredentialOffer: SelectedItemsType,
    selectedSortOrder: SelectedItemsType
  ) => void
  selectedOptions: SelectedItemsType
  selectedCredentialOffer: SelectedItemsType
  selectedSortOrder: SelectedItemsType
  resetSelections: () => void
}) => {
  const { ColorPallet, TextTheme } = useTheme()
  const { t } = useTranslation()
  const [resetSelectedValue, setResetSelectedValue] = useState<boolean>(false)
  const [canSeeButtonApply, setCanSeeButtonApply] = useState<boolean>(false)
  const [canSeeButtonClose, setCanSeeButtonClose] = useState<boolean>(true)
  const [canSeeButtonCancel, setCanSeeButtonCancel] = useState<boolean>(false)
  const [canSeeButtonDelete, setCanSeeButtonDelete] = useState<boolean>(false)

  const isAnyOptionSelected = Object.values(selectedOptions).includes(true)
  const isAnyCredentialOfferSelected = Object.values(selectedCredentialOffer).includes(true)
  const isAnySortOrderSelected = Object.values(selectedSortOrder).includes(true)

  const items = Filters.History.HistoryOptions
  const CredentialOfferOptions = Filters.History.CredentialOfferOptions

  const handleSelectOptions = (id: string) => {
    const updatedOptions = {
      ...selectedOptions,
      [id]: !selectedOptions[id],
    }
    onFilterChange(updatedOptions, selectedCredentialOffer, selectedSortOrder)
  }

  const handleSelectCredentialOffer = (id: string) => {
    const updatedCredential = {
      ...selectedCredentialOffer, // Assurez-vous que selectedCredentialOffer est défini
      [id]: !selectedCredentialOffer?.[id], // Utilisation de l'opérateur optionnel ici aussi
    }
    // Vérifiez que `onFilterChange` attend bien ces 3 paramètres
    onFilterChange(selectedOptions, updatedCredential, selectedSortOrder) // Transmet les données au parent
  }

  const handleDeselectAll = () => {
    resetSelections()
    setResetSelectedValue(!resetSelectedValue)
    setCanSeeButtonDelete(false)
  }
  useEffect(() => {
    const allOptionsDeselected = !Object.values(selectedOptions).includes(true)
    const allCredentialDeselected = !Object.values(selectedCredentialOffer).includes(true)

    setCanSeeButtonDelete(!allOptionsDeselected)
    setCanSeeButtonDelete(!allCredentialDeselected)

    if (isAnyOptionSelected || isAnyCredentialOfferSelected || isAnySortOrderSelected) {
      setCanSeeButtonApply(true)
      setCanSeeButtonCancel(true)
      setCanSeeButtonDelete(true)
      setCanSeeButtonClose(false)
    }
  }, [isAnyOptionSelected, isAnyCredentialOfferSelected, isAnySortOrderSelected])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
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
      paddingBottom: 10,
    },
    buttonSection: {
      paddingHorizontal: 16,
      paddingVertical: 10,
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
            <DisplayTypeList
              onSelect={handleSelectCredentialOffer}
              initialSelectedValue={Object.keys(selectedSortOrder).find((key) => selectedSortOrder[key])}
            />
          </View>
          <View style={styles.checkBoxContainer}>
            <Text style={styles.title}>{t('Filters.DisplayOrder')}</Text>
            <Text style={styles.subTitle}>{t('Filters.CredentialOffer')}</Text>
            <View style={styles.credentialOfferBox}>
              <CheckBoxList
                data={CredentialOfferOptions}
                selectedItems={selectedCredentialOffer}
                handleSelect={handleSelectCredentialOffer}
              />
            </View>
            <View style={styles.checkBoxList}>
              <CheckBoxList data={items} selectedItems={selectedOptions} handleSelect={handleSelectOptions} />
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
                  onFilterChange(selectedOptions, selectedCredentialOffer, selectedSortOrder) // Envoie les données au parent
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
