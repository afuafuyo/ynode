/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var fs = require('fs');

var Y = require('../Y');
var CoreView = require('../core/View');

/**
 * 视图
 */
class View extends CoreView {
    
    /**
     * @inheritdoc
     */
    static getTemplateFilePath(view) {
        var app = Y.app;
        var path = '';
        
        if('' !== app.moduleId) {
            path = app.modules[app.moduleId];
            
        } else {
            path = app.getAppPath();
        }
        
        // 模块无子目录 普通控制器有子目录
        path = path + '/views/' + ('' === app.routePrefix ? '.' : app.routePrefix) +
            '/' + view + View.defaultViewExtension;
        
        return path;
    }
    
    /**
     * @inheritdoc
     */
    static getTemplate(view, callback) {
        var path = View.getTemplateFilePath(view);
        
        fs.readFile(path, Y.app.encoding, callback);
    }
    
    /**
     * @inheritdoc
     */
    static getTemplateFromPath(path, callback) {
        fs.readFile(path, Y.app.encoding, callback);
    }
    
}

module.exports = View;
