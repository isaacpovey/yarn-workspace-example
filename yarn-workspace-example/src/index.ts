import { configureLogging, getLogger } from 'yarn-workspace-git-submodule-example/src/logging/Logger'
import { getDefaultRouter } from 'yarn-workspace-git-submodule-example/src/middleware/DefaultRoutes'
import axios from 'axios'
import Koa from 'koa'
import Router from '@koa/router'
import http from "http";

configureLogging()

const logger = getLogger()

const app = new Koa()
const router = new Router()

app.use(getDefaultRouter().routes()).use(getDefaultRouter().allowedMethods())

router.get('/test', async (ctx, next) => {
    logger.info('test')
    const response = await axios.get('https://httpbin.org/get')
    ctx.body = response.data
    ctx.status = response.status
    return next()
})

app.use(router.routes()).use(router.allowedMethods())

const server = http.createServer(app.callback())
server.listen(4000, '0.0.0.0')
