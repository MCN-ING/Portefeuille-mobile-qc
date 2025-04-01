import {
  Link,
  useTheme,
  Stacks as BifoldStacks,
  Screens as BifoldScreens,
  ThemedText,
} from '@hyperledger/aries-bifold-core'
import UnorderedList from '@hyperledger/aries-bifold-core/App/components/misc/UnorderedList'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { hitSlop } from '../../constants'
import { RootStackParams } from '../../navigators/navigators'

import { CustomModal } from './CustomModal'

interface ConnectionAlertProps {
  connectionID?: string
}

const ConnectionAlert: React.FC<ConnectionAlertProps> = ({ connectionID }) => {
  const { t } = useTranslation()
  const { ColorPallet } = useTheme()
  const [infoCardVisible, setInfoCardVisible] = useState(false)

  const settingsNavigation = useNavigation<StackNavigationProp<RootStackParams>>()

  const styles = StyleSheet.create({
    notifyTextContainer: {
      flex: 1,
      paddingVertical: 15,
      marginVertical: 15,
    },
    row: {
      flexDirection: 'row',
    },
    notifyText: {
      marginVertical: 5,
    },
    informationIcon: {
      color: ColorPallet.notification.infoIcon,
      marginLeft: 10,
    },
  })

  const toggleInfoCard = () => setInfoCardVisible(!infoCardVisible)

  const navigateToContacts = () => {
    toggleInfoCard()
    settingsNavigation.navigate(BifoldStacks.ContactStack, { screen: BifoldScreens.Contacts })
  }

  return (
    <View style={styles.notifyTextContainer}>
      <View style={styles.row}>
        <ThemedText variant="title" style={{ marginBottom: 5 }}>
          {t('ConnectionAlert.AddedContacts')}
        </ThemedText>
        <TouchableOpacity
          testID={t('Global.Info')}
          accessibilityLabel={t('ConnectionAlert.AddedContacts')}
          accessibilityRole={'button'}
          onPress={toggleInfoCard}
          hitSlop={hitSlop}
        >
          <Icon name={'information'} size={30} style={styles.informationIcon} />
        </TouchableOpacity>
      </View>
      {infoCardVisible && (
        <CustomModal
          title={t('ConnectionAlert.AddedContacts')}
          description={
            <View style={styles.notifyTextContainer}>
              <ThemedText style={[styles.notifyText, { marginBottom: 16 }]}>
                {t('ConnectionAlert.PopupIntro')}
              </ThemedText>
              <UnorderedList
                unorderedListItems={[t('ConnectionAlert.PopupPoint1'), t('ConnectionAlert.PopupPoint2')]}
              />
              <ThemedText style={[styles.notifyText, { marginTop: 16 }]}>
                {t('ConnectionAlert.SettingsInstruction1')}
                <Link onPress={navigateToContacts} linkText={t('ConnectionAlert.ContactsLink')} />
                {t('ConnectionAlert.SettingsInstruction2')}
              </ThemedText>
            </View>
          }
          primary={{
            label: t('ConnectionAlert.PopupExit'),
            action: toggleInfoCard,
          }}
          onDismissPressed={toggleInfoCard}
        />
      )}
      <ThemedText style={styles.notifyText}>
        {connectionID
          ? t('ConnectionAlert.NotificationBody1') +
            connectionID +
            t('ConnectionAlert.NotificationBody2') +
            connectionID +
            '.'
          : t('ConnectionAlert.NotificationBodyWithoutIssuer')}
      </ThemedText>
    </View>
  )
}

export default ConnectionAlert
