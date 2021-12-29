/* eslint-disable @typescript-eslint/no-var-requires */
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

console.log('process.env.NODE_ENV::', process.env.NODE_ENV)
console.log('process.env.VUE_APP_ENV::', process.env.VUE_APP_ENV)

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  chainWebpack(config) {
    config.output.filename('js/[name].[hash].js').end()
    config.output.chunkFilename('js/[name].[hash].js').end()
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

    config.when(process.env.VUE_APP_ENV !== 'development', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [{ inline: /runtime\..*\.js$/ }])
        .end()

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          '@vue': {
            name: 'chunk-@vue',
            test: /[\\/]node_modules[\\/]_?@vue(.*)/,
            priority: 20,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementIcons: {
            name: 'chunk-element-icons', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?@element-plus(.*)/, // in order to adapt to cnpm
          },
          elementUI: {
            name: 'chunk-element-plus', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-plus(.*)/, // in order to adapt to cnpm
          },
          echarts: {
            name: 'chunk-echarts', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?echarts(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
          utils: {
            name: 'chunk-utils',
            test: resolve('src/utils'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
    })
  },
}
