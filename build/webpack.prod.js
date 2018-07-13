import path from 'path'
import merge from 'webpack-merge'
import CleanPlugin from 'clean-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import common from './webpack.common'


const proConf = merge(common, {
  mode: 'production',
  plugins: [
    new CleanPlugin(['dist'], { root: path.resolve(__dirname, '../'), verbose: true }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: { reduceIdents: false }
    })
  ]
})
if (process.argv.includes('--report')) proConf.plugins.push(new BundleAnalyzerPlugin())

export default proConf
