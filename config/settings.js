var path = require('path');

var settings = {
    path : path.normalize(path.join(__dirname, '..')), // root path
    port : 3000,
    database : {
        database: "database",
        dialect : "sqlite",
        storage : "test.db",
        user: null,
        pass: null
    }
};

module.exports = settings;