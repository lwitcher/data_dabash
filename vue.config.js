const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  configureWebpack: {
    target: process.env.ELECTRON ? 'electron-renderer' : 'web',
    optimization: {
      // 禁用代码分割
      splitChunks: false
    }
  },
  // 完全禁用CSS提取，将所有CSS内联到JS中
  css: {
    extract: false
  }
})
