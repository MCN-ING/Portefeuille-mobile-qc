import { ThemedText, useTheme } from '@hyperledger/aries-bifold-core'
import { useTranslation } from 'react-i18next'
import {
  AccessibilityRole,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'

import ExternalLinkIcon from '../../assets/img/icons/external_link_icon.svg'

interface SectionRowProps {
  title: string
  titleStyle?: StyleProp<TextStyle>
  testID?: string
  children?: JSX.Element
  showRowSeparator?: boolean
  accessibilityRole?: AccessibilityRole
  isExternalLink?: boolean
  onPress?: () => void
  rowIcon?: JSX.Element
  containerStyle?: StyleProp<ViewStyle>
}

const SettingRow = ({
  title,
  titleStyle,
  testID,
  onPress,
  children,
  showRowSeparator,
  accessibilityRole = 'button',
  isExternalLink = false,
  rowIcon,
  containerStyle: style,
}: SectionRowProps) => {
  const { ColorPallet, SettingsTheme, maxFontSizeMultiplier } = useTheme()
  const { t } = useTranslation()
  const { fontScale } = useWindowDimensions()
  const fontIsGreaterThanCap = fontScale >= maxFontSizeMultiplier
  const styles = StyleSheet.create({
    rowSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.grayscale.lightGrey,
    },
    section: {
      backgroundColor: SettingsTheme.groupBackground,
    },
    rowTitle: {
      flex: 1,
      flexWrap: 'wrap',
      ...(isExternalLink && { color: ColorPallet.brand.link }),
    },
  })

  const innerView = (
    <View style={[styles.section, { paddingVertical: 12 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {fontIsGreaterThanCap && children ? (
          <View>
            <ThemedText variant="headingFour" style={[styles.rowTitle, titleStyle, { flexDirection: 'row' }]}>
              {title} {isExternalLink && <ExternalLinkIcon />}
            </ThemedText>

            {children}
          </View>
        ) : (
          <>
            <ThemedText variant="headingFour" style={[styles.rowTitle, titleStyle]}>
              {title} {isExternalLink && <ExternalLinkIcon />}
            </ThemedText>

            {children}
          </>
        )}
        {rowIcon}
      </View>
    </View>
  )

  return (
    <View style={showRowSeparator && styles.rowSeparator}>
      {onPress ? (
        <TouchableOpacity
          testID={testID}
          onPress={onPress}
          accessibilityRole={accessibilityRole}
          accessibilityHint={isExternalLink ? t('Global.ExternalLinkHint') : undefined}
        >
          {innerView}
        </TouchableOpacity>
      ) : (
        innerView
      )}
    </View>
  )
}

export default SettingRow
