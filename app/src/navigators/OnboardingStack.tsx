/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  AttemptLockout,
  AuthenticateStackParams,
  DispatchAction,
  Screens,
  TOKENS,
  useDefaultStackOptions,
  useServices,
  useStore,
  useTheme,
} from '@hyperledger/aries-bifold-core'
import NameWallet from '@hyperledger/aries-bifold-core/App/screens/NameWallet'
import { createCarouselStyle } from '@hyperledger/aries-bifold-core/App/screens/OnboardingPages'
import PINCreate from '@hyperledger/aries-bifold-core/App/screens/PINCreate'
import PINEnter from '@hyperledger/aries-bifold-core/App/screens/PINEnter'
import PushNotification from '@hyperledger/aries-bifold-core/App/screens/PushNotification'
import { ParamListBase, RouteConfig, StackNavigationState, useNavigation } from '@react-navigation/native'
import { StackNavigationOptions, StackNavigationProp, createStackNavigator } from '@react-navigation/stack'
import { StackNavigationEventMap } from '@react-navigation/stack/lib/typescript/src/types'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import AppUpdateNotification from '../screens/AppUpdateNotification'

import { Screens as QCScreens } from './navigators'

type ScreenOptions = RouteConfig<
  ParamListBase,
  Screens | QCScreens,
  StackNavigationState<ParamListBase>,
  StackNavigationOptions,
  StackNavigationEventMap
>

const OnboardingStack: React.FC = () => {
  const [, dispatch] = useStore()
  const { t } = useTranslation()
  const Stack = createStackNavigator()
  const theme = useTheme()
  const OnboardingTheme = theme.OnboardingTheme
  const carousel = createCarouselStyle(OnboardingTheme)
  const [
    splash,
    pages,
    useBiometry,
    Onboarding,
    Developer,
    { screen: Terms },
    onTutorialCompletedCurried,
    ScreenOptionsDictionary,
    Preface,
  ] = useServices([
    TOKENS.SCREEN_SPLASH,
    TOKENS.SCREEN_ONBOARDING_PAGES,
    TOKENS.SCREEN_USE_BIOMETRY,
    TOKENS.SCREEN_ONBOARDING,
    TOKENS.SCREEN_DEVELOPER,
    TOKENS.SCREEN_TERMS,
    TOKENS.FN_ONBOARDING_DONE,
    TOKENS.OBJECT_SCREEN_CONFIG,
    TOKENS.SCREEN_PREFACE,
  ])
  const defaultStackOptions = useDefaultStackOptions(theme)
  const navigation = useNavigation<StackNavigationProp<AuthenticateStackParams>>()
  const onTutorialCompleted = onTutorialCompletedCurried(dispatch, navigation)
  const [{ disableOnboardingSkip }] = useServices([TOKENS.CONFIG])

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

  const OnBoardingScreen = () => {
    return (
      <Onboarding
        nextButtonText={t('Global.Next')}
        previousButtonText={t('Global.Back')}
        disableSkip={disableOnboardingSkip}
        pages={pages(onTutorialCompleted, OnboardingTheme)}
        style={carousel}
      />
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CreatePINScreen = (props: any) => {
    return <PINCreate setAuthenticated={onAuthenticated} {...props} />
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const EnterPINScreen = (props: any) => {
    return <PINEnter setAuthenticated={onAuthenticated} {...props} />
  }

  const screens: ScreenOptions[] = [
    {
      name: Screens.Preface,
      component: Preface,
      options: () => {
        return {
          ...ScreenOptionsDictionary[Screens.Preface],
          title: t('Screens.Preface'),
        }
      },
    },
    {
      name: QCScreens.AppUpdateNotification,
      component: AppUpdateNotification,
      options: () => {
        return {
          title: t('Screens.AppUpdateNotification'),
          headerLeft: () => null,
        }
      },
    },
    {
      name: Screens.Splash,
      component: splash,
      options: ScreenOptionsDictionary[Screens.Splash],
    },
    {
      name: Screens.Onboarding,
      children: OnBoardingScreen,
      options: () => {
        return {
          ...ScreenOptionsDictionary[Screens.Onboarding],
          title: t('Screens.Onboarding'),
          headerLeft: () => false,
        }
      },
    },
    {
      name: Screens.Terms,
      options: () => ({
        ...ScreenOptionsDictionary[Screens.Terms],
        title: t('Screens.Terms'),
        headerLeft: () => false,
      }),
      component: Terms,
    },
    {
      name: Screens.CreatePIN,
      children: CreatePINScreen,
      initialParams: {},
      options: () => ({
        ...ScreenOptionsDictionary[Screens.CreatePIN],
        title: t('Screens.CreatePIN'),
        headerLeft: () => false,
      }),
    },
    {
      name: Screens.NameWallet,
      options: () => ({
        ...ScreenOptionsDictionary[Screens.NameWallet],
        title: t('Screens.NameWallet'),
        headerLeft: () => false,
      }),
      component: NameWallet,
    },
    {
      name: Screens.UseBiometry,
      options: () => ({
        ...ScreenOptionsDictionary[Screens.UseBiometry],
        title: t('Screens.Biometry'),
        headerLeft: () => false,
      }),
      component: useBiometry,
    },
    {
      name: Screens.UsePushNotifications,
      options: () => ({
        ...ScreenOptionsDictionary[Screens.UsePushNotifications],
        title: t('Screens.UsePushNotifications'),
        headerLeft: () => false,
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: PushNotification as any,
    },
    {
      name: Screens.Developer,
      component: Developer,
      options: () => {
        return {
          ...ScreenOptionsDictionary[Screens.Developer],
          title: t('Screens.Developer'),
          headerBackAccessibilityLabel: t('Global.Back'),
        }
      },
    },
    {
      name: Screens.EnterPIN,
      children: EnterPINScreen,
      options: () => {
        return {
          title: t('Screens.EnterPIN'),
          headerShown: true,
          headerLeft: () => false,
          rightLeft: () => false,
        }
      },
    },
    {
      name: Screens.AttemptLockout,
      component: AttemptLockout,
      options: () => ({ headerShown: true, headerLeft: () => null, title: t('Screens.AttemptLockout') }),
    },
  ]

  return (
    <Stack.Navigator initialRouteName={Screens.Splash} screenOptions={{ ...defaultStackOptions }}>
      {screens.map((item) => {
        return <Stack.Screen key={item.name} {...item} />
      })}
    </Stack.Navigator>
  )
}

export default OnboardingStack
