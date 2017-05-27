/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * URI 类
 *
 * @see https://tools.ietf.org/html/rfc3986#section-3.2
 *
 * URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]
 *
 * eg.
 *
 * foo://user:password@example.com:8000/over/there?name=ferret#nose
 * \_/   \____________________________/ \________/ \_________/ \__/
 *  |                   |                   |           |        |
 * scheme           authority              path       query   fragment
 *
 */
class URI {
    
    /**
     * constructor
     */
    constructor() {
        /**
         * @property {String} scheme 协议
         */
        this.scheme = '';
        
        /**
         * @property {String} host 主机
         */
        this.host = '';
        
        /**
         * @property {String} port 端口号
         */
        this.port = '';
        
        /**
         * @property {String} user 用户
         */
        this.user = '';
        
        /**
         * @property {String} password 密码
         */
        this.password = '';
        
        /**
         * @property {String} path 资源路径
         */
        this.path = '';
        
        /**
         * @property {String} query 请求参数
         */
        this.query = '';
        
        /**
         * @property {String} fragment 锚点
         */
        this.fragment = '';
    }
    
    /**
     * 创建一个 uri
     *
     * @param {String} scheme
     * @param {String} authority
     * @param {String} path
     * @param {String} query
     * @param {String} fragment
     * @return {String}
     */
    createURIString(scheme = '', authority = '', path = '', query = '', fragment = '') {
        var uri = '';
        
        if('' !== scheme) {
            uri += scheme + '://';
        }
        if('' !== authority) {
            uri += authority;
        }
        if('' !== path) {
            if('/' !== path.charAt(0)) {
                path = '/' + path;
            }
            
            uri += path;
        }
        if('' !== query) {
            uri += '?' + query;
        }
        if('' !== fragment) {
            uri += '#' + fragment;
        }
        
        return uri;
    }
    
    /**
     * 设置 uri
     *
     * @param {String} uri
     */
    setURI(uri) {
        
    }
    
    /**
     * 解析 url
     *
     * @param {String} url
     * @return {JSON}
     */
    parseUrl(url) {
        
    }
    
    /**
     * 解析 URI 的 authority 部分
     *
     * @return {String}
     */
    getAuthority() {
        var authority = '';
        
        if('' !== this.user) {
            authority += this.user + ':' + this.password + '@';
        }
        
        authority += this.host;
        
        if('' !== this.port) {
            authority += ':' + this.port;
        }
        
        return authority;
    }
    
    /**
     * 转为字符串
     */
    toString() {
        return this.createURIString(
            this.scheme,
            this.getAuthority(),
            this.path,
            this.query,
            this.fragment
        );
    }
    
}

module.exports = URI;
