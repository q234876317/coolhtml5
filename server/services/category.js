/***
 * 服务层
 */
import CategoryDb from '../database/category'
import BaseService from './base'
export default class Category extends BaseService{
  constructor() {
    super(CategoryDb)
  }
  async getbyname(name){
    return await this.db.getbyname(name)
  }
}