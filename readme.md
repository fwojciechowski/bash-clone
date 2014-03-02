bash-clone
==========

**bash-clone** is the clone (doh!) of the http://www.bash.org.pl site.

Summary
-------

- backend: [node.js](http://nodejs.org/) with [express](http://expressjs.com/) framework
- database: SQLite with ORM [Sequelize](http://sequelizejs.com/)
- authentication: [passport](http://passportjs.org/)
- date formatting: [Moment.js](http://momentjs.com/)
- templates: [EJS](http://embeddedjs.com/)

Installation
------------

You'll need to have node.js installed.

Download or clone this repository and change directory into it.

    $ npm install

You can run the server by

    $ node server.js

Usage
-----

### Database

Currently database is set to SQLite. It can be changed in `./config/settings.js` to other SQL databases provided that
it is supported by [Sequelize](http://sequelizejs.com/) library. Also corresponding node module for that database
is required. Sample SQLite database is present.

### Pagination

Pagination settings can be changed in `./config/settings.js`.

### Authentication

Login and password for moderating are currently hard-coded in `./config/settings.js`.