import {
  ensureDirSync,
  ensureFileSync,
  readJsonSync,
  writeJSONSync,
  readdirSync
} from 'fs-extra'

const SLOGENDIR = './serve/json-data'
const SLOGENDEFAULTFILE = SLOGENDIR + '/index.json'

const COPYFILE = './core/src/slogen.json'

ensureDirSync(SLOGENDIR)
ensureFileSync(SLOGENDEFAULTFILE)

const slogenFileList = readdirSync(SLOGENDIR)

let slogen = {}

if (slogenFileList.length) {
  slogen = slogenFileList.reduce((slogenMap, fileName) => {
    const currentSlogen = readJsonSync([SLOGENDIR, fileName].join('/'))
    return {
      ...slogenMap,
      ...currentSlogen
    }
  }, {})
}

ensureFileSync(COPYFILE)

writeJSONSync(COPYFILE, slogen)

console.log(slogenFileList)
