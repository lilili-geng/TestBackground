//连接mysql数据库专用模块
const mysql = require("mysql");
//创建连接池对象
const pool = mysql.createPool({
    //主机ip或域名
    host: "127.0.0.1",
    // 端口号
    port: "3306",
    // 用户名
    user: "root",
    //paw
    password: "root",
    //连接的数据库名称
    database: "testbackground",
    //连接池对象
    connectTimeout: 5000,
});

/**
 * 查询
 * @param {string} sql
 * @param {array} values
 * @returns
 */
const query = (sql, values) => {
    return new Promise((res, rej) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                rej(err);
            } else {
                console.log(sql, values);
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        rej(err);
                    } else {
                        res(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};

// 导出
module.exports = {
    query,
};