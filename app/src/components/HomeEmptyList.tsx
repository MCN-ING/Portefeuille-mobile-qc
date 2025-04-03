import { ThemedText, useTheme } from '@hyperledger/aries-bifold-core'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

const HomeEmptyList = () => {
  const { ColorPallet } = useTheme()
  const { t } = useTranslation()
  const style = StyleSheet.create({
    container: {
      paddingLeft: 16,
      marginVertical: 4,
    },
    text: {
      fontSize: 14,
      fontWeight: '400',
      color: ColorPallet.notification.infoText,
      lineHeight: 20,
    },
  })
  return (
    <View style={style.container}>
      <ThemedText maxFontSizeMultiplier={1.5} style={style.text}>
        {t('Home.NoNewUpdates')}
      </ThemedText>
    </View>
  )
}

export default HomeEmptyList
