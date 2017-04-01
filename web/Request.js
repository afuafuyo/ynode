/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var url = require('url');
var querystring = require('querystring');

var Cookie = require('./Cookie');
var CoreRequest = require('../core/Request');

/**
 * 请求
 */
class Request extends CoreRequest {
    
    /**
     * constructor
     */
    constructor(request) {
        super(request);
    }
    
    /**
     * 解析 request url
     *
     * @param Object request 请求对象
     */
    static parseUrl(request) {
        var obj = url.parse(request.url);
        
        return {
            protocol: obj.protocol,
            host: obj.host,
            hash: obj.hash,
            query: obj.query,
            additionalQuery: undefined === request.additionalQuery ? null : request.additionalQuery,
            pathname: obj.pathname
        };
    }
    
    /**
     * 获取客户端 ip
     *
     * @param Object request 请求对象
     */
    static getClientIp(request) {
        var forward = request.headers['x-forwarded-for'];
        if(undefined !== forward) {
            return forward.substring(0, forward.indexOf(','));
        }
        
        return request.connection.remoteAddress;
    }
    
    /**
     * 获取 get 参数
     *
     * @param String param 参数名
     * @return String | null | ''
     */
    getQueryString(param) {
        var parsed = Request.parseUrl(this.request);
        
        // 查找参数
        if(null !== parsed.query &&
            (0 === parsed.query.indexOf(param) ||
                parsed.query.indexOf('&' + param) > 0)) {
            
            return querystring.parse(parsed.query)[param];
        }
        
        if(null !== parsed.additionalQuery) {
            return parsed.additionalQuery[param];
        }

        return null;
    }
    
    /**
     * 设置 get 参数
     *
     * @param String param 参数名
     * @param String value 参数值
     */
    setQueryString(param, value) {
        if(undefined === this.request.additionalQuery) {
            this.request.additionalQuery = {};
        }
        
        this.request.additionalQuery[param] = value;
    }
    
    /**
     * 获取 post 参数
     *
     * @param String param 参数名
     * @return String | null | ''
     */
    getParameter(param) {
        if(undefined === this.request.body) {
            return null;
        }
        
        return this.request.body[param];
    }
    
    /**
     * 获取 cookie
     *
     * @param name cookie name
     */
    getCookie(name) {
        return Cookie.getCookie(this.request, name);
    }
    
}

module.exports = Request;
