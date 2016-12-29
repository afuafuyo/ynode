/**
 * 视图
 */
'use strict';

var fs = require('fs');

var Y = require('../Y');
var CoreView = require('../core/View');

class View extends CoreView {
    
    /**
     * @inheritdoc
     */
    static getTemplate(view, callback) {
        var app = Y.app;
        var path = '';
        
        if('' !== app.moduleId) {
            path = app.modules[app.moduleId];
            
        } else {
            path = app.getAppPath();
        }
        
        // 模块无子目录 普通控制器有子目录
        path = path + '/views/' + ('' === app.routePrefix ? '.' : app.routePrefix) +
            '/' + view + View.defaultExtension;
        
        fs.readFile(path, 'utf8', callback);
    }
    
}

module.exports = View;