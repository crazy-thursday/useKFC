import { type Middleware } from 'https://deno.land/x/oak/middleware.ts'

import { generateResponse } from '../utils/index.ts'

// logger
export const logger: Middleware = async (ctx, next) => {
  await next()
  const requestTime = ctx.response.headers.get('X-Response-Time')
  console.log(
    `[🍟KFC-serve] - ${ctx.request.method} ${ctx.request.url} - ${requestTime}`
  )
}

// timing
export const timing: Middleware = async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${ms}ms`)
}

// general
export type GeneralResponse = {
  message: string
}
export const generalResponse: Middleware = (ctx) => {
  ctx.response.body = generateResponse<GeneralResponse>(ctx, {
    message: 'no rules match for u request'
  })
  ctx.response.redirect('https://use-kfc.deno.dev')
}
