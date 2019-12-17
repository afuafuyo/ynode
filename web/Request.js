/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const url = require('url');
const querystring = require('querystring');

const Cookie = require('./Cookie');
const CoreRequest = require('../core/Request');

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
     * @param {Object} request 请求对象
     * @return {Object}
     */
    static parseUrl(request) {
        let obj = url.parse(request.url);

        return {
            protocol: obj.protocol,
            host: obj.host,
            port: obj.port,
            path: obj.path,
            pathname: obj.pathname,
            query: obj.query,
            hash: obj.hash
        };
    }

    /**
     * 获取客户端 ip
     *
     * @param {Object} request 请求对象
     * @return {String}
     */
    static getClientIp(request) {
        let forward = request.headers['x-forwarded-for'];
        if(undefined !== forward) {
            return forward.substring(0, forward.indexOf(','));
        }

        return request.connection.remoteAddress;
    }

    /**
     * 静态方法 获取 get 参数
     *
     * @param {Object} request 请求对象
     * @param {String} param 参数名
     * @return {String | null}
     */
    static getQueryString(request, param) {
        let parsed = Request.parseUrl(request);

        if(null === parsed.query) {
            return null;
        }

        // 查找参数
        if(0 === parsed.query.indexOf(param + '=')
            || parsed.query.indexOf('&' + param + '=') > 0) {

            return querystring.parse(parsed.query)[param];
        }

        return null;
    }

    /**
     * 静态方法 获取 post 参数
     *
     * @param {Object} request 请求对象
     * @param {String} param 参数名
     * @return {String | null}
     */
    static getParameter(request, param) {
        if(undefined === request.body) {
            return null;
        }

        return undefined === request.body[param] ? null : request.body[param];
    }

    /**
     * 获取 cookie
     *
     * @param {Object} request 请求对象
     * @param {String} name cookie name
     * @see Cookie.getCookie
     */
    static getCookie(request, name) {
        return Cookie.getCookie(request, name);
    }

    /**
     * 获取 get 参数
     *
     * @param {String} param 参数名
     * @see Request.getQueryString
     */
    getQueryString(param) {
        return Request.getQueryString(this.request, param);
    }

    /**
     * 获取 post 参数
     *
     * @param {String} param 参数名
     * @see Request.getParameter
     */
    getParameter(param) {
        return Request.getParameter(this.request, param);
    }

    /**
     * 获取 cookie
     *
     * @see Request.getCookie
     */
    getCookie(name) {
        return Request.getCookie(this.request, name);
    }

    /**
     * 获取引用网址
     *
     * @return {String | null}
     */
    getReferer(request) {
        if(undefined !== this.request.headers.referer) {
            return this.request.headers.referer;
        }

        return null;
    }

    /**
     * 获取 URI 协议和主机部分
     *
     * @return {String}
     */
    getHostInfo() {
        let protocol = undefined !== this.request.socket.encrypted
            || 'https' === this.request.headers['x-forwarded-protocol']
                ? 'https'
                : 'http';

        let host = protocol + '://' + this.request.headers.host;

        return host;
    }

    /**
     * 获取当前网址 不包含锚点部分
     *
     * @return {String}
     */
    getCurrent() {
        return this.getHostInfo() + this.request.url;
    }

}

module.exports = Request;
