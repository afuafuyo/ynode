'use strict';

const Y = require('../../../../Y');
const YNode = require('../../../../index');
const Request = Y.include('y/http/Request');

class IndexController {

    run(req, res) {
        let name = new Request(req).getQueryString('name');

        res.end(name);
    }

}

module.exports = IndexController;
