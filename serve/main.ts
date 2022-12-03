import { Application } from 'https://deno.land/x/oak/mod.ts'

// plugins
import { logger, generalResponse, timing } from './route/common.ts'

// routers
import router from './route/index.ts'

const app = new Application()

// routers
app.use(router.routes())
app.use(router.allowedMethods())

// plugins
app.use(logger)
app.use(timing)

// use general generate common response
app.use(generalResponse)

// cache error
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(`[🍟KFC-serve] - serve error: cause ${err.message}`)
  }
})

app.addEventListener('listen', ({ hostname, port, secure }) => {
  console.log(`
    [🍟KFC-serve] - Listening on: ${secure ? 'https://' : 'http://'}${
    hostname ?? 'localhost'
  }:${port}
  `)
})

await app.listen({ port: 10089 })
