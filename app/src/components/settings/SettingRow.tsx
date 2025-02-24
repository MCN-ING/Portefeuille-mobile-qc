import { useTheme } from '@hyperledger/aries-bifold-core'
import { AccessibilityRole, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

import ExternalLinkIcon from '../../assets/img/icons/external_link_icon.svg'

interface SectionRowProps {
  title: string
  testID?: string
  children?: JSX.Element
  showRowSeparator?: boolean
  accessibilityRole?: AccessibilityRole
  isExternalLink?: boolean
  onPress?: () => void
  rowIcon?: JSX.Element
  style?: StyleProp<ViewStyle>
}

const SettingRow = ({
  title,
  testID,
  onPress,
  children,
  showRowSeparator,
  accessibilityRole = 'button',
  isExternalLink = false,
  rowIcon,
  style,
}: SectionRowProps) => {
  const { ColorPallet, TextTheme, SettingsTheme } = useTheme()
  const styles = StyleSheet.create({
    rowSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.grayscale.lightGrey,
    },
    section: {
      backgroundColor: SettingsTheme.groupBackground,
      alignItems: 'center',
    },
    rowTitle: {
      ...TextTheme.headingFour,
      flex: 1,
      fontWeight: 'normal',
      flexWrap: 'wrap',
    },
  })

  const innerView = (
    <View style={[styles.section, { paddingVertical: 12 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.rowTitle, isExternalLink && { color: ColorPallet.brand.link }]}>
          {title} {isExternalLink && <ExternalLinkIcon />}
        </Text>

        {children}

        {rowIcon}
      </View>
    </View>
  )

  return (
    <View style={showRowSeparator && styles.rowSeparator}>
      {onPress ? (
        <TouchableOpacity testID={testID} onPress={onPress} accessibilityRole={accessibilityRole}>
          {innerView}
        </TouchableOpacity>
      ) : (
        innerView
      )}
    </View>
  )
}

export default SettingRow
