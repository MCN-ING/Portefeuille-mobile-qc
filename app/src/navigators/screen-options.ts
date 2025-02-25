import { DefaultScreenOptionsDictionary, Screens, testIdWithKey } from '@hyperledger/aries-bifold-core'
import { StackNavigationOptions } from '@react-navigation/stack'
import { Platform } from 'react-native'

import HelpCenterButton from '../components/Help/HelpCenterButton'

export const getScreenOptions = () => {
  const defaultScreenOptionsDict = DefaultScreenOptionsDictionary

  const onboardingScreenOptions: StackNavigationOptions = {
    headerShown: Platform.OS == 'ios',
    headerTitle: '',
    headerStyle: {
      height: 50,
    },
  }

  defaultScreenOptionsDict[Screens.Home] = {
    ...defaultScreenOptionsDict[Screens.Home],
    headerLeft: undefined,
    headerRight: HelpCenterButton,
  }
  defaultScreenOptionsDict[Screens.Connection] = {
    ...defaultScreenOptionsDict[Screens.Connection],
    headerLeft: undefined,
    headerRight: HelpCenterButton,
  }
  defaultScreenOptionsDict[Screens.CredentialDetails] = {
    ...defaultScreenOptionsDict[Screens.CredentialDetails],
    headerShown: true,
    headerLeft: undefined,
    headerRight: HelpCenterButton,
  }

  defaultScreenOptionsDict[Screens.OpenIDCredentialDetails] = {
    ...defaultScreenOptionsDict[Screens.OpenIDCredentialDetails],
    headerShown: true,
    headerLeft: undefined,
    headerRight: HelpCenterButton,
  }

  defaultScreenOptionsDict[Screens.Credentials] = {
    ...defaultScreenOptionsDict[Screens.Credentials],
    headerLeft: undefined,
    headerRight: HelpCenterButton,
  }
  defaultScreenOptionsDict[Screens.Language] = {
    ...defaultScreenOptionsDict[Screens.Language],
  }
  defaultScreenOptionsDict[Screens.Scan] = {
    ...defaultScreenOptionsDict[Screens.Scan],
    headerRight: HelpCenterButton,
  }

  defaultScreenOptionsDict[Screens.UseBiometry] = {
    ...defaultScreenOptionsDict[Screens.UseBiometry],
    ...onboardingScreenOptions,
  }

  defaultScreenOptionsDict[Screens.CreatePIN] = {
    ...defaultScreenOptionsDict[Screens.CreatePIN],
    ...onboardingScreenOptions,
    gestureEnabled: true,
  }
  defaultScreenOptionsDict[Screens.Terms] = {
    ...defaultScreenOptionsDict[Screens.Terms],
    ...onboardingScreenOptions,
  }

  defaultScreenOptionsDict[Screens.Contacts] = {
    ...defaultScreenOptionsDict[Screens.Contacts],
    headerBackTestID: testIdWithKey('Back'),
    headerRight: HelpCenterButton,
  }

  defaultScreenOptionsDict[Screens.WhatAreContacts] = {
    ...defaultScreenOptionsDict[Screens.WhatAreContacts],
    headerBackTestID: testIdWithKey('Back'),
  }

  defaultScreenOptionsDict[Screens.CredentialDetails] = {
    ...defaultScreenOptionsDict[Screens.CredentialDetails],
    headerBackTestID: testIdWithKey('Back'),
  }

  return defaultScreenOptionsDict
}
