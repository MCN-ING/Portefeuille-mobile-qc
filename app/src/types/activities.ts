export type SelectedNotificationType = { id: string; deleteAction?: () => Promise<void> }

export type SelectedHistoryType = { id: string; deleteAction?: () => void }

export type SelectedFilterType = { id: string; title: string }
