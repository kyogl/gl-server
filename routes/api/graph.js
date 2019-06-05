const express = require('express');
const router = express.Router()
const _ = require('lodash')

const client = require('../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId

const getGraph = require('../../utils/getGraph');
const Runtime = require('../../runtime')

router.get('/test/:id', async function(req, res, next) {
  let id = req.params.id
  const col = client.db("graph").collection("graph");
  const dbData = await col.findOne({
    _id: ObjectId(id)
  })
  const json = getGraph(dbData.graph)
  const runtime = new Runtime(req.query.input, json)
  const data = await runtime.run()
  return res.json(data)
})

router.post('/test', async function(req, res, next) {
  if (!req.body.input || !req.body.graph) {
    return res.json({
      success: false,
      message: '数据缺失'
    })
  }
  let input
  let graphData
  try {
    input = JSON.parse(req.body.input)
  } catch (e) {
    input = req.body.input
  }
  try {
    graphData = JSON.parse(req.body.graph)
  } catch (e) {
    return res.json({
      success: false,
      message: '数据格式有误'
    })
  }
  const json = getGraph(graphData);
  const runtime = new Runtime(input, json)
  const data = await runtime.run()
  return res.json(data)
})

router.post('/add', (req, res, next)=>{
  if (!req.body.title || !_.isObject(req.body.graph)) {
    return res.json({
      success: false,
      message: '数据格式有有误'
    })
  }
  if (!_.isArray(req.body.graph.nodes) || !_.isArray(req.body.graph.links)) {
    return res.json({
      success: false,
      message: '数据格式有有误'
    })
  }
  const col = client.db("graph").collection("graph")
  col.insertOne({
    title: req.body.title,
    graph: getGraph(req.body.graph),
    ui: req.body.ui
  })
  res.json({
    success: true
  })
})

router.get('/list', (req, res, next)=>{
  const col = client.db("graph").collection("graph");
  col.find({}).toArray(function(err, result) {
    if (err) {
      return res.json({
        success: false,
        message: err
      })
    }
    res.json({
      success: true,
      message: '',
      data: result
    })
  })
})

router.get('/get/:id', (req, res, next)=>{
  const col = client.db("graph").collection("graph");
  col.findOne({
    _id: ObjectId(req.params.id)
  }, function(err, result) {
    if (err) {
      return res.json({
        success: false,
        message: err
      })
    }
    if (!_.isObject(result)) {
      return res.json({
        success: false,
        message: '图数据不存在'
      })
    }
    res.json({
      success: true,
      message: '',
      data: result
    })
  })
})

router.post('/update/:id', (req, res, next)=>{
  const col = client.db("graph").collection("graph");
  col.findOne({
    _id: ObjectId(req.params.id)
  }, function(err, result) {
    if (err) {
      return res.json({
        success: false,
        message: err
      })
    }
    if (!_.isObject(result)) {
      return res.json({
        success: false,
        message: '图数据不存在'
      })
    }
    col.update({
      _id: ObjectId(req.params.id)
    }, {
      $set:{
        title: req.body.title,
        graph: getGraph(req.body.graph),
        ui: req.body.ui
      }
    }, function(err) {
      if (err) {
        return res.json({
          success: false,
          message: err
        })
      }
      res.json({
        success: true,
        message: '更新图数据成功'
      })
    })
  })
})

router.post('/delete/:id', (req, res, next)=>{
  const col = client.db("graph").collection("graph");
  col.findOne({
    _id: ObjectId(req.params.id)
  }, function(err, result) {
    if (err) {
      return res.json({
        success: false,
        message: err
      })
    }
    if (!_.isObject(result)) {
      return res.json({
        success: false,
        message: '图数据不存在'
      })
    }
    col.remove({
      _id: ObjectId(req.params.id)
    }, function(err) {
      if (err) {
        return res.json({
          success: false,
          message: err
        })
      }
      res.json({
        success: true,
        message: '删除图数据成功'
      })
    })
  })
})

module.exports = router;
