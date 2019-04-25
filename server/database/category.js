import DbBase from './dbbase'
import {getRandom} from '../utils/tool'
export default class Category extends  DbBase {
  constructor() {
    super('category')
  }

  getbyname(name) {
    return new Promise((resolve, reject) => {
      this.db.all(`select * from ${this.tablename} where name= ?`, [name], (errors, data) => {
        resolve(data || [])
      })
    })
  }
}
