const request = require('request');
module.exports = {
	ax(o){
		console.log('-------------')
		console.log(JSON.stringify(o.data))
		console.log('-------------')
		return new Promise((resolve, reject) => {
			request({
				url: o.url,//请求路径
				method: o.method,//请求方式，默认为get
				headers: {//设置请求头
						"content-type": "application/json",
				},
				body: JSON.stringify(o.data)//post参数字符串
			}, function(error, response, body) {
				resolve(response)
					// if (!error && response.statusCode == 200) {
					// 	resolve(results)
					// }
			});
		})
	}
}
// request('http://www.baidu.com', function (error, response, body) {
// 		console.log(body)
// })