const Koa = require('koa');
const f = require('./fs.js');
const logger = require('koa-logger')				//日志中间件
const router= require('./router/index.js');		//路由文件
//获取参数
var bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
		//console.log(ctx.params.name)
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(logger())
//f.a('6666')
app.use(router.routes());
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');