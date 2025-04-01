import { testIdWithKey, ThemedText, useTheme } from '@hyperledger/aries-bifold-core'
import { NavigationProp } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Pressable, ImageSourcePropType } from 'react-native'

import { HelpCenterStackParams, Screens } from '../../navigators/navigators'

type ItemSection = {
  title?: string
  screen: Array<string>
  text?: string
  visual?: ImageSourcePropType
  question?: string
  answer?: string
}

type ItemSectionType = {
  title: string
  content: ItemSection[]
}

type HelpRowSectionProps = {
  showSectionTitle?: boolean
  sectionTitle?: string
  itemSection: ItemSectionType[]
  accessibilityLabel?: string
  testID?: string
  children?: string
  showRowSeparator?: boolean
  subContent?: JSX.Element
  onPress?: () => void
  showArrowIcon?: boolean
  showSectionSeparator?: boolean
  navigation: NavigationProp<HelpCenterStackParams>
}
const HelpRowSection = ({
  showSectionTitle,
  sectionTitle,
  itemSection = [],
  children,
  showRowSeparator,
  subContent,
  showArrowIcon,
  navigation,
}: HelpRowSectionProps) => {
  const { SettingsTheme, ColorPallet, Assets } = useTheme()
  const iconStyles = {
    color: ColorPallet.grayscale.darkGrey,
    width: 30,
    height: 30,
  }
  const arrowIcon = <Assets.svg.iconChevronRight {...iconStyles} />
  const styles = StyleSheet.create({
    section: {
      backgroundColor: SettingsTheme.groupBackground,
    },
    rowTitle: {
      flex: 1,
      fontWeight: 'normal',
      flexWrap: 'wrap',
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sectionHeaderText: {
      flexShrink: 1,
    },
    sectionText: {
      fontWeight: 'normal',
    },
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
    },
    sectionSeparator: {
      marginBottom: 10,
    },
    rowSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.grayscale.lightGrey,
    },
  })

  return (
    <>
      {showSectionTitle && (
        <View style={[styles.section, styles.sectionHeader]}>
          <ThemedText variant="headingThree" style={styles.sectionHeaderText} accessibilityRole="header">
            {sectionTitle}
          </ThemedText>
        </View>
      )}
      {itemSection.map((item, index) => (
        <View key={index}>
          <View style={[styles.section, showRowSeparator && index !== itemSection.length - 1 && styles.rowSeparator]}>
            <Pressable
              onPress={() =>
                navigation.navigate(Screens.HelpCenterPage, { selectedSection: itemSection, sectionNo: index })
              }
              accessibilityRole="button"
              accessibilityLabel={item.title}
              testID={testIdWithKey(item.title)}
            >
              <View style={[styles.sectionRow, index === itemSection.length - 1 && { marginBottom: 32 }]}>
                <ThemedText variant="headingFour" style={styles.rowTitle}>
                  {item.title}
                </ThemedText>
                <ThemedText variant="headingFour" style={styles.sectionText}>
                  {children}
                </ThemedText>
                {showArrowIcon && arrowIcon}
              </View>
            </Pressable>
            {subContent}
          </View>
        </View>
      ))}
    </>
  )
}
export default HelpRowSection
