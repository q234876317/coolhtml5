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
    }
}
