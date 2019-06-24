const path = require('path')
//const crawler = require('./crawler')
//let request = require('request');
let fs = require('fs');
var htmlhead = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title></head><style type="text/css">div{color: #1AAD16;font-size: 55px;}</style><body><div id="app">';
var htmlcontent = '{{ message }}'
var htmlfoot = '</div></body></html><script src="https://cdn.jsdelivr.net/npm/vue"></script><script type="text/javascript">	var app = new Vue({el:"#app",data: {message:"Hello!"}})</script>'
htmlcontent +='<h2>6666</h2>'
var html = htmlhead + htmlcontent + htmlfoot;
function fse(){
	fs.writeFile('input.html',html, function (err) {
		if (err) console.error(err);
	});
}
function a(o){
	console.log(o)
}

module.exports = {
	fse,a
}