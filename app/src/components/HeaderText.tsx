import { ThemedText, useTheme } from '@hyperledger/aries-bifold-core'
import { StyleSheet, View } from 'react-native'

type Props = {
  title: string
  isHeader?: boolean
}

const HeaderText = ({ title, isHeader = true }: Props) => {
  const { ColorPallet } = useTheme()
  const style = StyleSheet.create({
    headerText: {
      lineHeight: 32,
    },
    headerBottomLine: {
      height: 4,
      width: 48,
      backgroundColor: ColorPallet.brand.highlight,
    },
  })
  return (
    <View accessible={true}>
      <ThemedText variant="headingTwo" style={style.headerText} accessibilityRole={`${isHeader ? 'header' : 'text'}`}>
        {title}
      </ThemedText>
      <View style={style.headerBottomLine} />
    </View>
  )
}

export default HeaderText
