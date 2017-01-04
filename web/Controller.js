/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var View = require('./View');

/**
 * 控制器
 */
class Controller {
    
    /**
     * 获取视图文件路径
     */
    getTemplateFilePath(view) {
        return View.getTemplateFilePath(view);
    }
    
    /**
     * 得到模板文件
     */
    getTemplate(view, callback) {
        // todo
        View.getTemplate(view, callback);
        // todo
    }
    
}

module.exports = Controller;
