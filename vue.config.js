const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  configureWebpack: {
    target: process.env.ELECTRON ? 'electron-renderer' : 'web',
    optimization: {
      splitChunks: false
    }
  },
  css: {
    extract: process.env.NODE_ENV === 'production' // 仅在生产环境下提取 CSS
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.plugin('html').tap(args => {
        args[0].templateParameters = {
          BASE_URL: './'
        }
        return args
      })
    }
  }
})
