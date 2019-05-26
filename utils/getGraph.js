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
        id: 'object-7631',
        type: 'object',
        data: {
          params: {
          }
        }
      },
      {
        id: 'array-8412',
        type: 'array',
        data: {
          length: 10,
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
        source: 'calculate-7630',
        target: 'object-8761',
        outputKey: 'result3',
      },
      {
        source: 'object-8761',
        target: 'condition-1234',
        inputKey: 'result',
        outputKey: 'a'
      },
      {
        source: 'condition-1234',
        target: 'object-7631',
        condition: true,
        inputKey: 'a',
        outputKey: 'cal'
      },
      {
        source: 'condition-1234',
        target: 'object-7631',
        condition: false,
        inputKey: 'b',
        outputKey: 'cal'
      },
      {
        source: 'start',
        target: 'array-8412',
      },
      {
        source: 'array-8412',
        target: 'object-7631',
        outputKey: 'arg',
      },
      {
        source: 'object-7631',
        target: 'echo-9823',
      }
    ],
  };
  return json
};