//引入模块
const express = require("express");
const { UserLogin, UserRegister } = require("../services/user");

//创建路由器对象
const Teusercrouter = express.Router();

// 用户登录
Teusercrouter.post("/userlogin", async(req, res, next) => {
    const user = req.body.user;
    const pwd = req.body.pwd;
    try {
        const ret = await UserLogin(user, pwd);
        res.send({
            code: 200,
            data: ret,
        });
    } catch (error) {
        console.log(error);
        next(new Error("登录失败"));
    }
});

// 注册用户
Teusercrouter.post("/register", async(req, res, next) => {
    const user = req.body.user;
    const pwd = req.body.pwd;
    const phone = req.body.phone;
    try {
        const ret = await UserRegister(user, pwd, phone);
        res.send({
            code: 200,
            data: ret,
        });
    } catch (error) {
        next(new Error("注册失败"));
    }
});

//导出路由器
module.exports = Teusercrouter;