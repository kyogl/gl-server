var express = require('express');
var router = express.Router();
var json = require('./json');

/* GET home page. */
router.get('/', function(req, res, next) {
  var input = req.query
  var output = []
  res.render('index', {
    title: 'GL-Server',
    graph: JSON.stringify(json, null, 2),
    input: JSON.stringify(input, null, 2),
    output: JSON.stringify(output, null, 2)
  });
});

module.exports = router;
