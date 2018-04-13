'use strict';

var YNode = require('ynode');
var Controller = YNode.Y.include('y/web/Controller');

class IndexController extends Controller {
    run(req, res) {
        this.getView().getTemplate('index', (err, str) => {            
            res.end(str);
        });
    }
}

module.exports = IndexController;
