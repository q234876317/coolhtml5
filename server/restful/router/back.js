import {CategoryController, NewsController, UserController} from '../controller/back.export'
import koaRouter from 'koa-router'
const router = koaRouter();
router
    .get('/back/category/all',CategoryController.all)
    .get('/back/category/query',CategoryController.query)
    .get('/back/category/count',CategoryController.count)
    .get('/back/category/getbyid',CategoryController.getbyid)

    .post('/back/category/delete',CategoryController.remove)
    .post('/back/category/add',CategoryController.add)
    .post('/back/category/update',CategoryController.update)

    .get('/back/news/query',NewsController.query)
    .get('/back/news/count',NewsController.count)
    .get('/back/news/getbyid',NewsController.getbyid)

    .post('/back/news/delete',NewsController.remove)
    .post('/back/news/add',NewsController.add)
    .post('/back/news/update',NewsController.update)

    .post('/back/user/login',UserController.login)
    .post('/back/user/logout',async(ctx)=>{
        ctx.successJson({msg:'退出成功'})
    })

export default router
