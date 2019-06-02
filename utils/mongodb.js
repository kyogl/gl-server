const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://admin:adminkyo@47.110.132.29:27017'

const client = new MongoClient(url, {
  useNewUrlParser: true
})
client.connect()

module.exports = client