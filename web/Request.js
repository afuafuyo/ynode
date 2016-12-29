/**
 * 请求
 */
'use strict';

var url = require('url');
var querystring = require('querystring');

var CoreRequest = require('../core/Request');

class Request extends CoreRequest {
    
    /**
     * 获得单例对象
     *
     * @return Request 对象实例
     */
    static getInstance() {
        if(null === Request._instance) {
            Request._instance = new Request();
        }
        
        return Request._instance;
    }
    
    /**
     * @inheritdoc
     */
    parse(request) {
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
     * 获取 get 请求参数
     *
     * @param Object request 请求对象
     * @param String routeParam 请求参数名
     * @return String | undefined | ''
     */
    getGetParam(request, routeParam) {
        var parsed = this.parse(request);
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

        return undefined;
    }
    
    /**
     * 设置 get 请求参数
     *
     * @param Object request 请求对象
     * @param String param 参数名
     * @param String value 参数值
     */
    setGetParam(request, param, value) {
        if(undefined === request.additionalQuery) {
            request.additionalQuery = param + '=' + value;
            
            return;
        }
        
        request.additionalQuery = request.additionalQuery + '&' + param + '=' + value;
    }
    
}

/**
 * @var Request 对象实例
 */
Request._instance = null;

module.exports = Request;
