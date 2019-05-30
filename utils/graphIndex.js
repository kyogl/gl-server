/*
  图索引生成工具
*/
const _ = require('lodash');

const createGraphIndex = function(graphData) {
  let data = _.cloneDeep(graphData)
  data.links = _.map(data.links, n=>{
    n.id = n.source+''+n.target+_.random(0,99999)
    return n
  })
  data.linkIndex = {}
  _.forEach(data.links, (n, k)=>{
    data.linkIndex[n.id] = k
  })
  data.nodes = _.map(data.nodes, n=>{
    n.sourceLinks = _.map(_.filter(data.links, link=>{
      return link.source==n.id
    }), n=>{
      return n.id
    })
    n.targetLinks = _.map(_.filter(data.links, link=>{
      return link.target==n.id
    }), n=>{
      return n.id
    })
    return n
  })
  data.nodeIndex = {}
  _.forEach(data.nodes, (n, k)=>{
    data.nodeIndex[n.id] = k
  })
  const start = _.find(data.nodes, n=>{
    return n.type=='start' && !n.parent
  })
  data.start = start.id
  return data
};

module.exports = createGraphIndex;