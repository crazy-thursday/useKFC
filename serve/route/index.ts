import { Router } from 'https://deno.land/x/oak/mod.ts'

// bbf
import bbf from './bbf.ts'

// store
import store from './store.ts'

const router = new Router()

router.get('/kfc', bbf)

router.post('/store', store)

export default router
