const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,//打包防止生产map文件
  css: { extract: false } //z组件css比较少就直接关闭
})
