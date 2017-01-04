/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var fs = require('fs');

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
        var pathname = Request.getInstance().parse(request).pathname;
        fs.stat(pathname, (err, stats) => {
            if(null !== err) {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.end();
                return;
            }
            
            if(stats.isDirectory()) {
                response.writeHead(403, {'Content-Type': 'text/plain'});
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
