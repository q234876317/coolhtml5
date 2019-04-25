module.exports =async (ctx,next)=> {
  ctx.commonJson = (code, {data, msg}) => {
    ctx.set('Content-Type', 'application/json');
    ctx.status = 200
    ctx.body = {code: code, msg, data}
  }
  ctx.errorJson = ({data={},msg = '服务器异常'}) => {
    ctx.commonJson(-1, {data, msg})
  }
  ctx.AuthorizationJson = ({msg = '身份失效'}) => {
    ctx.commonJson(401, {data: {}, msg})
  }
  ctx.successJson = ({data = {}, msg = ''}) => {
    ctx.commonJson(200, {data, msg})
  }
  await next()
}