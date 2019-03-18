'use strict';

var YNode = require('../../../../index');
var Request = YNode.Y.include('y/web/Request');

class IndexController {
    
    run(req, res) {
        let name = Request.getQueryString(req, 'name');
        
        res.end(name);
    }
    
}

module.exports = IndexController;
