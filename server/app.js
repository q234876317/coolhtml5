//初始化
import initTable from './database/init'
initTable()

import Koa from 'koa';
const app = new Koa();

import onerror from 'koa-onerror'
import logger from 'koa-logger'
import koaBody from 'koa-body'

import convert from 'koa-convert'
import koaStatic from 'koa-static'

import midResponse from './restful/middle/response'

import cors from 'koa2-cors'

import jwtKoa from 'koa-jwt'
import admin from './config/user'

import backRouter from './restful/router/back'
import apiRouter from './restful/router/api'

onerror(app);
app.use(async(ctx,next)=> {
  const start=new Date()
  await next()
  const end=new Date()
  console.log(`start Time:${start},endTime:${end},use ${(end.getTime()-start.getTime())/1000} s`)
})

app.use(convert(logger()))
app.use(koaStatic(__dirname+"/public"))
// app.use(bodyParser())
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));

app.use(midResponse)

// 具体参数我们在后面进行解释
app.use(cors({
  origin: function (ctx) {
    // if (ctx.url === '/test') {
    return "*"; // 允许来自所有域名请求
    // }
    // return 'http://localhost:8080';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(async(ctx,next)=> {
  //这里只管json
  await next().catch((err) => {
    //todo:这里根据ctx的类型判断返回json还是html
    if (err.status == 401) {
      ctx.AuthorizationJson({})
    } else {
      console.log('try error')
      console.log(err)
      ctx.errorJson({data:err});
    }
  })
})

app.use(backRouter.routes())
    .use(backRouter.allowedMethods())
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())

app.use(async(ctx,next) =>{
  if (ctx.response.status === 404 && !ctx.response.body){
    ctx.throw(404)
  }
  await next();
});

app.use(jwtKoa({ secret: admin.sec })
    .unless({ path: [/^\/favicon.ico/,/^\/api/,/^\/server\/user\/login/,/^\/server\/user\/logout/]}));

app.on('error',(err,ctx)=>{
  console.log(err)
});

module.exports=app
