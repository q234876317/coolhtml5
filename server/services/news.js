/***
 * 服务层
 */
import NewsDb from '../database/news'
import BaseService from './base'
export default class News extends BaseService {
  constructor() {
    super(NewsDb)
  }

  async getbycategoryid(category_id){
    return await this.db.getbycategoryid(category_id)
  }
}
