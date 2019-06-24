const Koa = require('koa');
const mysql = require('./mysql/sql.js');
const f = require('./fs.js');
const router = require('koa-router')();
var bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
		//console.log(ctx.params.name)
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
router.get('/', async (ctx, next) => {
    ctx.response.body = {
			code:100,
			data:{
				name:ctx
			}
		};
});
router.get('/get', async (ctx, next) => {
		let data = await mysql.query('SELECT * from user')
    ctx.response.body = {
			code:200,
			data:{
				data
			}
		};
});
router.post('/select', async (ctx, next) => {
		var body = ctx.request.body;
		let data = await mysql.query('SELECT * from user WHERE id=?',[body.id])
    ctx.response.body = {
			code:200,
			data:{
				data
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
f.a('6666')
app.use(router.routes());
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');