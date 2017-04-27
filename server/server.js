/**
 * server入口文件
 */

require('babel-register');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const routers = require('./routers/index');
const token = require('./middlewares/token');
const app = new Koa();

// 配置ctx.body中间件
app.use(bodyParser());

// app.use(token.verifyTokenBefore);

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 用户登录成功设置token
app.use(token.registerToken);

// 监听启动端口
app.listen( config.port || 9000)
console.log(`the server is start at port ${config.port}`);
