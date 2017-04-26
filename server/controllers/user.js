const userService = require('./../services/user');

module.exports = {
    /**
     * 用户注册
     */
    async create(ctx, next) {
        let user = {
            id: 1,
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
        let { id, username, password } = ctx.body;
        console.log(ctx.body);
        let result = await userService.verifyUser({ id, username, password });
        console.log(result);
    }
}
