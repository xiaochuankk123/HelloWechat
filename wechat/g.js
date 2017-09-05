var sha1 = require('sha1');
//封装成为中间件
module.exports = function(opt){
	return function *(next){
		console.log(this.query)
		var token = opt.token
		var signature = this.query.signature
		var nonce = this.query.nonce
		var timestamp = this.query.timestamp
		var echostr = this.query.echostr
		var str = [token, timestamp, nonce].sort().join('')
		var sha = sha1(str)

		if( sha === signature ){
			this.body = echostr + ''
		}else{
			this.body = 'wrong'
		}
	}
}