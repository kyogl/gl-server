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
  runNext (node, input) {
    let id = node.id
    if (node.type=='echo') {
      this.log[id].output = input
      return this.output = input
    }
    if (node.store=='op') {
      const op = opStore[node.type]
      input = op(node.data)
      this.log[id].output = input
    }
    if (node.sourceLinks.length==0) {
      return
    }
    _.forEach(node.sourceLinks, linkId=>{
      let link = this.getLink(linkId)
      if (link.inputKey) {
        input = input[link.inputKey]
      }
      let trueInput = _.cloneDeep(input)
      if (link.outputKey) {
        trueInput = {}
        trueInput[link.outputKey] = input
      }
      this.runNode(link.target, trueInput)
    })
  }
  runNode (id, input) {
    if (!_.isObject(this.log[id])) {
      this.log[id] = {}
    }
    this.log[id].input = _.merge(this.log[id].input, input)
    let node = this.getNode(id)
    if (!this.tryRun[id]) {
      this.tryRun[id] = _.after(node.targetLinks.length, ()=>{
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