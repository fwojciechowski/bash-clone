var Sequelize = require('sequelize');
var settings = require('../config/settings');
var dbSettings = settings.database;


var sequelize = new Sequelize(
    dbSettings.database,
    dbSettings.user,
    dbSettings.pass,
    {
        dialect : dbSettings.dialect,
        storage : dbSettings.storage,
        logging : dbSettings.logging
    }
);

var models = [
    'Entry'
];

models.forEach(function (model) {
    module.exports[model] = sequelize.import(settings.path + '/models/' + model);

    module.exports[model].sync().success(function(){
        console.log("Model " + model + " sync successfully.");
    }).error(function(error){
            console.log("Model " + model + " sync failure: " + error);
        });

});

//export connection
module.exports.sequelize = sequelize;