const _ = require('lodash')

const op = function (data) {
  let result
  let args = _.cloneDeep(data.data)
  switch (data.type) {
    case 'push': 
      args.push(data.a)
      result = args
      break
    case 'unshift':
      args.unshift(data.a)
      result = args
      break
    case 'slice':
      result = _.slice(args, data.a, data.b)
      break
    case 'join':
      result = args.join(data.a)
      break
    case 'length':
      result = args.length
      break
    default :
      if (data.length>0) {
        result = new Array(data.length)
      } else {
        result = []
      }
  }
  return result
}

module.exports = op