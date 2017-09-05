'use strict'
//微信接口校验
var Koa = require('koa');
var wechat = require('./wechat/g');
var config = {
	wechat:{
		appID:'wx67c7cbad8ef6dd3d',
		appSecret:'bac7ddbefe3bd4e006f6d0ab176cf746',
		token:'sicheng0620'
	}
}
var app = new Koa ();

app.use(wechat(config.wechat));


app.listen(80);
console.log('listenining:80')