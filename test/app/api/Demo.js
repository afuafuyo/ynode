'use strict';

const Y = require('../../../Y');
const YNode = require('../../../index');
const Controller = Y.include('y/web/Controller');

class Demo extends Controller {

    index(req, res) {
        res.end('restful class ok');
    }

}

module.exports = Demo;
