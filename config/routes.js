/**
 * Created by vic on 12/30/13.
 */
var controllers = require('../controllers');



module.exports = function (app) {
    var passport = app.get('passport');

    app.get('/', function (req, res) {
        res.render('index', { user : req.user });
    });

    app.get('/add', function(req, res){
        res.render('add', { user : req.user });
    });

    var entries = controllers.entries(app);
    app.post('/add', entries.create);

    app.get('/latest', entries.latest);

    app.get('/top', entries.top);

    app.get('/entry/:id', entries.single);

    app.get('/up/:id', entries.voteUpAction);

    app.get('/down/:id', entries.voteDownAction);

    app.get('/accept/:id', ensureAuthenticated, entries.acceptAction);

    app.get('/delete/:id', ensureAuthenticated, entries.deleteAction);

    app.get('/login', function (req, res) {
        res.render('login', { user: req.user, message: req.flash('error')});
    });

    app.post('/login',
        passport.authenticate('local', { successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true })
    );

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.get('/moderate', ensureAuthenticated, entries.moderate);

    app.get('/test', ensureAuthenticated, function(req, res) {
        res.render('test');
    });

    app.get('*', function(req, res){
        res.render('404');
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login');
    }
};