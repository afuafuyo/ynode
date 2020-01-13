/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Y = require('../Y');
const StringHelper = require('../helpers/StringHelper');
const Router = require('../core/Router');
const CoreApp = require('../core/Application');
const InvalidCallException = require('../core/InvalidCallException');
const Request = require('./Request');

class RestApplication extends CoreApp {

    constructor(config) {
        super(config);

        /**
         * 请求方法
         *
         * each method has the follow structure
         *
         * [ {pattern: pattern, handler: handler} ... ]
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

        // {paramValues, handler}
        let ret = this.resolveRoutes(route, request.method);

        if(null === ret) {
            throw new InvalidCallException('The REST route: ' + route + ' not found');
        }

        let args = null === ret.paramValues ? [null] : ret.paramValues;

        // handler is function
        if('function' === typeof ret.handler) {
            ret.handler(request, response, ...args);

            return;
        }

        // handler is string
        let pos = ret.handler.indexOf(RestApplication.separator);
        let obj = null;
        if(-1 === pos) {
            obj = Y.createObject(ret.handler);
            obj.index(request, response, ...args);

        } else {
            obj = Y.createObject( ret.handler.substring(0, pos) );
            obj[ ret.handler.substring(pos + 1) ](
                request,
                response,
                ...args);
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
        let ret = null;

        // [ {pattern, handler} ... ]
        let handlers = this.methods[httpMethod];
        let tmp = {};
        for(let i=0,len=handlers.length; i<len; i++) {
            tmp[handlers[i].pattern] = handlers[i].handler;
        }
        // {pattern, params, handler}
        let combinedRoute = this.combineRoutes(tmp);

        let matches = route.match( new RegExp('(?:' + combinedRoute.pattern + ')$') );

        // 路由成功匹配
        if(null !== matches) {
            ret = {};

            let subPatternPosition = -1;
            // matches: [ 'xyz/other', undefined, undefined, undefined, 'xyz/other']
            for(let i=1,len=matches.length; i<len; i++) {
                if(undefined !== matches[i]) {
                    subPatternPosition = i;
                    break;
                }
            }

            let matchedRouteSegment = this.getMatchedSegmentBySubPatternPosition(
                combinedRoute, subPatternPosition);

            ret.handler = combinedRoute.handler[matchedRouteSegment];
            ret.paramValues = null;

            // 有参数
            if(null !== combinedRoute.params[matchedRouteSegment]) {
                // ret.paramValues = new Array(combinedRoute.params[matchedRouteSegment].length);
                ret.paramValues = [];
                for(let i=0,len=combinedRoute.params[matchedRouteSegment].length; i<len; i++) {
                    // ret.paramValues[i] = matches[subPatternPosition + i + 1];
                    ret.paramValues.push( matches[subPatternPosition + i + 1] );
                }
            }
        }

        return ret;
    }

    /**
     * 合并路由
     *
     * @param {Object} routes
     *
     * { pattern: any ... }
     *
     * @return {Object}
     *
     * eg.
     *
     * {
     *   pattern: '(abc\\/(\\d+))|(abc)|(xyz\\/other)',
     *   params: [ [ 'id' ], null, null ],
     *   handler: any
     * }
     *
     */
    combineRoutes(routes) {
        let ret = {};
        let patternArray = [];
        let paramArray = [];
        let handler = [];  // 路由配置

        let parsedRoute = null;
        for(let reg in routes) {
            parsedRoute = Router.parse(reg);

            // 为每个模式添加一个括号 用于定位匹配到的是哪一个模式
            patternArray.push( '(' + parsedRoute.pattern + ')' );
            paramArray.push(parsedRoute.params);
            handler.push(routes[reg]);
        }

        ret.pattern = patternArray.join('|');
        ret.params = paramArray;
        ret.handler = handler;

        return ret;
    }

    /**
     * 查找匹配的路由的位置
     *
     * @param {Object} combinedRoute 合并的路由
     * @param {Number} subPatternPosition 匹配的子模式位置
     * @return {Number}
     */
    getMatchedSegmentBySubPatternPosition(combinedRoute, subPatternPosition) {
        // '(' 在 pattern 中第 subPatternPosition 次出现的位置
        // 用于确定当前路由匹配的是第几部分
        let segment = StringHelper.nIndexOf(combinedRoute.pattern, '(', subPatternPosition);
        let tmpLine = combinedRoute.pattern.substring(0, segment).match(/\|/g);
        // 没有匹配到竖线 说明匹配的是第一部分
        segment = null === tmpLine ? 0 : tmpLine.length;

        return segment;
    }


    /**
     * Adds a route to the collection
     *
     * @param {String | Array} httpMethod
     * @param {String} pattern
     * @param {Function | String} handler
     */
    addRoute(httpMethod, pattern, handler) {
        if('string' === typeof httpMethod) {
            this.methods[httpMethod].push( {pattern: pattern, handler: handler} );

            return;
        }

        for(let i=0,len=httpMethod.length; i<len; i++) {
            this.methods[httpMethod[i]].push( {pattern: pattern, handler: handler} );
        }
    }

    /**
     * get
     */
    get(pattern, handler) {
        this.addRoute('GET', pattern, handler);
    }

    /**
     * post
     */
    post(pattern, handler) {
        this.addRoute('POST', pattern, handler);
    }

    /**
     * put
     */
    put(pattern, handler) {
        this.addRoute('PUT', pattern, handler);
    }

    /**
     * delete
     */
    delete(pattern, handler) {
        this.addRoute('DELETE', pattern, handler);
    }

    /**
     * patch
     */
    patch(pattern, handler) {
        this.addRoute('PATCH', pattern, handler);
    }

    /**
     * head
     */
    head(pattern, handler) {
        this.addRoute('HEAD', pattern, handler);
    }

    /**
     * options
     */
    options(pattern, handler) {
        this.addRoute('OPTIONS', pattern, handler);
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
