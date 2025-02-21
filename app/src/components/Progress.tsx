import { ColorPallet, useTheme } from '@hyperledger/aries-bifold-core'
import { StyleSheet, Text, TextStyle, View } from 'react-native'

import ProgressBar from './ProgressBar'

type Props = {
  progressPercent: number
  progressText: string
  accessibilityLabel?: string
  progressBackground?: keyof (typeof ColorPallet)['grayscale']
  progressFill?: keyof (typeof ColorPallet)['brand']
  textStyle?: TextStyle
}

const Progress = ({
  progressPercent,
  progressBackground,
  accessibilityLabel,
  progressFill: color,
  progressText,
  textStyle,
}: Props) => {
  const { TextTheme } = useTheme()
  const style = StyleSheet.create({
    progress: {
      paddingVertical: 8,
    },
    bodyText: {
      ...TextTheme.normal,
      flexShrink: 1,
      paddingVertical: 10,
    },
  })

  return (
    <>
      <View style={style.progress}>
        <ProgressBar progressPercent={progressPercent} color={color} progressBackground={progressBackground} />
      </View>
      <Text
        accessibilityLabel={accessibilityLabel ?? progressText}
        style={[textStyle ?? style.bodyText, { textAlign: 'center' }]}
      >
        {progressText}
      </Text>
    </>
  )
}

export default Progress
