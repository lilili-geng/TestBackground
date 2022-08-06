const { query } = require("../mysql/index");

// 用户登录
function UserLogin(user, pwd) {
    console.log(user, pwd);
    return query("SELECT * FROM test_user WHERE tname=? AND tpwd=? LIMIT 1", [
        user,
        pwd,
    ]);
}

// 用户注册
function UserRegister(user, pwd, phone) {
    return query("INSERT INTO test_user(tname,tpwd,phone) values (?,?,?)", [
        user,
        pwd,
        phone,
    ]);
}

module.exports = {
    UserLogin,
    UserRegister,
};