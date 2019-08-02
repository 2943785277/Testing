
const router = require('koa-router')();
const home = require('./home.js');
const user = require('./user.js');
router.use(home.routes());
router.use(user.routes());
module.exports = router
