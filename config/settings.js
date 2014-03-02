var path = require('path');

var settings = {
    path  : path.normalize(path.join(__dirname, '..')), // root path
    port  : 3000,
    //hard-coded for simplicity
    users : [{
        id      : 1,
        username: 'admin',
        password: 'admin',
        email   : 'admin@example.com'
    }],
    database : {
        database    : "database",
        dialect     : "sqlite",
        storage     : "sample.db",
        user        : null,
        pass        : null,
        logging     : false
    },
    pagination : {
        numberOfElementsOnPage  : 5,
        numberOfPrevPages       : 2,
        numberOfNextPages       : 2,
        numberOfFirstPages      : 2,
        numberOfLastPages       : 2
    }
};

module.exports = settings;