const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://ab472062-3f3e-458c-89ac-10b295067104.us-east4-0.gcp.cloud.qdrant.io:6333",
            changeOrigin: true,
            pathRewrite: {
                "^/api": "",
            },
        })
    );
};





