/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var fs = require('fs');

var Request = require('../web/Request');

/**
 * 静态资源处理
 */
class Resource {
    
    /**
     * constructor
     *
     * @param {String} root 静态资源目录
     * @param {JSON} options 配置参数
     *
     * {
     *    mime: { ... },
     *    staticCache: {regExp, cacheDay}
     * }
     *
     */
    constructor(root, options = {}) {
        this.root = root;
        this.options = options;
    }
    
    /**
     * 入口
     *
     * @return {Function} 中间件
     */
    serve() {
        return this.handler.bind(this);
    }
    
    /**
     * 是否是静态资源
     *
     * @param {Object} request 请求对象
     * @return {Boolean}
     */
    isStatic(request) {
        var ret = false;
        var pathname = Request.parseUrl(request).pathname;
        var ext = this.getExtName(pathname);
        var mime = undefined === this.options.mime ?
            Resource.mime :
            Object.assign({}, Resource.mime, this.options.mime);
        
        for(let key in mime) {
            if(ext === '.' + key) {
                ret = true;
                break;
            }
        }
        
        return ret;
    }
    
    /**
     * 获取 mimeType
     *
     * @param {String} pathName 访问路径
     * @return {String}
     */
    getMimeType(pathName) {
        var ret = '';
        var ext = this.getExtName(pathName);
        var mime = undefined === this.options.mime ?
            Resource.mime :
            Object.assign({}, Resource.mime, this.options.mime);
        
        for(let key in mime) {
            if(ext === '.' + key) {
                ret = mime[key];
                break;
            }
        }
        
        return ret;
    }
    
    /**
     * 获得扩展名
     *
     * @param {String} pathName 访问路径
     * @return {String}
     */
    getExtName(pathName) {
        return pathName.substring(pathName.lastIndexOf('.'));
    }
    
    /**
     * 处理静态资源
     *
     * @param {Object} request
     * @param {Object} response
     * @param {Function} next
     */
    handler(request, response, next) {
        if('GET' !== request.method || !this.isStatic(request)) {
            next();
            return;
        }
        
        var pathname = Request.parseUrl(request).pathname;
        var mimeType = this.getMimeType(pathname);
        pathname = (this.root + pathname).replace(/\.\.\//g, '');
        
        fs.stat(pathname, (err, stats) => {
            if(null !== err) {
                response.writeHead(404);
                response.end();
                return;
            }
            
            if(stats.isDirectory()) {
                response.writeHead(403);
                response.end();
                return;
            }
            
            // headers
            response.setHeader('Content-Type', '' === mimeType ? 'text/plain' : mimeType);
            response.setHeader('Last-Modified', stats.mtime.toUTCString());
            
            // 设置缓存
            let extName = this.getExtName(pathname);
            let cacheConfig = undefined === this.options.staticCache ? Resource.staticCache : this.options.staticCache;
            let cacheSecond = cacheConfig.cacheDay * 24 * 60 * 60;
            if(cacheConfig.regExp.test(extName)) {
                response.setHeader('Expires', new Date(Date.now() + cacheSecond * 1000).toUTCString());
                response.setHeader('Cache-Control', 'max-age=' + cacheSecond);
            }
            
            // 有缓存直接返回
            if(stats.mtime.toUTCString() === request.headers['if-modified-since']) {
                response.writeHead(304);
                response.end();
                return;
            }
            
            let rs = fs.createReadStream(pathname);
            response.writeHead(200);
            rs.pipe(response);
        });
    }
    
}

/**
 * MimeType
 */
Resource.mime = {
    'js': 'text/javascript'
    ,'css': 'text/css'

    ,'ico': 'image/x-icon'
    ,'gif': 'image/gif'
    ,'png': 'image/png'
    ,'jpg': 'image/jpeg'
    ,'jpeg': 'image/jpeg'

    ,'svg': 'image/svg+xml'
    ,'tiff': 'image/tiff'

    ,'swf': 'application/x-shockwave-flash'
    ,'wav': 'audio/x-wav'
    ,'wma': 'audio/x-ms-wma'
    ,'wmv': 'video/x-ms-wmv'
    ,'mp3': 'audio/mpeg'
    ,'mp4': 'video/mp4'
    ,'mpeg': 'video/mpeg'
    ,'avi': 'video/x-msvideo'
};

/**
 * 缓存
 */
Resource.staticCache = {
    'regExp': /(\.gif|\.jpg|\.jpeg|\.png|\.js|\.css)$/ig,
    'cacheDay': 30
};

module.exports = Resource;
