import { ThemedText, useTheme } from '@hyperledger/aries-bifold-core'
import { StyleSheet, View } from 'react-native'

const SettingHeader = ({ title }: { title: string }): JSX.Element => {
  const { SettingsTheme } = useTheme()
  const styles = StyleSheet.create({
    section: {
      backgroundColor: SettingsTheme.groupBackground,
      alignItems: 'center',
    },
    sectionHeader: {
      backgroundColor: SettingsTheme.groupBackground,
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
  return (
    <View style={[styles.section, styles.sectionHeader]}>
      <ThemedText variant="headingThree" style={{ flexShrink: 1 }} accessibilityRole="header">
        {title}
      </ThemedText>
    </View>
  )
}

export default SettingHeader
