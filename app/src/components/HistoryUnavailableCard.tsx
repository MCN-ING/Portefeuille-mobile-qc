import { testIdWithKey, useTheme } from '@hyperledger/aries-bifold-core'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'

type UnavailableCardProps = {
  credentialName?: string
  issuer?: string
}

const HistoryUnavailableCard = ({ credentialName, issuer }: UnavailableCardProps) => {
  const { t } = useTranslation()
  const { width } = useWindowDimensions()
  const { ColorPallet, TextTheme } = useTheme()
  const padding = width * 0.05
  const logoHeight = width * 0.12
  const borderRadius = 10

  const styles = StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      minHeight: 0.33 * width,
      elevation: 5,
      backgroundColor: ColorPallet.grayscale.white,
      shadowColor: ColorPallet.grayscale.lightGrey,
      shadowOpacity: 0.5,
      shadowOffset: { width: 2, height: 2 },
      overflow: 'visible',
      borderRadius: borderRadius,
    },
    secondaryBodyContainer: {
      width: logoHeight,
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      backgroundColor: ColorPallet.grayscale.mediumGrey,
    },
    logoContainer: {
      width: logoHeight,
      height: logoHeight,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    primaryBodyContainer: {
      padding,
      flex: 1,
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      backgroundColor: ColorPallet.grayscale.veryLightGrey,
    },
    textContainer: {
      flexShrink: 1,
      fontSize: 16,
      lineHeight: 24,
    },
    credentialName: {
      flex: 1,
      flexWrap: 'wrap',
      lineHeight: 16,
      maxWidth: '85%',
      fontSize: 14,
      fontWeight: '600',
    },
    credentialIssuerContainer: {
      flex: 1,
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
      maxWidth: '80%',
    },
  })

  const secureIssuer: string = issuer ?? t('Contacts.UnknownContact')

  return (
    <View
      style={styles.cardContainer}
      accessible={true}
      accessibilityLabel={`${credentialName ?? ''} ${t('Credentials.Credential')}.
                ${t('Credentials.IssuedBy') + secureIssuer}.`}
    >
      <View style={styles.secondaryBodyContainer} />
      <View testID={testIdWithKey('CredentialCardPrimaryBody')} style={styles.primaryBodyContainer}>
        <Text
          testID={testIdWithKey('CredentialName')}
          style={[TextTheme.bold, styles.textContainer, styles.credentialName]}
        >
          {credentialName}
        </Text>
        <View style={styles.credentialIssuerContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <View style={styles.logoContainer}>
              <Text
                accessible={false}
                style={[
                  TextTheme.bold,
                  {
                    fontSize: 0.5 * logoHeight,
                    alignSelf: 'center',
                    color: '#000',
                  },
                ]}
                testID={testIdWithKey('NoLogoText')}
              >
                {secureIssuer.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text
              testID={testIdWithKey('CredentialIssuer')}
              style={[
                TextTheme.normal,
                styles.textContainer,
                {
                  fontWeight: '500',
                  fontSize: 12,
                  lineHeight: 19,
                  opacity: 0.8,
                  flexWrap: 'wrap',
                },
              ]}
            >
              {secureIssuer}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default HistoryUnavailableCard
