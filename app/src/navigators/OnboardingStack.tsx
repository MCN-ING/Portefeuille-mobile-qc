/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  AuthenticateStackParams,
  Config,
  DispatchAction,
  EventTypes,
  TOKENS,
  useDefaultStackOptions,
  useServices,
  useStore,
  useTheme,
} from '@hyperledger/aries-bifold-core'
import { StackActions, useNavigation, useNavigationState } from '@react-navigation/native'
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack'
import React, { useMemo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DeviceEventEmitter } from 'react-native'
import { BCState } from '../store'
import { createCarouselStyle } from '@hyperledger/aries-bifold-core/App/screens/OnboardingPages'
import PINCreate from '@hyperledger/aries-bifold-core/App/screens/PINCreate'
import PINEnter from '@hyperledger/aries-bifold-core/App/screens/PINEnter'
import NameWallet from '@hyperledger/aries-bifold-core/App/screens/NameWallet'
import PushNotification from '@hyperledger/aries-bifold-core/App/screens/PushNotification'
import AttemptLockout from '@hyperledger/aries-bifold-core/App/screens/AttemptLockout'
import { getOnboardingScreens } from './OnboardingScreens'
import { useOnboardingState } from '../hooks/useOnboardingState'
import AppUpdateNotification from '../screens/AppUpdateNotification'

const OnboardingStack: React.FC = () => {
  const [store, dispatch] = useStore<BCState>()
  const { t } = useTranslation()
  const Stack = createStackNavigator()
  const theme = useTheme()
  const OnboardingTheme = theme.OnboardingTheme
  const carousel = createCarouselStyle(OnboardingTheme)
  const [
    config,
    Splash,
    pages,
    useBiometry,
    Onboarding,
    Developer,
    { screen: Terms, version: termsVersion },
    onTutorialCompletedCurried,
    ScreenOptionsDictionary,
    Preface,
    generateOnboardingWorkflowSteps,
  ] = useServices([
    TOKENS.CONFIG,
    TOKENS.SCREEN_SPLASH,
    TOKENS.SCREEN_ONBOARDING_PAGES,
    TOKENS.SCREEN_USE_BIOMETRY,
    TOKENS.SCREEN_ONBOARDING,
    TOKENS.SCREEN_DEVELOPER,
    TOKENS.SCREEN_TERMS,
    TOKENS.FN_ONBOARDING_DONE,
    TOKENS.OBJECT_SCREEN_CONFIG,
    TOKENS.SCREEN_PREFACE,
    TOKENS.ONBOARDING,
  ])
  const defaultStackOptions = useDefaultStackOptions(theme)
  const navigation = useNavigation<StackNavigationProp<AuthenticateStackParams>>()
  const onTutorialCompleted = onTutorialCompletedCurried(dispatch, navigation)
  const currentRoute = useNavigationState((state) => state?.routes[state?.index])
  const { disableOnboardingSkip } = config as Config
  const { onboardingState, activeScreen } = useOnboardingState(
    store,
    config,
    Number(termsVersion),
    generateOnboardingWorkflowSteps
  )

  const onAuthenticated = useCallback(
    (status: boolean): void => {
      if (!status) {
        return
      }

      dispatch({
        type: DispatchAction.DID_AUTHENTICATE,
      })
    },
    [dispatch]
  )

  const UpdateAvailableScreen = useCallback(() => {
    return <AppUpdateNotification isRequired={store.appUpdate.isRequired} storeUrl={store.appUpdate.storeUrl} />
  }, [store.appUpdate])

  const OnboardingScreen = useCallback(() => {
    return (
      <Onboarding
        nextButtonText={t('Global.Next')}
        previousButtonText={t('Global.Back')}
        disableSkip={disableOnboardingSkip}
        pages={pages(onTutorialCompleted, OnboardingTheme)}
        style={carousel}
      />
    )
  }, [Onboarding, OnboardingTheme, carousel, disableOnboardingSkip, onTutorialCompleted, pages, t])

  // These need to be in the children of the stack screen otherwise they
  // will unmount/remount which resets the component state in memory and causes
  // issues
  const CreatePINScreen = useCallback(
    (props: any) => {
      return <PINCreate setAuthenticated={onAuthenticated} {...props} />
    },
    [onAuthenticated]
  )

  const EnterPINScreen = useCallback(
    (props: any) => {
      return <PINEnter setAuthenticated={onAuthenticated} {...props} />
    },
    [onAuthenticated]
  )

  useEffect(() => {
    // If the active screen is the same as the current route, then we don't
    // need to do anything.
    if (activeScreen && activeScreen === currentRoute?.name) {
      return
    }

    // If the active screen is different from the current route, then we need
    // to navigate to the active screen.
    if (activeScreen) {
      navigation.dispatch(StackActions.replace(activeScreen))
      return
    }

    // Nothing to do here, we are done with onboarding.
    DeviceEventEmitter.emit(EventTypes.DID_COMPLETE_ONBOARDING)
  }, [activeScreen, currentRoute, onboardingState, navigation])

  const screens = useMemo(
    () =>
      getOnboardingScreens(t, ScreenOptionsDictionary, {
        Splash,
        Preface,
        UpdateAvailableScreen,
        Terms,
        NameWallet,
        useBiometry,
        PushNotification,
        Developer,
        AttemptLockout,
        OnboardingScreen,
        CreatePINScreen,
        EnterPINScreen,
      }),
    [
      Splash,
      CreatePINScreen,
      Developer,
      EnterPINScreen,
      OnboardingScreen,
      Preface,
      Terms,
      useBiometry,
      t,
      ScreenOptionsDictionary,
      UpdateAvailableScreen,
    ]
  )
  return (
    <Stack.Navigator
      initialRouteName={activeScreen}
      screenOptions={{
        ...defaultStackOptions,
      }}
    >
      {screens.map((item) => {
        return <Stack.Screen key={item.name} {...item} />
      })}
    </Stack.Navigator>
  )
}

export default OnboardingStack
