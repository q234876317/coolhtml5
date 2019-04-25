import koaRouter from 'koa-router'
const router = koaRouter();
import path from 'path'
import fs from 'fs'
import {basePath} from '../../env'
import {getRandom} from "../../utils/tool";
import {CategoryController, NewsController} from "../controller/api.export";

router
    .post('/api/fileupload', async (ctx, next) => {
            // 上传单个文件
            const file = ctx.request.files.file; // 获取上传文件
            // 创建可读流
            const reader = fs.createReadStream(file.path);
            // 创建可写流
            const filePath = "/file/" + `${getRandom()}.png`
            const newPath = path.join(basePath,'/public', filePath)
            const upStream = fs.createWriteStream(newPath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream);

            ctx.successJson({msg: '上传成功', data: {url: filePath}})
    })

    .get('/api/category/all',CategoryController.all)
    .get('/api/category/query',CategoryController.query)
    .get('/api/category/count',CategoryController.count)
    .get('/api/category/getbyid',CategoryController.getbyid)

    .get('/api/news/bycategory',NewsController.getbycategoryid)
    .get('/api/news/all',NewsController.all)
    .get('/api/news/query',NewsController.query)
    .get('/api/news/count',NewsController.count)
    .get('/api/news/getbyid',NewsController.getbyid)
export default router
