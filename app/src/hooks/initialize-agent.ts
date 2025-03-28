import { Agent, HttpOutboundTransport, MediatorPickupStrategy, WsOutboundTransport } from '@credo-ts/core'
import { IndyVdrPoolConfig, IndyVdrPoolService } from '@credo-ts/indy-vdr/build/pool'
import { useAgent } from '@credo-ts/react-hooks'
import { agentDependencies } from '@credo-ts/react-native'
import {
  DispatchAction,
  useAuth,
  useStore,
  migrateToAskar,
  createLinkSecretIfRequired,
  TOKENS,
  useServices,
  PersistentStorage,
} from '@hyperledger/aries-bifold-core'
import { GetCredentialDefinitionRequest, GetSchemaRequest } from '@hyperledger/indy-vdr-shared'
import moment from 'moment'
import { useCallback } from 'react'
import { Config } from 'react-native-config'
import { getQCAgentModules } from '../helpers/qc-agent-modules'
import { BCState, BCLocalStorageKeys } from '../store'

const loadCachedLedgers = async (): Promise<IndyVdrPoolConfig[] | undefined> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cachedTransactions = await PersistentStorage.fetchValueForKey<any>(BCLocalStorageKeys.GenesisTransactions)
  if (cachedTransactions) {
    const { timestamp, transactions } = cachedTransactions
    return moment().diff(moment(timestamp), 'days') >= 1 ? undefined : transactions
  }
}

const useInitializeQCAgent = () => {
  const { agent, setAgent } = useAgent()
  const [store, dispatch] = useStore<BCState>()
  const { walletSecret } = useAuth()
  const [logger, indyLedgers, credDefs, schemas] = useServices([
    TOKENS.UTIL_LOGGER,
    TOKENS.UTIL_LEDGERS,
    TOKENS.CACHE_CRED_DEFS,
    TOKENS.CACHE_SCHEMAS,
  ])

  const restartExistingAgent = useCallback(async () => {
    // if the agent is initialized, it was not a clean shutdown and should be replaced, not restarted
    if (!walletSecret?.id || !walletSecret.key || !agent || agent.isInitialized) {
      return
    }

    logger.info('Agent already created, restarting...')
    try {
      await agent.wallet.open({
        id: walletSecret.id,
        key: walletSecret.key,
      })
      await agent.initialize()
    } catch {
      // if the existing agents wallet cannot be opened or initialize() fails it was
      // again not a clean shutdown and the agent should be replaced, not restarted
      logger.error('Failed to restart existing agent, skipping agent restart')
      return
    }

    logger.info('Successfully restarted existing agent')
    return agent
  }, [walletSecret, agent, logger])

  const createNewAgent = useCallback(
    async (ledgers: IndyVdrPoolConfig[]): Promise<Agent | undefined> => {
      if (!walletSecret?.id || !walletSecret.key) {
        return
      }

      logger.info('No agent initialized, creating a new one')

      const options = {
        config: {
          label: store.preferences.walletName || 'IdentiQC',
          walletConfig: {
            id: walletSecret.id,
            key: walletSecret.key,
          },
          logger,
          mediatorPickupStrategy: MediatorPickupStrategy.Implicit,
          autoUpdateStorageOnStartup: true,
          autoAcceptConnections: true,
        },
        dependencies: agentDependencies,
        modules: getQCAgentModules({
          indyNetworks: ledgers,
          mediatorInvitationUrl: Config.MEDIATOR_URL,
        }),
      }

      const newAgent = new Agent(options)
      const wsTransport = new WsOutboundTransport()
      const httpTransport = new HttpOutboundTransport()

      newAgent.registerOutboundTransport(wsTransport)
      newAgent.registerOutboundTransport(httpTransport)

      return newAgent
    },
    [walletSecret, store.preferences.walletName, logger]
  )

  const migrateIfRequired = useCallback(
    async (newAgent: Agent) => {
      if (!walletSecret?.id || !walletSecret.key) {
        return
      }

      // If we haven't migrated to Aries Askar yet, we need to do this before we initialize the agent.
      if (!store.migration.didMigrateToAskar) {
        logger.debug('Agent not updated to Aries Askar, updating...')

        await migrateToAskar(walletSecret.id, walletSecret.key, newAgent)

        logger.debug('Successfully finished updating agent to Aries Askar')
        // Store that we migrated to askar.
        dispatch({
          type: DispatchAction.DID_MIGRATE_TO_ASKAR,
        })
      }
    },
    [walletSecret, store.migration.didMigrateToAskar, dispatch, logger]
  )

  const warmUpCache = useCallback(
    async (newAgent: Agent, cachedLedgers?: IndyVdrPoolConfig[]) => {
      const poolService = newAgent.dependencyManager.resolve(IndyVdrPoolService)
      if (!cachedLedgers) {
        // these escapes can be removed once Indy VDR has been upgraded and the patch is no longer needed
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore:next-line
        await poolService.refreshPoolConnections()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore:next-line
        const raw_transactions = await poolService.getAllPoolTransactions()
        const transactions = raw_transactions
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore:next-line
          .map((item) => item.value)
          .map(({ config, transactions }) => ({
            ...config,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore:next-line
            genesisTransactions: transactions.reduce((prev, curr) => {
              return prev + JSON.stringify(curr)
            }, ''),
          }))
        if (transactions) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await PersistentStorage.storeValueForKey<any>(BCLocalStorageKeys.GenesisTransactions, {
            timestamp: moment().toISOString(),
            transactions,
          })
        }
      }

      credDefs.forEach(async ({ did, id }) => {
        const pool = await poolService.getPoolForDid(newAgent.context, did)
        const credDefRequest = new GetCredentialDefinitionRequest({ credentialDefinitionId: id })
        await pool.pool.submitRequest(credDefRequest)
      })

      schemas.forEach(async ({ did, id }) => {
        const pool = await poolService.getPoolForDid(newAgent.context, did)
        const schemaRequest = new GetSchemaRequest({ schemaId: id })
        await pool.pool.submitRequest(schemaRequest)
      })
    },
    [credDefs, schemas]
  )

  const initializeAgent = useCallback(async (): Promise<Agent | undefined> => {
    if (!walletSecret?.id || !walletSecret.key) {
      return
    }

    const existingAgent = await restartExistingAgent()
    if (existingAgent) {
      setAgent(existingAgent)
      return existingAgent
    }

    const cachedLedgers = await loadCachedLedgers()
    const ledgers = cachedLedgers ?? indyLedgers

    const newAgent = await createNewAgent(ledgers)
    if (!newAgent) {
      logger.error('Failed to create a new agent')
      throw new Error('Failed to create a a new agent')
    }

    logger.info('Migrating agent if required...')
    await migrateIfRequired(newAgent)

    logger.info('Initializing new agent...')
    await newAgent.initialize()

    logger.info('Warming up cache...')
    await warmUpCache(newAgent, cachedLedgers)

    logger.info('Creating link secret if required...')
    await createLinkSecretIfRequired(newAgent)

    logger.info('Setting new agent...')
    setAgent(newAgent)

    return newAgent
  }, [
    walletSecret,
    restartExistingAgent,
    setAgent,
    indyLedgers,
    createNewAgent,
    logger,
    migrateIfRequired,
    warmUpCache,
  ])

  return { initializeAgent }
}

export default useInitializeQCAgent
