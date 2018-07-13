import httpProxy from 'express-http-proxy'
import url from 'url'
import conf from '../config'

const proxys = conf.server.proxys[conf.server.env]
function mapApiToHost(p) {
  const map = {}
  p.forEach((proxy) => {
    Object.keys(proxy.urls).forEach((path) => {
      map[`${proxy.root}${path}`] = proxy.urls[path]
    })
  })
  return map
}
const proxysMap = mapApiToHost(proxys)
console.log('代理：', proxysMap)

export default (req, res, next) => {
  const reqUrl = url.parse(req.url)
  if (reqUrl.pathname in proxysMap) {
    const { host, pathname } = url.parse(proxysMap[reqUrl.pathname])
    httpProxy(host, {
      proxyReqPathResolver() {
        return `${pathname}${reqUrl.search ? reqUrl.search : ''}`
      }
    })(req, res, next)
  } else next()
}
