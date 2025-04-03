import { BCState } from './store'
import { Config, OnboardingTask, Screens } from '@hyperledger/aries-bifold-core'

export const isPrefaceComplete = (didSeePreface: boolean, showPreface: boolean): OnboardingTask => {
  return { name: Screens.Preface, completed: (didSeePreface && showPreface) || !showPreface }
}

export const isUpdateCheckComplete = (
  updateAvailable: boolean,
  isRequired: boolean,
  dismiss: boolean
): OnboardingTask => {
  return { name: Screens.UpdateAvailable, completed: !updateAvailable || (dismiss && !isRequired) }
}

export const isOnboardingTutorialComplete = (didCompleteTutorial: boolean): OnboardingTask => {
  return { name: Screens.Onboarding, completed: didCompleteTutorial }
}

export const isTermsComplete = (didAgreeToTerms: number, termsVersion: number): OnboardingTask => {
  return { name: Screens.Terms, completed: didAgreeToTerms === termsVersion }
}

export const isPINCreationComplete = (didCreatePIN: boolean): OnboardingTask => {
  return { name: Screens.CreatePIN, completed: didCreatePIN }
}

export const isBiometryComplete = (didConsiderBiometry: boolean): OnboardingTask => {
  return { name: Screens.UseBiometry, completed: didConsiderBiometry }
}

export const isPushNotificationComplete = (
  didConsiderPushNotifications: boolean,
  enablePushNotifications: any
): OnboardingTask => {
  return {
    name: Screens.UsePushNotifications,
    completed: !enablePushNotifications || (didConsiderPushNotifications && enablePushNotifications),
  }
}

export const isNameWalletComplete = (didNameWallet: boolean, enableWalletNaming: boolean): OnboardingTask => {
  return { name: Screens.NameWallet, completed: didNameWallet || !enableWalletNaming }
}

export const isAttemptLockoutComplete = (servedPenalty: boolean | undefined): OnboardingTask => {
  return { name: Screens.AttemptLockout, completed: servedPenalty !== false }
}

export const isAuthenticationComplete = (didCreatePIN: boolean, didAuthenticate: boolean): OnboardingTask => {
  return { name: Screens.EnterPIN, completed: didAuthenticate || !didCreatePIN }
}

export const generateOnboardingWorkflowSteps = (
  state: BCState,
  config: Config,
  termsVersion: number
): Array<OnboardingTask> => {
  const {
    didSeePreface,
    didCompleteTutorial,
    didAgreeToTerms,
    didCreatePIN,
    didConsiderBiometry,
    didConsiderPushNotifications,
    didNameWallet,
  } = state.onboarding
  const { didAuthenticate } = state.authentication
  const { servedPenalty } = state.loginAttempt
  const { enableWalletNaming } = state.preferences
  const { showPreface, enablePushNotifications } = config
  const { updateAvailable, dismissAppUpdate, isRequired } = state.appUpdate

  return [
    isPrefaceComplete(didSeePreface, showPreface ?? false),
    isUpdateCheckComplete(updateAvailable, isRequired, dismissAppUpdate),
    isOnboardingTutorialComplete(didCompleteTutorial),
    isTermsComplete(Number(didAgreeToTerms), termsVersion),
    isPINCreationComplete(didCreatePIN),
    isBiometryComplete(didConsiderBiometry),
    isPushNotificationComplete(didConsiderPushNotifications, enablePushNotifications),
    isNameWalletComplete(didNameWallet, enableWalletNaming),
    isAttemptLockoutComplete(servedPenalty),
    isAuthenticationComplete(didCreatePIN, didAuthenticate),
  ]
}
