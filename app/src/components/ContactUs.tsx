import { useTheme } from '@hyperledger/aries-bifold-core'
import { useTranslation } from 'react-i18next'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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
      ...TextTheme.title,
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
      ...TextTheme.normal,
      color: ColorPallet.brand.link,
      textDecorationLine: 'underline',
    },
    sectionDescription: {
      ...TextTheme.normal,
      color: TextTheme.normal.color,
      textAlign: 'left',
      textDecorationLine: 'none',
    },
  })

  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.textSectionTitle}>{t('OptionsPlus.JoinUsTitle')}</Text>
      </View>
      <View style={styles.sectionRow}>
        <CalendarImg />
        <Text style={styles.sectionDescription}>{t('OptionsPlus.DaysOpen')}</Text>
      </View>
      <View style={styles.sectionRow}>
        <ClockImg />
        <Text style={styles.sectionDescription}>{t('OptionsPlus.OpeningHours')}</Text>
      </View>
      <View style={[styles.sectionRow]}>
        <PhoneImg style={styles.phoneImage} />
        <View style={{ gap: 18 }}>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={1}
            onPress={async () => await Linking.openURL(`tel:${t('OptionsPlus.PhoneNumber')}`)}
          >
            <Text style={[styles.sectionDescription, styles.tel]}>{t('OptionsPlus.PhoneNumber')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={1}
            onPress={async () => await Linking.openURL(`tel:${t('OptionsPlus.TollFreeNumber')}`)}
          >
            <Text style={[styles.sectionDescription]}>
              <Text style={styles.tel}>{t('OptionsPlus.TollFreeNumber')}</Text>
              <Text>{t('OptionsPlus.TollFreeNumberDescription')}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ContactUs
