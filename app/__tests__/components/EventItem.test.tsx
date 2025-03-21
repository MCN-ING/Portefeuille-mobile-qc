import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import EventItem from '../../src/components/EventItem'
import { HistoryCardType } from '@hyperledger/aries-bifold-core/App/modules/history/types'
import { NotificationTypeEnum } from '../../src/types/notification-list-item'
import { testIdWithKey } from '@hyperledger/aries-bifold-core'

describe('EventItem Component', () => {
  const mockEvent = {
    id: '1',
    title: 'Test Event',
    body: 'This is a test event body.',
    eventTime: '2023-01-01 12:00',
    type: 'Notification' as HistoryCardType | NotificationTypeEnum,
    image: <></>,
  }

  const mockOnOpenSwipeable = jest.fn()
  const mockAction = jest.fn()
  const mockSetSelected = jest.fn()

  test('renders correctly with required props', () => {
    const { getByText } = render(
      <EventItem
        event={mockEvent}
        openSwipeableId={null}
        onOpenSwipeable={mockOnOpenSwipeable}
        deleteMessage="Activities.NotificationsDeleted"
      />
    )

    expect(getByText('Test Event')).toBeTruthy()
    expect(getByText('This is a test event body.')).toBeTruthy()
    expect(getByText('2023-01-01 12:00')).toBeTruthy()
  })

  test('calls action when pressed', () => {
    const { getByTestId } = render(
      <EventItem
        event={mockEvent}
        openSwipeableId={null}
        onOpenSwipeable={mockOnOpenSwipeable}
        action={mockAction}
        deleteMessage="Activities.NotificationsDeleted"
      />
    )

    fireEvent.press(getByTestId(testIdWithKey('NotificationTouchable')))
    expect(mockAction).toHaveBeenCalled()
  })

  test('calls setSelected on long press', () => {
    const { getByTestId } = render(
      <EventItem
        event={mockEvent}
        openSwipeableId={null}
        onOpenSwipeable={mockOnOpenSwipeable}
        setSelected={mockSetSelected}
        deleteMessage="Activities.NotificationsDeleted"
      />
    )

    fireEvent(getByTestId(testIdWithKey('NotificationTouchable')), 'onLongPress')
    expect(mockSetSelected).toHaveBeenCalledWith({ id: '1', deleteAction: undefined })
  })

  test('calls onSwipeableWillOpen when swiped', () => {
    const { getByTestId } = render(
      <EventItem
        event={mockEvent}
        openSwipeableId={null}
        onOpenSwipeable={mockOnOpenSwipeable}
        deleteMessage="Activities.NotificationsDeleted"
      />
    )
    fireEvent(getByTestId(testIdWithKey('NotificationTouchable')), 'onSwipeableWillOpen')
    expect(mockOnOpenSwipeable).toHaveBeenCalledTimes(1)
  })
})
