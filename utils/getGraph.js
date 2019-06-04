/*
  获取图数据
*/

const createGraphIndex = require('./graphIndex')

module.exports = function(graphData) {
  return createGraphIndex(graphData)
};