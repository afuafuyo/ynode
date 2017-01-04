'use strict';

var View = require('./View');

/**
 * 控制器
 */
class Controller {
    
    /**
     * 得到模板文件
     *
     * @param String view 视图文件名
     * @param Function callback 回调函数
     */
    getTemplate(view, callback) {
        // todo
        View.getTemplate(view, callback);
        // todo
    }
    
}

module.exports = Controller;
