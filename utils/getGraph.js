/*
  获取图数据
*/

// var _ = require('lodash');
// var uuid = require('uuid/v4')

module.exports = function() {
  var json = {
    nodes: [
      {
        id: 'a',
        type: 'start'
      },
      {
        id: 'b',
        type: 'echo'
      }
    ],
    links: [
      {
        source: 'a',
        target: 'b',
      }
    ],
  };
  return json
};