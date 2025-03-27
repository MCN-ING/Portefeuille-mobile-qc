import { ProofState } from '@credo-ts/core'
import { useAgent, useProofByState } from '@credo-ts/react-hooks'
import {
  BifoldError,
  ButtonLocation,
  ConnectStack,
  ContactStack,
  DeliveryStack,
  EventTypes,
  IconButton,
  NotificationStack,
  ProofRequestStack,
  Screens,
  Stacks as Bifoldstacks,
  TOKENS,
  TabStacks,
  testIdWithKey,
  useDeepLinks,
  useDefaultStackOptions,
  useServices,
  useStore,
  useTheme,
  useTour,
} from '@hyperledger/aries-bifold-core'
import OpenIdCredentialDetails from '@hyperledger/aries-bifold-core/App/modules/openid/screens/OpenIDCredentialDetails'
import Chat from '@hyperledger/aries-bifold-core/App/screens/Chat'
import CredentialDetails from '@hyperledger/aries-bifold-core/App/screens/CredentialDetails'
import { ProofCustomMetadata, ProofMetadata } from '@hyperledger/aries-bifold-verifier'
import { CardStyleInterpolators, createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DeviceEventEmitter, View } from 'react-native'

import AboutStack from './AboutStack'
import HelpCenterStack from './HelpCenterStack'
import HistoryStack from './HistoryStack'
import SettingStack from './SettingStack'
import TabStack from './TabStack'
import { RootStackParams, Stacks } from './navigators'

const RootStack: React.FC = () => {
  const [store, dispatch] = useStore()
  const { agent } = useAgent()
  const { currentStep } = useTour()
  const { t } = useTranslation()
  const theme = useTheme()
  const defaultStackOptions = useDefaultStackOptions(theme)
  const [splash, OnboardingStack, ScreenOptionsDictionary, loadState] = useServices([
    TOKENS.SCREEN_SPLASH,
    TOKENS.STACK_ONBOARDING,
    TOKENS.OBJECT_SCREEN_CONFIG,
    TOKENS.LOAD_STATE,
  ])

  const hideElements = useMemo(() => (currentStep === undefined ? 'auto' : 'no-hide-descendants'), [currentStep])

  useDeepLinks()

  // remove connection on mobile verifier proofs if proof is rejected regardless of if it has been opened
  const declinedProofs = useProofByState([ProofState.Declined, ProofState.Abandoned])
  useEffect(() => {
    declinedProofs.forEach((proof) => {
      const meta = proof?.metadata?.get(ProofMetadata.customMetadata) as ProofCustomMetadata
      if (meta?.delete_conn_after_seen) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        agent?.connections.deleteById(proof?.connectionId ?? '').catch(() => {})
        proof?.metadata.set(ProofMetadata.customMetadata, { ...meta, delete_conn_after_seen: false })
      }
    })
  }, [declinedProofs, agent, store.preferences.useDataRetention])

  const loadStateErrorTitle = t('Error.Title1044')
  const loadStateErrorDescription = t('Error.Message1044')

  useEffect(() => {
    loadState(dispatch).catch((err: unknown) => {
      const error = new BifoldError(loadStateErrorTitle, loadStateErrorDescription, (err as Error).message, 1001)
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error)
    })
  }, [dispatch, loadState, loadStateErrorTitle, loadStateErrorDescription])

  const mainStack = () => {
    const Stack = createStackNavigator<RootStackParams>()

    // This function is to make the fade in behavior of both iOS and Android consistent for the settings menu
    const forFade: StackCardStyleInterpolator = ({ current }) => ({
      cardStyle: {
        opacity: current.progress,
      },
    })

    return (
      <View style={{ flex: 1 }} importantForAccessibility={hideElements}>
        <Stack.Navigator
          initialRouteName={Screens.Splash}
          screenOptions={{ ...defaultStackOptions, headerShown: false }}
        >
          <Stack.Screen name={Screens.Splash} component={splash} />
          <Stack.Screen name={Bifoldstacks.TabStack} component={TabStack} />
          <Stack.Screen
            name={Screens.Chat}
            component={Chat}
            options={({ navigation }) => ({
              headerShown: true,
              title: t('Screens.CredentialOffer'),
              headerLeft: () => (
                <IconButton
                  buttonLocation={ButtonLocation.Left}
                  accessibilityLabel={t('Global.Back')}
                  testID={testIdWithKey('BackButton')}
                  onPress={() => {
                    navigation.navigate(TabStacks.HomeStack, { screen: Screens.Home })
                  }}
                  icon="arrow-left"
                />
              ),
            })}
          />
          <Stack.Screen name={Bifoldstacks.ConnectStack} component={ConnectStack} />
          <Stack.Screen name={Bifoldstacks.ContactStack} component={ContactStack} />
          <Stack.Screen name={Bifoldstacks.NotificationStack} component={NotificationStack} />
          <Stack.Screen
            name={Bifoldstacks.ConnectionStack}
            component={DeliveryStack}
            options={{
              gestureEnabled: false,
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              presentation: 'modal',
            }}
          />
          <Stack.Screen name={Bifoldstacks.ProofRequestsStack} component={ProofRequestStack} />
          <Stack.Screen
            name={Stacks.HistoryStack}
            component={HistoryStack}
            options={{
              cardStyleInterpolator: forFade,
            }}
          />
          <Stack.Screen name={Stacks.SettingsStack} component={SettingStack} />
          <Stack.Screen name={Stacks.HelpCenterStack} component={HelpCenterStack} />
          <Stack.Screen name={Stacks.AboutStack} component={AboutStack} />
          <Stack.Screen
            name={Screens.CredentialDetails}
            component={CredentialDetails}
            options={{
              title: t('Screens.CredentialDetails'),
              ...ScreenOptionsDictionary[Screens.CredentialDetails],
            }}
          />
          <Stack.Screen
            name={Screens.OpenIDCredentialDetails}
            component={OpenIdCredentialDetails}
            options={{
              title: t('Screens.CredentialDetails'),
              ...ScreenOptionsDictionary[Screens.OpenIDCredentialDetails],
            }}
          />
        </Stack.Navigator>
      </View>
    )
  }

  if (
    ((store.onboarding.onboardingVersion !== 0 && store.onboarding.didCompleteOnboarding) ||
      (store.onboarding.onboardingVersion === 0 && store.onboarding.didConsiderBiometry)) &&
    store.authentication.didAuthenticate &&
    store.onboarding.postAuthScreens.length === 0
  ) {
    return mainStack()
  }
  return <OnboardingStack />
}

export default RootStack
