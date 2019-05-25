const _ =  require('lodash')

class Runtime {
  constructor(data, graph) {
    this.data = data
    this.graph = graph
  }
  runNode (start) {
    
  }
  run () {
    return this.runNode(this.graph.start)
  }
}

module.exports = Runtime