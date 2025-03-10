import {
  useTheme,
  Button,
  ButtonType,
  testIdWithKey,
  useStore,
  Screens as BifoldScreens,
} from '@hyperledger/aries-bifold-core'
import { StackScreenProps } from '@react-navigation/stack'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Linking, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import HeaderText from '../components/HeaderText'
import { AppUpdateNotificationParams, Screens } from '../navigators/navigators'
import { BCDispatchAction, BCState } from '../store'

import { TermsVersion } from './Terms'

type DefaultProps = StackScreenProps<AppUpdateNotificationParams, Screens.AppUpdateNotification>

const AppUpdateNotification: React.FC<DefaultProps> = ({ navigation, route }) => {
  if (!route?.params) {
    throw new Error('No route params found')
  }
  const { isRequired = false, storeUrl } = route.params

  const { TextTheme } = useTheme()
  const { t } = useTranslation()
  const [store, dispatch] = useStore<BCState>()
  const agreedToPreviousTerms = store.onboarding.didAgreeToTerms
  const agreesToCurrentTerms = store.onboarding.didAgreeToTerms === TermsVersion

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
      ...TextTheme.normal,
      paddingTop: 16,
    },
  })

  const openAppUpdateLinkUrl = useCallback(async () => {
    await Linking.openURL(storeUrl)
  }, [storeUrl])

  const cancelUpdate = useCallback(() => {
    dispatch({
      type: BCDispatchAction.APP_UPDATE_DISMISS_MINOR,
      payload: [true],
    })

    if (!agreedToPreviousTerms && !agreesToCurrentTerms) {
      navigation.getParent()?.navigate(BifoldScreens.Terms)
    } else if (!store.onboarding.didCreatePIN) {
      navigation.getParent()?.navigate(BifoldScreens.CreatePIN)
    } else if (!store.onboarding.didConsiderBiometry) {
      navigation.getParent()?.navigate(BifoldScreens.UseBiometry)
    } else if (!store.authentication.didAuthenticate) {
      navigation.getParent()?.navigate(BifoldScreens.EnterPIN)
    } else {
      navigation.goBack()
    }
  }, [dispatch, navigation, agreedToPreviousTerms, agreesToCurrentTerms, store.onboarding])

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <View style={styles.notificationContainer}>
        <HeaderText
          title={
            isRequired ? t('AppUpdateNotificationPage.TitleRequired') : t('AppUpdateNotificationPage.TitleAvailable')
          }
        />
        <Text style={styles.description}>
          {isRequired
            ? t('AppUpdateNotificationPage.DescriptionRequired')
            : t('AppUpdateNotificationPage.DescriptionAvailable')}
        </Text>
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
