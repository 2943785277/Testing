var mysql = require('mysql');
var config = require('../config/config.js')

var pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE
});
class Mysql {
    constructor (p) {
    }
		/*
			sql 语句            
			数据             
			类型 0(空)  返回数据不做处理    1默认第一条数据
		*/
    query (sql,data,i) {
      return new Promise((resolve, reject) => {
        pool.query(sql,data,function (error, results, fields) {
            if (error) {
                console.log(error)
            };
						if(i == 1){
							resolve(results[0])
						}else{
							resolve(results)
						}
            
        });
      })
    }
		Insertinto(sql,data){
			return new Promise((resolve, reject) => {
				console.log(sql)
				console.log('-----------------')
				console.log(data)
			  pool.query(sql,data, function (error, results, fields) {
			      if (error) {
			          console.log(error)
			      };
			      resolve(results)
			  });
			})
		}
}

module.exports = new Mysql()