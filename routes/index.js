var express = require('express');
var router = express.Router();
var getGraph = require('../utils/getGraph');
var createGraphIndex = require('../utils/graphIndex')
const runtime = require('../runtime')

/* GET home page. */
router.get('/', function(req, res, next) {
  var input = req.query
  var graph = getGraph();
  var json = createGraphIndex(graph)
  const output = runtime(input, json)
  res.render('index', {
    title: 'GL-Server',
    graph: JSON.stringify(json, null, 2),
    input: JSON.stringify(input, null, 2),
    output: JSON.stringify(output, null, 2)
  });
});

module.exports = router;
