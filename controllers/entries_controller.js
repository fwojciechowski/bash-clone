/**
 * Created by vic on 1/1/14.
 */


module.exports = function (app) {

    var Entry = app.get('models').Entry;

    return {
        create: function (req, res) {
            res.send({});
            Entry.create({
                content: req.body[0].value,
                likes: 0,
                accepted: false
            });
        },
        latest: function (req, res) {
            Entry.findAll({where: {accepted: true}, order: 'createdAt DESC'}).success(function (entries) {
                res.render('quote', {
                    user: req.user,
                    entries: entries
                });
            });
        },
        top: function (req, res) {
            Entry.findAll({where: {accepted: true}, order: 'likes DESC'}).success(function (entries) {
                res.render('quote', {
                    user: req.user,
                    entries: entries
                });
            });
        },
        single: function (req, res) {
            var id = req.params.id;
            Entry.find({where: {id: id}}).success(function (entry) {
                if (entry.accepted || req.user) {
                    res.render('quote', {
                        user: req.user,
                        entries: [entry]
                    });
                } else {
                    res.redirect('/');
                }

            });

        },
        moderate: function (req, res) {
            Entry.findAll({where: {accepted: false}}).success(function (entries) {
                res.render('quote', {
                    user: req.user,
                    entries: entries
                });
            });
        },
        voteUpAction: function (req, res) {
            var id = req.params.id;
            Entry.find({where: {id: id}}).success(function (entry) {
                res.send({
                    likes: entry.voteUp()
                });
            });
        },
        voteDownAction: function (req, res) {
            var id = req.params.id;
            Entry.find({where: {id: id}}).success(function (entry) {
                res.send({
                    likes: entry.voteDown()
                });
            });
        },
        acceptAction: function (req, res) {
            var id = req.params.id;
            Entry.find({where: {id: id}}).success(function (entry) {
                res.send({
                    entryStatus: entry.accept()
                });
            });
        },
        deleteAction: function (req, res) {
            var id = req.params.id;
            Entry.find({where: {id: id}}).success(function (entry) {
                entry.destroy().success(function() {
                    res.send({
                        entryStatus : "deleted"
                    });
                });
            });
        }

    }

};