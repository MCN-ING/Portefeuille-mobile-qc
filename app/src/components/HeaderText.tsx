import { useTheme } from '@hyperledger/aries-bifold-core'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  title: string
}

const HeaderText = ({ title }: Props) => {
  const { ColorPallet, TextTheme } = useTheme()
  const style = StyleSheet.create({
    headerText: {
      ...TextTheme.headingTwo,
      color: ColorPallet.notification.infoText,
    },
  })
  return (
    <View>
      <Text style={[style.headerText]}>{title}</Text>
      <View style={{ height: 4, width: 48, backgroundColor: ColorPallet.brand.highlight }} />
    </View>
  )
}

export default HeaderText
