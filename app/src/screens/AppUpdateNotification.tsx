import { useTheme, Button, ButtonType, testIdWithKey, Stacks } from '@hyperledger/aries-bifold-core'
import { CommonActions } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { Linking, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import HeaderText from '../components/HeaderText'
import { AppUpdateNotificationParams, Screens } from '../navigators/navigators'

type DefaultProps = StackScreenProps<AppUpdateNotificationParams, Screens.AppUpdateNotification>

const AppUpdateNotification: React.FC<DefaultProps> = ({ navigation, route }) => {
  if (!route?.params) {
    throw new Error('No route params found')
  }
  const { isRequired = false, storeUrl } = route.params

  const { TextTheme } = useTheme()
  const { t } = useTranslation()

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

  const openAppUpdateLinkUrl = async () => {
    await Linking.openURL(storeUrl)
  }

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
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: Stacks.TabStack }],
                })
              )
            }
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default AppUpdateNotification
