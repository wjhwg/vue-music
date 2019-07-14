const path = require('path')

var express = require('express')
var axios = require('axios')
var app = express()
var apiRoutes = express.Router()
app.use('/api', apiRoutes)

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    port: 8080,
    open: true,
    before(app){
      app.get('/api/getDiscList', function (req, res) {
        var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' // 原api
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          //console.log(e)
        })
      })
    }
  },
  chainWebpack: (config) => {
      config.resolve.alias
      .set('common',resolve('src/common'))
      .set('components',resolve('src/components'))
      .set('api',resolve('src/api'))
      .set('base',resolve('src/base'))
  }
}