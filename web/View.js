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
            '/' + view + View.defaultViewExtension;
        
        fs.readFile(path, 'utf8', callback);
    }
    
}

module.exports = View;
