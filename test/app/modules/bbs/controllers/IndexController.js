'use strict';

var YNode = require('YNode');

class IndexController {
    run(req, res) {
        res.end('module ok');
    }
}

module.exports = IndexController;