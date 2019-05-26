//运算算子
const op = function (data) {
  let result
  let a = data.params.a
  let b = data.params.b
  switch (data.type) {
    case 'minus': 
      result = a-b
    case 'multiply':
      result = a*b
    case 'divide':
      result = a/b
    default :
      result = a+b
  }
  return result
}

module.exports = op