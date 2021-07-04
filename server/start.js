const path = require('path');
const Koa = require("koa");
const serve = require("koa-static");
const router = require("./router");
const nunjucks = require("koa-nunjucks-2"); // 引入模板引擎
const logger = require("./middleware/logger")
const cors = require('@koa/cors');

const app = new Koa();

app.use(serve(path.resolve(__dirname, "../dist")), {
  maxage: 0, // ms
  hidden: false,
  defer: false,
  gzip: true,
})

app.use(nunjucks({
  ext: 'html', // 指定视图文件默认后缀
  path: path.join(__dirname, '../dist'), // 指定视图目录
  nunjucksConfig: {
    trimBlocks : true // 开启转义，防止Xss 漏洞
  }
}));

app.use(cors());

logger(app);
router(app);

const port = 9000;

app.listen(port, () => {
  console.log(`server is running at http://127.0.0.1:${port}`)
});