'use strict';

const Y = require('../../../../Y');
const YNode = require('../../../../index');
const Request = Y.include('y/web/Request');

class IndexController {

    run(req, res) {
        let name = Request.getQueryString(req, 'name');

        res.end(name);
    }

}

module.exports = IndexController;
