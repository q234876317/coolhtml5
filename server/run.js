require("babel-register");
require("babel-polyfill");
const app=require("./app");
const cfile = require('./config/common');
const config=cfile[process.env.NODE_ENV];
const port=config.port;

//获取端口
app.listen(port, () => console.log(`系统启动，端口：${port}`))
