'use strict';

var YNode = require('ynode');

class IndexController extends YNode.WebController {
    
    run(req, res) {
        this.getTemplate('index', (err, str) => {
            res.end(str);
        });
    }
    
}

module.exports = IndexController;
