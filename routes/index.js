const express = require('express');
const router = express.Router();
const getGraph = require('../utils/getGraph');
const createGraphIndex = require('../utils/graphIndex')
const Runtime = require('../runtime')

/* GET home page. */
router.get('/', function(req, res, next) {
  const input = req.query
  const graph = getGraph();
  const json = createGraphIndex(graph)
  const runtime = new Runtime(input, json)
  const output = runtime.run()
  res.render('index', {
    title: 'GL-Server',
    graph: JSON.stringify(json, null, 2),
    input: JSON.stringify(input, null, 2),
    output: JSON.stringify(output.output, null, 2),
    log: JSON.stringify(output.log, null, 2)
  });
});

module.exports = router;
