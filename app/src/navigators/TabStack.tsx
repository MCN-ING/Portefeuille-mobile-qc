import { useAgent } from '@credo-ts/react-hooks'
import {
  AttachTourStep,
  CredentialStack,
  HomeStack,
  TOKENS,
  testIdWithKey,
  useServices,
  useStore,
  useTheme,
} from '@hyperledger/aries-bifold-core'
import { TourID } from '@hyperledger/aries-bifold-core/App/types/tour'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { ReducerAction, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, useWindowDimensions, View, StyleSheet, ViewStyle, AppState } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgProps } from 'react-native-svg'

import AtestationTabIcon from '../assets/img/icons/atestation.svg'
import HomeTabIcon from '../assets/img/icons/home.svg'
import NotificationTabIcon from '../assets/img/icons/notification.svg'
import PlusTabIcon from '../assets/img/icons/plus.svg'
import { NotificationReturnType, NotificationsInputProps } from '../hooks/notifications'
import { notificationsSeenOnHome } from '../utils/notificationsSeenOnHome'

import ActivitiesStack from './ActivitiesStack'
import PlusStack from './PlusStack'
import { TabStackParams, TabStacks } from './navigators'

const TabStack: React.FC = () => {
  const { fontScale } = useWindowDimensions()
  const { agent } = useAgent()
  const [, dispatch] = useStore()

  const [{ useNotifications }] = useServices([TOKENS.NOTIFICATIONS])

  const notifications = useNotifications({ isHome: false } as NotificationsInputProps)
  const { t } = useTranslation()
  const Tab = createBottomTabNavigator<TabStackParams>()
  const { ColorPallet, TabTheme, TextTheme } = useTheme()
  const showLabels = fontScale * TabTheme.tabBarTextStyle.fontSize < 18
  const styles = StyleSheet.create({
    tabBarIcon: {
      flex: 1,
    },
  })

  const tabBarIconContainerStyles = (focused: boolean): ViewStyle => ({
    ...TabTheme.tabBarContainerStyle,
    borderTopWidth: 4,
    borderTopColor: focused ? ColorPallet.brand.primary : ColorPallet.brand.primaryBackground,
    width: '100%',
    justifyContent: 'center',
  })

  const tabs = [
    { name: TabStacks.HomeStack, component: HomeStack, label: t('TabStack.Home'), icon: HomeTabIcon },
    {
      name: TabStacks.ActivitiesStack,
      component: ActivitiesStack,
      label: t('TabStack.Activities'),
      icon: NotificationTabIcon,
    },
    {
      name: TabStacks.CredentialStack,
      component: CredentialStack,
      label: t('TabStack.Credentials'),
      icon: AtestationTabIcon,
    },
    { name: TabStacks.OptionsPlusStack, component: PlusStack, label: t('TabStack.OptionsPlus'), icon: PlusTabIcon },
  ]

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState === 'background' && agent) {
        await notificationsSeenOnHome(
          agent,
          notifications as NotificationReturnType,
          // eslint-disable-next-line
          dispatch as React.Dispatch<ReducerAction<any>>
        )
      }
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange)

    return () => {
      subscription.remove()
    }
  }, [agent, notifications])

  const TabBarIcon = (props: {
    focused: boolean
    color: string
    size: number
    label: string
    hasBadge: boolean
    Icon: React.FC<SvgProps>
  }) => {
    return (
      <AttachTourStep tourID={TourID.HomeTour} index={1}>
        <View style={tabBarIconContainerStyles(props.focused)}>
          <props.Icon
            color={props.focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor}
            height={24}
          />
          {showLabels && (
            <Text
              style={{
                ...TabTheme.tabBarTextStyle,
                color: props.focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
                fontWeight: props.focused ? TextTheme.bold.fontWeight : TextTheme.normal.fontWeight,
              }}
            >
              {props.label}
            </Text>
          )}
          {props.hasBadge && notifications.length > 0 && (
            <View
              style={{
                position: 'absolute',
                top: 2,
                left: '55%',
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: ColorPallet.brand.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: ColorPallet.brand.text,
                  fontSize: 9,
                  fontWeight: 'bold',
                }}
              >
                {notifications.length}
              </Text>
            </View>
          )}
        </View>
      </AttachTourStep>
    )
  }

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: ColorPallet.brand.primary }}>
      <Tab.Navigator
        initialRouteName={TabStacks.HomeStack}
        screenOptions={{
          unmountOnBlur: true,
          tabBarStyle: {
            ...TabTheme.tabBarStyle,
          },
          tabBarActiveTintColor: TabTheme.tabBarActiveTintColor,
          tabBarInactiveTintColor: TabTheme.tabBarInactiveTintColor,
          header: () => null,
        }}
      >
        {tabs.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              tabBarIconStyle: styles.tabBarIcon,
              tabBarIcon: (props) => (
                <TabBarIcon
                  {...props}
                  label={item.label}
                  Icon={item.icon}
                  hasBadge={item.name == TabStacks.ActivitiesStack}
                />
              ),
              tabBarShowLabel: false,
              tabBarAccessibilityLabel: index != 1 ? item.label : `${item.label} (${notifications.length ?? 0})`,
              tabBarTestID: testIdWithKey(item.label),
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export default TabStack
