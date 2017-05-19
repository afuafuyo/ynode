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
     * constructor
     */
    constructor(context) {
        super(context);
    }
    
    /**
     * @inheritdoc
     */
    getTemplateFilePath(view) {
        var app = Y.app;
        var context = this.context;
        var path = '';
        
        // 模块无子目录 普通控制器有子目录
        if('' !== context.moduleId) {
            path = app.modules[context.moduleId]
                + '/views/'
                + view + View.defaultViewExtension;
            
        } else {
            path = app.getAppPath()
                + '/views/'
                + ('' === context.subRoute ? '.' : context.subRoute)
                + '/'
                + view + View.defaultViewExtension;
        }
        
        return path;
    }
    
    /**
     * @inheritdoc
     */
    getTemplate(view, callback) {
        var path = this.getTemplateFilePath(view);
        
        fs.readFile(path, Y.app.encoding, callback);
    }
    
    /**
     * @inheritdoc
     */
    getTemplateFromPath(path, callback) {
        fs.readFile(path, Y.app.encoding, callback);
    }
    
}

module.exports = View;
