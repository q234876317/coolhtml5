import _ from 'lodash'
export const getRandom=()=> {
  const rdm = 'abcdefghijklmnobprstuvwxyz0123456789';
  let res_array = [];
  for (let i = 0; i < 5; i++) {
    let res_item = ''
    for (let j = 0; j < 4; j++) {
      res_item += rdm[Math.floor(Math.random() * rdm.length)]
    }
    res_array.push(res_item)
  }
  return res_array.join('-')
}
export const validate= {
  isEmail: value => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value),
  isMobile: value => /^1[3|4|5|7|8]\d{9}$/.test(value),
  isString: value => _.isString(value),
  isNumber: value => !isNaN(Number(value)),
  isObject: value => _.isObject(value),
  isJson: value => Object.prototype.toString.call(value).toLowerCase() === '[object object]',
  isArray: value => _.isArray(value),
}
