import { testIdWithKey } from '@hyperledger/aries-bifold-core'
import { render } from '@testing-library/react-native'
import React from 'react'

import HistoryUnavailableCard from '../../src/components/HistoryUnavailableCard'

describe('HistoryUnavailableCard Component', () => {
  it('renders correctly with provided props', () => {
    const { getByTestId } = render(<HistoryUnavailableCard credentialName="Test Credential" issuer="Test Issuer" />)

    expect(getByTestId(testIdWithKey('CredentialName')).props.children).toBe('Test Credential')
    expect(getByTestId(testIdWithKey('CredentialIssuer')).props.children).toBe('Test Issuer')
    expect(getByTestId(testIdWithKey('NoLogoText')).props.children).toBe('T')
  })

  test('Renders correctly', async () => {
    const tree = render(<HistoryUnavailableCard credentialName="Test Credential" issuer="Test Issuer" />)

    expect(tree).toMatchSnapshot()
  })
})
