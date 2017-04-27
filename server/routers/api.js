/**
 * restful api 子路由
 */

const router = require('koa-router')();
const user   = require('./../controllers/user');

router.get('/user/create', user.create);
router.post('/user/login', user.login);
router.get('/user/verifyLogin', user.verifyLogin);
router.delete('/user/logout', user.logout);

module.exports = router;
