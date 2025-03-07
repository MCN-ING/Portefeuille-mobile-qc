import { testIdWithKey } from '@hyperledger/aries-bifold-core'
import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'

import { Avis, AvisType } from '../../src/components/Avis/Avis'
import { ColorPallet } from '../../src/theme'

describe('Avis Component', () => {
  test('renders info icon with title and description', () => {
    const { getByTestId } = render(<Avis type={AvisType.Info} title="any_title" description={'any_description'} />)
    expect(getByTestId(testIdWithKey('Info'))).not.toBeNull()
  })

  test('renders success icon with only description', () => {
    const { getByTestId } = render(<Avis type={AvisType.Success} description={'any_description'} />)
    expect(getByTestId(testIdWithKey('Success'))).not.toBeNull()
    expect(() => getByTestId('AvisTitle')).toThrow()
  })

  test('renders error icon', () => {
    const { getByTestId } = render(<Avis type={AvisType.Error} title="any_title" description={'any_description'} />)
    expect(getByTestId(testIdWithKey('Error'))).not.toBeNull()
  })

  test('renders warning icon', () => {
    const { getByTestId } = render(<Avis type={AvisType.Warn} title="any_title" description={'any_description'} />)
    expect(getByTestId(testIdWithKey('Warning'))).not.toBeNull()
  })

  test('renders component with same secondary and primary container background', () => {
    const { getByTestId } = render(
      <Avis type={AvisType.Info} primaryBackgroundColorSameAsSecondary description={'any_description'} />
    )
    const secondaryContainer = getByTestId(testIdWithKey('SecondaryContainer'))
    const primaryContainer = getByTestId(testIdWithKey('PrimaryContainer'))
    expect(secondaryContainer.props.style.backgroundColor).toEqual(primaryContainer.props.style.backgroundColor)
  })

  test('renders sucess primary container text in white when primary and secondary color is the same', () => {
    const { getByTestId } = render(
      <Avis type={AvisType.Success} primaryBackgroundColorSameAsSecondary description={'any_description'} />
    )
    const avisDescription = getByTestId(testIdWithKey('AvisDescription'))
    expect(avisDescription.props.style.color).toEqual(ColorPallet.brand.text)
  })

  test('renders description node', () => {
    const { getByTestId } = render(
      <Avis type={AvisType.Success} primaryBackgroundColorSameAsSecondary description={<Text>any_description</Text>} />
    )
    expect(getByTestId(testIdWithKey('AvisDescriptionView'))).not.toBeNull()
  })

  /* color and sucess text is from ColorPallet.brand.text*/

  test('renders button with label', () => {
    const onCallToActionPressed = jest.fn()
    const { getByTestId, getByText } = render(
      <Avis
        type={AvisType.Warn}
        title={'any_title'}
        description={'any_description'}
        onCallToActionLabel="any_label"
        onCallToActionPressed={onCallToActionPressed}
      />
    )
    const button = getByTestId(testIdWithKey('AvisButton'))
    expect(button).not.toBeNull()
    fireEvent.press(button)
    expect(onCallToActionPressed).toHaveBeenCalled()
    expect(getByText('any_label')).not.toBeNull()
  })
})
