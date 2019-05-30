const express = require('express');
const router = express.Router();
const getGraph = require('../utils/getGraph');
const createGraphIndex = require('../utils/graphIndex')
const Runtime = require('../runtime')

/* GET home page. */
router.all('/', function(req, res, next) {
  let input
  let qinput = 1
  if (req.body.input) {
    qinput = req.body.input
  } else if (req.query.input) {
    qinput = req.query.input
  }
  try {
    input = JSON.parse(qinput)
  } catch (e) {
    input = qinput
  }
  console.log(input)
  let graphData = ''
  if (req.body.graph) {
    graphData = JSON.parse(req.body.graph)
  }
  const graph = getGraph(graphData);
  const json = createGraphIndex(graph)
  const runtime = new Runtime(input, json)
  const output = runtime.run()
  res.render('index', {
    title: 'GL-Server',
    graph: JSON.stringify(graph, null, 2),
    input: JSON.stringify(input, null, 2),
    output: JSON.stringify(output.output, null, 2),
    log: JSON.stringify(output.log, null, 2)
  });
});

module.exports = router;
