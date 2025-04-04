import { CredentialExchangeRecord } from '@credo-ts/core'
import { useAgent } from '@credo-ts/react-hooks'
import {
  CredentialCard,
  Record,
  TOKENS,
  useServices,
  formatTime,
  useCredentialConnectionLabel,
  getCredentialIdentifiers,
  isValidAnonCredsCredential,
  buildFieldsFromAnonCredsCredential,
  ThemedText,
} from '@hyperledger/aries-bifold-core'
import { CredentialErrors } from '@hyperledger/aries-bifold-core/src/components/misc/CredentialCard11'
import { HistoryRecord } from '@hyperledger/aries-bifold-core/src/modules/history/types'
import { BrandingOverlay } from '@hyperledger/aries-oca'
import { Attribute, CredentialOverlay } from '@hyperledger/aries-oca/build/legacy'
import { StackScreenProps } from '@react-navigation/stack'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import HeaderText from '../../components/HeaderText'
import HistoryUnavailableCard from '../../components/HistoryUnavailableCard'
import useHistoryDetailPageStyles from '../../hooks/useHistoryDetailPageStyles'
import { HistoryStackParams, Screens } from '../../navigators/navigators'
import { ColorPallet } from '../../theme'
import { handleDeleteHistoryWithConfirmation } from '../../utils/historyUtils'
import { startCaseUnicode } from '../../utils/stringUtils'

type CardHistorydDetailsProp = StackScreenProps<HistoryStackParams, Screens.CardHistoryDetails>

const CardHistorydDetails: React.FC<CardHistorydDetailsProp> = ({ route, navigation }: CardHistorydDetailsProp) => {
  const { t, i18n } = useTranslation()
  const { recordId, item, operation } = route.params
  const itemContent = item.content as HistoryRecord
  const iconSize = 24
  const { agent } = useAgent()
  const [bundleResolver, loadHistory] = useServices([TOKENS.UTIL_OCA_RESOLVER, TOKENS.FN_LOAD_HISTORY])
  const [credentialExists, setCredentialExists] = useState<boolean | null>(null)
  const styles = useHistoryDetailPageStyles()

  const [credentialDetails, setCredentialDetails] = useState<CredentialExchangeRecord | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [overlay, setOverlay] = useState<CredentialOverlay<BrandingOverlay>>({
    bundle: undefined,
    presentationFields: [],
    metaOverlay: undefined,
    brandingOverlay: undefined,
  })

  const credentialConnectionLabel = useCredentialConnectionLabel(credentialDetails ?? undefined)

  useEffect(() => {
    if (!(credentialDetails && isValidAnonCredsCredential(credentialDetails))) {
      return
    }

    const params = {
      identifiers: getCredentialIdentifiers(credentialDetails),
      meta: {
        alias: credentialConnectionLabel,
        credConnectionId: credentialDetails.connectionId,
      },
      attributes: buildFieldsFromAnonCredsCredential(credentialDetails),
      language: i18n.language,
    }

    bundleResolver.resolveAllBundles(params).then((bundle) => {
      setOverlay((o) => ({
        ...o,
        ...(bundle as CredentialOverlay<BrandingOverlay>),
        presentationFields: bundle.presentationFields?.filter((field) => (field as Attribute).value),
      }))
    })
  }, [credentialDetails, credentialConnectionLabel, bundleResolver, i18n.language])

  const checkCredentialExists = useCallback(
    async (id: string): Promise<void> => {
      try {
        const credentialExchangeRecord = await agent?.credentials.getById(id)
        setCredentialExists(credentialExchangeRecord !== null)
        setCredentialDetails(credentialExchangeRecord)
      } catch (error) {
        setCredentialExists(false)
      } finally {
        setIsLoading(false)
      }
    },
    [agent]
  )

  useEffect(() => {
    if (recordId) {
      checkCredentialExists(recordId)
    } else {
      setCredentialExists(false)
      setIsLoading(false)
    }
  }, [recordId, checkCredentialExists])

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
      <View style={[styles.contentContainer, { paddingTop: 0, flex: 1 }]}>
        <Record
          hideFieldValues={overlay.presentationFields?.length !== 0}
          fields={overlay.presentationFields || []}
          header={() => (
            <View style={[styles.headerStyle, { marginHorizontal: 8, marginBottom: 10 }]}>
              <HeaderText
                title={t('History.CardDescription.CardChanged', {
                  cardName: overlay.metaOverlay?.name ?? startCaseUnicode(itemContent.message ?? ''),
                  operation: operation,
                  interpolation: { escapeValue: false },
                })}
              />

              <View style={{ marginTop: 20 }} />
              <ThemedText style={styles.subTitle}>
                {itemContent?.correspondenceName ? startCaseUnicode(itemContent?.correspondenceName) : ''}
              </ThemedText>
              <ThemedText style={styles.date}>
                {t('History.Date.changedOn', { operation: operation })} {operationDate}
              </ThemedText>
              {credentialExists ? (
                <CredentialCard
                  credential={credentialDetails as CredentialExchangeRecord}
                  credentialErrors={
                    (credentialDetails as CredentialExchangeRecord).revocationNotification?.revocationDate && [
                      CredentialErrors.Revoked,
                    ]
                  }
                />
              ) : (
                <HistoryUnavailableCard credentialName={itemContent.message} issuer={itemContent.correspondenceName} />
              )}
            </View>
          )}
        />
      </View>
      <View style={styles.lineSeparator} />

      <TouchableOpacity
        style={styles.deleteContainer}
        onPress={() => handleDeleteHistoryWithConfirmation(item.content.id ?? '', agent, loadHistory, t, navigation)}
        accessibilityRole="button"
        accessibilityLabel={t('History.Button.DeleteHistory')}
      >
        <MaterialCommunityIcon
          name={'trash-can-outline'}
          size={iconSize}
          style={styles.trashIcon}
          accessibilityRole="image"
          accessibilityLabel={t('History.Icon.Delete')}
        />
        <ThemedText style={styles.deleteText}>{t('History.Button.DeleteHistory')}</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default CardHistorydDetails
