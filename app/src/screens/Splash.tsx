import { useTheme, testIdWithKey, TOKENS, useServices, Stacks, BifoldError } from '@hyperledger/aries-bifold-core'
import { RemoteOCABundleResolver } from '@hyperledger/aries-oca/build/legacy'
import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import LogoQuebecBlanc from '../assets/img/LogoQuebecBlanc.svg'
import { Avis, AvisType } from '../components/Avis/Avis'
import Progress from '../components/Progress'
import TipCarousel from '../components/TipCarousel'
import { SplashSmallScreenWidthPercentage } from '../constants'

import useInitializeQCAgent from '../hooks/initialize-agent'

enum InitErrorTypes {
  Onboarding,
  Agent,
}

/*
  To customize this splash screen set the background color of the
  iOS and Android launch screen to match the background color of
  of this view.
*/
const Splash = () => {
  const { width } = useWindowDimensions()
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { ColorPallet } = useTheme()
  const [stepText, setStepText] = useState<string>(t('Init.Starting'))
  const [progressPercent, setProgressPercent] = useState(0)
  const [initOnboardingCount, setInitOnboardingCount] = useState(0)
  const [initAgentCount, setInitAgentCount] = useState(0)
  const [initErrorType, setInitErrorType] = useState<InitErrorTypes>(InitErrorTypes.Onboarding)
  const [initError, setInitError] = useState<BifoldError | null>(null)
  const initializing = useRef(false)
  const { initializeAgent } = useInitializeQCAgent()
  const [ocaBundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER])

  const [opacity, setOpacity] = useState(0)
  const steps: string[] = useMemo(() => {
    return [
      t('Init.Starting'),
      t('Init.FetchingPreferences'),
      t('Init.VerifyingOnboarding'),
      t('Init.CheckingOCA'),
      t('Init.InitializingAgent'),
      t('Init.Finishing'),
    ]
  }, [t])

  const setStep = useCallback(
    (stepIdx: number) => {
      setStepText(steps[stepIdx])
      const percent = Math.floor(((stepIdx + 1) / steps.length) * 100)
      setProgressPercent(percent)
    },
    [steps]
  )

  const styles = StyleSheet.create({
    splashContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.brand.primary,
    },
    img: {
      width: '100%',
      resizeMode: 'contain',
    },
    progressContainer: {
      flex: 1,
      opacity: opacity,
      paddingHorizontal: 40,
      width: '100%',
    },
    tipCarouselContainer: {
      flex: 1,
      width: width > 600 ? `${SplashSmallScreenWidthPercentage}%` : '100%',
      height: '100%',
      justifyContent: width > 600 ? 'flex-end' : 'center',
      opacity: opacity,
    },
    logoAndProgressContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerLogoAndProgressContainer: {
      width: `${SplashSmallScreenWidthPercentage}%`,
      maxHeight: width > 600 ? 200 : 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressAndTextContainer: {
      width: '100%',
      paddingHorizontal: 40,
      alignContent: 'center',
    },
    stepTextContainer: {
      minHeight: 50,
    },
    stepText: {
      fontFamily: 'BCSans-Regular',
      fontSize: 16,
      color: '#ffffff',
    },
    errorBoxContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(1)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (initializing.current) return

    setStep(1)

    const initAgent = async (): Promise<void> => {
      try {
        setStep(2)
        await (ocaBundleResolver as RemoteOCABundleResolver).checkForUpdates?.()
        setStep(3)

        setStep(4)
        const agent = await initializeAgent()
        initializing.current = true

        if (!agent) return

        setStep(5)

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: Stacks.TabStack }],
          })
        )
      } catch (e: unknown) {
        console.log('ERROR', e)
        setInitErrorType(InitErrorTypes.Agent)
        setInitError(new BifoldError(t('Error.Title2031'), t('Error.Message2031'), (e as Error)?.message, 2031))
      }
    }

    initAgent()
  }, [initializeAgent, setStep, ocaBundleResolver, navigation, initAgentCount, t])

  const handleErrorCallToActionPressed = () => {
    setInitError(null)
    if (initErrorType === InitErrorTypes.Agent) {
      setInitAgentCount(initAgentCount + 1)
    } else {
      setInitOnboardingCount(initOnboardingCount + 1)
    }
  }

  return (
    <SafeAreaView style={styles.splashContainer}>
      <View style={styles.errorBoxContainer}>
        {initError && (
          <Avis
            type={AvisType.Warn}
            title={t('Error.Title2026')}
            description={t('Error.Message2026')}
            onCallToActionLabel={t('Init.Retry')}
            onCallToActionPressed={handleErrorCallToActionPressed}
          />
        )}
      </View>
      <View style={styles.logoAndProgressContainer}>
        <View style={styles.innerLogoAndProgressContainer}>
          <View style={styles.logoContainer}>
            <LogoQuebecBlanc style={styles.img} width={'100%'} height={'100%'} />
          </View>
          <View style={styles.progressContainer} testID={testIdWithKey('LoadingActivityIndicator')}>
            <View style={styles.stepTextContainer}>
              <Progress progressPercent={progressPercent} progressText={stepText} textStyle={styles.stepText} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.tipCarouselContainer}>
        <View>{<TipCarousel />}</View>
      </View>
    </SafeAreaView>
  )
}

export default Splash
