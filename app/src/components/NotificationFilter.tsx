import { Button, ButtonType, testIdWithKey, useTheme } from '@hyperledger/aries-bifold-core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native'

import { Filters } from '../constants'
import { ActivityOrderType, SelectedItemsType } from '../types/activities'

import CheckBoxList from './CheckBoxList'
import DisplayTypeList from './DisplayTypeList'

interface NotificationFilterProps {
  setCanSeeFilters: (value: boolean) => void
  onFilterChange: (selectedOptions: SelectedItemsType, selectedSortOrder: ActivityOrderType | undefined) => void
  selectedOptions: SelectedItemsType
  selectedSortOrder?: ActivityOrderType
}

const NotificationFilter = ({
  setCanSeeFilters,
  onFilterChange,
  selectedOptions,
  selectedSortOrder,
}: NotificationFilterProps) => {
  const { ColorPallet } = useTheme()
  const { t } = useTranslation()
  const [currentSelectedOptions, setCurrentSelectedOptions] = useState(selectedOptions)
  const [currentSortOrder, setCurrentSortOrder] = useState<ActivityOrderType | undefined>(
    selectedSortOrder ?? undefined
  )

  const filterOptions = Filters.NotificationOptions

  const handleSelectOptions = (id: string, selected: boolean) => {
    const updatedOptions = {
      ...selectedOptions,
      [id]: selected,
    }
    setCurrentSelectedOptions(updatedOptions)
  }

  const handleDeselectAll = () => {
    setCurrentSelectedOptions({})
    setCurrentSortOrder(undefined)
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    dropdownItem: {
      padding: 10,
    },
    deleteFilter: {
      fontSize: 16,
      color: ColorPallet.brand.primary,
    },
    displaySort: {
      paddingTop: 20,
      height: '30%',
    },
    checkBoxList: {
      paddingHorizontal: 8,
      paddingVertical: 10,
    },
    filterSection: {
      justifyContent: 'flex-start',
    },
    buttonSection: {
      paddingHorizontal: 16,
      justifyContent: 'flex-end',
      paddingBottom: 16,
    },
    button: {
      paddingBottom: 16,
    },
  })
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.innerContainer}>
          <View style={styles.filterSection}>
            <View style={styles.displaySort}>
              <DisplayTypeList onSelect={(item) => setCurrentSortOrder(item)} initialSelectedValue={currentSortOrder} />
            </View>
            <View style={styles.checkBoxList}>
              <CheckBoxList
                data={filterOptions}
                selectedItems={currentSelectedOptions}
                handleSelect={handleSelectOptions}
              />
            </View>
          </View>
          <View style={styles.buttonSection}>
            {selectedOptions == currentSelectedOptions && selectedSortOrder == currentSortOrder && (
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
            {Object.values(currentSelectedOptions).includes(true) ||
              (currentSortOrder && (
                <View style={styles.button}>
                  <Button
                    buttonType={ButtonType.Secondary}
                    testID={testIdWithKey('Delete')}
                    accessibilityLabel={t('Filters.ButtonDeleteFilters')}
                    title={t('Filters.ButtonDeleteFilters')}
                    onPress={() => {
                      handleDeselectAll()
                    }}
                  />
                </View>
              ))}
            {selectedOptions != currentSelectedOptions ||
              (selectedSortOrder != currentSortOrder && (
                <View style={styles.button}>
                  <Button
                    buttonType={ButtonType.Primary}
                    testID={testIdWithKey('Apply')}
                    accessibilityLabel={t('Filters.ButtonApplyFilters')}
                    title={t('Filters.ButtonApplyFilters')}
                    onPress={() => {
                      onFilterChange(currentSelectedOptions, currentSortOrder)
                      setCanSeeFilters(false)
                    }}
                  />
                </View>
              ))}
            {selectedOptions != currentSelectedOptions ||
              (selectedSortOrder != currentSortOrder && (
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
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationFilter
