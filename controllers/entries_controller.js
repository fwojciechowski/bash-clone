/**
 * Created by vic on 1/1/14.
 */


module.exports = function(app) {

    var Entry = app.get('models').Entry;

    return {
        create : function(req, res) {
            console.log(req.body[0].value);
            res.send({});
            res.end();
            Entry.create({
                content : req.body[0].value,
                likes : 0,
                accepted : false
            })
        },
        latest : function(req, res) {
            Entry.findAll({where: {accepted : false}, order: 'createdAt DESC'}).success(function (entries) {
                res.render('quote', {
                    entries : entries
                });
            });
        },
        top : function(req, res) {
            Entry.findAll({where: {accepted : false}, order: 'likes DESC'}).success(function (entries) {
                res.render('quote', {
                    entries : entries
                });
            });
        },
        single : function(req, res) {
            var id = req.params.id;
            Entry.find({where: {id : id}}).success(function (entry){
                res.render('quote', {
                    entries : [entry]
                });
            });

        },
        voteUpAction : function(req, res) {
            var id = req.params.id;
            Entry.find({where: {id : id}}).success(function (entry){
                res.send({
                    likes : entry.voteUp()
                });
                res.end();
            });
        },
        voteDownAction : function(req, res) {
            var id = req.params.id;
            Entry.find({where: {id : id}}).success(function (entry){
                res.send({
                    likes : entry.voteDown()
                });
                res.end();
            });
        }

    }

}