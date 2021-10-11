module.exports = {
    devServer: {
        port: 4200,
        proxy: 'http://localhost:3000'
    },
    transpileDependencies: [
      'vuetify'
    ]
}
