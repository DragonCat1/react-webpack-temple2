import buildConf from './build'
import serverConf from './server'

const { NODE_ENV } = process.env
export default {
  build: buildConf,
  server: serverConf,


  isDev: /(development|undefined)/.test(NODE_ENV),
  isProd: /production/.test(NODE_ENV),
  get envStr() {
    return this.isDev ? 'development' : 'production'
  },
  get envStrShort() {
    return this.isDev ? 'dev' : 'prod'
  }
}
