import { testIdWithKey, useTheme } from '@hyperledger/aries-bifold-core'
import { useDefaultStackOptions } from '@hyperledger/aries-bifold-core/App/navigators/defaultStackOptions'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import AppUpdateNotification from '../screens/AppUpdateNotification'

import { Screens, AppUpdateNotificationParams } from './navigators'

const AppUpdateNotificationStack: React.FC = () => {
  const Stack = createStackNavigator<AppUpdateNotificationParams>()
  const theme = useTheme()
  const defaultStackOptions = useDefaultStackOptions(theme)
  const { t } = useTranslation()

  return (
    <Stack.Navigator
      initialRouteName={Screens.AppUpdateNotification}
      screenOptions={{ ...defaultStackOptions, headerShown: true, headerBackTestID: testIdWithKey('Back') }}
    >
      <Stack.Screen
        name={Screens.AppUpdateNotification}
        component={AppUpdateNotification}
        options={{
          title: t('Screens.AppUpdateNotification'),
        }}
      />
    </Stack.Navigator>
  )
}

export default AppUpdateNotificationStack
