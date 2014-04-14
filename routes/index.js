/*
 * GET index
 */
var file = require('./file')
//filename均写在file.js中	 

module.exports = function(app){
  	app.get('/',function(req, res){	 
  		var dataObj = file.readFile();
  		res.render('index', { title: 'index', readData: dataObj});
	});
	app.get('/index',function(req, res){	 
  		var dataObj = file.readFile();
  		res.render('index', { title: 'index', readData: dataObj});
	});
}