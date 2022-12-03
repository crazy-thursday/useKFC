/**
 * @description make db as fileSystem
 */
import { DATADIR, DATADEFAULT } from '../constants/store.ts'
import { path } from './index.ts'

export const read = Deno.readTextFile

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
export async function getList(): Promise<Map<string, Item>> {
  const list: Map<string, Item> = new Map([])
  for await (const file of Deno.readDir(DATADIR)) {
    const { name, isFile } = file
    if (isFile) {
      const fileMap = await getListByName(name)
      fileMap.forEach((value, key) => list.set(key, value))
    }
  }
  return list
}

/**
 * @description fetch list by filename
 * @param {string} name filename
 * @returns {Map<string, Item>}
 */
export async function getListByName(
  name: string = defaultFileURI
): Promise<Map<string, Item>> {
  const list: Map<string, Item> = new Map([])
  try {
    const fileName = path.resolve(DATADIR, name)
    const mapContent = await read(fileName)
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
 * @description get value by filename & key
 * @param {string} name filename
 * @param {string} key
 * @returns {Item | undefined}
 */
export async function getItem(
  name: string,
  key: string
): Promise<Item | undefined> {
  const fileName = path.resolve(DATADIR, name)
  if (await existsSync(fileName)) {
    return (await getListByName(name)).get(key)
  }
}

export async function existsSync(fileName: string): Promise<boolean> {
  let exists = true
  try {
    exists = (await Deno.stat(fileName)).isFile
  } catch (e) {
    exists = false
  }
  return exists
}
