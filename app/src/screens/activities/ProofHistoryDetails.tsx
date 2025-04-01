import { ProofState } from '@credo-ts/core'
import { useAgent, useProofById } from '@credo-ts/react-hooks'
import { ThemedText, TOKENS, useServices } from '@hyperledger/aries-bifold-core'
import SharedProofData from '@hyperledger/aries-bifold-core/App/components/misc/SharedProofData'
import { HistoryRecord } from '@hyperledger/aries-bifold-core/App/modules/history/types'
import { formatTime } from '@hyperledger/aries-bifold-core/App/utils/helpers'
import { GroupedSharedProofDataItem } from '@hyperledger/aries-bifold-verifier'
import { StackScreenProps } from '@react-navigation/stack'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import HeaderText from '../../components/HeaderText'
import useHistoryDetailPageStyles from '../../hooks/useHistoryDetailPageStyles'
import { HistoryStackParams, Screens } from '../../navigators/navigators'
import { ColorPallet } from '../../theme'
import { handleDeleteHistoryWithConfirmation } from '../../utils/historyUtils'
import { startCaseUnicode } from '../../utils/stringUtils'

type ProofHistoryDetailsProp = StackScreenProps<HistoryStackParams, Screens.ProofHistoryDetails>

const ProofHistoryDetails: React.FC<ProofHistoryDetailsProp> = ({ route, navigation }: ProofHistoryDetailsProp) => {
  const { t } = useTranslation()
  const { recordId, item, operation } = route.params
  const itemContent = item?.content as HistoryRecord
  const iconSize = 24
  const { agent } = useAgent()
  const [loadHistory] = useServices([TOKENS.FN_LOAD_HISTORY])

  const [, setSharedProofDataItems] = useState<GroupedSharedProofDataItem[]>([])
  const record = useProofById(recordId)
  const styles = useHistoryDetailPageStyles()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (record) {
      setIsLoading(false)
    }
  }, [record])

  const onSharedProofDataLoad = useCallback((data: GroupedSharedProofDataItem[]) => {
    setSharedProofDataItems(data)
    setIsLoading(false)
  }, [])

  const operationDate = itemContent?.createdAt
    ? formatTime(itemContent?.createdAt, { includeHour: true })
    : t('Record.InvalidDate')

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={ColorPallet.brand.highlight} />
        <ThemedText>{t('Global.Loading')}</ThemedText>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={[styles.contentContainer]}>
        <HeaderText title={t('History.CardDescription.Proof', { operation })} />
        <View style={{ marginTop: 20 }} />
        <ThemedText style={styles.subTitle}>
          {itemContent?.correspondenceName ? startCaseUnicode(itemContent.correspondenceName) : ''}
        </ThemedText>
        <ThemedText style={styles.date}>
          {t('History.Date.changedOn', { operation: operation })} {operationDate}
        </ThemedText>

        {record && record.state !== ProofState.Declined && (
          <SharedProofData recordId={record.id} onSharedProofDataLoad={onSharedProofDataLoad} />
        )}
      </ScrollView>

      <View style={styles.lineSeparator} />

      <TouchableOpacity
        style={styles.deleteContainer}
        onPress={() => handleDeleteHistoryWithConfirmation(item.content.id ?? '', agent, loadHistory, t, navigation)}
        accessibilityRole="button"
        accessibilityLabel={t('History.Button.DeleteHistory')}
      >
        <MaterialCommunityIcon name={'trash-can-outline'} size={iconSize} style={styles.trashIcon} />
        <ThemedText style={styles.deleteText}>{t('History.Button.DeleteHistory')}</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ProofHistoryDetails
