'use strict'


var wechatAPI = require('wechat-api')
var fs = require('fs')
var path = require('path')
var config = require('../config/config')

var TokenFilePath = './config/access_token.txt'
exports.getToken = function (req, res) {
  //getToken
  var getToken = function (callback) {
    if (!fs.existsSync(TokenFilePath)) {
      console.log('File no exists in  ' + TokenFilePath)
      callback(null, null)
    }
    else {
      fs.readFile(TokenFilePath, 'utf8', function (err, txt) {
        if (err) { return callback(err) }
        callback(null, JSON.parse(txt))
      })
    }
  };
  //saceToken
  function saveToken(token, callback) {
    fs.writeFile(path.join(__dirname, TokenFilePath), JSON.stringify(token), callback)
  }


  var api = new wechatAPI(config.auth.appID, config.auth.appsercit,getToken,saveToken)
  api.getLatestToken(function (err, token) {
    if (err) console.log(err)
    else {
      console.log(token.accessToken)
    }
  });
  api.setOpts({ timeout: 20000 });
  api.registerTicketHandle(getTicketToken, saveTicketToken)
  // getTicketToken
  var getTicketToken = function (type, callback) {
    settingModel.getItem(type, { key: 'weixin_ticketToken' }, function (err, setting) {
      if (err) return callback(err);
      callback(null, setting.value)
    })
  };
  // saveTicketToken
  var saveTicketToken = function (type, _ticketToken, callback) {
    settingModel.setItem(type, { key: 'weixin_ticketToken', value: ticketToken }, function (err) {
      if (err) return callback(err);
      callback(null)
    })
  };
};


