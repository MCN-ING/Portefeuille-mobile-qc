import { testIdWithKey, TOKENS, useServices, useStore, useTheme, useTour } from '@hyperledger/aries-bifold-core'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

import { BCDispatchAction, BCState } from '../../store'
import { QCTourID, QCToursState } from '../../types/tours'

import HistoryList from './HistoryList'
import NotificationsList from './NotificationsList'

const NotificationTab = 'Notifications'
const HistoryTab = 'Historique'

const Activities: React.FC = () => {
  const [openSwipeableId, setOpenSwipeableId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(NotificationTab)
  const [store, dispatch] = useStore<BCState>()
  const { start } = useTour()
  const { t } = useTranslation()
  const { ColorPallet, TextTheme } = useTheme()
  const [{ enableTours: enableToursConfig }] = useServices([TOKENS.CONFIG])

  const screenIsFocused = useIsFocused()

  useEffect(() => {
    const shouldShowTour =
      enableToursConfig && store.tours.enableTours && !store.tours[QCToursState.SEEN_ACTIVITIES_TOUR]
    if (shouldShowTour && screenIsFocused) {
      start(QCTourID.ActivitiesTour)
      dispatch({
        type: BCDispatchAction.UPDATE_SEEN_ACTIVITIES_TOUR,
        payload: [true],
      })
    }
  }, [
    enableToursConfig,
    store.tours.enableTours,
    store.tours.seenCredentialOfferTour,
    screenIsFocused,
    start,
    dispatch,
  ])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 16,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    tabHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      gap: 8,
      borderBottomColor: ColorPallet.brand.secondary,
      marginBottom: 16,
      marginHorizontal: 16,
      alignItems: 'center',
      maxHeight: 70,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingBottom: 8,
      paddingHorizontal: 8,
      borderBottomWidth: 4,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomWidth: 4,
      borderBottomColor: ColorPallet.brand.primary,
    },
    tabText: {
      ...TextTheme.labelTitle,
    },
    activeTabText: {
      color: ColorPallet.brand.primary,
    },
    tabContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })

  return (
    <View style={styles.container}>
      {/* Tab-like Header */}
      <View style={styles.tabHeader} accessibilityRole="tablist">
        <TouchableOpacity
          accessibilityState={{ selected: activeTab === NotificationTab }}
          accessibilityRole="tab"
          testID={testIdWithKey('Activities.NotificationsTab')}
          style={[styles.tab, activeTab === NotificationTab && styles.activeTab]}
          onPress={() => setActiveTab(NotificationTab)}
        >
          <View style={styles.tabContent}>
            <Text style={[styles.tabText, activeTab === NotificationTab && styles.activeTabText]}>
              {t('Screens.Notifications')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityState={{ selected: activeTab === HistoryTab }}
          accessibilityRole="tab"
          testID={testIdWithKey('Activities.HistoryTab')}
          style={[styles.tab, activeTab === HistoryTab && styles.activeTab]}
          onPress={() => setActiveTab(HistoryTab)}
        >
          <Text style={[styles.tabText, activeTab === HistoryTab && styles.activeTabText]}>{t('Screens.History')}</Text>
        </TouchableOpacity>
      </View>

      {activeTab === NotificationTab ? (
        <NotificationsList openSwipeableId={openSwipeableId} handleOpenSwipeable={setOpenSwipeableId} />
      ) : (
        <HistoryList openSwipeableId={openSwipeableId} handleOpenSwipeable={setOpenSwipeableId} />
      )}
    </View>
  )
}

export default Activities
