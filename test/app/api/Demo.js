'use strict';

var YNode = require('../../../index');
var Controller = YNode.Y.include('y/web/Controller');

class Demo extends Controller {
    
    index(req, res) {
        res.end('restful class ok');
    }
    
}

module.exports = Demo;
