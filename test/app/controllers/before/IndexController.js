'use strict';

var Y = require('../../../../Y');
var Controller = Y.include('y/web/Controller');

class IndexController extends Controller {

    beforeAction(req, res) {
        setTimeout(() => {
            this.run(req, res);
        }, 1000);

        return false;
    }

    run(req, res) {
        res.end('before action call');
    }

}

module.exports = IndexController;
