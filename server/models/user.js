const mysql = require('../utils/db.js');

const user = {
    async create(model) {
        let result = await mysql.insertData('hy_user', model);
        console.log(result);
        return result;
    }
}

module.exports = user;
