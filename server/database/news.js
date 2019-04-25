import DbBase from './dbbase'
export default class News extends  DbBase {
  constructor() {
    super('news')
  }

  getbycategoryid(category_id) {
    return new Promise((resolve) => {
      this.db.all(`select * from ${this.tablename} where category_id= ?`, [category_id], (errors, data) => {
        console.log(data)
        resolve(data || [])
      })
    })
  }
}
