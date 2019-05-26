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
          params: {
            type: 'plus',
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
          params: {
            type: 'multiply',
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
        id: 'condition-1234',
        store: 'op',
        type: 'condition',
        data: {
          params: {
            type: 'gte'
          },
          quote: {
            b: {
              id: 'calculate-7630',
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
        target: 'condition-1234',
        inputKey: 'result',
        outputKey: 'a'
      },
      {
        source: 'condition-1234',
        target: 'echo-9823',
        condition: true,
        inputKey: 'a'
      },
      {
        source: 'condition-1234',
        target: 'echo-9823',
        condition: false,
        inputKey: 'b'
      }
    ],
  };
  return json
};