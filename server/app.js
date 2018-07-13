import Express from 'express'
import httpProxy from 'express-http-proxy'
import url from 'url'
import conf from '../config'

const app = Express()

conf.server.proxys[conf.server.env].forEach((proxy) => {
  Object.keys(proxy.urls).forEach((path) => {
    const { host, pathname } = url.parse(proxy.urls[path])
    app.use(`${proxy.root}${path}`, httpProxy(host), {
      proxyReqPathResolver(req) {
        const { search } = url.parse(req.url)
        return `${pathname}${search || ''}`
      }
    })
    console.log(`${proxy.root}${path} ===> ${proxy.urls[path]}`)
  })
})


app.listen(conf.build.serverPort, () => {
  console.log(`Proxy server runing at http://${conf.build.host}:${conf.build.serverPort}`)
})
