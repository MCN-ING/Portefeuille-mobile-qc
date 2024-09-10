import {
  useTheme,
  Button,
  ButtonType,
  testIdWithKey,
  Screens,
  NotificationStackParams,
} from '@hyperledger/aries-bifold-core'
import { StackScreenProps } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type DefaultProps = StackScreenProps<NotificationStackParams, Screens.CustomNotification>

const DefaultNotification: React.FC<DefaultProps> = () => {
  const { ColorPallet, TextTheme } = useTheme()
  const { t } = useTranslation()

  const styles = StyleSheet.create({
    pageContainer: {
      flex: 1,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    textHeaderTitle: {
      ...TextTheme.headingThree,
      flexShrink: 1,
      color: TextTheme.headingThree.color,
    },
    textSectionTitle: {
      ...TextTheme.headingFour,
      flexShrink: 1,
      color: TextTheme.headingFour.color,
    },
    button: {
      margin: 15,
    },
    section: {
      paddingVertical: 24,
      paddingHorizontal: 25,
    },
    sectionDescription: {
      ...TextTheme.normal,
      color: TextTheme.normal.color,
      textAlign: 'left',
      textDecorationLine: 'none',
      paddingTop: 20,
    },
  })

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.section}>
        <Text accessibilityRole={'header'} style={styles.textHeaderTitle}>
          {t('DefaultNotification.Title')}
        </Text>
        <Text style={styles.sectionDescription}> {t('DefaultNotification.Description')}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.textSectionTitle}>{t('DefaultNotification.SAGConnexion')}</Text>
        <Text style={styles.sectionDescription}> {t('DefaultNotification.SAGConnexionDescription')}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.textSectionTitle}>{t('DefaultNotification.ANIGAccept')}</Text>
        <Text style={styles.sectionDescription}> {t('DefaultNotification.ANIGAcceptDescription')}</Text>
      </View>
      <View style={styles.button}>
        <Button
          buttonType={ButtonType.Primary}
          testID={testIdWithKey('StartProcess')}
          accessibilityLabel={t('DefaultNotification.ButtonTitle')}
          title={t('DefaultNotification.ButtonTitle')}
        ></Button>
      </View>
    </SafeAreaView>
  )
}

export default DefaultNotification
