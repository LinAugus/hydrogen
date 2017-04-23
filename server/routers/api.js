/**
 * restful api 子路由
 */

const router = require('koa-router')();
const user   = require('./../controllers/user');

const routers = router.get('/user', user.create);

module.exports = routers;
