/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const http = require('http');

const Hook = require('./core/Hook');

/**
 * reset 应用
 */
class Restful {
    /**
     * constructor
     *
     * @param {Object} application 应用实例
     */
    constructor(application) {
        this.server = null;
        this.rest = application;
    }

    // web
    requestListener(req, res) {
        try {
            this.rest.requestListener(req, res);

        } catch(e) {
            this.rest.handlerException(res, e);
        }
    }

    // handler
    handler(req, res) {
        Hook.getInstance().trigger(req, res, () => {
            this.requestListener(req, res);
        });
    }

    /**
     * get
     */
    get(pattern, handler) {
        this.rest.addRoute('GET', pattern, handler);
    }

    /**
     * post
     */
    post(pattern, handler) {
        this.rest.addRoute('POST', pattern, handler);
    }

    /**
     * put
     */
    put(pattern, handler) {
        this.rest.addRoute('PUT', pattern, handler);
    }

    /**
     * delete
     */
    delete(pattern, handler) {
        this.rest.addRoute('DELETE', pattern, handler);
    }

    /**
     * patch
     */
    patch(pattern, handler) {
        this.rest.addRoute('PATCH', pattern, handler);
    }

    /**
     * head
     */
    head(pattern, handler) {
        this.rest.addRoute('HEAD', pattern, handler);
    }

    /**
     * options
     */
    options(pattern, handler) {
        this.rest.addRoute('OPTIONS', pattern, handler);
    }

    /**
     * 获取 http server
     *
     * @return http server
     */
    getServer() {
        return http.createServer(this.handler.bind(this));
    }

    /**
     * listen
     *
     * @param {Number} port
     * @param {Function} callback
     */
    listen(port, callback) {
        this.server = this.getServer();
        this.server.listen(port, callback);
    }
}

module.exports = Restful;
