'use strict';

const Y = require('../../../Y');
const YNode = require('../../../index');
const Controller = Y.include('y/web/Controller');

class Demo extends Controller {

    run(req, res) {
        res.end('restful class ok');
    }

    testParam(req, res, params) {
        res.end(params.id);
    }

}

module.exports = Demo;
