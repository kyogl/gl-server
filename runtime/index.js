const _ =  require('lodash')
const opStore = require('./op')

const client = require('../utils/mongodb');
const ObjectId = require('mongodb').ObjectId

const getGraph = require('../utils/getGraph');

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
  async runNext (node, nodeInput) {
    let id = node.id
    let input = _.cloneDeep(nodeInput)
    this.log[id].output = input
    if (node.data && node.data.quote) {
      _.forEach(node.data.quote, (v, k)=>{
        let param = this.log[v.id].output
        if (v.key) {
          param = this.log[v.id].output[v.key]
        }
        node.data.params[k] = param
      })
    }
    let params = {}
    if (node.data) {
      params = node.data.params
    }
    let data =_.merge(params, input)
    //如果为默认算子库中的算子
    if (node.store=='op') {
      const op = opStore[node.type]
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
      input = data
      this.log[id].output = input
    } else if (node.type=='each') {
      // let start = this.getNode(node.start)
      if (data.type=='for') {
        for(let i=0; i<data.a; i++) {
          this.runNode(node.start, {
            key: i,
            value: data.data
          })
        }
      }
      // this.log[id].output = data.data
    } else if (node.type=='assignment') {
      this.log[id].output = input
      this.log[data.id].output = input
    } else if (node.type=='graph') {
      const graphId = data.id
      const col = client.db("graph").collection("graph");
      const dbData = await col.findOne({
        _id: ObjectId(graphId)
      })
      const graph = getGraph(dbData.graph)
      const runtime = new Runtime(input, graph)
      let result = await runtime.run()
      input = result.output
      this.log[id].output = input
      this.log[id].childGraph = result.log
    //如果不属于任何类型算子
    } else if (node.type=='echo') {
      this.output = input
      return this.cb({
        output: this.output,
        log: this.log
      })
    }
    //不满足以上条件则继续向下执行
    if (node.sourceLinks.length==0) {
      return
    }
    let sourceLinks = node.sourceLinks
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
      let trueInput = this.log[id].output
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
  async run () {
    return new Promise((resolve) => {
      this.cb = ()=>{
        resolve({
          output: this.output,
          log: this.log
        })
      }
      this.runNode(this.graph.start, this.data)
    })
  }
}

module.exports = Runtime