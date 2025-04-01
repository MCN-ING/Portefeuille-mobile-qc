import {
  useTheme,
  useStore,
  Button,
  ButtonType,
  testIdWithKey,
  DispatchAction,
  ThemedText,
} from '@hyperledger/aries-bifold-core'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StyleSheet, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Config from 'react-native-config'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Avis, AvisType } from '../components/Avis/Avis'
import { BCDispatchAction, BCState, IASEnvironmentKeys, iasEnvironments } from '../store'

interface IASEnvironmentProps {
  shouldDismissModal: () => void
}

const IASEnvironmentScreen: React.FC<IASEnvironmentProps> = ({ shouldDismissModal }) => {
  const { t } = useTranslation()
  const { ColorPallet, SettingsTheme } = useTheme()
  const [store, dispatch] = useStore<BCState>()

  const environments = Object.keys(iasEnvironments) as IASEnvironmentKeys[]

  const styles = StyleSheet.create({
    container: {
      backgroundColor: ColorPallet.brand.primaryBackground,
      width: '100%',
    },
    section: {
      backgroundColor: SettingsTheme.groupBackground,
      paddingHorizontal: 25,
      paddingVertical: 16,
    },
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.brand.primaryBackground,
      marginHorizontal: 25,
    },
  })

  const handleEnvironmentChange = useCallback(
    (environment: IASEnvironmentKeys) => {
      dispatch({
        type: BCDispatchAction.UPDATE_ENVIRONMENT,
        payload: [environment],
      })

      if (environment === 'PRODUCTION') {
        dispatch({
          type: BCDispatchAction.USE_MANAGE_ENVIRONMENT,
          payload: [false],
        })

        if (store.preferences.developerModeEnabled) {
          dispatch({
            type: DispatchAction.ENABLE_DEVELOPER_MODE,
            payload: [false],
          })
        }
      }
      shouldDismissModal()
    },
    [dispatch, store.preferences.developerModeEnabled, shouldDismissModal]
  )

  const ListFooter = () => (
    <View style={{ marginTop: 30, marginHorizontal: 20 }}>
      <Button
        title={t('Global.Cancel')}
        accessibilityLabel={t('Global.Cancel')}
        testID={testIdWithKey('Cancel')}
        onPress={shouldDismissModal}
        buttonType={ButtonType.Secondary}
      />
    </View>
  )

  const AvisHeader = () => (
    <View
      style={{
        marginHorizontal: 10,
        padding: 16,
      }}
    >
      <Avis
        type={AvisType.Warn}
        primaryBackgroundColorSameAsSecondary
        description={t('Settings.IASEnvironmentWarning', { environment: Config.ENVIRONMENT })}
      />
    </View>
  )

  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        ListHeaderComponent={AvisHeader}
        ListFooterComponent={ListFooter}
        data={environments}
        renderItem={({ item }) => {
          return (
            <View style={[styles.section, styles.sectionRow]}>
              <ThemedText variant="title">{item}</ThemedText>
              <BouncyCheckbox
                accessibilityLabel={item}
                disableText
                fillColor="#FFFFFFFF"
                unfillColor="#FFFFFFFF"
                size={36}
                innerIconStyle={{ borderColor: ColorPallet.brand.primary, borderWidth: 2 }}
                ImageComponent={() => <Icon name="circle" size={18} color={ColorPallet.brand.primary}></Icon>}
                onPress={() => {
                  handleEnvironmentChange(item)
                }}
                isChecked={item === Object.keys(store.developer.environment)[0]}
                disableBuiltInState
                testID={testIdWithKey(item.toLocaleLowerCase())}
              />
            </View>
          )
        }}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: SettingsTheme.groupBackground }}>
            <View style={[styles.itemSeparator]}></View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default IASEnvironmentScreen
