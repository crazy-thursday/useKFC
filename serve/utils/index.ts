import { type Context } from 'https://deno.land/x/oak/context.ts'
import { path } from 'https://deno.land/x/dax@0.16.0/src/deps.ts'
import { generate } from 'https://deno.land/std@0.167.0/uuid/v5.ts'

export { path }

export enum CODE {
  /**
   * @description success code
   */
  SUCCESS = 10086,
  /**
   * @description failed code
   */
  FAILED = 10087,
  /**
   * @description deny code
   */
  DENY = 10089
}

export type ResponseStruct<T = unknown> = {
  code: CODE
  ip: Context['request']['ip']
  method: Context['request']['method']
  data: T
}

export function generateResponse<T>(ctx: unknown, body: T): ResponseStruct<T> {
  const context = ctx as Context
  const status = context.response.status
  const code =
    status === 200
      ? CODE.SUCCESS
      : status >= 300 && status <= 400
      ? CODE.FAILED
      : CODE.DENY
  return {
    code,
    ip: context.request.ip,
    method: context.request.method,
    data: body
  }
}

export function generateFileName(): string {
  const date = new Date()
  return [date.getFullYear(), date.getMonth(), date.getDay()]
    .join('-')
    .concat('.json')
}

export async function uuid(namespace: string): Promise<string> {
  return await generate(namespace, new TextEncoder().encode('kfc-serve'))
}
