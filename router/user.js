const router = require('koa-router')();
const request = require('../request/js.js');
const mysql = require('../mysql/sql.js');
const schedule = require('../schedule/js.js');
router.get('/mo/opentime', async (ctx, next) => {
		schedule.opentime('30 * * * * *')
		console.log(schedule)
    ctx.response.body = {
			code:200,
			data:{
				msg:schedule
			}
		};
});
router.get('/mo/close', async (ctx, next) => {
		schedule.close()
    ctx.response.body = {
			code:200,
			data:{
				msg:'关闭成功'
			}
		};
});
router.get('/user/data', async (ctx, next) => {
		let data = await mysql.query('SELECT * from user')
    ctx.response.body = {
			code:200,
			data:{
				data
			}
		};
});
//查看
router.post('/user', async (ctx, next) => {
		let res;
		var body = ctx.request.body;
		let data = await mysql.query('SELECT * from user WHERE id=?',[body.id],1)
		if(data != ''){
			res = '获取成功';
		}else{
			res = '获取失败!';
		}
    ctx.response.body = {
			code:200,
			res:res,
			data:{
				data
			}
		};
});
//注册
router.post('/user/register', async (ctx, next) => {
		let res;
		var body = ctx.request.body;
		if(body.number == '' || body.number == undefined){
			res = '账号不能为空';
		}else if(body.password == '' || body.password == undefined){
			res = '密码不能为空';
		}else{
			let data = await mysql.query('SELECT * from user WHERE number=?',[body.number]);
			console.log(data)
			if(data == '' || data ==undefined){
				var user = await mysql.Insertinto('INSERT INTO user(id,number,password) VALUES(0,?,?)',[body.number,body.password]);
				res = '注册成功';
			}else{
				res = '账号存在';
			}
		}
		ctx.response.body = {
			code:200,
			res:res,
			data:{
			}
		};
});
//登录
router.post('/user/logo', async (ctx, next) => {
		let res;
		var body = ctx.request.body;
		console.log(body.password)
		if(body.number == '' || body.number == undefined){
			res = '账号不能为空';
		}else if(body.password == '' || body.password == undefined){
			res = '密码不能为空';
		}else{
			let data = await mysql.query('SELECT * from user WHERE number=?',[body.number],1)
			if(data != '' || data !=undefined){
				if(body.password == data.password){
					res = '登录成功';
				}else{
					res = '密码错误,请重试!';
				}
			}else{
				res = '账号不存在!';
			}
		}	
    ctx.response.body = {
			code:200,
			res:res,
			data:{
				
			}
		};
});
router.post('/add', async (ctx, next) => {	
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
router.get('/user/get', async (ctx, next) => {
    ctx.response.body = {
			code:200,
			data:{
				
			}
		};
});
router.post('/delete', async (ctx, next) => {
		var body = ctx.request.body;
		let data = await mysql.query('DELETE * from user WHERE id=?',[body.id])
    ctx.response.body = {
			code:200,
			data:{
				data
			}
		};
});
module.exports = router
// module.exports = {
// 	router
// }

