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
     * 获取 get 请求参数
     *
     * @param String routeParam 请求参数名
     * @return String | null | ''
     */
    getGetParam(routeParam) {
        var parsed = Request.parseUrl(this.request);
        // 查找参数
        if(null !== parsed.query &&
            (0 === parsed.query.indexOf(routeParam) ||
                parsed.query.indexOf('&'+routeParam) > 0)) {
            
            return querystring.parse(parsed.query)[routeParam];
        }
        
        if(null !== parsed.additionalQuery &&
            (0 === parsed.additionalQuery.indexOf(routeParam) ||
                parsed.additionalQuery.indexOf('&'+routeParam) > 0)) {
            
            return querystring.parse(parsed.additionalQuery)[routeParam];
        }

        return null;
    }
    
    /**
     * 设置 get 请求参数
     *
     * @param String param 参数名
     * @param String value 参数值
     */
    setGetParam(param, value) {
        if(undefined === this.request.additionalQuery) {
            this.request.additionalQuery = param + '=' + value;
            
            return;
        }
        
        this.request.additionalQuery = this.request.additionalQuery + '&' + param + '=' + value;
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
