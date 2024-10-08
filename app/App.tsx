import {
  AgentProvider,
  AnimatedComponentsProvider,
  animatedComponents,
  TourProvider,
  AuthProvider,
  toastConfig,
  initStoredLanguage,
  NetInfo,
  NetworkProvider,
  ErrorModal,
  StoreProvider,
  ThemeProvider,
  initLanguages,
  ContainerProvider,
  MainContainer,
} from '@hyperledger/aries-bifold-core'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StatusBar } from 'react-native'
import { isTablet } from 'react-native-device-info'
import Orientation from 'react-native-orientation-locker'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import Toast from 'react-native-toast-message'
import { container } from 'tsyringe'

import { AppContainer } from './container-imp'
import qcwallet from './src'
import { credentialOfferTourSteps } from './src/components/tours/CredentialOfferTourSteps'
import { credentialsTourSteps } from './src/components/tours/CredentialsTourSteps'
import { homeTourSteps } from './src/components/tours/HomeTourSteps'
import { proofRequestTourSteps } from './src/components/tours/ProofRequestTourSteps'
import RootStack from './src/navigators/RootStack'
import { BCState, getInitialState, reducer } from './src/store'

const { theme, localization } = qcwallet

initLanguages(localization)

const App = () => {
  useMemo(() => {
    initStoredLanguage().then()
  }, [])
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const bifoldContainer = new MainContainer(container.createChildContainer()).init()
  const qcwContainer = new AppContainer(bifoldContainer, t, navigate).init()
  const [initialState, setInitialState] = useState<BCState>()

  useEffect(() => {
    const getAsyncInitialState = async () => {
      const initial = await getInitialState()
      setInitialState(initial)
    }
    getAsyncInitialState()
  }, [])

  if (!isTablet()) {
    Orientation.lockToPortrait()
  }

  useEffect(() => {
    // Hide the native splash / loading screen so that our
    // RN version can be displayed.

    SplashScreen.hide()
  }, [])

  return (
    <ContainerProvider value={qcwContainer}>
      <StoreProvider initialState={initialState} reducer={reducer}>
        <AgentProvider agent={undefined}>
          <ThemeProvider value={theme}>
            <AnimatedComponentsProvider value={animatedComponents}>
              <AuthProvider>
                <NetworkProvider>
                  <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor={theme.ColorPallet.brand.primary}
                    translucent={false}
                  />
                  <NetInfo />
                  <ErrorModal />
                  <TourProvider
                    homeTourSteps={homeTourSteps}
                    credentialsTourSteps={credentialsTourSteps}
                    credentialOfferTourSteps={credentialOfferTourSteps}
                    proofRequestTourSteps={proofRequestTourSteps}
                    overlayColor={'black'}
                    overlayOpacity={0.7}
                  >
                    <SafeAreaProvider>
                      <RootStack />
                    </SafeAreaProvider>
                  </TourProvider>
                  <Toast topOffset={15} config={toastConfig} />
                </NetworkProvider>
              </AuthProvider>
            </AnimatedComponentsProvider>
          </ThemeProvider>
        </AgentProvider>
      </StoreProvider>
    </ContainerProvider>
  )
}

export default App
