import { IndyVdrPoolConfig } from '@credo-ts/indy-vdr/build/pool'

import _ledgers from './ledgers.json'

// type-check the json
const ledgers: IndyVdrPoolConfig[] = _ledgers

export default ledgers
