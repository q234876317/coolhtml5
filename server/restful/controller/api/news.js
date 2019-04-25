import BaseController from '../api.base'
import NewsServices from '../../../services/news'

@BaseController(NewsServices)
export default class NewsController {
    static async getbycategoryid(ctx){
        let {category_id}=ctx.query
        if(!category_id){
            ctx.errorJson({msg:"分类id必须大于0"})
        }
        else{
            let curServices=NewsController.baseService
            let cur_list=await curServices.getbycategoryid(category_id)
            ctx.successJson({data:cur_list,msg:'获取成功！'})
        }
    }
}
