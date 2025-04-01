import { Button, ButtonType, testIdWithKey, useStore, ThemedText } from '@hyperledger/aries-bifold-core'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Linking, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import HeaderText from '../components/HeaderText'
import { BCDispatchAction, BCState } from '../store'

type DefaultProps = {
  storeUrl: string
  isRequired?: boolean
  shouldDismissModal?: () => void
}

const AppUpdateNotification: React.FC<DefaultProps> = ({
  isRequired = false,
  storeUrl,
  shouldDismissModal,
}: DefaultProps) => {
  const { t } = useTranslation()
  const [, dispatch] = useStore<BCState>()

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      paddingHorizontal: 16,
    },
    button: {
      marginVertical: 10,
      gap: 24,
    },
    notificationContainer: {
      flex: 2,
      paddingTop: 24,
    },
    description: {
      paddingTop: 16,
    },
  })

  const openAppUpdateLinkUrl = useCallback(async () => {
    await Linking.openURL(storeUrl)
  }, [storeUrl])

  const cancelUpdate = useCallback(() => {
    dispatch({
      type: BCDispatchAction.APP_UPDATE_DISMISS,
      payload: [true],
    })
    shouldDismissModal?.()
  }, [dispatch, shouldDismissModal])

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <View style={styles.notificationContainer}>
        <HeaderText
          title={
            isRequired ? t('AppUpdateNotificationPage.TitleRequired') : t('AppUpdateNotificationPage.TitleAvailable')
          }
        />
        <ThemedText style={styles.description}>
          {isRequired
            ? t('AppUpdateNotificationPage.DescriptionRequired')
            : t('AppUpdateNotificationPage.DescriptionAvailable')}
        </ThemedText>
      </View>
      <View style={styles.button}>
        <Button
          buttonType={ButtonType.Primary}
          testID={testIdWithKey('UpdateNow')}
          accessibilityLabel={t('AppUpdateNotificationPage.UpdateNow')}
          title={t('AppUpdateNotificationPage.UpdateNow')}
          onPress={openAppUpdateLinkUrl}
        />
        {!isRequired && (
          <Button
            buttonType={ButtonType.Secondary}
            testID={testIdWithKey('CancelUpdate')}
            accessibilityLabel={t('AppUpdateNotificationPage.CancelUpdate')}
            title={t('AppUpdateNotificationPage.CancelUpdate')}
            onPress={cancelUpdate}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default AppUpdateNotification
