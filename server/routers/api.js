/**
 * restful api 子路由
 */

const router = require('koa-router')();
const user   = require('./../controllers/user');

router.get('/user/create', user.create)
router.post('/user/login', user.login);



module.exports = router;
