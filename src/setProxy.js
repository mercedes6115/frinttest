
// installing http-proxy-middleware  you can deal with CORS problem by modifying this file
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:9999',// 서버 URL or localhost:설정한포트번호
            changeOrigin: true,
        })
    );
};
