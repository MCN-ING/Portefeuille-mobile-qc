import {
  CredentialExchangeRecord,
  ProofExchangeRecord,
  ConnectionRecord,
  CredentialState,
  ProofState,
} from '@aries-framework/core'
import { useConnections, useCredentials, useProofs } from '@aries-framework/react-hooks'
import { useNavigation } from '@react-navigation/core'
import { Screens, Stacks, useTheme, formatTime } from 'aries-bifold'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { HistoryItem } from '../components/history/HistoryItem'

export type HistoryRecord = CredentialExchangeRecord | ProofExchangeRecord | ConnectionRecord

const History: React.FC = () => {
  const { records: credentialRecords } = useCredentials()
  const { records: proofRecords } = useProofs()
  const { records: connectionRecords } = useConnections()
  const iconSize = 26
  const { ListItems, ColorPallet } = useTheme()
  const { t } = useTranslation()
  const navigation = useNavigation()

  const style = StyleSheet.create({
    container: {
      flexGrow: 1,
      margin: 20,
      elevation: 5,
    },
    historyContainer: {
      ...ListItems.requestTemplateBackground,
      flexGrow: 1,
      flexDirection: 'row',
      borderRadius: 8,
      marginBottom: 10,
    },
    iconContainer: {
      paddingHorizontal: 0,
      marginRight: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 5,
    },
    state: {
      marginBottom: 5,
    },
    detail: {
      ...ListItems.requestTemplateIcon,
      fontSize: 36,
    },
    rightContainer: {
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  })

  const [history, setHistory] = useState<HistoryRecord[]>([])
  // const [sortSide, setSortSide] = useState<'asc' | 'desc'>('asc')

  const createHistory = (records: HistoryRecord[]) => {
    const sortedRecords = records.sort(
      (a, b) => Date.parse(a.createdAt.toDateString()) - Date.parse(b.createdAt.toDateString())
    )
    const noMediatorRecords = sortedRecords.filter(
      (r) => !(r instanceof ConnectionRecord) || !r.connectionTypes.find((c) => c == 'mediator')
    )
    setHistory(noMediatorRecords)
  }

  useEffect(() => {
    createHistory([...credentialRecords, ...proofRecords, ...connectionRecords])
  }, [credentialRecords, proofRecords, connectionRecords])

  const navigateToCred = useCallback((item: CredentialExchangeRecord) => {
    if (item.state == CredentialState.OfferReceived) {
      navigation.getParent()?.navigate(Stacks.NotificationStack as never, {
        screen: Screens.CredentialOffer,
        params: { credentialId: item.id },
      })
    } else if (item.state == CredentialState.Done) {
      navigation
        .getParent()
        ?.navigate(Stacks.CredentialStack as never, { screen: Screens.CredentialDetails, params: { credential: item } })
    }
  }, [])

  const navigateToContact = useCallback((item: ConnectionRecord) => {
    navigation.getParent()?.navigate(Stacks.ContactStack, { screen: Screens.Chat, params: { connectionId: item.id } })
  }, [])

  const navigateToProof = useCallback((item: ProofExchangeRecord) => {
    // if (item.state != ProofState.Done) {
    navigation
      .getParent()
      ?.navigate(Stacks.NotificationStack, { screen: Screens.ProofRequest, params: { proofId: item.id } })
    // }
  }, [])

  const handlePressed = (item: HistoryRecord) => {
    if (item instanceof CredentialExchangeRecord) {
      navigateToCred(item)
    } else if (item instanceof ConnectionRecord) {
      navigateToContact(item)
    } else {
      navigateToProof(item)
    }
  }

  const getHistoryItemIcon = (item: HistoryRecord) => {
    if (item instanceof CredentialExchangeRecord) {
      return 'card-account-details-outline'
    } else if (item instanceof ConnectionRecord) {
      return 'card-account-mail-outline'
    }
    return 'account-arrow-right-outline'
  }

  const setDisabled = (item: HistoryRecord) => {
    return () => {
      switch (item.state) {
        case CredentialState.Declined:
          return true
        case ProofState.Declined:
          return false
        default:
          return false
      }
    }
  }

  return (
    <SafeAreaView style={style.container} edges={['left', 'right']}>
      <FlatList
        data={history}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <HistoryItem<HistoryRecord>
              item={item}
              onPress={handlePressed}
              setDisabled={setDisabled(item)}
              renderItem={(item) => (
                <View style={style.historyContainer}>
                  <View style={style.iconContainer}>
                    <Icon name={getHistoryItemIcon(item)} color={ColorPallet.grayscale.black} size={iconSize} />
                  </View>
                  <View>
                    <Text style={style.title}>
                      {item.type == 'ConnectionRecord' && item.theirLabel
                        ? item.theirLabel
                        : t(`History.${item.type}.Title`)}
                    </Text>
                    <Text style={style.state}>
                      {t('History.StateLabel')}: <Text>{t(`History.${item.type}.State.${item.state}`)}</Text>
                    </Text>
                    {item.createdAt && <Text>{formatTime(item.createdAt)}</Text>}
                  </View>
                  {item.state != CredentialState.Declined && (
                    <View style={style.rightContainer}>
                      <Icon name="chevron-right" color={ColorPallet.grayscale.black} size={style.detail.fontSize} />
                    </View>
                  )}
                </View>
              )}
            />
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default History
