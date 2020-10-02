module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devServer: {
      watchOptions: {
        poll: true,
      },
    },
  },
  publicPath: './',
  assetsDir: '',
  outputDir: 'dist',
}
