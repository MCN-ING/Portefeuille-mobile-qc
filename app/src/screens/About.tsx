import { useTheme, testIdWithKey } from '@hyperledger/aries-bifold-core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SettingRow from '../components/settings/SettingRow'

const HelpCenter: React.FC = () => {
  const { TextTheme, ColorPallet, Assets } = useTheme()
  const { t } = useTranslation()

  const styles = StyleSheet.create({
    container: {
      flex: 2,
      paddingHorizontal: 16,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    sectionCopyright: {
      flex: 1,
      justifyContent: 'flex-end',
      ...TextTheme.headingOne,
      paddingBottom: 20,
    },
    sectionCopyrightText: {
      ...TextTheme.caption,
      color: TextTheme.normal.color,
      textAlign: 'left',
      textDecorationLine: 'none',
    },
  })

  const icon = {
    color: ColorPallet.grayscale.darkGrey,
    width: 30,
    height: 30,
  }
  const arrowIcon = <Assets.svg.iconChevronRight accessible={false} {...icon} />

  const notImplemented = () => Alert.alert('Lien Externe', 'En construction')
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <SettingRow
        title={t('About.Accessibility')}
        showRowSeparator
        testID={testIdWithKey('Accessibility')}
        accessibilityRole="link"
        rowIcon={arrowIcon}
        isExternalLink
        onPress={notImplemented}
      />
      <SettingRow
        title={t('About.TermsOfUse')}
        showRowSeparator
        testID={testIdWithKey('TermsOfUse')}
        accessibilityRole="link"
        rowIcon={arrowIcon}
        isExternalLink
        onPress={notImplemented}
      />
      <SettingRow
        title={t('About.PrivacyPolicy')}
        testID={testIdWithKey('PrivacyPolicy')}
        accessibilityRole="link"
        rowIcon={arrowIcon}
        isExternalLink
        onPress={notImplemented}
      />
      <View style={[styles.sectionCopyright]}>
        <Text style={styles.sectionCopyrightText}> {t('OptionsPlus.Copyright')}</Text>
      </View>
    </SafeAreaView>
  )
}

export default HelpCenter
