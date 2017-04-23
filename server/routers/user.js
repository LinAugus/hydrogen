/**
 * 用户相关router
 * @type {[type]}
 */
const router = require('koa-router')();
const user   = require('./../controllers/user');

module.exports = router.get('/', user.create);
