import { PINValidationRules } from '@hyperledger/aries-bifold-core/lib/typescript/App/types/security'

import { TabTheme } from './theme'
export const pinValidationRules: PINValidationRules = {
  only_numbers: true,
  min_length: 6,
  max_length: 6,
  no_repeated_numbers: 2,
  no_repetition_of_the_two_same_numbers: false,
  no_series_of_numbers: true,
  no_even_or_odd_series_of_numbers: false,
  no_cross_pattern: false,
}
export const hitSlop = { top: 44, bottom: 44, left: 44, right: 44 }

export const toastTopOffset = TabTheme.tabBarStyle.height + 20
export const toastBottomOffset = TabTheme.tabBarStyle.height + 10

export const attestationCredDefIds = [
  'NXp6XcGeCR2MviWuY51Dva:3:CL:33557:bcwallet',
  'NXp6XcGeCR2MviWuY51Dva:3:CL:33557:bcwallet_dev_v2',
  'RycQpZ9b4NaXuT5ZGjXkUE:3:CL:120:bcwallet',
  'RycQpZ9b4NaXuT5ZGjXkUE:3:CL:120:bcwallet_test_v2',
  'XqaRXJt4sXE6TRpfGpVbGw:3:CL:655:bcwallet',
]

export const SplashLargeScreenWidthPercentage = 51.5
export const SplashSmallScreenWidthPercentage = 67.5

//Filters for the notification filter
export const OrderByTimeAsc = 'time_asc'
export const OrderByTimeDesc = 'time_desc'
export const OrderByAlphabeticalAsc = 'alphabetical_asc'
export const OrderByAlphabeticalDesc = 'alphabetical_desc'

export const Filters2 = {
  NotificationOptions: {
    1: { type: 'CredentialRecord', title: 'Filters.CredentialOfferReceived' },
    2: { type: 'ProofRecord', title: 'Filters.InfoRequest' },
    3: { type: 'UnKnow', title: 'Filters.Update' }, // TODO: Update this type
    4: { type: 'CredentialRecord', title: 'Filters.CredentialRevoked' },
  },
  History: {
    CredentialOfferOptions: [
      { id: '1', title: 'History.Operations.Accepted' },
      { id: '2', title: 'History.Operations.Declined' },
      { id: '3', title: 'History.Operations.Revoked' },
      { id: '4', title: 'History.Operations.Removed' },
    ],
    HistoryOptions: [
      { id: '1', title: 'Filters.ProofRequestAccepted' },
      { id: '2', title: 'Filters.ProofRequestDeclined' },
      { id: '3', title: 'Filters.AddContact' },
      { id: '4', title: 'Filters.RemoveContact' },
      { id: '5', title: 'Filters.AppParamsChanged' },
    ],
  },
  SortOptions: [
    { id: OrderByTimeDesc, title: 'Filters.NewestFirst' },
    { id: OrderByAlphabeticalAsc, title: 'Filters.OldestFirst' },
    { id: OrderByAlphabeticalAsc, title: 'Filters.ContactAToZ' },
    { id: OrderByAlphabeticalDesc, title: 'Filters.ContactZToA' },
  ],
}

export const Filters = {
  NotificationOptions: [
    { id: '1', type: 'CredentialRecord', title: 'Filters.CredentialOfferReceived' },
    { id: '2', type: 'ProofRecord', title: 'Filters.InfoRequest' },
    { id: '3', type: 'UnKnow', title: 'Filters.Update' }, // TODO: Update this type
    { id: '4', type: 'CredentialRecord', title: 'Filters.CredentialRevoked' },
  ],
  History: {
    CredentialOfferOptions: [
      { id: '1', title: 'History.Operations.Accepted' },
      { id: '2', title: 'History.Operations.Declined' },
      { id: '3', title: 'History.Operations.Revoked' },
      { id: '4', title: 'History.Operations.Removed' },
    ],
    HistoryOptions: [
      { id: '1', title: 'Filters.ProofRequestAccepted' },
      { id: '2', title: 'Filters.ProofRequestDeclined' },
      { id: '3', title: 'Filters.AddContact' },
      { id: '4', title: 'Filters.RemoveContact' },
      { id: '5', title: 'Filters.AppParamsChanged' },
    ],
  },
  SortOptions: [
    { id: OrderByTimeDesc, title: 'Filters.NewestFirst' },
    { id: OrderByAlphabeticalAsc, title: 'Filters.OldestFirst' },
    { id: OrderByAlphabeticalAsc, title: 'Filters.ContactAToZ' },
    { id: OrderByAlphabeticalDesc, title: 'Filters.ContactZToA' },
  ],
}
