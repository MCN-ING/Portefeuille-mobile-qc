import { CredentialExchangeRecord, ProofExchangeRecord, ConnectionRecord } from '@aries-framework/core'
import { useConnections, useCredentials, useProofs } from '@aries-framework/react-hooks'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

type records = CredentialExchangeRecord | ProofExchangeRecord | ConnectionRecord

const History: React.FC = () => {
  const { records: credentialRecords } = useCredentials()
  const { records: proofRecords } = useProofs()
  const { records: connectionRecords } = useConnections()

  const [history, setHistory] = useState<records[]>([])
  // const [sortSide, setSortSide] = useState<'asc' | 'desc'>('asc')

  const createHistory = (records: records[]) => {
    const sortedRecords = records.sort(
      (a, b) => Date.parse(a.createdAt.toDateString()) - Date.parse(b.createdAt.toDateString())
    )
    setHistory(sortedRecords)
  }

  useEffect(() => {
    createHistory([...credentialRecords, ...proofRecords, ...connectionRecords])
  }, [credentialRecords, proofRecords, connectionRecords])

  return (
    <View>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <View>
            <Text style={{ color: 'black' }}>{JSON.stringify(item)}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default History
