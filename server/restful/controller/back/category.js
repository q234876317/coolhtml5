import BaseController from '../base'
import CategoryService from '../../../services/category'

@BaseController(CategoryService)
export default class CategoryController {
  static async add(ctx) {
    let curServices = CategoryController.baseService
    let {name} = ctx.request.body
    if (!name) {
      ctx.errorJson({msg: '名字不能为空！'})
    } else {
      let cur = await curServices.getbyname(name)
      if (cur.length > 0) {
        ctx.errorJson({msg: '当前分类名称存在！'})
      } else {
        await curServices.insert({name})
        ctx.successJson({msg: '添加分类成功'})
      }
    }
  }

  static async update(ctx) {
    let curServices = CategoryController.baseService
    let {name, id} = ctx.request.body
    if (!name || !id) {
      ctx.errorJson({msg: '名字不能为空！'})
    } else {
      let curCategory = await curServices.getbyid(id)
      if (!curCategory) {
        ctx.errorJson({msg: '当前分类不存在！'})
      } else {
        let cur = await curServices.getbyname(name)
        if (cur.length > 1 || (cur.length == 1 && cur[0].id != id)) {
          ctx.errorJson({msg: '当前分类名称存在！'})
        } else {
          await curServices.update(id, {name})
          ctx.successJson({msg: '更新分类成功'})
        }
      }
    }
  }
}
