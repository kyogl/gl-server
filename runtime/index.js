const _ =  require('lodash')
const opStore = require('./op')

class Runtime {
  constructor(data, graph) {
    this.data = data
    this.graph = graph
    this.log = {}
    this.tryRun = {}
  }
  getNode (id) {
    let nodeIndex = this.graph.nodeIndex[id]
    let node = this.graph.nodes[nodeIndex]
    return node
  }
  getLink (id) {
    let linkIndex = this.graph.linkIndex[id]
    let link = this.graph.links[linkIndex]
    return link
  }
  runNext (node, nodeInput) {
    let id = node.id
    let input = _.cloneDeep(nodeInput)
    this.log[id].output = input
    //如果为默认算子库中的算子
    if (node.store=='op') {
      const op = opStore[node.type]
      let data = _.merge(node.data.params, input)
      if (node.data.quote) {
        _.forEach(node.data.quote, (v, k)=>{
          let param = this.log[v.id].output
          if (v.key) {
            param = this.log[v.id].output[v.key]
          }
          data[k] = param
        })
      }
      this.log[id].inputOp = data
      //如果是条件算子
      if (node.type=='condition') {
        this.log[id].condition = op(data)
        this.log[id].output = data
      } else {
        input = op(data)
        this.log[id].output = input
      }
    //如果是对象组合算子
    } else if (node.type=='object') {
      let data = _.merge(node.data.params, input)
      if (node.data.quote) {
        _.forEach(node.data.quote, (v,k)=>{
          let param = this.log[v.id].output
          if (v.key) {
            param = this.log[v.id].output[v.key]
          }
          data[k] = param
        })
      }
      input = data
      this.log[id].output = input
    //如果是新建数组算子
    } else if (node.type=='array') {
      if (node.data.length>0) {
        this.log[id].output = new Array(node.data.length)
      } else {
        this.log[id].output = []
      }
    //如果不属于任何类型算子
    } else if (node.type=='echo') {
      return this.output = input
    }
    //不满足以上条件则继续向下执行
    if (node.sourceLinks.length==0) {
      return
    }
    let sourceLinks = _.cloneDeep(node.sourceLinks)
    //过滤不满足条件的执行流
    if (!_.isUndefined(this.log[id].condition)) {
      sourceLinks = _.filter(sourceLinks, linkId=>{
        let link = this.getLink(linkId)
        return link.condition===this.log[id].condition
      })
    }
    //向下执行算子
    _.forEach(sourceLinks, linkId=>{
      let link = this.getLink(linkId)
      let trueInput = _.cloneDeep(this.log[id].output)
      if (link.inputKey) {
        trueInput = this.log[id].output[link.inputKey]
      }
      let trueOutput = trueInput
      if (link.outputKey) {
        trueOutput = {}
        trueOutput[link.outputKey] = trueInput
      }
      this.runNode(link.target, trueOutput)
    })
  }
  runNode (id, input) {
    if (!_.isObject(this.log[id])) {
      this.log[id] = {}
    }
    if (_.isObject(this.log[id].input) && _.isObject(input)) {
      this.log[id].input = _.merge(this.log[id].input, input)
    } else {
      this.log[id].input = input
    }
    let node = this.getNode(id)
    if (!this.tryRun[id]) {
      let targetLinks = _.filter(node.targetLinks, linkId=>{
        let link = this.getLink(linkId)
        return _.isUndefined(link.condition) || link.condition===true
      })
      this.tryRun[id] = _.after(targetLinks.length, ()=>{
        this.runNext(node, input)
      })
    }
    this.tryRun[id]()
  }
  run () {
    this.runNode(this.graph.start, this.data)
    return {
      output: this.output,
      log: this.log
    }
  }
}

module.exports = Runtime