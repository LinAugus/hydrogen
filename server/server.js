/**
 * server入口文件
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const routers = require('./routers/index');
const token = require('./midddlewares/token');
const app = new Koa();

// 配置ctx.body中间件
app.use(bodyParser());

console.log(token);

app.use(token.registerToken);

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen( config.port || 9000)
console.log(`the server is start at port ${config.port}`);
