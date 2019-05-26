//运算算子
const _ = require('lodash')

const op = function (data) {
  let result
  let a = data.a
  let b = data.b
  if (_.isNumber(a*1)) {
    a = a*1
  }
  if (_.isNumber(b*1)) {
    b = b*1
  }
  switch (data.type) {
    case 'minus': 
      result = a-b
      break
    case 'multiply':
      result = a*b
      break
    case 'divide':
      result = a/b
      break
    default :
      result = a+b
  }
  return result
}

module.exports = op