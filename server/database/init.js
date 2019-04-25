import DbBase from './dbbase'

const initSql=[
//   `
// DROP TABLE IF EXISTS news
// `,`
// DROP TABLE IF EXISTS category
// `,
  `
CREATE TABLE IF NOT EXISTS news (
  id VARCHAR(20) PRIMARY KEY,
  category_id VARCHAR(20) NOT NULL,
  logo varchar(128) NOT NULL,
  url varchar(128) NOT NULL,
  title varchar(128) NOT NULL,
  des VARCHAR(999999) NOT NULL
)
`,`
CREATE TABLE IF NOT EXISTS category (
  id VARCHAR(20) PRIMARY KEY,
  name varchar(128) NOT NULL
)`]

export default function init(){
  let dbBase=new DbBase()
  initSql.forEach((item)=>{
    dbBase.db.run(item)
  })
}
