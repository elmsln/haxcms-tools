const { startServer, createConfig, createMiddlewars } = require('@web/dev-server');
const koaBody = require('koa-body');
const saveNode = require("./routes/saveNode.js")

const config = createConfig({ ...{
  port: 8080,
  watch: true,
  open: true,
  nodeResolve: false,
  preserveSymlinks: true,
  rootDir: '_site',
  middlewares: [
    koaBody(),
    function (ctx, next) {
      if (ctx.request.method === 'POST' && ctx.request.url === "/system/api/saveNode") {
        saveNode(ctx, next);
      }
      return next();
    }
  ],
}, logErrorsToBrowser: true });
const { logDebug } = require('@web/dev-server/dist/utils/utils.js');

module.exports = () => {
  logDebug('Starting server with config: ', config);
  startServer(config);
  
  ['exit', 'SIGINT'].forEach(event => {
    // @ts-ignore
    process.on(event, () => {
      process.exit(0);
    });
  });
}