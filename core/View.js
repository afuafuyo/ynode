/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const fs = require('fs');

const Y = require('../Y');

/**
 * 视图
 */
class View {

    /**
     * constructor
     */
    constructor(context) {
        /**
         * @property {Object} context 上下文环境
         */
        this.context = context;

        /**
         * @property {String} 默认视图文件后缀
         */
        this.defaultExtension = '.html';
    }

    /**
     * 查找视图文件路径
     *
     * @param {String} view 视图文件名
     * @return {String}
     */
    findViewFile(view) {
        if('@' === view.charAt(0)) {
            return Y.getPathAlias(view) + this.defaultExtension;
        }

        let app = Y.app;
        let context = this.context;

        // 模块无子目录 普通控制器有子目录
        if('' !== context.moduleId) {
            return app.modules[context.moduleId]
                + '/views/'
                + view + this.defaultExtension;
        }

        return app.getAppPath()
            + '/views/'
            + context.viewPath
            + '/'
            + view + this.defaultExtension;
    }

    /**
     * 读取视图文件
     *
     * @param {String} view 视图文件名
     * @param {Function} callback 回调函数
     * @return {String}
     */
    getTemplateContent(view, callback) {
        let file = this.findViewFile(view);

        fs.readFile(file, Y.app.encoding, callback);
    }

    /**
     * 渲染视图文件
     *
     * @param {String} view 视图名
     * @param {Object} parameters 参数
     */
    render(view, parameters = null) {
        let file = this.findViewFile(view);

        this.renderFile(file, parameters);
    }

}

module.exports = View;
