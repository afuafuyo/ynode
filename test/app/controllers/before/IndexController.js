'use strict';

var Y = require('../../../../Y');
var Controller = Y.include('y/web/Controller');

class IndexController extends Controller {

    beforeAction(actionEvent) {
        setTimeout(() => {
            this.run(actionEvent.request, actionEvent.response);
        }, 1000);

        return false;
    }

    run(req, res) {
        res.end('before action call');
    }

}

module.exports = IndexController;
