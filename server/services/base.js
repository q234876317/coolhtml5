/***
 * 服务层基础
 */
export default class Base {
  constructor(_dbClass) {
    this.db = new _dbClass()
  }
  async getall() {
    return await this.db.getall()
  }
  async getcount() {
    return await this.db.getcount()
  }
  async getlist(pageindex = 1, pagesize = 10) {
    return await this.db.getlist(pageindex, pagesize)
  }
  async getbyid(id) {
    return await this.db.getbyid(id)
  }
  async deletebyid(id) {
    return await this.db.deletebyid(id)
  }
  async insert(obj) {
    return await this.db.insert(obj)
  }
  async update(id,obj) {
    return await this.db.update(id, obj)
  }
}
