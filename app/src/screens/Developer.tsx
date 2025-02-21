import { useTheme, useStore, testIdWithKey, DispatchAction } from '@hyperledger/aries-bifold-core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Switch, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SettingHeader from '../components/settings/SettingHeader'
import SettingRow from '../components/settings/SettingRow'
import { BCState, PreferencesQCDispatchAction } from '../store'

const Settings: React.FC = () => {
  const { t } = useTranslation()
  const [store, dispatch] = useStore<BCState>()
  const { TextTheme, ColorPallet } = useTheme()
  const [devMode, setDevMode] = useState<boolean>(true)
  const [useAppForcedUpdate, setUseAppForcedUpdate] = useState<boolean>(!!store.preferences.useForcedAppUpdate)
  const [useManageEnvironment, setUseManageEnvironment] = useState<boolean>(!!store.preferences.useManageEnvironment)

  const [useVerifierCapability, setUseVerifierCapability] = useState<boolean>(!!store.preferences.useVerifierCapability)
  const [acceptDevCredentials, setAcceptDevCredentials] = useState<boolean>(!!store.preferences.acceptDevCredentials)
  const [useConnectionInviterCapability, setUseConnectionInviterCapability] = useState(
    !!store.preferences.useConnectionInviterCapability
  )
  const [useDevVerifierTemplates, setUseDevVerifierTemplates] = useState(!!store.preferences.useDevVerifierTemplates)
  const [enableWalletNaming, setEnableWalletNaming] = useState(!!store.preferences.enableWalletNaming)
  const [preventAutoLock, setPreventAutoLock] = useState(!!store.preferences.preventAutoLock)

  useEffect(() => {
    setUseManageEnvironment(!!store.preferences.useManageEnvironment)
  }, [store.preferences.useManageEnvironment])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
    },
    rowTitle: {
      ...TextTheme.headingFour,
      flex: 1,
      fontWeight: 'normal',
      flexWrap: 'wrap',
    },
    rowSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.brand.secondary,
    },
  })

  const toggleSwitch = () => {
    dispatch({
      type: DispatchAction.ENABLE_DEVELOPER_MODE,
      payload: [!devMode],
    })
    setDevMode(!devMode)
  }

  const toggleVerifierCapabilitySwitch = () => {
    // if verifier feature is switched off then also turn off the dev templates
    if (useVerifierCapability) {
      dispatch({
        type: DispatchAction.USE_DEV_VERIFIER_TEMPLATES,
        payload: [false],
      })
      setUseDevVerifierTemplates(false)
    }
    dispatch({
      type: DispatchAction.USE_VERIFIER_CAPABILITY,
      payload: [!useVerifierCapability],
    })
    setUseVerifierCapability((previousState) => !previousState)
  }

  const toggleAcceptDevCredentialsSwitch = () => {
    dispatch({
      type: DispatchAction.ACCEPT_DEV_CREDENTIALS,
      payload: [!acceptDevCredentials],
    })
    setAcceptDevCredentials((previousState) => !previousState)
  }

  const toggleConnectionInviterCapabilitySwitch = () => {
    dispatch({
      type: DispatchAction.USE_CONNECTION_INVITER_CAPABILITY,
      payload: [!useConnectionInviterCapability],
    })
    setUseConnectionInviterCapability((previousState) => !previousState)
  }

  const toggleDevVerifierTemplatesSwitch = () => {
    // if we switch on dev templates we can assume the user also
    // wants to enable the verifier capability
    if (!useDevVerifierTemplates) {
      dispatch({
        type: DispatchAction.USE_VERIFIER_CAPABILITY,
        payload: [true],
      })
      setUseVerifierCapability(true)
    }
    dispatch({
      type: DispatchAction.USE_DEV_VERIFIER_TEMPLATES,
      payload: [!useDevVerifierTemplates],
    })
    setUseDevVerifierTemplates((previousState) => !previousState)
  }

  const toggleWalletNamingSwitch = () => {
    dispatch({
      type: DispatchAction.ENABLE_WALLET_NAMING,
      payload: [!enableWalletNaming],
    })

    setEnableWalletNaming((previousState) => !previousState)
  }

  const togglePreventAutoLockSwitch = () => {
    dispatch({
      type: DispatchAction.PREVENT_AUTO_LOCK,
      payload: [!preventAutoLock],
    })

    setPreventAutoLock((previousState) => !previousState)
  }

  const toggleAppForcedUpdatesSwitch = () => {
    dispatch({
      type: PreferencesQCDispatchAction.USE_APP_FORCED_UPDATE,
      payload: [!useAppForcedUpdate],
    })

    setUseAppForcedUpdate((previousState) => !previousState)
  }

  const toggleManageEnvironmentSwitch = () => {
    dispatch({
      type: PreferencesQCDispatchAction.USE_MANAGE_ENVIRONMENT,
      payload: [!useManageEnvironment],
    })

    setUseManageEnvironment((previousState) => !previousState)
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView style={styles.innerContainer}>
        <SettingHeader title={t('Settings.Developer')} />
        <SettingRow title={t('Developer.DeveloperMode')} testID={testIdWithKey('ToggleDeveloper')} showRowSeparator>
          <Switch
            accessibilityLabel={t('Developer.Toggle')}
            trackColor={{ false: ColorPallet.grayscale.lightGrey, true: ColorPallet.brand.primary }}
            thumbColor={ColorPallet.grayscale.white}
            ios_backgroundColor={ColorPallet.grayscale.lightGrey}
            onValueChange={toggleSwitch}
            value={devMode}
          />
        </SettingRow>
        <SettingRow
          title={t('Settings.ManageEnvironment')}
          testID={testIdWithKey('ToggleManagedEnvironmentSwitch')}
          showRowSeparator
        >
          <Switch
            accessibilityLabel={t('Settings.ToggleManageEnvironment')}
            trackColor={{ false: ColorPallet.grayscale.lightGrey, true: ColorPallet.brand.primary }}
            thumbColor={ColorPallet.grayscale.white}
            ios_backgroundColor={ColorPallet.grayscale.lightGrey}
            onValueChange={toggleManageEnvironmentSwitch}
            value={useManageEnvironment}
          />
        </SettingRow>
        <SettingRow
          title={t('Verifier.UseVerifierCapability')}
          testID={testIdWithKey('ToggleVerifierCapability')}
          showRowSeparator
        >
          <Switch
            accessibilityLabel={t('Verifier.Toggle')}
            trackColor={{ false: ColorPallet.grayscale.lightGrey, true: ColorPallet.brand.primary }}
            thumbColor={ColorPallet.grayscale.white}
            ios_backgroundColor={ColorPallet.grayscale.lightGrey}
            onValueChange={toggleVerifierCapabilitySwitch}
            value={useVerifierCapability}
          />
        </SettingRow>
        <SettingRow
          title={t('Verifier.AcceptDevCredentials')}
          testID={testIdWithKey('ToggleAcceptDevCredentials')}
          showRowSeparator
        >
          <Switch
            accessibilityLabel={t('Verifier.Toggle')}
            trackColor={{ false: ColorPallet.grayscale.lightGrey, true: ColorPallet.brand.primary }}
            thumbColor={ColorPallet.grayscale.white}
            ios_backgroundColor={ColorPallet.grayscale.lightGrey}
            onValueChange={toggleAcceptDevCredentialsSwitch}
            value={acceptDevCredentials}
          />
        </SettingRow>
        <SettingRow
          title={t('Connection.UseConnectionInviterCapability')}
          testID={testIdWithKey('ToggleConnectionInviterCapabilitySwitch')}
          showRowSeparator
        >
          <Switch
            accessibilityLabel={t('Connection.Toggle')}
            trackColor={{ false: ColorPallet.grayscale.lightGrey, true: ColorPallet.brand.primary }}
            thumbColor={ColorPallet.grayscale.white}
            ios_backgroundColor={ColorPallet.grayscale.lightGrey}
            onValueChange={toggleConnectionInviterCapabilitySwitch}
            value={useConnectionInviterCapability}
          />
        </SettingRow>
        <SettingRow
          title={t('Verifier.UseDevVerifierTemplates')}
          testID={testIdWithKey('ToggleDevVerifierTemplatesSwitch')}
          showRowSeparator
        >
          <Switch
            accessibilityLabel={t('Verifier.ToggleDevTemplates')}
            trackColor={{ false: ColorPallet.grayscale.lightGrey, true: ColorPallet.brand.primary }}
            thumbColor={ColorPallet.grayscale.white}
            ios_backgroundColor={ColorPallet.grayscale.lightGrey}
            onValueChange={toggleDevVerifierTemplatesSwitch}
            value={useDevVerifierTemplates}
          />
        </SettingRow>
        {!store.onboarding.didCreatePIN && (
          <SettingRow
            title={t('NameWallet.EnableWalletNaming')}
            testID={testIdWithKey('ToggleWalletNamingSwitch')}
            showRowSeparator
          >
            <Switch
              accessibilityLabel={t('NameWallet.ToggleWalletNaming')}
              trackColor={{ false: ColorPallet.grayscale.lightGrey, true: ColorPallet.brand.primary }}
              thumbColor={ColorPallet.grayscale.white}
              ios_backgroundColor={ColorPallet.grayscale.lightGrey}
              onValueChange={toggleWalletNamingSwitch}
              value={enableWalletNaming}
            />
          </SettingRow>
        )}
        <SettingRow
          title={t('Settings.PreventAutoLock')}
          testID={testIdWithKey('TogglePreventAutoLockSwitch')}
          showRowSeparator
        >
          <Switch
            accessibilityLabel={t('Settings.TogglePreventAutoLock')}
            trackColor={{ false: ColorPallet.grayscale.lightGrey, true: ColorPallet.brand.primary }}
            thumbColor={ColorPallet.grayscale.white}
            ios_backgroundColor={ColorPallet.grayscale.lightGrey}
            onValueChange={togglePreventAutoLockSwitch}
            value={preventAutoLock}
          />
        </SettingRow>
        <SettingRow title={t('Settings.ForcedUpdates')} testID={testIdWithKey('ToggleForcedUpdatesSwitch')}>
          <Switch
            accessibilityLabel={t('Settings.ToggleForcedUpdates')}
            trackColor={{ false: ColorPallet.grayscale.lightGrey, true: ColorPallet.brand.primary }}
            thumbColor={ColorPallet.grayscale.white}
            ios_backgroundColor={ColorPallet.grayscale.lightGrey}
            onValueChange={toggleAppForcedUpdatesSwitch}
            value={useAppForcedUpdate}
          />
        </SettingRow>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings
