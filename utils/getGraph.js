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
          },
          quote: {
            b: {
              id: 'start',
              key: 'number'
            }
          }
        }
      },
      {
        id: 'calculate-7630',
        store: 'op',
        type: 'calculate',
        data: {
          type: 'plus',
          params: {
            b: 8
          }
        }
      },
      {
        id: 'object-8761',
        type: 'object',
        data: {
          params: {
          },
          quote: {
            input: {
              id: 'start',
              key: 'number'
            }
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
        source: 'start',
        target: 'calculate-7630',
        inputKey: 'number',
        outputKey: 'a'
      },
      {
        source: 'calculate-1037',
        target: 'object-8761',
        outputKey: 'result',
      },
      {
        source: 'calculate-7630',
        target: 'object-8761',
        outputKey: 'result2',
      },
      {
        source: 'object-8761',
        target: 'echo-9823',
      }
    ],
  };
  return json
};