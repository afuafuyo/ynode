/**
 * ynode
 */
'use strict';

var http = require('http');

var Y = require('./Y');
var WebApp = require('./web/Application');
var WebController = require('./web/Controller');

class YNode {
    
    /**
     * constructor
     *
     * @param JSON config 配置信息
     */
    constructor(config) {
        if(undefined === config) {
            throw new TypeError('The app config is required');
        }
        
        this.server = null;
        this.app = new WebApp(config);
    }
    
    // 中间层
    requestListener(req, res) {
        try {
            this.app.requestListener(req, res);
            
        } catch(e) {
            if(Y.app.debug) {
                res.end(e.message);
            }
        }
    }
    
    /**
     * listen
     *
     * @param int port
     * @param Function callback
     */
    listen(port, callback) {
        this.server = http.createServer(this.requestListener.bind(this));
        this.server.listen(port, callback);
        
        return this.server;
    }
    
}

/**
 * handler
 */
YNode.Y = Y;

/**
 * WebController handler
 */
YNode.WebController = WebController;

module.exports = YNode;
