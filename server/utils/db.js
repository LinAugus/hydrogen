/**
 * mysql 配置文件
 */
const mysql = require('mysql');

const config = require('./../config').database;

const pool = mysql.createPool({
    host: config.HOST,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DB
})

let query = function(sql, values) {
    return new Promise((resolve, reject) => {

        // 连接池
        pool.getConnection(function(err, connection) {
            if (err) {
                resolve(err)
            } else {
                // 执行操作
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    // 释放连接
                    connection.release()
                });
            }
        });

    });
}

let db = {

    createTable(sql) {
        return query(sql, [])
    },

    findDataById(table, id) {
        let _sql = "SELECT * FROM ? WHERE id = ? "
        return query(_sql, [table, id])
    },

    findDataByField(table, field, obj ) {
        let _sql = "SELECT ? FROM ? WHERE ? = ? ";

        return query(_sql, [field, table ])
    },

    findDataByPage(table, keys, start, end) {
        let _sql = "SELECT ? FROM ?  LIMIT ? , ?"
        return query(_sql, [keys, table, start, end])
    },

    insertData(table, values) {
        let _sql = "INSERT INTO ? SET ?"
        return query(_sql, [table, values])
    },

    updateData(table, values, id) {
        let _sql = "UPDATE ? SET ? WHERE id = ?"
        return query(_sql, [table, values, id])
    },

    deleteDataById(table, id) {
        let _sql = "DELETE FROM ? WHERE id = ?"
        return query(_sql, [table, id])
    },

    select(table, keys) {
        let _sql = "SELECT ? FROM ? "
        return query(_sql, [keys, table])
    },

    count(table) {
        let _sql = "SELECT COUNT(*) AS total_count FROM ? "
        return query(_sql, [table])
    },
}

module.exports = db;
