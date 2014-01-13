/**
 * Created by vic on 1/1/14.
 */
var settings = require('../config/settings');

module.exports = function (app) {

    var Entry = app.get('models').Entry;

    var paginator = function(req, res, order) {
        var page = parseInt(req.params.page);
        var limit = settings.pagination.numberOfElementsOnPage;
        Entry.findAndCountAll({
            where: {accepted: true},
            order: order,
            offset: (page - 1) * limit,
            limit: limit
        }).success(function (result){
                res.render('quote', {
                    user: req.user,
                    entries: result.rows,
                    totalEntries: result.count,
                    limit: limit,
                    currentPage: page,
                    urlType: req.url.replace(/[0-9]+/, ''),
                    paginate: true
                });
            });
    };

    return {
        createEntry: function (req, res) {
            res.send({});
            Entry.create({
                content: req.body[0].value,
                likes: 0,
                accepted: false
            });
        },
        latest: function(req, res) {
            paginator(req, res, 'createdAt DESC');
        },
        top: function (req, res) {
            paginator(req, res, 'likes DESC');
        },
        single: function (req, res) {
            var id = req.params.id;
            Entry.find({where: {id: id}}).success(function (entry) {
                if (entry.accepted || req.user) {
                    res.render('quote', {
                        user: req.user,
                        entries: [entry],
                        paginate: false
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
                    entries: entries,
                    paginate: false
                });
            });
        },
        voteUpAction: function (req, res) {
            var id = req.params.id;
            Entry.find({where: {id: id}}).success(function (entry) {
                res.cookie(id, null);
                res.send({
                    likes: entry.voteUp()
                });
            });
        },
        voteDownAction: function (req, res) {
            var id = req.params.id;
            Entry.find({where: {id: id}}).success(function (entry) {
                res.cookie(id, null);
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