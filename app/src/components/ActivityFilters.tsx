import { useTheme } from 'aries-bifold'
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { filterTypeOptions, lookBackOptions } from '../constants'
import { HistoryActionstype, lookBack } from '../types'

type Props = {
  setRecordsType: Dispatch<SetStateAction<HistoryActionstype[]>>
  recordsType: HistoryActionstype[]
  setRecordsLookBack: Dispatch<SetStateAction<lookBack>>
  recordsLookBack: lookBack
}

const ActivityFilters = ({ setRecordsType, recordsType = [], setRecordsLookBack, recordsLookBack }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.ColorPallet.brand.primaryBackground,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      marginVertical: 15,
      maxHeight: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'flex-start',
    },
    checkbox: {
      width: 18,
      height: 18,
      borderRadius: 2,
      borderColor: theme.ColorPallet.grayscale.darkGrey,
      borderWidth: 1,
      borderStyle: 'solid',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20,
    },
    innerCheckbox: {
      width: 9,
      height: 9,
      backgroundColor: theme.ColorPallet.grayscale.darkGrey,
    },
    pastille: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderColor: theme.ColorPallet.grayscale.darkGrey,
      borderWidth: 1,
      borderStyle: 'solid',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20,
    },
    innerPastille: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.ColorPallet.grayscale.darkGrey,
    },
    lookBackSection: {
      borderTopColor: theme.ColorPallet.grayscale.lightGrey,
      borderTopWidth: 1,
      borderStyle: 'solid',
      paddingVertical: 15,
      flexDirection: 'column',
      width: '100%',
    },
    lookBackButton: {
      paddingHorizontal: 15,
      paddingVertical: 5,
      margin: 8,
      borderColor: theme.ColorPallet.grayscale.darkGrey,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 5,
    },
  })

  const handleRecordsType = (type: string) => {
    if (recordsType.includes(type)) {
      setRecordsType(recordsType.filter((item: string) => item !== type))
    } else {
      setRecordsType([...recordsType, type])
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingVertical: 10,
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        <Text style={theme.TextTheme.modalTitle}>Types</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleRecordsType(filterTypeOptions.credential)}>
          <Text style={theme.TextTheme.modalNormal}>{t('Activity.credentials')}</Text>
          <View style={styles.checkbox}>
            {recordsType.includes(filterTypeOptions.credential) && <View style={styles.innerCheckbox} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleRecordsType(filterTypeOptions.proof)}>
          <Text style={theme.TextTheme.modalNormal}>{t('Activity.proofs')}</Text>
          <View style={styles.checkbox}>
            {recordsType.includes(filterTypeOptions.proof) && <View style={styles.innerCheckbox} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleRecordsType(filterTypeOptions.connection)}>
          <Text style={theme.TextTheme.modalNormal}>{t('Activity.connections')}</Text>
          <View style={styles.checkbox}>
            {recordsType.includes(filterTypeOptions.connection) && <View style={styles.innerCheckbox} />}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.lookBackSection}>
        <Text style={theme.TextTheme.modalTitle}>{t('Activity.lookBack')}</Text>
        <FlatList
          data={[
            lookBackOptions.all,
            lookBackOptions.year,
            lookBackOptions.month,
            lookBackOptions.week,
            lookBackOptions.day,
          ]}
          style={{ width: '100%', maxHeight: 60 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setRecordsLookBack(item)}>
              <View
                style={[
                  styles.lookBackButton,
                  {
                    backgroundColor:
                      recordsLookBack === item
                        ? theme.ColorPallet.brand.primary
                        : theme.ColorPallet.brand.primaryBackground,
                  },
                ]}
              >
                <Text
                  style={[
                    theme.TextTheme.modalNormal,
                    {
                      color:
                        recordsLookBack === item
                          ? theme.ColorPallet.grayscale.white
                          : theme.TextTheme.modalNormal.color,
                    },
                  ]}
                >
                  {t('Activity.' + item)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          horizontal={true}
        />
      </View>
    </View>
  )
}

export default ActivityFilters
