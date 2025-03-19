import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import Magnifier from '../assets/img/magnifier.svg'
import { TextTheme, ColorPallet } from '../theme'

const SearchTextBox = ({ onChange, onPress }: { onChange: (inputText: string) => void; onPress?: () => void }) => {
  const [text, setText] = useState('')
  const { t } = useTranslation()

  const handleTextChange = (inputText: string) => {
    setText(inputText)
    onChange(inputText)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: ColorPallet.grayscale.mediumGrey,
      height: 40,
      width: '100%',
    },
    input: {
      flex: 1,
      height: '100%',
      paddingHorizontal: 10,
      ...TextTheme.labelTitle,
    },
    imageButton: {
      backgroundColor: ColorPallet.brand.primary,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={handleTextChange}
          placeholder={t('Filters.SearchPlaceHolder')}
        />
        <TouchableOpacity onPress={onPress} style={styles.imageButton}>
          <Magnifier />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SearchTextBox
