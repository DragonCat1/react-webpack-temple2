import internalIp from 'internal-ip'

export default{
  hmr: false,
  wdsPort: 8080,
  serverPort: 8081,
  useIp: true,
  openBrowser: false,
  get host() {
    return this.useIp ? internalIp.v4() : 'localhost'
  },
  outputPath: 'dist',
  publishPath: ''
}
