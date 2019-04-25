import {validate} from '../../utils/tool'
export default (serviceClass)=> {
  return (target) => {
    //注入通用方法
    const service = new serviceClass()
    target.baseService = service
    target.all = async (ctx) => {
      const data = await service.getall() || []
      ctx.successJson({data})
    };
    target.query = async (ctx) => {
      let {pageindex = 1, pagesize = 10} = ctx.query
      const data = await service.getlist(pageindex, pagesize) || []
      ctx.successJson({data})
    };

    target.count = async (ctx) => {
      const count = await service.getcount() || 0
      ctx.successJson({data: {count}})
    };

    target.getbyid = async (ctx) => {
      let {id} = ctx.query
      const data = await service.getbyid(id) || []
      ctx.successJson({data})
    };

    target.remove = async (ctx) => {
      let {id} = ctx.request.body
      if (!id) {
        ctx.errorJson({msg:'没有该信息'})
      }
      else {
        let cur = await service.getbyid(id)
        if (!validate.isObject(cur)) {
          ctx.errorJson({msg:'没有这条数据！'})
        }
        else {
          await service.deletebyid(id)
          ctx.successJson({})
        }
      }
    }
  }
}
