/**
 * 视图
 */
'use strict';

class View {
    
    /**
     * 查找视图文件
     *
     * @param String view 视图文件名
     * @param Function callback 回调函数
     */
    static getTemplate(view, callback) {}
    
}

/**
 * @var String 默认视图文件后缀
 */
View.defaultExtension = '.js';

module.exports = View;