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
            response.setHeader('Content-Type', '' === mimeType ? 'text/plain' : mimeType);
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
            
            let rs = fs.createReadStream(pathname);
            response.writeHead(200);
            rs.pipe(response);
        });
    }
    
}

module.exports = Resource;
