import BaseController from '../base'
import NewsService from '../../../services/news'

function validateData({category_id, logo, url, title, des}) {
  let msg = '', result = true
  if (!category_id) {
    msg = '分类id不能为空！'
    result = false
  }
  if (!logo) {
    msg = 'logo不能为空！'
    result = false
  }
  if (!url) {
    msg = 'url不能为空！'
    result = false
  }
  if (!title) {
    msg = '标题不能为空！'
    result = false
  }
  if (!des) {
    msg = '描述不能为空！'
    result = false
  }
  return {result, msg}
}

@BaseController(NewsService)
export default class NewsController {
  static async add(ctx) {
    let curServices = NewsController.baseService
    let {category_id, logo, url, title, des} = ctx.request.body
    let validate = validateData({category_id, logo, url, title, des})
    if (!validate.result) {
      ctx.errorJson(validate.msg)
    }
    await curServices.insert({category_id, logo, url, title, des})
    ctx.successJson({msg: '添加成功'})
  }

  static async update(ctx) {
    let curServices = NewsController.baseService
    let {category_id, logo, url, title, des, id} = ctx.request.body
    let validate = validateData({category_id, logo, url, title, des})
    if (!validate.result) {
      ctx.errorJson(validate.msg)
    } else {
      let cur = await curServices.getbyid(id)
      if (!cur) {
        ctx.errorJson({msg: '信息已被删除！'})
      } else {
        await curServices.update(id, {category_id, logo, url, title, des})
        ctx.successJson({msg: '更新成功'})
      }
    }
  }
}