import { ThemedText, useTheme } from '@hyperledger/aries-bifold-core'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

type Props = {
  text: string
  style?: ViewStyle
}

const BulletPoint = ({ text, style }: Props) => {
  const { ColorPallet } = useTheme()
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    iconContainer: {
      marginRight: 10,
      marginVertical: 10,
    },
  })
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Icon name={'circle'} size={6} color={ColorPallet.brand.modalIcon} />
      </View>
      <ThemedText style={{ textAlign: 'left' }}>{text}</ThemedText>
    </View>
  )
}

export default BulletPoint
