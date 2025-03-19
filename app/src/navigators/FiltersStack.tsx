import { testIdWithKey, useTheme } from '@hyperledger/aries-bifold-core'
import { useDefaultStackOptions } from '@hyperledger/aries-bifold-core/App/navigators/defaultStackOptions'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import ActivitiesFilters from '../screens/activities/ActivitiesFilters'

import { Screens, FiltersStackParams } from './navigators'

const FiltersStack: React.FC = () => {
  const StackFilter = createStackNavigator<FiltersStackParams>()
  const theme = useTheme()
  const defaultStackOptions = useDefaultStackOptions(theme)
  const { t } = useTranslation()

  return (
    <StackFilter.Navigator
      initialRouteName={Screens.ActivitiesFilters}
      screenOptions={{ ...defaultStackOptions, headerShown: true, headerBackTestID: testIdWithKey('Back') }}
    >
      <StackFilter.Screen
        name={Screens.ActivitiesFilters}
        component={ActivitiesFilters}
        options={{
          title: t('Screens.ActivitiesFilters'),
        }}
      />
    </StackFilter.Navigator>
  )
}

export default FiltersStack
