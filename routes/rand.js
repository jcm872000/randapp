/*
 * GET rand
 */
var file = require('./file');
module.exports = function(app){
  	app.get('/rand',function(req, res){
  	    //filename均写在file.js中	 
  		var dataObj = file.readFile();
  		var result = rand(dataObj);
  		res.render('rand', { title: 'rand', result:result.resultObj, readData: dataObj,answer:result.answerObj });
	});
	app.post('/rand/save',  function(req,res){
		var sumbitData = req.body.submitData;
		// 保存为新的一页
		file.addFile(sumbitData);
		res.redirect('/index');
	});
}
var rand = function(dataObj){
	var resultObj = new Array();
	var ary = new Array(dataObj.length);
	// rand
	for(var i=0;i<dataObj.length;i++){
		var rand=Math.floor((Math.random()*100+1));
		var num = dataObj[i][1].value*dataObj[i][2].value*rand;
		ary[i] = num;
		var node = {
			name : dataObj[i][0].value,
			value : num
		}
		resultObj.push(node);
		console.log(dataObj[i][0].value+" : "+num);
	}
	//max
	var max=0;
	var tmp=ary[0];
	for (var j=0;j<ary.length;j++){
		if(ary[j]>tmp){
			max=j;
			tmp=ary[j];
		}
	}
	var answerObj = dataObj[max][0].value;
	var result = {
		resultObj:resultObj,
		answerObj:answerObj

	};
	console.log("恭喜 "+dataObj[max][0].value);
	for(var k = 0;k < dataObj.length;k++){
		if(dataObj[k][1].value < 1){
			dataObj[k][1].value += 0.25;
		}
		if(dataObj[k][2].value >1){
			dataObj[k][2].value /= 2;
		}
	}
	dataObj[max][1].value = 0;
	dataObj[max][2].value = 1;
	return result;
}