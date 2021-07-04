const log4js = require('log4js');
const path = require('path');

levels = {
  'trace': log4js.levels.TRACE,
  'debug': log4js.levels.DEBUG,
  'info': log4js.levels.INFO,
  'warn': log4js.levels.WARN,
  'error': log4js.levels.ERROR,
  'fatal': log4js.levels.FATAL,
}

const dirName = 'info.log';

const errorLoggerPath = path.resolve(__dirname, `../logs/errors/error.log`);
const resLoggerPath = path.resolve(__dirname, `../logs/response/reponse.log`);

log4js.configure({
    // 输出到控制台的内容，同时也输出到日志文件中
    replaceConsole: true,
    appenders: {
      console: {
        type: 'console'
      },
        errorLogger: {
          type: 'dateFile',
          filename: errorLoggerPath,
          encoding: 'utf-8',
          pattern: "yyyy-MM-dd",
          keepFileExt: true,
          alwaysIncludePattern: true,
        },
        reqLogger: {
          type: 'dateFile',
          filename: errorLoggerPath,
          encoding: 'utf-8',
          pattern: "yyyy-MM-dd",
          keepFileExt: true,
          alwaysIncludePattern: true,
        },
        resLogger: {
          type: 'dateFile',
          filename: resLoggerPath,
          encoding: 'utf-8',
          pattern: "yyyy-MM-dd",
          keepFileExt: true,
          alwaysIncludePattern: true,
        },
    },
    categories: {
        // 设置默认的 categories
        default: {appenders: ['console'], level: 'all'},
        errorLogger: {appenders: ['errorLogger'], level: "error"},
        reqLogger: {appenders: ['reqLogger'], level: "info"},
        resLogger: {appenders: ['resLogger'], level: "info"},
    }
})

const logUtil = {};

const errorLogger = log4js.getLogger("errorLogger");
const resLogger = log4js.getLogger("resLogger");

logUtil.logError = (error, ms) => {
  errorLogger.error(error, ' — ' + "RT: " + ms + "ms")
}

logUtil.logResponse = (ctx, ms) => {
  resLogger.info("RT: " + ms + "ms")
}

module.exports = (app) => {
  app.use(async(ctx, next) =>{
    ctx.logger = logUtil;
    await next()
  }).use(async (ctx, next) => {
    const start = new Date();
    let ms = new Date() - start;
    await next();
    try {
      // 开始进入到下一个中间件
      if (ctx.status === 404) {
        ctx.throw(404);
        return;
      }
      ms = new Date() - start;
      // 记录响应日志
      ctx.logger.logResponse(ctx, ms);
    } catch (error) {
      ms = new Date() - start;
      setTimeout(() => {

      }, 2000)
      // 记录异常日志
      ctx.logger.logError(error, ms);
    }
  })
}