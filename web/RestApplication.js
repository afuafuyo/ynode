/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Y = require('../Y');
const Request = require('./Request');
const Router = require('../utils/Router');
const CoreApp = require('../core/Application');
const StringHelper = require('../helpers/StringHelper');
const InvalidCallException = require('../core/InvalidCallException');

class RestApplication extends CoreApp {

    constructor(config) {
        super(config);

        /**
         * 请求方法
         *
         * each method has the follow structure
         *
         * [
         *      { route: route1, handler: callbackFunction1 },
         *      { route: route2, handler: callbackFunction2 }
         * ]
         *
         */
        this.methods = {
            GET: [],
            POST: [],
            PUT: [],
            DELETE: [],
            PATCH: [],
            HEAD: [],
            OPTIONS: []
        };

        Y.config(this, config);
    }

    /**
     * 请求处理
     *
     * @param {Object} request
     * @param {Object} response
     */
    requestListener(request, response) {
        let route = Request.parseUrl(request).pathname;
        let ret = this.resolveRoutes(route, request.method);

        if(null === ret) {
            throw new InvalidCallException('The REST route: ' + route + ' not found');
        }

        // handler is function
        if('function' === typeof ret.handler) {
            ret.handler(request, response, ret.paramValues);

            return;
        }

        // handler is string
        let pos = ret.handler.indexOf(RestApplication.separator);
        let obj = null;
        if(-1 === pos) {
            obj = Y.createObject(ret.handler);
            obj.run(request, response, ret.paramValues);

        } else {
            obj = Y.createObject( ret.handler.substring(0, pos) );
            obj[ ret.handler.substring(pos + 1) ](request, response, ret.paramValues);
        }
    }

    /**
     * 解析路由
     *
     * @param {String} route 路由
     * @param {String} httpMethod 请求方法
     * @return {Object | null}
     */
    resolveRoutes(route, httpMethod) {
        let routesMap = this.methods[httpMethod];
        if(0 === routesMap.length) {
            return null;
        }

        let routes = [];
        for(let i=0,len=routesMap.length; i<len; i++) {
            routes.push(routesMap[i].route);
        }
        let combinedRoute = Router.combineRoutes(routes);
        let matches = new RegExp(combinedRoute.pattern).exec(route);
        // 没有匹配到路由
        if(null === matches) {
            return null;
        }

        // 匹配到路由
        let subPatternPosition = -1;
        // matches: [ '/path/123', undefined, '/path/123', 123]
        for(let i=1,len=matches.length; i<len; i++) {
            if(undefined !== matches[i]) {
                subPatternPosition = i;
                break;
            }
        }
        let segmentPosition = this.getMatchedSegmentPosition(combinedRoute, subPatternPosition);
        let handler = routesMap[segmentPosition].handler;
        let paramValues = null;

        // 有参数
        let paramNames = combinedRoute.params[segmentPosition];
        if(null !== paramNames) {
            paramValues = {};

            for(let i=0,len=paramNames.length; i<len; i++) {
                paramValues[ paramNames[i] ] = matches[subPatternPosition + i + 1];
            }
        }

        return {
            handler: handler,
            paramValues: paramValues
        };
    }

    /**
     * 查找匹配的路由位置
     *
     * @param {Object} combinedRoute 合并的路由
     * @param {Number} subPatternPosition 匹配的子模式位置
     * @return {Number}
     */
    getMatchedSegmentPosition(combinedRoute, subPatternPosition) {
        // 用 '(' 出现的位置确定匹配的是哪部分
        let index = StringHelper.nIndexOf(combinedRoute.pattern, '(', subPatternPosition);

        if(0 === index) {
            return 0;
        }

        let str = combinedRoute.pattern.substring(0, index);
        index = 0;
        for(let i=0, len=str.length; i<len; i++) {
            if('|' === str[i]) {
                index += 1;
            }
        }

        return index;
    }

    /**
     * Adds a route to the collection
     *
     * @param {String | Array} httpMethod
     * @param {String} route
     * @param {Function | String} handler
     */
    addRoute(httpMethod, route, handler) {
        if('string' === typeof httpMethod) {
            this.methods[httpMethod].push({
                route: route,
                handler: handler
            });

            return;
        }

        for(let i=0,len=httpMethod.length; i<len; i++) {
            this.methods[httpMethod[i]].push({
                route: route,
                handler: handler
            });
        }
    }

    /**
     * get
     */
    get(route, handler) {
        this.addRoute('GET', route, handler);
    }

    /**
     * post
     */
    post(route, handler) {
        this.addRoute('POST', route, handler);
    }

    /**
     * put
     */
    put(route, handler) {
        this.addRoute('PUT', route, handler);
    }

    /**
     * delete
     */
    delete(route, handler) {
        this.addRoute('DELETE', route, handler);
    }

    /**
     * patch
     */
    patch(route, handler) {
        this.addRoute('PATCH', route, handler);
    }

    /**
     * head
     */
    head(route, handler) {
        this.addRoute('HEAD', route, handler);
    }

    /**
     * options
     */
    options(route, handler) {
        this.addRoute('OPTIONS', route, handler);
    }

    /**
     * @inheritdoc
     */
    handlerException(response, exception) {
        let handler = Y.createObject(this.exceptionHandler);

        handler.handlerException(response, exception);
    }

}

/**
 * class and method separate
 */
RestApplication.separator = '@';

module.exports = RestApplication;
