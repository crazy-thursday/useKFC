import { type Middleware } from 'https://deno.land/x/oak/middleware.ts'

import { getList, type Item } from '../utils/db.ts'
import { generateResponse } from '../utils/index.ts'

const bbf: Middleware = (ctx) => {
  const slogenList = getList()
  const totalSize = slogenList.size
  let response: Partial<Item> = {}
  if (totalSize) {
    const randomIndex = Math.floor(Math.random() * totalSize)
    const [, slogen] = [...slogenList][randomIndex]
    response = slogen
    ctx.response.status = 200
  }
  ctx.response.body = generateResponse<Partial<Item>>(ctx, response)
}

export default bbf
