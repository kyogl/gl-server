/*
  获取图数据
*/

// var _ = require('lodash');
// var uuid = require('uuid/v4')

module.exports = function() {
  const json = {
    nodes: [
      {
        id: 'start',
        type: 'start'
      },
      {
        id: 'calculate-1037',
        store: 'op',
        type: 'calculate',
        data: {
          type: 'plus',
          params: {
            a: 5,
            b: 8
          }
        }
      },
      {
        id: 'echo-9823',
        type: 'echo'
      }
    ],
    links: [
      {
        source: 'start',
        target: 'calculate-1037',
        inputKey: 'number',
        outputKey: 'a'
      },
      {
        source: 'calculate-1037',
        target: 'echo-9823',
      }
    ],
  };
  return json
};