import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from 'aries-bifold/App/contexts/theme'
import { createDefaultStackOptions } from 'aries-bifold/App/navigators/defaultStackOptions'
import React from 'react'

import History from '../screens/History'

import { Screens, HistoryStackParams } from './navigators'

const HistoryStack: React.FC = () => {
  const StackHistory = createStackNavigator<HistoryStackParams>()
  const theme = useTheme()
  const defaultStackOptions = createDefaultStackOptions(theme)

  return (
    <StackHistory.Navigator initialRouteName={'History'} screenOptions={{ ...defaultStackOptions, headerShown: false }}>
      <StackHistory.Screen name={'History'} component={History} />
    </StackHistory.Navigator>
  )
}

export default HistoryStack
