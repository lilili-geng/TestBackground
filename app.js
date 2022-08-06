//引入模块
const express = require("express");
//白名单
const cors = require("cors");
//创建web服务器
const app = express();
// post请求头
const bodyParser = require("body-parser");

//// 配置跨域
app.use(
    cors({
        origin: ["http://localhost:8081", "http://127.0.0.1:8080"],
    })
);

//监听端口
app.listen(8080, () => {
    console.log("项目启动");
});
// POST json 解析
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//托管静态资源
app.use(express.static("./public"));
//因为posto是请求体转参数,所以要解析转参格式
app.use(
    express.urlencoded({
        extended: false,
    })
);

//路由模块
//挂载路由use，配置特定前缀
app.use("/api", require("./routes/user"));

//错误处理中间件
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({
        code: 500,
        msg: "服务器端错误",
    });
});

app.all("*", (req, res, next) => {
    // res: 全称 response 响应
    // res.send() 可以传递数据给客户端
    // 此处: 我们要额外告诉客户端 运行来自 xxx 的访问
    // header: 响应头--详见亮哥的部分
    res.header("Access-Control-Allow-Origin", "*");
    // 允许来自 * 的访问:  *是通配符 代表所有域名
    // 如果不调用, 请求在这里就会终止, 被拦截
    next(); //放行, 让请求继续正常执行
});