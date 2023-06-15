export enum Screens {
  TermsAndConditions = 'TermsAndConditions',
  Legal = 'Legal',
  Historic = 'Historic',
}

export type TermsStackParams = {
  [Screens.TermsAndConditions]: undefined
  [Screens.Legal]: undefined
}

export type HistoryStackParams = {
  [Screens.Historic]: undefined
  ['History']: undefined
}
