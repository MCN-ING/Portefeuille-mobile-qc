import { useTheme } from 'aries-bifold'
import React, { useState, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { historyActionsType, lookBack, sortType } from '../types'

import ActivityFilters from './ActivityFilters'
import ActivitySortBy from './ActivitySortBy'

type Props = {
  setSortType: Dispatch<SetStateAction<sortType>>
  sortType: sortType
  setRecordsType: Dispatch<SetStateAction<historyActionsType[]>>
  recordsType: historyActionsType[]
  setRecordsLookBack: Dispatch<SetStateAction<lookBack>>
  recordsLookBack: lookBack
}

const HistoryHeader = ({
  setSortType,
  sortType,
  setRecordsType,
  recordsType,
  setRecordsLookBack,
  recordsLookBack,
}: Props) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [sortModalVisible, setSortModalVisible] = useState(false)
  const [typeModalVisible, setTypeModalVisible] = useState(false)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.ColorPallet.brand.primaryBackground,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    button: {
      flex: 1,
      margin: 10,
      minHeight: 40,
      borderRadius: 4,
      width: '100%',
      borderColor: theme.ColorPallet.grayscale.mediumGrey,
      borderWidth: 1,
      borderStyle: 'solid',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    innerButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      minWidth: '100%',
      height: '100%',
    },
    modal: { flex: 1, justifyContent: 'flex-end', margin: 0 },
    modalTopSection: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
    modalContentSection: {
      fitContent: 'content',
      overflow: 'hidden',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      marginTop: 'auto',
      padding: 15,
      backgroundColor: theme.ColorPallet.brand.primaryBackground,
    },
  })

  const CustomModal = ({ visible, setVisible, children }: any) => {
    return (
      <Modal animationType="none" style={styles.modal} visible={visible} transparent={true}>
        <View style={styles.modalTopSection}>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContentSection}>{children}</View>
        </View>
      </Modal>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity style={{ flex: 1, width: '100%', height: '100%' }} onPress={() => setSortModalVisible(true)}>
          <View style={styles.innerButton}>
            <Text style={theme.TextTheme.label}>
              <Animated.View style={{ transform: [{ rotate: '90deg' }] }}>
                <Icon name="code" size={15} />
              </Animated.View>
              {t('Activity.sortBy')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => setTypeModalVisible(true)}>
          <View style={styles.innerButton}>
            <Text style={theme.TextTheme.label}>
              <Icon name="filter-alt" size={15} />
              {t('Activity.filter')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <CustomModal visible={sortModalVisible} setVisible={setSortModalVisible} size={'small'}>
        <ActivitySortBy setSortType={setSortType} sortType={sortType} />
      </CustomModal>
      <CustomModal visible={typeModalVisible} setVisible={setTypeModalVisible}>
        <ActivityFilters
          setRecordsType={setRecordsType}
          recordsType={recordsType}
          setRecordsLookBack={setRecordsLookBack}
          recordsLookBack={recordsLookBack}
        />
      </CustomModal>
    </View>
  )
}

export default HistoryHeader
