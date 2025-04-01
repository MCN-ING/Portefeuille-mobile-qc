import { ColorPallet, ThemedText } from '@hyperledger/aries-bifold-core'
import { StyleSheet, TextStyle, View } from 'react-native'

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
  const style = StyleSheet.create({
    progress: {
      paddingVertical: 8,
    },
    bodyText: {
      flexShrink: 1,
      paddingVertical: 10,
    },
  })

  return (
    <>
      <View style={style.progress}>
        <ProgressBar progressPercent={progressPercent} color={color} progressBackground={progressBackground} />
      </View>
      <ThemedText
        allowFontScaling={false}
        accessibilityLabel={accessibilityLabel ?? progressText}
        style={[textStyle ?? style.bodyText, { textAlign: 'center' }]}
      >
        {progressText}
      </ThemedText>
    </>
  )
}

export default Progress
