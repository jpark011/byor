import staticPlugin from '@elysiajs/static'
import { file } from 'bun'
import { Elysia } from 'elysia'

new Elysia()
  .use(staticPlugin({ assets: 'dist' }))
  .get('/', () => file('./index.html'))
  .listen(3000)
