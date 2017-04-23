const userService = require('./../services/user');

module.exports = {
    /**
     * 用户注册
     */
    async create(ctx) {
        let user = {
            username: 'allin',
            password: '123456'
        };
        console.log(user);
        await userService.create(user);
    }
}
