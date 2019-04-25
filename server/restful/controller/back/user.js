import admin from '../../../config/user'
import jwt from 'jsonwebtoken'

export default class UserController {
  static async login(ctx) {
    const {name, password} = ctx.request.body;
    if (!name || !password) {
      return ctx.errorJson({msg: '获取用户失败!'});
    }
    const {name: _name, pass: _pass} = admin
    if (_name != name || _pass != password) {
      return ctx.errorJson({msg: '用户名或密码错误!'});
    }
    let token = jwt.sign({
      name: name,
      id: Math.random()
    }, admin.sec, {expiresIn: '1h'});
    ctx.successJson({msg: "登录成功！", data: {token}})
  }
}
