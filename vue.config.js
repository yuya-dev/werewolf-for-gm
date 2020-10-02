module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devServer: {
      watchOptions: {
        poll: true,
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/werewolf-for-gm/' : '/',
  assetsDir: '',
  outputDir: 'dist',
}
