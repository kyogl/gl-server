const express = require('express');
const router = express.Router()
const _ = require('lodash')

const client = require('../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId

router.get('/add', (req, res, next)=>{
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
    graph: req.body.graph
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
        graph: req.body.graph
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
