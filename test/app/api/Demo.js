'use strict';

var YNode = require('YNode');

class Demo extends YNode.WebController {
    
    index(req, res) {
        res.end('restful class ok');
    }
    
}

module.exports = Demo;
