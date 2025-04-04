import { Locales, testIdWithKey, ThemedText, TOKENS, useServices, useTheme } from '@hyperledger/aries-bifold-core'
import { storeLanguage } from '@hyperledger/aries-bifold-core/src/localization'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'

import HeaderText from '../components/HeaderText'

interface Language {
  id: Locales
  value: string
}

const Language = () => {
  const { t, i18n } = useTranslation()
  const { ColorPallet, SettingsTheme } = useTheme()
  const [{ supportedLanguages }] = useServices([TOKENS.CONFIG])

  const languages: Language[] = supportedLanguages.map((lang) => ({
    id: lang,
    value: i18n.t(`Language.code`, { context: lang }),
  }))

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    section: {
      backgroundColor: SettingsTheme.groupBackground,
      paddingVertical: 8,
    },
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.grayscale.lightGrey,
    },
  })

  /**
   * Once user select the particular language from the list,
   * store user preference into the AsyncStorage
   *
   * @param {BlockSelection} language
   */
  const handleLanguageChange = async (language: Language) => {
    await i18n.changeLanguage(language.id as Locales)
    await storeLanguage(language.id)
  }

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.container}>
      <View style={{ rowGap: 24 }}>
        <HeaderText title={t('Language.Title')} />
        <FlatList
          data={languages}
          renderItem={({ item: language }) => {
            const { id, value }: Language = language
            return (
              <TouchableOpacity
                style={[styles.section, styles.sectionRow]}
                onPress={async () => await handleLanguageChange(language)}
                testID={testIdWithKey(id.toLocaleLowerCase())}
                accessibilityRole="radio"
                accessibilityLabel={`${
                  id === i18n.language ? value + ' ' + t('Language.Checked') : value + ' ' + t('Language.NotChecked')
                }`} // add on voice over the text checked / not checked after the text from value above
                accessibilityHint={id !== i18n.language ? t('Settings.LanguageHint') : ''}
              >
                <ThemedText variant="title" style={{ fontWeight: '400' }}>
                  {value}
                </ThemedText>
                <BouncyCheckbox
                  accessibilityLabel={`${
                    id === i18n.language ? value + ' ' + t('Language.Checked') : value + ' ' + t('Language.NotChecked')
                  }`}
                  disableText
                  fillColor={ColorPallet.brand.secondaryBackground}
                  unfillColor={ColorPallet.brand.secondaryBackground}
                  size={36}
                  innerIconStyle={{ borderColor: ColorPallet.brand.primary, borderWidth: 2 }}
                  ImageComponent={() => <Icon name="circle" size={18} color={ColorPallet.brand.primary}></Icon>}
                  onPress={async () => await handleLanguageChange(language)}
                  isChecked={id === i18n.language}
                  disableBuiltInState
                />
              </TouchableOpacity>
            )
          }}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator}></View>}
        />
      </View>
    </SafeAreaView>
  )
}

export default Language
