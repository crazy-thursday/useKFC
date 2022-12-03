import { path } from '../utils/index.ts'
import { cwd } from './loc.ts'

export const DATADIRBASE = 'json-data'

// store data dir
export const DATADIR = path.resolve(cwd(), DATADIRBASE)

// fallback file entry
export const DATADEFAULT = 'index.json'
