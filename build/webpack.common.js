import HtmlWebpackPlugin from 'html-webpack-plugin'
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'
import autoprefixer from 'autoprefixer'
import conf from '../config'
import theme from '../src/styles/theme.json'


function resolve(dir = '') {
  return path.join(__dirname, '../', dir)
}


const common = {
  entry: resolve('src/index'),
  output: {
    path: resolve(`${conf.build.outputPath}`),
    publicPath: conf.build.publishPath,
    filename: 'js/[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.web.js', '.js', '.jsx'],
    alias: {
      '@': resolve('src'),
      '@views': resolve('src/views'),
      '@comps': resolve('src/components'),
      '@utils': resolve('src/utils'),
      '@static': resolve('src/static'),
      '@img': resolve('src/static/img'),
      '@styles': resolve('src/styles'),
      '@store': resolve('src/store')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|s[ac]ss|less)$/,
        use: [
          { loader: conf.isDev ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: ['last 7 versions']
                })
              ]
            }
          },
          { loader: 'sass-loader', options: { sourceMap: true, javascriptEnabled: true } },
          {
            loader: 'less-loader',
            options: {
              modifyVars: theme,
              javascriptEnabled: true,
              sourceMap: true,
              paths: () => {
                path.resolve(__dirname, 'node_modules')
              }
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[hash].[ext]',
            outputPath: 'static/img'
          }
        }, {
          loader: 'image-webpack-loader',
          options: {
            // Compress JPEG images
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            // Compress PNG images
            optipng: {
              enabled: false
            },
            // Compress PNG images
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            //  Compress GIF images
            gifsicle: {
              interlaced: false
            },
            // Compress JPG & PNG images into WEBP
            webp: {
              quality: 75
            }
          }
        }]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            prefix: 'fonts',
            name: '[path][name].[ext]',
            limit: 10000
          }
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
      filename: 'index.html',
      minify: conf.isProd ? {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true
      } : false
    }),
    new ScriptExtHtmlWebpackPlugin({
      prefetch: {
        test: /\.js$/,
        chunks: 'all'
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new CopyPlugin([{ from: './src/static', to: './static', ignore: ['.DS_Store'] }])
  ]
}

export default common
