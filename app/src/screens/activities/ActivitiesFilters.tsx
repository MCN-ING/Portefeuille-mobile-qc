import {} from '@hyperledger/aries-bifold-core'
import { useRoute } from '@react-navigation/native'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import HistoryFilter from '../../components/HistoryFilter'
import NotificationFilter from '../../components/NotificationFilter'

const ActivitiesFilters: React.FC = () => {
  const route = useRoute()

  const { activeTab } = route.params as { activeTab: string }
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      paddingHorizontal: 16,
    },
  })

  return (
    <SafeAreaView edges={['left', 'right']}>
      <ScrollView style={styles.container}>
        <View>{activeTab === 'Notification' ? <NotificationFilter /> : <HistoryFilter />}</View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ActivitiesFilters
