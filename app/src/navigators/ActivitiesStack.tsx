import { useTheme } from '@hyperledger/aries-bifold-core'
import { useDefaultStackOptions } from '@hyperledger/aries-bifold-core/App/navigators/defaultStackOptions'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import ActivityNotifications from '../screens/activities/Activities'
import HistoryDetail from '../screens/activities/HistoryDetail'

import { ActivitiesStackParams, Screens } from './navigators'

const ActivitiesStack: React.FC = () => {
  const StackActivities = createStackNavigator<ActivitiesStackParams>()
  const theme = useTheme()
  const defaultStackOptions = useDefaultStackOptions(theme)
  const { t } = useTranslation()

  return (
    <StackActivities.Navigator
      initialRouteName={Screens.Activities}
      screenOptions={{ ...defaultStackOptions, headerShown: true }}
    >
      <StackActivities.Screen
        name={Screens.Activities}
        component={ActivityNotifications}
        options={{ title: t('TabStack.Activities') }}
      />
      <StackActivities.Screen
        name={Screens.HistoryDetail}
        component={HistoryDetail}
        options={{ title: t('Screens.History') }}
      />
    </StackActivities.Navigator>
  )
}

export default ActivitiesStack
