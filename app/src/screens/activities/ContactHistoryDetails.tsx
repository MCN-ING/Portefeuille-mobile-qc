import { useAgent } from '@credo-ts/react-hooks'
import { ThemedText, TOKENS, useServices } from '@hyperledger/aries-bifold-core'
import { HistoryRecord } from '@hyperledger/aries-bifold-core/src/modules/history/types'
import { formatTime } from '@hyperledger/aries-bifold-core/src/utils/helpers'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import HeaderText from '../../components/HeaderText'
import useHistoryDetailPageStyles from '../../hooks/useHistoryDetailPageStyles'
import { HistoryStackParams, Screens } from '../../navigators/navigators'
import { handleDeleteHistoryWithConfirmation } from '../../utils/historyUtils'
import { startCaseUnicode } from '../../utils/stringUtils'

type ContactHistoryDetailsProp = StackScreenProps<HistoryStackParams, Screens.ContactHistoryDetails>

const ContactHistoryDetails: React.FC<ContactHistoryDetailsProp> = ({ route, navigation }) => {
  const { item, operation } = route.params
  const { t } = useTranslation()
  const { agent } = useAgent()
  const [loadHistory] = useServices([TOKENS.FN_LOAD_HISTORY])
  const itemContent = item?.content as HistoryRecord
  const styles = useHistoryDetailPageStyles()
  const modifiedDate = itemContent.createdAt
    ? formatTime(itemContent.createdAt, { includeHour: true })
    : t('Record.InvalidDate')

  const iconSize = 24

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={[styles.contentContainer]} showsVerticalScrollIndicator={false}>
        <HeaderText
          title={
            (itemContent.correspondenceName ? startCaseUnicode(itemContent.correspondenceName) : '') +
            t('History.CardDescription.ContactUpdated', {
              operation: operation,
            })
          }
        />

        <View style={{ marginTop: 20 }} />
        <ThemedText style={styles.date}>
          {t('History.Date.changedOn', { operation: operation })} {modifiedDate}
        </ThemedText>
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

export default ContactHistoryDetails
