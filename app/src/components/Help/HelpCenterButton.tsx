import { testIdWithKey, useTheme } from '@hyperledger/aries-bifold-core'
import { getDefaultHeaderHeight } from '@react-navigation/elements'
import { useRoute } from '@react-navigation/native'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DeviceEventEmitter, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context'

import { BCWalletEventTypes } from '../../events/eventTypes'

const HelpCenterButton: React.FC = () => {
  const { t } = useTranslation()
  const { ColorPallet, TextTheme } = useTheme()
  const route = useRoute()
  const frame = useSafeAreaFrame()
  const insets = useSafeAreaInsets()
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top)
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      ...TextTheme.label,
      color: ColorPallet.brand.headerText,
      marginRight: 4,
      paddingVertical: 4,
      paddingLeft: 4,
    },
  })
  const paramData = useMemo(
    () => ({
      isActive: true,
      routeName: route.name,
      headerHeight: headerHeight,
    }),
    [route.name, headerHeight]
  )
  const activateSlider = useCallback(() => {
    DeviceEventEmitter.emit(BCWalletEventTypes.ADD_HELP_PRESSED, paramData)
  }, [paramData])
  return (
    <TouchableOpacity
      onPress={activateSlider}
      accessibilityHint={t('HelpCenter.OptionsList')}
      accessibilityRole="button"
      testID={testIdWithKey('HelpCenterButton')}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{t('HelpCenter.Help')}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default HelpCenterButton
