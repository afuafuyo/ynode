'use strict';

var YNode = require('YNode');
var Controller = YNode.Y.include('y/web/Controller');

class IndexController extends Controller {
    
    run(req, res) {
        res.end('mvc ok');
    }
    
}

module.exports = IndexController;
