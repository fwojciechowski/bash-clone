var controllers = require('../controllers');

module.exports = function (app) {
    var passport = app.get('passport');

    app.get('/', function (req, res) {
        //res.render('index', { user : req.user });
        res.redirect('/latest/1');
    });

    app.get('/add', function(req, res){
        res.render('add', { user : req.user });
    });

    var entries = controllers.entries(app);
    app.post('/add', entries.createEntry);

    app.get('/latest', function(req, res){
        res.redirect('/latest/1');
    });

    app.get('/latest/:page', ensureParamIsANumber, entries.latest);

    app.get('/top', function(req, res){
        res.redirect('/top/1');
    });

    app.get('/top/:page', entries.top);

    app.get('/entry/:id', entries.single);

    app.get('/up/:id', hasAlreadyVoted, entries.voteUpAction);

    app.get('/down/:id', hasAlreadyVoted, entries.voteDownAction);

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

    app.get('*', function(req, res){
        res.render('404', {user: req.user});
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login');
    }

    function hasAlreadyVoted(req, res, next) {
        if (req.cookies[req.params.id]) {
            res.send({alreadyVoted: true});
        } else {
            return next();
        }
    }

    function ensureParamIsANumber(req, res, next) {
        var param = req.params[0];
        //console.log(req.params);
        if (/^[0-9]/.test(param)) {
            res.redirect(req.path);
            //console.log(req.path);
        } else {
            next();
        }
    }
};