/*
 * GET update
 */
var file = require('./file');
module.exports = function(app){
  	app.get('/update',function(req, res){
  	    //filename均写在file.js中	 
  		var dataObj = file.readFile();
  		res.render('update', { title: 'update', readData: dataObj });
	});
	app.post('/update/save',  function(req,res){
		var sumbitData = req.body.submitData;
		// 保存会自动替换掉最后一页
		file.saveFile(sumbitData);
		res.redirect('/update');
	});
}