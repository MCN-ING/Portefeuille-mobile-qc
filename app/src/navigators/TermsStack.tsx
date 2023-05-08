import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from 'aries-bifold/App/contexts/theme'
import { createDefaultStackOptions } from 'aries-bifold/App/navigators/defaultStackOptions'
import React from 'react'

import Terms from '../screens/Terms'

import { Screens, TermsStackParams } from './navigators'

const TermsStack: React.FC = () => {
  const StackTerms = createStackNavigator<TermsStackParams>()
  const theme = useTheme()
  const defaultStackOptions = createDefaultStackOptions(theme)

  return (
    <StackTerms.Navigator
      initialRouteName={Screens.TermsAndConditions}
      screenOptions={{ ...defaultStackOptions, headerShown: false }}
    >
      <StackTerms.Screen name={Screens.TermsAndConditions} component={Terms} />
    </StackTerms.Navigator>
  )
}

export default TermsStack
