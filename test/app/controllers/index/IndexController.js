'use strict';

const Y = require('../../../../Y');
const YNode = require('../../../../index');
const Controller = Y.include('y/web/Controller');

class IndexController extends Controller {

    run(req, res) {
        this.getView().getViewContent('index', (err, str) => {
            res.end(str);
        });
    }

}

module.exports = IndexController;
