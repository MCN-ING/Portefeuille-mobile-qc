import { useAgent } from '@credo-ts/react-hooks'
import { Button, ButtonType, ToastType, TOKENS, useServices, useStore, useTheme } from '@hyperledger/aries-bifold-core'
import {
  CustomRecord,
  HistoryCardType,
  HistoryRecord,
  RecordType,
} from '@hyperledger/aries-bifold-core/App/modules/history/types'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, SectionList, Text, ActivityIndicator, RefreshControl } from 'react-native'
import Toast, { ToastShowParams } from 'react-native-toast-message'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import HistoryListItem from '../../components/HistoryListItem'
import { useToast } from '../../hooks/toast'
import useMultiSelectActive from '../../hooks/useMultiSelectActive'
import { RootStackParams, Screens, Stacks } from '../../navigators/navigators'
import { ActivityState, BCDispatchAction, BCState } from '../../store'
import { SelectedHistoryType } from '../../types/activities'

const iconSize = 24

// Function to group history items by date
const groupHistoryByDate = (historyItems: CustomRecord[], t: (key: string) => string) => {
  const groupedHistory: {
    today: CustomRecord[]
    thisWeek: CustomRecord[]
    lastWeek: CustomRecord[]
    older: CustomRecord[]
  } = {
    today: [],
    thisWeek: [],
    lastWeek: [],
    older: [],
  }

  historyItems.forEach((item) => {
    const itemDate = moment(item.content.createdAt)
    const today = moment()

    if (itemDate.isSame(today, 'day')) {
      groupedHistory.today.push(item)
    } else if (itemDate.isSame(today, 'week')) {
      groupedHistory.thisWeek.push(item)
    } else if (itemDate.isSame(today.subtract(1, 'week'), 'week')) {
      groupedHistory.lastWeek.push(item)
    } else {
      groupedHistory.older.push(item)
    }
  })

  const sections = []
  if (groupedHistory.today.length > 0) {
    sections.push({ title: t('Activities.Timing.Today'), data: groupedHistory.today })
  }
  if (groupedHistory.thisWeek.length > 0) {
    sections.push({ title: t('Activities.Timing.ThisWeek'), data: groupedHistory.thisWeek })
  }
  if (groupedHistory.lastWeek.length > 0) {
    sections.push({ title: t('Activities.Timing.LastWeek'), data: groupedHistory.lastWeek })
  }
  if (groupedHistory.older.length > 0) {
    sections.push({ title: t('Activities.Timing.Older'), data: groupedHistory.older })
  }

  return sections
}

const HistoryList: React.FC<{
  openSwipeableId: string | null
  handleOpenSwipeable: (id: string | null) => void
}> = ({ openSwipeableId, handleOpenSwipeable }) => {
  const { t } = useTranslation()
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
  const { ColorPallet, TextTheme } = useTheme()
  const [historyRecords, setHistoryRecords] = useState<CustomRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<CustomRecord[]>([])
  const [sections, setSections] = useState<{ title: string; data: CustomRecord[] }[]>([])
  const [selectedHistory, setSelectedHistory] = useState<SelectedHistoryType[] | null>(null)

  useMultiSelectActive(selectedHistory)

  const [toastEnabled, setToastEnabled] = useState(false)
  const [toastOptions, setToastOptions] = useState<ToastShowParams>({})
  useToast({ enabled: toastEnabled, options: toastOptions })
  const [refreshing, setRefreshing] = useState(false)

  const hasCanceledRef = useRef(false)
  const [store, dispatch] = useStore<BCState>()
  const { agent } = useAgent()
  const [loadHistory] = useServices([TOKENS.FN_LOAD_HISTORY])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const updatedRecords = historyRecords.filter((record) => {
      const id = record.content.id
      return id && !store.activities[id]?.isTempDeleted
    })
    setFilteredRecords(updatedRecords)
  }, [store.activities, historyRecords])

  const fetchHistory = useCallback(async () => {
    if (!agent) return

    setRefreshing(true)
    setIsLoading(true)

    try {
      const historyManager = loadHistory(agent)
      if (!historyManager) throw new Error('History manager not found')

      const records = await historyManager.getHistoryItems({ type: RecordType.HistoryRecord })
      const sortedRecords = records.sort((a, b) => Number(b.content.createdAt) - Number(a.content.createdAt))

      setHistoryRecords(sortedRecords)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('Error'),
        text2: t('Activities.FetchError'),
      })
    } finally {
      setRefreshing(false)
      setIsLoading(false)
    }
  }, [agent, loadHistory, t])

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, [fetchHistory])
  )

  useEffect(() => {
    fetchHistory()
  }, [agent, fetchHistory])

  useEffect(() => {
    setSections(groupHistoryByDate(filteredRecords, t))
  }, [filteredRecords, t])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 1,
      marginBottom: 16,
    },
    sectionList: {
      flex: 1,
    },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.brand.secondary,
    },
    bodyText: {
      ...TextTheme.labelSubtitle,
    },
    bodyEventTime: {
      marginTop: 8,
      color: ColorPallet.grayscale.mediumGrey,
      fontSize: 12,
    },
    sectionSeparator: {
      height: 1,
      backgroundColor: ColorPallet.brand.secondary,
      marginTop: 4,
    },
    sectionHeaderContainer: {
      marginBottom: 12,
      paddingHorizontal: 16,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    historyContainer: {
      marginVertical: 16,
    },
    footerText: {
      ...TextTheme.labelSubtitle,
      color: ColorPallet.grayscale.mediumGrey,
    },
    selectionMultiActionContainer: {
      width: '100%',
      maxHeight: 200,
      position: 'absolute',
      shadowOffset: { width: 0, height: -3 },
      shadowColor: ColorPallet.grayscale.darkGrey,
      shadowOpacity: 0.1,
      shadowRadius: 5,
      bottom: 0,
      zIndex: 99,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    actionButtonContainer: {
      margin: 25,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    loaderText: {
      marginTop: 16,
      color: ColorPallet.grayscale.darkGrey,
      fontSize: 16,
    },
  })

  const handleViewDetails = useCallback(
    async (item: CustomRecord) => {
      const historyRecord = item.content as HistoryRecord

      if (historyRecord.type === HistoryCardType.Connection) {
        navigation.navigate(Stacks.HistoryStack, {
          screen: Screens.ContactHistoryDetails,
          params: { recordId: historyRecord.correspondenceId ?? '', operation: t('History.Operations.Added'), item },
        })
      } else if (historyRecord.type === HistoryCardType.ConnectionRemoved) {
        navigation.navigate(Stacks.HistoryStack, {
          screen: Screens.ContactHistoryDetails,
          params: { recordId: historyRecord.correspondenceId ?? '', operation: t('History.Operations.Removed'), item },
        })
      } else if (historyRecord.type === HistoryCardType.InformationSent) {
        navigation.navigate(Stacks.HistoryStack, {
          screen: Screens.ProofHistoryDetails,
          params: { recordId: historyRecord.correspondenceId ?? '', operation: t('History.Operations.Accepted'), item },
        })
      } else if (historyRecord.type === HistoryCardType.InformationNotSent) {
        navigation.navigate(Stacks.HistoryStack, {
          screen: Screens.ProofHistoryDetails,
          params: { recordId: historyRecord.correspondenceId ?? '', operation: t('History.Operations.Declined'), item },
        })
      } else if (historyRecord.type === HistoryCardType.CardAccepted) {
        navigation.navigate(Stacks.HistoryStack, {
          screen: Screens.CardHistoryDetails,
          params: { recordId: historyRecord.correspondenceId ?? '', operation: t('History.Operations.Accepted'), item },
        })
      } else if (historyRecord.type === HistoryCardType.CardExpired) {
        navigation.navigate(Stacks.HistoryStack, {
          screen: Screens.CardHistoryDetails,
          params: { recordId: historyRecord.correspondenceId ?? '', operation: t('History.Operations.Expired'), item },
        })
      } else if (historyRecord.type === HistoryCardType.CardDeclined) {
        navigation.navigate(Stacks.HistoryStack, {
          screen: Screens.CardHistoryDetails,
          params: { recordId: historyRecord.correspondenceId ?? '', operation: t('History.Operations.Declined'), item },
        })
      } else if (historyRecord.type === HistoryCardType.CardRemoved) {
        navigation.navigate(Stacks.HistoryStack, {
          screen: Screens.CardHistoryDetails,
          params: { recordId: historyRecord.correspondenceId ?? '', operation: t('History.Operations.Removed'), item },
        })
      } else if (historyRecord.type === HistoryCardType.CardRevoked) {
        navigation.navigate(Stacks.HistoryStack, {
          screen: Screens.CardHistoryDetails,
          params: { recordId: historyRecord.correspondenceId ?? '', operation: t('History.Operations.Revoked'), item },
        })
      } else if (historyRecord.type === HistoryCardType.PinChanged) {
        navigation.navigate(Stacks.HistoryStack, {
          screen: Screens.PinChangeDetails,
          params: { recordId: historyRecord.correspondenceId ?? '', item },
        })
      } else if (historyRecord.type === HistoryCardType.ActivateBiometry) {
        navigation.navigate(Stacks.HistoryStack, {
          screen: Screens.BiometricChangeDetails,
          params: {
            recordId: historyRecord.correspondenceId ?? '',
            operation: t('History.Operations.Activated'),
            item,
          },
        })
      } else if (historyRecord.type === HistoryCardType.DeactivateBiometry) {
        navigation.navigate(Stacks.HistoryStack, {
          screen: Screens.BiometricChangeDetails,
          params: {
            recordId: historyRecord.correspondenceId ?? '',
            operation: t('History.Operations.Deactivated'),
            item,
          },
        })
      } else {
        throw new Error(`Unhandled historyRecord.type: ${historyRecord.type}`)
      }
    },
    [navigation, t]
  )

  const handleDelete = async (id: string) => {
    setFilteredRecords((prevRecords) => prevRecords.filter((record) => record.content.id !== id))
  }

  const renderItem = useCallback(
    ({ item }: { item: CustomRecord }) => (
      <View style={styles.historyContainer}>
        <HistoryListItem
          item={item}
          selected={(selectedHistory?.filter((selected) => selected.id === item?.content.id)?.length ?? 0) > 0}
          setSelected={(item) => {
            if ((selectedHistory?.filter((selected) => selected.id === item.id)?.length ?? 0) > 0) {
              setSelectedHistory(selectedHistory?.filter((selected) => selected.id !== item.id) ?? [])
              return
            }
            setSelectedHistory([...(selectedHistory || []), item])
          }}
          openSwipeableId={openSwipeableId}
          onOpenSwipeable={handleOpenSwipeable}
          activateSelection={selectedHistory != null}
          onDelete={handleDelete}
          onViewDetails={() => handleViewDetails(item)}
        />
      </View>
    ),
    [selectedHistory, openSwipeableId, handleOpenSwipeable, handleViewDetails, styles.historyContainer]
  )

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={ColorPallet.brand.primary} />
        <Text style={styles.loaderText}>{t('Global.Loading')}</Text>
      </View>
    )
  }

  const deleteMultipleHistory = async () => {
    for await (const history of selectedHistory ?? []) {
      await history.deleteAction?.()
    }
  }

  const handleMultipleDelete = () => {
    const selected = selectedHistory ?? []
    if (selected.length > 0) {
      const ids = [...selected.map((s) => s.id)]
      const payload = {} as ActivityState
      const backupRecords = [...filteredRecords]
      setFilteredRecords((prevRecords) => prevRecords.filter((record) => !ids.includes(record.content.id ?? '')))

      setToastOptions({
        type: ToastType.Info,
        text1: t('Activities.HistoryDeleted', { count: selected.length }),

        onShow: () => {
          for (const key of ids) {
            payload[key] = {
              ...store.activities[key],
              isTempDeleted: true,
            }
          }
          dispatch({
            type: BCDispatchAction.ACTIVITY_TEMPORARILY_DELETED_IDS,
            payload: [payload],
          })
        },

        onHide: async () => {
          if (!hasCanceledRef.current) {
            await deleteMultipleHistory()
          } else {
            setFilteredRecords(backupRecords)
          }
          hasCanceledRef.current = false
          setToastEnabled(false)
        },

        props: {
          onCancel: () => {
            hasCanceledRef.current = true
            setFilteredRecords(backupRecords)
            for (const key of ids) {
              payload[key] = {
                ...store.activities[key],
                isTempDeleted: false,
              }
            }
            dispatch({
              type: BCDispatchAction.ACTIVITY_TEMPORARILY_DELETED_IDS,
              payload: [payload],
            })
          },
        },

        position: 'bottom',
      })

      setToastEnabled(true)
    }
    setSelectedHistory(null)
  }

  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={[styles.bodyText, styles.bodyEventTime]}>{section.title}</Text>
      <View style={styles.sectionSeparator} />
    </View>
  )

  return (
    <View style={styles.container}>
      <SectionList
        style={styles.sectionList}
        sections={sections}
        keyExtractor={(item: CustomRecord) => (item.content as HistoryRecord).id ?? ''}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderSectionHeader={renderSectionHeader}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchHistory} />}
        ListFooterComponent={
          <View style={[selectedHistory != null && { paddingBottom: 200 }, { paddingHorizontal: 16 }]}>
            <Text style={[styles.footerText]}>{t('Activities.FooterNothingElse')}</Text>
          </View>
        }
      />
      {selectedHistory != null && (
        <View style={styles.selectionMultiActionContainer}>
          <View style={styles.actionButtonContainer}>
            <Button title={t('Global.Remove')} onPress={handleMultipleDelete} buttonType={ButtonType.ModalCritical}>
              <MaterialCommunityIcon name={'trash-can-outline'} size={iconSize} style={{ color: 'white' }} />
            </Button>
            <View style={{ height: 24 }} />
            <Button
              title={t('Global.Cancel')}
              onPress={() => setSelectedHistory(null)}
              buttonType={ButtonType.Secondary}
            />
          </View>
        </View>
      )}
    </View>
  )
}

export default HistoryList
