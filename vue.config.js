/* eslint-disable @typescript-eslint/no-var-requires */
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  chainWebpack(config) {
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
  },
}
