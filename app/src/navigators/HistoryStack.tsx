import { testIdWithKey, useTheme } from '@hyperledger/aries-bifold-core'
import { useDefaultStackOptions } from '@hyperledger/aries-bifold-core/src/navigators/defaultStackOptions'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import BiometricChangeDetails from '../screens/activities/BiometricChangeDetails'
import CardHistoryDetails from '../screens/activities/CardHistoryDetails'
import ContactHistoryDetails from '../screens/activities/ContactHistoryDetails'
import PinChangeDetails from '../screens/activities/PinChangeDetails'
import ProofHistoryDetails from '../screens/activities/ProofHistoryDetails'

import { HistoryStackParams, Screens } from './navigators'

const HistoryStack: React.FC = () => {
  const StackHistory = createStackNavigator<HistoryStackParams>()
  const theme = useTheme()
  const defaultStackOptions = useDefaultStackOptions(theme)
  const { t } = useTranslation()

  return (
    <StackHistory.Navigator
      screenOptions={{ ...defaultStackOptions, headerShown: true, headerBackTestID: testIdWithKey('Back') }}
    >
      <StackHistory.Screen
        name={Screens.PinChangeDetails}
        component={PinChangeDetails}
        options={{ title: t('History.CardTitle.WalletPinUpdated') }}
      />
      <StackHistory.Screen
        name={Screens.BiometricChangeDetails}
        component={BiometricChangeDetails}
        options={({ route }) => ({
          title: t('History.CardTitle.BiometricUpdated', { operation: route.params?.operation }),
        })}
      />
      <StackHistory.Screen
        name={Screens.CardHistoryDetails}
        component={CardHistoryDetails}
        options={({ route }) => ({
          title: t('History.CardTitle.CardChanged', { operation: route.params?.operation }),
        })}
      />
      <StackHistory.Screen
        name={Screens.ContactHistoryDetails}
        component={ContactHistoryDetails}
        options={({ route }) => ({
          title: t('History.CardTitle.ContactUpdated', { operation: route.params?.operation }),
        })}
      />
      <StackHistory.Screen
        name={Screens.ProofHistoryDetails}
        component={ProofHistoryDetails}
        options={{
          title: t('History.CardTitle.ProofReqUpdated'),
        }}
      />
    </StackHistory.Navigator>
  )
}

export default HistoryStack
