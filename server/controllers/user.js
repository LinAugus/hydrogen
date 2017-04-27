const userService = require('./../services/user');

module.exports = {
    /**
     * 用户注册
     */
    async create(ctx, next) {
        let user = {
            username: 'allin',
            password: '123456'
        };
        console.log(user);
        await userService.create(user);
    },
    /**
     * 用户登录
     */
    async login(ctx, next) {
        let { username='', password='' } = ctx.request.body;
        let result = await userService.verifyUser({ username, password });
        if (result.length === 0) {
            ctx.body = {
                status: '000002',
                msg: '用户名不存在'
            };
            return;
        }
        if (result[0].password === password) {
            ctx.payload = result[0];
            ctx.status = 200;
            ctx.body = {
                status: '000000',
                msg: '验证成功',
                data: result[0]
            };
        }
        await next();
    },
    /**
     * 校验用户是否登录
     */
    async verifyLogin(ctx, next) {
        let { code, msg } = ctx.tokenCode;
        let data = ctx.token || '';
        if (code === '000000') {
            data = {
                username: data.username
            };
        }
        ctx.body = {
            retCode: code,
            retMsg: msg,
            data
        };
        await next();
    },

    /**
     * 用户退出
     */
    async logout(ctx, next) {

    },
}
