const router = require('koa-router')();
const request = require('../request/js.js');
const mysql = require('../mysql/sql.js');
router.get('/home/index', async (ctx, next) => {
		let data = await mysql.query('SELECT * from user')
    ctx.response.body = {
			code:200,
			data:{
				data
			}
		};
});
router.post('/home/select', async (ctx, next) => {
		var body = ctx.request.body;
		console.log(body)
		let data = await mysql.query('SELECT * from user WHERE id=?',[body.id])
    ctx.response.body = {
			code:200,
			data:{
				data
			}
		};
});
router.post('/home/add', async (ctx, next) => {	
    var data = ctx.request.body;
		var arr = [];
		arr.push(data.type);
		arr.push(data.content)
		arr.push(data.state)
		var res = await mysql.Insertinto('INSERT INTO user(id,type,content,state) VALUES(0,?,?,?)',arr)
		let userdata = await mysql.query('SELECT * from user')
    ctx.response.body = {
			code:200,
			data:{
				userdata
			}
		};
});
router.post('/home/delete', async (ctx, next) => {
		var body = ctx.request.body;
		let data = await mysql.query('DELETE * from user WHERE id=?',[body.id])
    ctx.response.body = {
			code:200,
			data:{
				data
			}
		};
});

router.post('/home/we', async (ctx, next) => {
		var body = ctx.request.body;
		var o = {
			url:body.url,method:'post',data:{id:body.id}
		}
		var data = await request.ax(o)
		var w = JSON.parse(data.body)
		console.log(w)
		ctx.response.body = {
			code:200,
			w
		};
});
module.exports = router


