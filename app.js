'use strict'
//微信接口校验
var Koa = require('koa');
var path = require('path');
var wechat = require('./wechat/g');
var util = require('./libs/util');
var wechat_file = path.join(__dirname,'./config/wechat.txt')
var config = {
	wechat:{
		appID:'wx67c7cbad8ef6dd3d',
		appSecret:'bac7ddbefe3bd4e006f6d0ab176cf746',
		token:'sicheng0620',
		getAccessToken : function(){
			return util.readFileAsync(wechat_file)
		},
		saveAccessToken : function(data){
			data = JSON.stringify(data)
			return util.writeFileAsync(wechat_file,data)
		}
	}
}
var app = new Koa ();

app.use(wechat(config.wechat));


app.listen(80);
console.log('listenining:80')