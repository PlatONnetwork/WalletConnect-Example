const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      // target: 'http://192.168.21.201:9090', // 树禹
      // target: 'http://192.168.120.146:6789/',
      target: 'http://10.1.1.51:6789/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  )
}
