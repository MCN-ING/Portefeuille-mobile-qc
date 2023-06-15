import { CredentialExchangeRecord, ProofExchangeRecord, ConnectionRecord } from '@aries-framework/core'

export type records = CredentialExchangeRecord | ProofExchangeRecord | ConnectionRecord
export type lookBack = 'day' | 'week' | 'month' | 'year' | 'all'
export type historyActionsType = 'CredentialRecord' | 'ProofRecord' | 'ConnectionRecord'
export type sortType = 'asc' | 'desc'
