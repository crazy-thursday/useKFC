/**
 * @description manal add or search kfc message
 */
import { type Middleware } from 'https://deno.land/x/oak/middleware.ts'

import {
  generateResponse,
  generateFileName,
  uuid,
  path
} from '../utils/index.ts'
import { DATADIR } from '../constants/store.ts'
import { setItem, read } from '../utils/db.ts'
import {
  checkAuth,
  getContent,
  createCommit,
  type ICreateCommitOption
} from '../service/gh.ts'

type StorePayload = {
  /**
   * @description github token
   */
  token: string
  /**
   * @description issue body or custom store message
   */
  content: string
  /**
   * @description issue id or custom uuid
   */
  id?: string
  /**
   * @description issue username or self
   */
  createUser?: string
}

type ResponseBody = {
  fileName?: string
  id?: string
}

const store: Middleware = async (ctx) => {
  const { token, content, id, createUser } = ((await ctx.request.body({
    type: 'json'
  }).value) ?? {}) as StorePayload
  let responseBody: ResponseBody = {}
  if (!token) {
    ctx.response.status = 403
  } else {
    // check token is valid
    const authStatus = await checkAuth(token)
    if (authStatus) {
      ctx.response.status = 200
      // update currentFile
      const fileName = generateFileName()
      const creator = createUser ?? 'innocces'
      const itemId = id ?? (await uuid(fileName))
      const item = {
        content,
        id: itemId,
        createUser: creator
      }
      setItem(fileName, itemId, item)
      responseBody = {
        fileName,
        id: itemId
      }
      const fileContent = read(path.resolve(DATADIR, fileName))
      const payload: ICreateCommitOption = {
        path: fileName,
        content: btoa(fileContent)
      }
      // checkFile
      const { status, sha } = await getContent(token, payload)
      if (status === 200) {
        payload.sha = sha
      }

      const commitResponse = await createCommit(token, payload)
      if (commitResponse.status === 200) {
        console.log(`[${fileName}]: update success!`)
      }
    }
  }
  ctx.response.body = generateResponse<ResponseBody>(ctx, responseBody)
  ctx.response.type = 'application/json'
  console.log(ctx.response)
}

export default store
