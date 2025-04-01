import { ThemedText } from '@hyperledger/aries-bifold-core'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import BulletPoint from './BulletPoint'
import HeaderText from './HeaderText'
import Progress from './Progress'

export interface PINCreateHeaderProps {
  updatePin?: boolean
}

const PINCreateHeader = ({ updatePin }: PINCreateHeaderProps) => {
  const { t } = useTranslation()
  const styles = StyleSheet.create({
    containerMargin: {
      marginBottom: 16,
    },
    pinBodyTitle: {
      fontWeight: 'bold',
    },
    headerTitle: {
      marginBottom: 16,
      marginTop: !updatePin ? 20 : 0,
    },
  })
  return (
    <View>
      {!updatePin && (
        <View style={{ marginTop: 25 }}>
          <View style={{ marginHorizontal: 50 }}>
            <Progress
              progressPercent={66.6666}
              progressText={t('PINCreate.ProgressBarText')}
              accessibilityLabel={t('PINCreate.ProgressBarTextAccessibilityLabel')}
              progressFill="primary"
              progressBackground="lightGrey"
            />
          </View>
        </View>
      )}
      <View style={styles.headerTitle}>
        <HeaderText title={updatePin ? t('Screens.ChangePIN') : t('Screens.CreatePIN')} />
      </View>
      <ThemedText style={[styles.pinBodyTitle, styles.containerMargin]}>
        {updatePin ? t('PINCreate.RememberChangePIN') : t('PINCreate.RememberPIN')}
      </ThemedText>
      <ThemedText style={styles.containerMargin}>{t('PINCreate.Warning')}</ThemedText>
      <BulletPoint text={t('PINCreate.BulletPoint1')} />
      <BulletPoint text={t('PINCreate.BulletPoint2')} style={{ marginBottom: 32 }} />
    </View>
  )
}

export default PINCreateHeader
