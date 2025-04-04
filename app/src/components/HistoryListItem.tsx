import { useAgent } from '@credo-ts/react-hooks'
import { TOKENS, useServices } from '@hyperledger/aries-bifold-core'
import {
  CustomRecord,
  HistoryCardType,
  IHistoryManager,
} from '@hyperledger/aries-bifold-core/src/modules/history/types'
import { formatTime } from '@hyperledger/aries-bifold-core/src/utils/helpers'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { renderCardIcon, handleDeleteHistory } from '../utils/historyUtils'

import CustomCheckBox from './CustomCheckBox'
import EventItem from './EventItem'

interface Props {
  item: CustomRecord
  openSwipeableId: string | null
  onOpenSwipeable: (id: string | null) => void
  selected?: boolean
  setSelected?: ({ id }: { id: string }) => void
  activateSelection?: boolean
  onDelete: (id: string) => void
  onViewDetails: () => void
}

interface HistoryContent {
  message?: string
  correspondenceName?: string
  createdAt?: Date
  id: string
  type: HistoryCardType
}

type DisplayDetails = {
  title: string | undefined
  body: string | undefined
  eventTime: string | undefined
}

const HistoryListItem: React.FC<Props> = ({
  item,
  openSwipeableId,
  onOpenSwipeable,
  selected,
  setSelected,
  activateSelection,
  onDelete,
  onViewDetails,
}) => {
  const [details, setDetails] = useState<DisplayDetails>({
    title: undefined,
    body: undefined,
    eventTime: undefined,
  })
  const { agent } = useAgent()
  const [loadHistory] = useServices([TOKENS.FN_LOAD_HISTORY])
  const [historyManager, setHistoryManager] = useState<IHistoryManager | null>(null)
  const content = item.content as HistoryContent
  const { t } = useTranslation()

  useEffect(() => {
    const getTitleByType = (type: HistoryCardType): string => {
      switch (type) {
        case HistoryCardType.CardAccepted:
          return t('History.CardTitle.CardChanged', { operation: t('History.Operations.Accepted') })
        case HistoryCardType.CardDeclined:
          return t('History.CardTitle.CardChanged', { operation: t('History.Operations.Declined') })
        case HistoryCardType.CardRemoved:
          return t('History.CardTitle.CardChanged', { operation: t('History.Operations.Removed') })
        case HistoryCardType.CardExpired:
          return t('History.CardTitle.CardChanged', { operation: t('History.Operations.Expired') })
        case HistoryCardType.CardRevoked:
          return t('History.CardTitle.CardChanged', { operation: t('History.Operations.Revoked') })
        case HistoryCardType.CardUpdates:
          return t('History.CardTitle.CardChanged', { operation: t('History.Operations.Updated') })
        case HistoryCardType.PinChanged:
          return t('History.CardTitle.WalletPinUpdated')
        case HistoryCardType.InformationSent:
          return t('History.CardTitle.InformationSent')
        case HistoryCardType.InformationNotSent:
          return t('History.CardTitle.InformationNotSent')
        case HistoryCardType.ActivateBiometry:
          return t('History.CardTitle.BiometricUpdated', { operation: t('History.Operations.Activated') })
        case HistoryCardType.DeactivateBiometry:
          return t('History.CardTitle.BiometricUpdated', { operation: t('History.Operations.Deactivated') })
        case HistoryCardType.Connection:
          return t('History.CardTitle.ConnectionEstablished')
        case HistoryCardType.ConnectionRemoved:
          return t('History.CardTitle.ConnectionRemoved')
        default:
          return t('History.CardTitle.Default')
      }
    }

    setDetails({
      title: getTitleByType(content.type),
      body: content.correspondenceName ?? '',
      eventTime: content.createdAt ? formatTime(content.createdAt, { includeHour: true }) : '',
    })
  }, [item, content.correspondenceName, content.createdAt, content.type, t])

  useEffect(() => {
    if (agent) {
      setHistoryManager(loadHistory(agent))
    }
  }, [agent, loadHistory])

  const removeHistoryItem = async () => {
    if (!historyManager) return
    await handleDeleteHistory(item.content.id || '', agent, loadHistory, t)
    onDelete(item.content.id ?? '')
  }

  return (
    <EventItem
      action={onViewDetails}
      handleDelete={removeHistoryItem}
      event={{
        id: item.content.id ?? '',
        title: details.title,
        body: details.body,
        eventTime: details.eventTime,
        type: content.type,
        image: activateSelection ? (
          <CustomCheckBox selected={selected} setSelected={() => setSelected?.({ id: item.content.id ?? '' })} />
        ) : (
          renderCardIcon(item.content.type as HistoryCardType)
        ),
      }}
      openSwipeableId={openSwipeableId}
      onOpenSwipeable={onOpenSwipeable}
      setSelected={setSelected}
      activateSelection={activateSelection}
      deleteMessage={'Activities.HistoryDeleted'}
    />
  )
}

export default HistoryListItem
