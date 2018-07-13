import webpack from 'webpack'
import merge from 'webpack-merge'
import ShellPlugin from 'webpack-shell-plugin-next'
import common from './webpack.common'
import conf from '../config'

const devConf = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new ShellPlugin({
      onBuildStart: {
        scripts: ['node ./script/iconfont.update'],
        blocking: false,
        parallel: true
      },
      dev: false
    })
  ],
  devServer: {
    hot: conf.build.hmr,
    host: '0.0.0.0',
    port: conf.build.wdsPort,
    compress: true,
    historyApiFallback: true,
    quiet: false, // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    noInfo: false, // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
    inline: true,
    open: conf.build.openBrowser, // 打开浏览器
    useLocalIp: conf.build.useIp,
    overlay: {
      warnings: false,
      errors: false
    }, // 页面中显示错误信息
    filename: 'app.js',
    watchOptions: {
      ignored: /node_modules/
    },
    publicPath: '/',
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
    proxy: {
      '/': `http://${conf.build.host}:${conf.build.serverPort}`
    }
  }
})

const hmrPlugins = [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]
if (conf.build.hmr) {
  devConf.plugins.push(...hmrPlugins)
}

export default devConf
