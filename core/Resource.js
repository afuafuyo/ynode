/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Y = require('../Y');

/**
 * 静态资源处理
 */
class Resource {
    
    /**
     * 是否是静态资源
     *
     * @param String pathName 访问路径
     */
    static isStatic(pathName) {
        var ret = false;
        var ext = Resource.getExtName(pathName);
        var mime = undefined === Y.app.mime ? Resource.Mime : Object.assign({}, Resource.Mime, Y.app.mime);
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
     * @param String pathName 访问路径
     */
    static getMimeType(pathName) {
        var ret = '';
        var ext = Resource.getExtName(pathName);
        var mime = undefined === Y.app.mime ? Resource.Mime : Object.assign({}, Resource.Mime, Y.app.mime);
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
     * @param String pathName 访问路径
     */
    static getExtName(pathName) {
        return pathName.substring(pathName.lastIndexOf('.'));
    }
    
    /**
     * 处理静态资源
     *
     * @param Object request
     * @param Object response
     */
    static handler(request, response) {}
    
}

/**
 * MimeType
 */
Resource.Mime = {
    'js': 'text/javascript'
    ,'css': 'text/css'
    ,'html': 'text/html'
    ,'htm': 'text/html'

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

module.exports = Resource;
