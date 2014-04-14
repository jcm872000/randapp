var fs = require('fs');  
var xlsx = require('node-xlsx');
var filename = 'rand.xlsx';
module.exports = {
	readFile : function(){
    	// read the last 
		var obj = xlsx.parse(filename);
		var obj_length = obj.worksheets.length;
		var dataObj = obj.worksheets[obj_length-1].data;
		return dataObj;
    },
    saveFile : function(data){
    	// read the last 
		var obj = xlsx.parse(filename);
		var obj_length = obj.worksheets.length;
		replaceNum(obj.worksheets[obj_length-1].data,data);
		var buffer = xlsx.build(obj);
		fs.writeFileSync(filename, buffer, "binary");
    },
    addFile : function(data){
    	// read the last 
		var obj = xlsx.parse(filename);
		var obj_length = obj.worksheets.length;
		//复制最后一页 
		var worksheets = clone(obj.worksheets[obj_length-1]);
		replaceNum(worksheets.data,data);
		worksheets.name = new Date().getTime() +' '; //当前时间戳
		obj.worksheets.push(worksheets); //添加新的一页 
		var buffer = xlsx.build(obj);
		fs.writeFileSync(filename, buffer, "binary");

    }
}
var replaceNum = function(_current,_data){
	for(var i=0;i<_data.length;i++){
		for(var j=1;j<_data[i].length;j++){
			 var tmp = parseFloat(_data[i][j].value);
			 _current[i][j] = tmp;
		}
	}
}
var clone = function(_originObj){
	if(_originObj==null)return null;
	if(typeof _originObj !== "object"){
        return _originObj;
    }
    var _clone = {};
  
    if(_originObj.constructor == Array){
        _clone = [];
    }
  
    for(var i in _originObj){  
        _clone[i] = arguments.callee(_originObj[i]);
    }
    return _clone; 
}
