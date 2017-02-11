'use strict';

var YNode = require('YNode');

class IndexController extends YNode.WebController {
    
    run(req, res) {
        res.end('mvc ok');
    }
    
}

module.exports = IndexController;
