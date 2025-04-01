import { Button, ButtonType, GenericFn, testIdWithKey, ThemedText, useTheme } from '@hyperledger/aries-bifold-core'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import ErrorIcon from '../../assets/img/icons/error_icon.svg'
import InfoIcon from '../../assets/img/icons/info_icon.svg'
import SuccessIcon from '../../assets/img/icons/success_icon.svg'
import WarningIcon from '../../assets/img/icons/warning_icon.svg'

export enum AvisType {
  Info,
  Success,
  Warn,
  Error,
}

interface AvisProps {
  type: AvisType
  description: string | React.ReactNode
  title?: string
  primaryBackgroundColorSameAsSecondary?: boolean
  onCallToActionLabel?: string
  onCallToActionPressed?: GenericFn
}

export const Avis: React.FC<AvisProps> = ({
  type,
  title,
  description,
  primaryBackgroundColorSameAsSecondary = false,
  onCallToActionLabel,
  onCallToActionPressed,
}: AvisProps) => {
  const { ColorPallet } = useTheme()
  const { t } = useTranslation()

  const secondaryBackgroundColor = useMemo(() => {
    switch (type) {
      case AvisType.Info:
        return ColorPallet.notification.info
      case AvisType.Success:
        return ColorPallet.notification.success
      case AvisType.Warn:
        return ColorPallet.notification.warn
      case AvisType.Error:
        return ColorPallet.notification.error
    }
  }, [type, ColorPallet])

  const icon = useMemo(() => {
    const iconDict = {
      [AvisType.Info]: <InfoIcon testID={testIdWithKey('Info')} />,
      [AvisType.Success]: <SuccessIcon testID={testIdWithKey('Success')} />,
      [AvisType.Warn]: <WarningIcon testID={testIdWithKey('Warning')} />,
      [AvisType.Error]: <ErrorIcon testID={testIdWithKey('Error')} />,
    }
    return iconDict[type]
  }, [type])

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 4,
      borderColor: ColorPallet.grayscale.lightGrey,
    },
    secondaryContainer: {
      backgroundColor: secondaryBackgroundColor,
      width: 40,
      paddingTop: 24,
      paddingHorizontal: 8,
    },
    title: {
      fontWeight: 'bold',
    },
    description: {
      ...(type === AvisType.Success && primaryBackgroundColorSameAsSecondary && { color: ColorPallet.brand.text }),
    },
  })

  const hasTitle = title !== undefined && title.trim().length > 0

  return (
    <View style={styles.container}>
      <View testID={testIdWithKey('SecondaryContainer')} style={styles.secondaryContainer}>
        {icon}
      </View>
      <View
        testID={testIdWithKey('PrimaryContainer')}
        style={{
          flex: 1,
          paddingVertical: 24,
          paddingHorizontal: 16,
          backgroundColor: primaryBackgroundColorSameAsSecondary
            ? secondaryBackgroundColor
            : ColorPallet.brand.primaryBackground,
        }}
      >
        {hasTitle && (
          <ThemedText variant="labelSubtitle" testID={testIdWithKey('AvisTitle')} style={styles.title}>
            {title}
          </ThemedText>
        )}
        {typeof description === 'string' ? (
          <ThemedText variant="labelSubtitle" testID={testIdWithKey('AvisDescription')} style={styles.description}>
            {description}
          </ThemedText>
        ) : (
          <View testID={testIdWithKey('AvisDescriptionView')}>{description}</View>
        )}
        {onCallToActionPressed && (
          <View style={{ paddingTop: 10 }}>
            <Button
              title={onCallToActionLabel || t('Global.Okay')}
              accessibilityLabel={onCallToActionLabel || t('Global.Okay')}
              testID={testIdWithKey('AvisButton')}
              buttonType={ButtonType.Primary}
              onPress={onCallToActionPressed}
            />
          </View>
        )}
      </View>
    </View>
  )
}
