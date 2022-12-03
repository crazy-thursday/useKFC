/**
 * @description make db as fileSystem
 */
import { existsSync } from 'https://deno.land/std@0.167.0/node/fs.ts'
import { DATADIR, DATADEFAULT } from '../constants/store.ts'
import { path } from './index.ts'

export const read = Deno.readTextFileSync
export const write = Deno.writeTextFileSync

const defaultFileURI = path.resolve(DATADIR, DATADEFAULT)

export type Item = {
  /**
   * @description kfc message content
   */
  content: string
  /**
   * @description message id
   */
  id: string
  /**
   * @description message creator
   */
  createUser: string
}

/**
 * @description get all list info
 * @returns {Map<string, Item>}
 */
export function getList(): Map<string, Item> {
  const fileList = Deno.readDirSync(DATADIR)
  const list: Map<string, Item> = new Map([])
  for (const file of fileList) {
    const { name, isFile } = file

    if (isFile) {
      const subFileList = getListByName(name)
      subFileList.forEach((value, key) => list.set(key, value))
    }
  }
  return list
}

/**
 * @description fetch list by filename
 * @param {string} name filename
 * @returns {Map<string, Item>}
 */
export function getListByName(
  name: string = defaultFileURI
): Map<string, Item> {
  const list: Map<string, Item> = new Map([])
  try {
    const fileName = path.resolve(DATADIR, name)
    const mapContent = read(fileName)
    if (mapContent?.length) {
      Object.entries(JSON.parse(mapContent)).forEach(([key, value]) =>
        list.set(key, value as Item)
      )
    }
  } catch (e) {
    console.log('readFile content fail', e.message)
  }
  return list
}

/**
 * @description set key value by filename
 * @param {string} name filename
 * @param {string} key
 * @param {Item} value
 */
export function setItem(name: string, key: string, value: Item) {
  const fileName = path.resolve(DATADIR, name)
  let list: Map<string, Item> = new Map([])
  if (existsSync(fileName)) {
    list = getListByName(name)
  }
  list.set(key, value)
  const content: Record<string, Item> = {}
  list.forEach((value, key) => (content[key] = value))
  write(fileName, JSON.stringify(content, null, 2))
}

/**
 * @description get value by filename & key
 * @param {string} name filename
 * @param {string} key
 * @returns {Item | undefined}
 */
export function getItem(name: string, key: string): Item | undefined {
  const fileName = path.resolve(DATADIR, name)
  if (existsSync(fileName)) {
    return getListByName(name).get(key)
  }
}
