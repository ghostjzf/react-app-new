const router = require('@koa/router')();
const homeController = require("./controller/home");

module.exports = (app) => {
  router.get('/(.*)', homeController.index);

  app.use(router.routes()).use(router.allowedMethods());
}