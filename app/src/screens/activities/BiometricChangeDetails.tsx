import { useAgent } from '@credo-ts/react-hooks'
import { ThemedText, TOKENS, useServices } from '@hyperledger/aries-bifold-core'
import { formatTime } from '@hyperledger/aries-bifold-core/App/utils/helpers'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import HeaderText from '../../components/HeaderText'
import useHistoryDetailPageStyles from '../../hooks/useHistoryDetailPageStyles'
import { HistoryStackParams, Screens } from '../../navigators/navigators'
import { handleDeleteHistoryWithConfirmation } from '../../utils/historyUtils'

type BiometricChangeDetailsProp = StackScreenProps<HistoryStackParams, Screens.BiometricChangeDetails>

const BiometricChangeDetails: React.FC<BiometricChangeDetailsProp> = ({ route, navigation }) => {
  const { item, operation } = route.params
  const { t } = useTranslation()
  const { agent } = useAgent()
  const [loadHistory] = useServices([TOKENS.FN_LOAD_HISTORY])
  const styles = useHistoryDetailPageStyles()

  const modifiedDate = item?.content.createdAt
    ? formatTime(item.content.createdAt, { includeHour: true })
    : t('Record.InvalidDate')

  const iconSize = 24

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.contentContainer, styles.headerStyle]}>
        <HeaderText title={t('History.CardDescription.BiometricUpdated', { operation })} />
        <View style={{ marginTop: 20 }} />
        <ThemedText style={styles.date}>
          {t('Date.ModifiedOn')} {modifiedDate}
        </ThemedText>
      </ScrollView>

      <View style={styles.lineSeparator} />

      <TouchableOpacity
        style={styles.deleteContainer}
        onPress={() => handleDeleteHistoryWithConfirmation(item.content.id ?? '', agent, loadHistory, t, navigation)}
        accessibilityLabel={t('History.Button.DeleteHistory')}
        accessibilityRole="button"
      >
        <MaterialCommunityIcon name={'trash-can-outline'} size={iconSize} style={styles.trashIcon} />
        <ThemedText style={styles.deleteText}>{t('History.Button.DeleteHistory')}</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default BiometricChangeDetails
