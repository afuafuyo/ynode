/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Y = require('../Y');
var Request = require('./Request');
var CoreRouter = require('../core/Router');
var InvalidCallException = require('../core/InvalidCallException');

class WebRestful extends CoreRouter {
    
    /**
     * listen request
     */
    static requestListener(request, response) {
        var route = Request.parseUrl(request).pathname;
        var httpMethod = request.method;
        var handlers = WebRestful.methods[httpMethod];
        var matchedHandler = null;
        var parsedRoute = null;
        var matches = null;
        
        // 检测非法 与 路径中不能有双斜线 '//'
        if(!/^[\w\-\/]+$/.test(route) || route.indexOf('//') >= 0) {
            throw new InvalidCallException('The route: '+ route +' is invalid');
        }
        
        for(let i=0,len=handlers.length; i<len; i++) {
            parsedRoute = WebRestful.parse(handlers[i]['pattern']);
            
            handlers[i]['paramKeys'] = parsedRoute.params;  // null or array
            handlers[i]['paramValues'] = null;
            
            matches = route.match( new RegExp(parsedRoute.pattern) );
            
            // 匹配到路由
            if(null !== matches) {
                matchedHandler = handlers[i];
                
                // 存储参数
                if(null !== matchedHandler.paramKeys) {
                    let requestInstance = new Request(request);
                    matchedHandler.paramValues = [];
                    
                    for(let j=0,l=matchedHandler.paramKeys.length; j<l; j++) {
                        requestInstance.setQueryString(matchedHandler.paramKeys[j],
                            matches[j+1]);
                            
                        matchedHandler.paramValues.push(matches[j+1]);
                    }
                }
                
                // 匹配到就退出
                break;
            }
        }
        
        if(null === matchedHandler) {
            throw new InvalidCallException('The REST route: ' + route + ' not found');
        }
        
        var args = null === matchedHandler.paramValues ? [null] : matchedHandler.paramValues;
        if('function' === typeof matchedHandler.handler) {
            matchedHandler.handler(request, response, ...args);
            
            return;    
        }
        
        // handler is string
        var pos = matchedHandler.handler.indexOf(WebRestful.separator);
        var obj = null;
        if(-1 === pos) {
            obj = Y.createObject(matchedHandler.handler);
            obj.index(request, response, ...args);
            
        } else {
            obj = Y.createObject( matchedHandler.handler.substring(0, pos) );
            obj[ matchedHandler.handler.substring(pos + 1) ](
                request,
                response,
                ...args);
        }
    }
    
    /**
     * Adds a route to the collection
     *
     * @param String | Array httpMethod
     * @param String pattern
     * @param Function | String handler
     */
    static addRoute(httpMethod, pattern, handler) {
        if('string' === typeof httpMethod) {
            WebRestful.methods[httpMethod].push( {pattern: pattern, handler: handler} );
            return;
        }
        
        for(let i=0,len=httpMethod.length; i<len; i++) {
            WebRestful.methods[httpMethod[i]].push( {pattern: pattern, handler: handler} );
        }
    }
    
    /**
     * get
     */
    static get(pattern, handler) {
        WebRestful.addRoute('GET', pattern, handler);
    }
    
    /**
     * post
     */
    static post(pattern, handler) {
        WebRestful.addRoute('POST', pattern, handler);
    }
    
    /**
     * put
     */
    static put(pattern, handler) {
        WebRestful.addRoute('PUT', pattern, handler);
    }
    
    /**
     * delete
     */
    static delete(pattern, handler) {
        WebRestful.addRoute('DELETE', pattern, handler);
    }
    
    /**
     * patch
     */
    static patch(pattern, handler) {
        WebRestful.addRoute('PATCH', pattern, handler);
    }
    
    /**
     * head
     */
    static head(pattern, handler) {
        WebRestful.addRoute('HEAD', pattern, handler);
    }
    
    /**
     * options
     */
    static options(pattern, handler) {
        WebRestful.addRoute('OPTIONS', pattern, handler);
    }

}

/**
 * 请求方法
 *
 * each method has the follow structure
 *
 * [ {pattern: pattern, handler: handler} ... ]
 *
 */
WebRestful.methods = {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: [],
    PATCH: [],
    HEAD: [],
    OPTIONS: []
};

/**
 * class and method separate
 */
WebRestful.separator = '@';

module.exports = WebRestful;
