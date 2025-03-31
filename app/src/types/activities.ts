import { OrderByAlphabeticalAsc, OrderByAlphabeticalDesc, OrderByTimeAsc, OrderByTimeDesc } from '../constants'

export type SelectedNotificationType = { id: string; deleteAction?: () => Promise<void> }

export type SelectedHistoryType = { id: string; deleteAction?: () => void }

export type SelectedFilterType = { id: string; title: string }

export type SelectedItemsType = { [key: string]: boolean }

export type ActivityOrderType =
  | typeof OrderByTimeAsc
  | typeof OrderByTimeDesc
  | typeof OrderByAlphabeticalAsc
  | typeof OrderByAlphabeticalDesc
