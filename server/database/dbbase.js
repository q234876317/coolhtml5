import sqlite3 from 'sqlite3'
import {getRandom} from "../utils/tool";
const sqdb=sqlite3.verbose();
import {basePath} from "../env";
import path from 'path'

const db = new sqdb.Database(path.join(basePath,'WebFiles.db'));
export default class DbBase {
  constructor(tablename) {
    this.db = db
    this.tablename = tablename
  }
  getall() {
    return new Promise((resolve, reject) => {
      let sql = `select * from ${this.tablename}`
      this.db.all(sql, (errors, data) => {
        resolve(data || [])
      })
    })
  }

  /**
   * 获取总数
   * @returns {Promise<any>}
   */
  getcount() {
    return new Promise((resolve, reject) => {
      this.db.get(`select count(1) as count from ${this.tablename}`, (errors, data) => {
        let {count = 0} = data
        resolve(count)
      })
    })
  }

  /**
   * 查询分页
   * @param pageindex
   * @param pagesize
   * @returns {Promise<any>}
   */
  getlist(pageindex = 1, pagesize = 10) {
    return new Promise((resolve, reject) => {
      let start = (pageindex - 1) * pagesize, end = pageindex * pagesize
      let sql = `select * from ${this.tablename} limit ${start},${end}`
      this.db.all(sql, (errors, data) => {
        resolve(data || [])
      })
    })
  }

  /**
   * 根据id获取
   * @param id
   * @returns {Promise<any>}
   */
  getbyid(id) {
    return new Promise((resolve, reject) => {
      this.db.get(`select * from ${this.tablename} where id= ?`, [id], (errors, data) => {
        resolve(data)
      })
    })
  }

  /**
   * 插入一条数据
   * @param obj
   * @returns {Promise<any>}
   */
  insert(obj) {
    let allKeys = ['id', ...Object.keys(obj)].join(',')
    let allValues = [getRandom(), ...Object.values(obj)]
    let values = allValues.map(() => '?').join(',')
    return new Promise((resolve, reject) => {
      this.db.run(`insert into ${this.tablename}(${allKeys}) values(${values})`, allValues, (errors, data) => {
        resolve(data)
      })
    })
  }

  /**
   * 更新一条数据
   * @param id
   * @param obj
   * @returns {Promise<any>}
   */
  update(id, obj) {
    let allKeys = Object.keys(obj)
    let allValues = Object.values(obj)
    let setSql = allKeys.map((item) => item + '=?').join(',')

    return new Promise((resolve, reject) => {
      this.db.run(`update ${this.tablename} set ${setSql} where id=?`, [...allValues, id], (errors, data) => {
        resolve(data)
      })
    })
  }

  /**
   * 删除一条数据
   * @param id
   * @returns {Promise<any>}
   */
  deletebyid(id) {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM ${this.tablename} WHERE id =?`, [id], (errors, data) => {
        resolve(data)
      })
    })
  }
}
