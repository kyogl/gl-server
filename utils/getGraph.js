/*
  获取图数据
*/

// var _ = require('lodash');
// var uuid = require('uuid/v4')

module.exports = function(graphData) {
  if (graphData) {
    return graphData
  }
  const json = {
    nodes: [
      {
        id: 'start',
        type: 'start'
      },
      {
        id: 'math-1037',
        store: 'op',
        type: 'math',
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
        id: 'math-7630',
        store: 'op',
        type: 'math',
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
              id: 'math-7630',
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
        store: 'op',
        type: 'array',
        data: {
          params: {
            length: 0,
          }
        }
      },
      {
        id: 'each-6555',
        type: 'each',
        data: {
          params: {
            type: 'for',
            a: 10,
          }
        },
        start: 'start-9841'
      },
      {
        id: 'start-9841',
        type: 'start',
        inputKey: 'value',
        parent: 'each-6555'
      },
      {
        id: 'array-2648',
        store: 'op',
        type: 'array',
        data: {
          params: {
            type: 'push',
            a: 'f'
          },
          quote: {
            data: {
              id: 'array-8412',
            }
          }
        },
        parent: 'each-6555'
      },
      {
        id: 'assignment-0299',
        type: 'assignment',
        data: {
          params: {
            id: 'each-6555'
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
        target: 'math-1037',
        inputKey: 'number',
        outputKey: 'a'
      },
      {
        source: 'start',
        target: 'math-7630',
        inputKey: 'number',
        outputKey: 'a'
      },
      {
        source: 'math-1037',
        target: 'object-8761',
        outputKey: 'result',
      },
      {
        source: 'math-7630',
        target: 'object-8761',
        outputKey: 'result2',
      },
      {
        source: 'math-7630',
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
        target: 'each-6555',
        outputKey: 'data'
      },
      {
        source: 'each-6555',
        target: 'object-7631',
        outputKey: 'arg',
      },
      {
        source: 'object-7631',
        target: 'echo-9823',
      },
      {
        source: 'start-9841',
        target: 'array-2648'
      },
      {
        source: 'array-2648',
        target: 'assignment-0299'
      }
    ],
  };
  return json
};