const jwt = require('jsonwebtoken');

const PRIVATE_KEY = "coral";

const TokenCode = {
    TOKEN_SUCCESS: {
        code: '000000',
        msg: 'token检查成功'
    },
    TOKEN_FORBID: {
        code: '000001',
        msg: 'token检查有误'
    },
    TOKEN_EXPIRED: {
        code: '000002',
        msg: 'token过期'
    },
    TOKEN_NOT_FIND: {
        code: '000003',
        msg: '未找到token'
    },
    TOKEN_UNKNOW_ERROR: {
        code: '000004',
        msg: '未知错误'
    }
}

/**
 * {Promise} verifyToken
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, PRIVATE_KEY, (err, decode) => {
                resolve({err, decode});
            });
        } catch (err) {
            reject({err, decode: null});
        }
    });
}

module.exports = {
    // 注册token
    async registerToken(ctx, next)  {
        if (ctx.payload && Object.keys(ctx.payload).length) {
            const token = jwt.sign(ctx.payload, PRIVATE_KEY, {
                expiresIn: 60*30
            });
            console.log(token);
            ctx.cookies.set('token', token);
        }
        await next();
    },
    // 验证token
    async verifyTokenBefore(ctx, next)  {
        const token = ctx.cookies.get('token');
        ctx.token = {};
        if (!token) {
            ctx.tokenCode = TokenCode.TOKEN_NOT_FOUND;
            return;
        }
        let result = await verifyToken(token);
        if (result.err) {
            console.log(result.err);
            return;
        }
        ctx.token = result.decode;
        ctx.tokenCode = TokenCode.TOKEN_SUCCESS;
        await next();
    }
}
