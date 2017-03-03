/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var fs = require('fs');

var Y = require('../Y');
var CoreResource = require('../core/Resource');
var Request = require('./Request');

/**
 * web 静态资源
 */
class Resource extends CoreResource {
    
    /**
     * @inheritdoc
     */
    static handler(request, response) {
        if(undefined === Y.app.assets) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end();
            return;
        }
        
        var pathname = Request.parseUrl(request).pathname;
        var mimeType = Resource.getMimeType(pathname);
        pathname = (Y.app.getRootPath() + '/' + Y.app.assets + pathname).replace(/\.\.\//g, '');
        
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
            let extName = Resource.getExtName(pathname);
            let cacheConfig = undefined === Y.app.staticCache ? Resource.cache : Y.app.staticCache;
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
 * 缓存
 */
Resource.cache = {
    'regExp': /(\.gif|\.jpg|\.jpeg|\.png|\.js|\.css)$/ig,
    'cacheDay': 30
};

module.exports = Resource;
