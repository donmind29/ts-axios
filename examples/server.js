// 服务端配置
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(comppiler, {
  publicPath: '/__build__/',
  stats:{
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const router = express.Router()
router.get('/simple/get', function(req, res){
  res.json({
    msg: 'congratulation!!!'
  })
})

app.use(router)

const port = process.env.port || 8888
module.exports = app.listen(port, () => {
  console.log(`Server is now listening on http://localhost:${port}, Ctrl+C to stop`)
})
