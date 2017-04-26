const jwt = require('jsonwebtoken');

const PRIVATE_KEY = "coral";

/**
 * {Promise} verifyToken
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, key, (err, decode) => {
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
        if (ctx.payload && Objext.keys(ctx.payload).length) {
            const token = jwt.sign(ctx.payload, PRIVATE_KEY, {
                expiresIn: 60*30
            });
            ctx.cookies.set('token', token);
        }
        await next();
    },
    // 验证token
    async verifyTokenBefore(ctx, next)  {
        const token = ctx.cookies.get('token');
        ctx.token = {};
        if (!token) {
            ctx.tokenCode = tokenErr.TOKEN_NOT_FOUND;
            return;
        }
        let result = await verifyToken(token);
        if (result.err) {
            console.log(result.err);
            return;
        }
        ctx.token = result.decode;
        ctx.tokenCode = tokenCode.TOKEN.SUCCESS;
        await next();
    }
}
