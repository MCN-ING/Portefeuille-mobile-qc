import {
  useTheme,
  useStore,
  testIdWithKey,
  DispatchAction,
  Button,
  ButtonType,
  SafeAreaModal,
  ThemedText,
} from '@hyperledger/aries-bifold-core'
import { Locales } from '@hyperledger/aries-bifold-core/src/localization'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { getBuildNumber, getVersion } from 'react-native-device-info'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import SettingHeader from '../components/settings/SettingHeader'
import SettingRow from '../components/settings/SettingRow'
import { Screens, SettingStackParams, Stacks } from '../navigators/navigators'
import { BCState } from '../store'

import Developer from './Developer'
import IASEnvironment from './IASEnvironment'
import AppUpdateNotification from './AppUpdateNotification'

type SettingsProps = StackScreenProps<SettingStackParams>

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  const { ColorPallet, Assets } = useTheme()
  const [store, dispatch] = useStore<BCState>()
  const { t, i18n } = useTranslation()
  const currentLanguage = t('Language.code', { context: i18n.language as Locales })
  const developerOptionCount = useRef(0)
  const [environmentModalVisible, setEnvironmentModalVisible] = useState<boolean>(false)
  const [appUpdateModalVisible, setAppUpdateModalVisible] = useState<boolean>(false)
  const insets = useSafeAreaInsets()

  const touchCountToEnableBiometrics = 9

  const shouldDismissModal = () => {
    setEnvironmentModalVisible(false)
  }

  const shouldDismissAppUpdateModal = () => {
    setAppUpdateModalVisible(false)
  }

  const incrementDeveloperMenuCounter = () => {
    if (developerOptionCount.current >= touchCountToEnableBiometrics) {
      developerOptionCount.current = 0
      dispatch({
        type: DispatchAction.ENABLE_DEVELOPER_MODE,
        payload: [true],
      })

      return
    }

    developerOptionCount.current = developerOptionCount.current + 1
  }

  const styles = StyleSheet.create({
    container: {
      flex: 2,
      padding: 16,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    scroll: {
      flexGrow: 1,
    },
  })
  const icon = {
    color: ColorPallet.grayscale.darkGrey,
    width: 30,
    height: 30,
  }

  const arrowIcon = <Assets.svg.iconChevronRight accessible={false} {...icon} />
  const environment = Object.keys(store.developer.environment)[0]

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <SafeAreaModal
        visible={environmentModalVisible}
        transparent={false}
        animationType={'slide'}
        onRequestClose={() => {
          return
        }}
      >
        <IASEnvironment shouldDismissModal={shouldDismissModal} />
      </SafeAreaModal>
      {/* TODO: Ajouter le Header provenant de react-navigation/elements */}
      <SafeAreaModal
        visible={appUpdateModalVisible}
        transparent={false}
        animationType={'slide'}
        onRequestClose={() => {
          return
        }}
      >
        <View style={{ flex: 1, marginTop: insets.top }}>
          <AppUpdateNotification
            storeUrl={store.appUpdate.storeUrl}
            isRequired={store.appUpdate.isRequired}
            shouldDismissModal={shouldDismissAppUpdateModal}
          />
        </View>
      </SafeAreaModal>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SettingHeader title={t('Settings.Preference')} />
        <SettingRow
          title={t('Settings.Language')}
          testID={testIdWithKey('Language')}
          onPress={() => navigation.navigate(Screens.Language)}
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <ThemedText variant="headingFour" style={{ fontWeight: 'normal' }}>
            {currentLanguage}
          </ThemedText>
        </SettingRow>
        <SettingRow
          title={t('Settings.Tours')}
          testID={testIdWithKey('Tours')}
          onPress={() => navigation.navigate(Screens.Tours)}
          rowIcon={arrowIcon}
          containerStyle={{ marginBottom: 32 }}
        >
          <ThemedText variant="headingFour" style={{ fontWeight: 'normal' }}>
            {store.tours.enableTours ? t('Settings.ToursActive') : t('Settings.ToursDisabled')}
          </ThemedText>
        </SettingRow>
        <SettingHeader title={t('Settings.Security')} />
        <SettingRow
          title={t('Settings.MyPin')}
          testID={testIdWithKey('MyPin')}
          onPress={() =>
            navigation
              .getParent()
              ?.navigate(Stacks.SettingsStack, { screen: Screens.CreatePIN, params: { updatePin: true } })
          }
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <ThemedText variant="headingFour" style={{ fontWeight: 'normal' }}>
            {t('Settings.ChangePin')}
          </ThemedText>
        </SettingRow>
        <SettingRow
          title={t('Settings.Biometrics')}
          testID={testIdWithKey('Biometrics')}
          onPress={() => navigation.navigate(Screens.UseBiometry)}
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <ThemedText variant="headingFour" style={{ fontWeight: 'normal' }}>
            {store.preferences.useBiometry ? t('Settings.BiometricActive') : t('Settings.BiometricDisabled')}
          </ThemedText>
        </SettingRow>
        {store.preferences.useManageEnvironment && (
          <SettingRow
            title={t('Developer.Environment')}
            testID={testIdWithKey('Environment')}
            showRowSeparator
            onPress={() => {
              setEnvironmentModalVisible(true)
            }}
          >
            <ThemedText variant="label" style={{ fontWeight: 'normal', color: ColorPallet.brand.link }}>
              {environment}
            </ThemedText>
          </SettingRow>
        )}
        <SettingRow
          title={t('Settings.Version')}
          testID={testIdWithKey('Version')}
          onPress={environment !== 'PRODUCTION' ? incrementDeveloperMenuCounter : undefined}
        >
          <ThemedText>
            {getVersion()} {`(${getBuildNumber()})`}
          </ThemedText>
        </SettingRow>
        {store.appUpdate.updateAvailable && (
          <View style={{ paddingTop: 12, paddingBottom: 32 }}>
            <Button
              buttonType={ButtonType.Secondary}
              testID={testIdWithKey('UpdateAvailable')}
              accessibilityLabel={t('AppUpdateNotificationPage.UpdateAvailable')}
              title={t('AppUpdateNotificationPage.UpdateAvailable')}
              onPress={() => {
                setAppUpdateModalVisible(true)
              }}
            />
          </View>
        )}
        {store.preferences.developerModeEnabled && <Developer />}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings
