'use strict'
var Promise = require('bluebird');
var request = Promise.promisify(require('request'))


var prefix = 'https://api.weixin.qq.com'
var api = {
	access_token:prefix+'/cgi-bin/token?grant_type=client_credential'
}


function Wechat(opts){
	var that = this 
	this.appID = opts.appID
	this.appSecret = opts.appSecret
	this.getAccessToken = opts.getAccessToken
	this.saveAccessToken = opts.saveAccessToken

	this.getAccessToken()
		.then(function(data){
			try{
				data = JSON.parse(data)
			}catch(e){
				return that.updateAccessToken(data)
			}

			if(that.isValidAccessToken(data)){//检查合法性
				Promise.resolve(data)
			}else{
				return that.updateAccessToken()
			}
			
		})
		.then(function(data){
			that.access_token = data.access_token//token
			that.expires_in =data.expires_in//过期时间
			that.saveAccessToken(data)
		})
}
Wechat.prototype.isValidAccessToken =function(data){
	if(!data || !data.access_token || !data.expires_in){
		return false
	}
	var access_token = data.access_token
	var expires_in = data.expires_in
	var now = (new Date().getTime())
	if(now < expires_in){
		return true
	}else{
		return false
	}
}

Wechat.prototype.updateAccessToken =function(){
	var appID = this.appID
	var appSecret = this.appSecret
	var url = api.access_token +'&appid=' +appID + '&secret='+ appSecret
	return  new Promise(function(resolve,reject){
		request({
			url:url,
			json:true
		}).then(function(response){
			//console.log(response.body)
			var data = response.body
			var now = (new Date().getTime())
			var expires_in = now + ( data.expires_in - 20) * 1000//考虑到网络延迟

			data.expires_in = expires_in

			resolve(data)

		})
	})
	
}

module.exports = Wechat