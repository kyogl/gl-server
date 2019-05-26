const _ = require('lodash')

const op = function (data) {
  let result
  let str = data.data
  switch (data.type) {
    case 'concat':
      result = str+data.a
      break
    case 'toLowerCase':
      result = str.toLowerCase()
      break
    case 'toUpperCase':
      result = str.toUpperCase()
      break
    case 'split':
      result = _.split(str, data.a, data.b)
      break
    case 'slice':
      result = str.slice(data.a, data.b)
      break
    case 'trim':
      result = _.trim(str, data.a)
      break
    case 'replace':
      result = _.replace(str, data.a, data.b)
      break
    case 'length':
      result = str.length
      break
    default :
      result = ''
  }
  return result
}

module.exports = op