'use strict';

var http = require('http');

var Y = require('./Y');
var WebApp = require('./web/Application');
var InvalidConfigException = require('./core/InvalidConfigException');

var Hook = require('./core/Hook');
var Logger = require('./log/Logger');
var Cookie = require('./web/Cookie');
var WebRestful = require('./web/Restful');
var WebRequest = require('./web/Request');
var WebResponse = require('./web/Response');
var Session = require('./session/Session');
var WebController = require('./web/Controller');

/**
 * 入口
 */
class YNode {
    
    /**
     * constructor
     *
     * @param JSON config 配置信息
     */
    constructor(config) {
        if(undefined === config) {
            throw new InvalidConfigException('The app config is required');
        }
        
        this.config = config;
        this.server = null;
        this.app = new WebApp(config);
    }
    
    // debug
    debug(res, error) {
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(500);
        res.end(true === this.config.debug ? error.message + '\n' + error.stack :
            'The server encountered an internal error');
    }
    
    // web
    requestListenerWeb(req, res) {
        try {
            this.app.requestListener(req, res);
            
        } catch(e) {
            this.debug(res, e);
        }
    }
    
    // restful
    requestListenerRestful(req, res) {
        try {
            WebRestful.requestListener(req, res);
            
        } catch(e) {
            this.debug(res, e);
        }
    }
    
    // handler
    handler(req, res) {
        Hook.getInstance().trigger(req, res, () => {
            if(true === this.config.useRestful) {
                this.requestListenerRestful(req, res);
                return;
            }
            
            this.requestListenerWeb(req, res);
        });
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
     * @param int port
     * @param Function callback
     */
    listen(port, callback) {
        this.server = this.getServer();
        this.server.listen(port, callback);
    }
    
}

/**
 * handler
 */
YNode.Y = Y;

/**
 * Hook
 */
YNode.Hook = Hook;

/**
 * Logger
 */
YNode.Logger = Logger;

/**
 * Cookie
 */
YNode.Cookie = Cookie;

/**
 * Web restful
 */
YNode.WebRestful = WebRestful;

/**
 * Web request
 */
YNode.WebRequest = WebRequest;

/**
 * Web response
 */
YNode.WebResponse = WebResponse;

/**
 * Session
 */
YNode.Session = Session;

/**
 * WebController handler
 */
YNode.WebController = WebController;

module.exports = YNode;
