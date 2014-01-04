var express     = require('express');
var settings    = require('./config/settings');
var environment = require('./config/environment');
var routes      = require('./config/routes');

var app = express();
environment(app);
routes(app);


app.listen(settings.port);
console.log("Listening on port %s.", settings.port);
//console.log("serverjs: " + app.get('temp'));