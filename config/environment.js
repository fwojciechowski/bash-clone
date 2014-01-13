/**
 * Created by vic on 12/30/13.
 */
var express = require('express');
var settings = require('./settings');
var moment = require('moment');
var passport = require('passport');
var auth = require('./auth');
var flash = require('connect-flash');

module.exports = function (app) {
    // VIEWS
    app.engine('ejs', require('ejs').__express);
    app.set('views', settings.path + '/views');
    app.set('view engine', 'ejs');

    app.use(express.compress());
    app.use(express.static(settings.path + '/public'));
    app.use(express.logger({ format: 'dev' }));
    //app.use(express.methodOverride());
//app.use(express.bodyParser());   // ! NIEZALECANE
    app.use(express.urlencoded());
    app.use(express.json());

    app.use(express.cookieParser());
    app.use(express.session({ secret: 'the truth is out there' }));

    app.set('passport', passport);
    app.use(flash());
    auth(passport);
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.set('models', require(settings.path + '/models'));

    app.locals({
        dateModifier : function(date) {
            return moment(date).fromNow();
        },
        paginatePages : require('../pagination')
    });
};