/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * 视图
 */
class View {
    
    /**
     * 获取默认视图文件路径
     *
     * @param String view 视图文件名
     */
    static getTemplateFilePath(view) {}
    
    /**
     * 查找视图文件
     *
     * @param String view 视图文件名
     * @param Function callback 回调函数
     */
    static getTemplate(view, callback) {}
    
    /**
     * 从指定路径读取模板文件
     *
     * @param String path 文件路径
     * @param Function callback 回调函数
     */
    static getTemplateFromPath(path, callback) {}
    
}

/**
 * @var String 默认视图文件后缀
 */
View.defaultViewExtension = '.html';

module.exports = View;
