/**
 * 用户业务操作
 */

 const userModel = require('./../models/user');

 const user = {

     /**
      * 创建用户
      * @param  {object}  user 用户信息
      * @return {object}      创建结果
      */
    async create(user) {
        let result = await userModel.create(user);
        return result;
    },

    async verifyUser(user) {
        let result = await userModel.verify(user);
        return result;
    }

 }

 module.exports = user;
