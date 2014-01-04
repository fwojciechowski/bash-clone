/**
 * Created by vic on 12/30/13.
 */
var controllers = require('../controllers');


module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/add', function(req, res){
        res.render('add');
    });

    var entries = controllers.entries(app);
    app.post('/add', entries.create);

    app.get('/latest', entries.latest);

    app.get('/top', entries.top);

    app.get('/entry/:id', entries.single);

    app.get('/up/:id', entries.voteUpAction);

    app.get('/down/:id', entries.voteDownAction);

    app.get('/login', function (req, res) {
        res.render('login');
    });

    //app.get('/temp', entries.list);

    app.get('*', function(req, res){
        res.render('404');
    });
};