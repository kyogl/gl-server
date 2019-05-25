/*
  图索引生成工具
*/
var _ = require('lodash');

var createGraphIndex = function(data) {
  data.linkIndex = {}
  data.links = _.map(data.links, n=>{
    n.id = n.source+''+n.target
    return n
  })
  _.forEach(data.links, (n, k)=>{
    data.linkIndex[n.id] = k
  })
  data.nodes = _.map(data.nodes, n=>{
    n.sourceLinks = _.filter(data.links, link=>{
      return link.source==n.id
    })
    n.sourceLinks = _.map(n.sourceLinks, n=>{
      return n.id
    })
    n.targetLinks = _.filter(data.links, link=>{
      return link.target==n.id
    })
    n.targetLinks = _.map(n.targetLinks, n=>{
      return n.id
    })
    return n
  })
  data.nodeIndex = {}
  _.forEach(data.nodes, (n, k)=>{
    data.nodeIndex[n.id] = k
  })
  const start = _.find(data.nodes, n=>{
    return n.type=='start'
  })
  data.start = start.id
  return data
};

module.exports = createGraphIndex;