const schedule = require('node-schedule');			//定时任务
let time;
module.exports = {
	opentime(o){
	  //每分钟的第30秒定时执行一次:
	    time = schedule.scheduleJob(o,()=>{
	        console.log('执行-----scheduleCronstyle:' + new Date());
	    }); 
	},
	close(){
		console.log(time)
		//time.cancl()
	}
}
//scheduleCronstyle('30 * * * * *');