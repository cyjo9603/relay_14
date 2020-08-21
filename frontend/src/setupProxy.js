const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://boostcamp14.run.goorm.io/',
      changeOrigin: true,
    })
  );
};
