
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var index = require('./routes/index');
var update = require('./routes/update');
var rand = require('./routes/rand');
var http = require('http');
var path = require('path');
var ejs = require('ejs');

var app = express();

// all environments
app.set('port', process.env.PORT || 2000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('.html', ejs.__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
index(app);
update(app);
rand(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
