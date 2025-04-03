import { ThemedText, useTheme } from '@hyperledger/aries-bifold-core'
import React from 'react'
import { Image, StyleSheet, View, ImageSourcePropType } from 'react-native'

import { ShadowTheme } from '../theme'

type InfosDisplayProps = {
  title?: string
  screen?: Array<string>
  detail?: string
  visual?: ImageSourcePropType
  question?: string
  answer?: string
}

const InfosDisplay: React.FC<InfosDisplayProps> = ({ title, detail, visual, question, answer }) => {
  const { SettingsTheme, ColorPallet } = useTheme()

  const styles = StyleSheet.create({
    section: {
      backgroundColor: SettingsTheme.groupBackground,
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
    ImgRow: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    imgContainer: {
      height: '100%',
      width: '100%',
      borderRadius: 20,
      backgroundColor: ColorPallet.brand.secondary,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    sectionContainer: {
      marginBottom: 32,
      height: 240,
      borderRadius: 16,
      ...ShadowTheme.elevationOne,
    },
  })
  return (
    <View style={[styles.section]}>
      <View>
        {(title || question) && (
          <ThemedText
            variant="headingThree"
            style={[styles.sectionHeaderText, { paddingBottom: 24 }]}
            accessibilityRole="header"
          >
            {title ?? question}
          </ThemedText>
        )}
        <ThemedText variant="headingFour" style={[styles.sectionText, { paddingBottom: 24 }]}>
          {detail ?? answer}
        </ThemedText>
      </View>
      {visual && (
        <View style={styles.sectionContainer}>
          <View style={styles.imgContainer}>
            <Image source={visual} style={styles.ImgRow} />
          </View>
        </View>
      )}
    </View>
  )
}
export default InfosDisplay
