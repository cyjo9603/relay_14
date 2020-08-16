const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://relay14-server.herokuapp.com/',
      changeOrigin: true,
    })
  );
};
