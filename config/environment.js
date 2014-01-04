/**
 * Created by vic on 12/30/13.
 */
var express = require('express');
var settings = require('./settings');
var moment = require('moment');

module.exports = function (app) {
    // VIEWS
    app.engine('.html', require('ejs').__express);
    app.set('views', settings.path + '/views');
    app.set('view engine', 'html');

    app.use(express.compress());
    app.use(express.static(settings.path + '/public'));
    app.use(express.logger({ format: 'dev' }));
//app.use(express.bodyParser());   // ! NIEZALECANE
//app.use(express.urlencoded());
    app.use(express.json());

    app.set('models', require(settings.path + '/models'));

    app.locals({
        dateModifier : function(date) {
            return moment(date).fromNow();
        }
    });
};