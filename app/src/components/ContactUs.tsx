import { ThemedText, useTheme } from '@hyperledger/aries-bifold-core'
import { useTranslation } from 'react-i18next'
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native'

import CalendarImg from '../assets/img/calendar-empty.svg'
import ClockImg from '../assets/img/clock.svg'
import PhoneImg from '../assets/img/telephone.svg'

const ContactUs: React.FC = () => {
  const { ColorPallet, TextTheme } = useTheme()
  const { t } = useTranslation()

  const styles = StyleSheet.create({
    textHeaderTitle: {
      ...TextTheme.headingThree,
      color: TextTheme.headingThree.color,
      paddingVertical: 8,
    },
    textSectionTitle: {
      flexShrink: 1,
      color: TextTheme.bold.color,
    },
    section: {
      paddingVertical: 12,
    },
    sectionRow: {
      paddingVertical: 8,
      flexDirection: 'row',
      columnGap: 10,
      alignItems: 'center',
    },
    phoneImage: {
      width: 24,
      height: 24,
      alignSelf: 'flex-start',
      marginTop: 6,
    },
    tel: {
      color: ColorPallet.brand.link,
      textDecorationLine: 'underline',
    },
    sectionDescription: {
      textAlign: 'left',
      textDecorationLine: 'none',
    },
  })

  return (
    <View>
      <View style={styles.section}>
        <ThemedText variant="title" style={styles.textSectionTitle}>
          {t('OptionsPlus.JoinUsTitle')}
        </ThemedText>
      </View>
      <View style={styles.sectionRow}>
        <CalendarImg />
        <ThemedText style={styles.sectionDescription}>{t('OptionsPlus.DaysOpen')}</ThemedText>
      </View>
      <View style={styles.sectionRow}>
        <ClockImg />
        <ThemedText style={styles.sectionDescription}>{t('OptionsPlus.OpeningHours')}</ThemedText>
      </View>
      <View style={[styles.sectionRow]}>
        <PhoneImg style={styles.phoneImage} />
        <View style={{ gap: 18 }}>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={1}
            onPress={async () => await Linking.openURL(`tel:${t('OptionsPlus.PhoneNumber')}`)}
          >
            <ThemedText style={[styles.sectionDescription, styles.tel]}>{t('OptionsPlus.PhoneNumber')}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={1}
            onPress={async () => await Linking.openURL(`tel:${t('OptionsPlus.TollFreeNumber')}`)}
          >
            <ThemedText style={[styles.sectionDescription]}>
              <ThemedText style={styles.tel}>{t('OptionsPlus.TollFreeNumber')}</ThemedText>
              <ThemedText>{t('OptionsPlus.TollFreeNumberDescription')}</ThemedText>
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ContactUs
