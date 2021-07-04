const router = require('@koa/router')();
const homeController = require("./controller/home");

module.exports = (app) => {
  router.all('/', homeController.index);

  app.use(router.routes()).use(router.allowedMethods());
}