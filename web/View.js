/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const fs = require('fs');

const Y = require('../Y');
const CoreView = require('../core/View');

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
        let app = Y.app;
        let context = this.context;

        // 模块无子目录 普通控制器有子目录
        if('' !== context.moduleId) {
            return app.modules[context.moduleId]
                + '/views/'
                + view + View.defaultViewExtension;
        }

        return app.getAppPath()
            + '/views/'
            + context.viewPath
            + '/'
            + view + View.defaultViewExtension;
    }

    /**
     * @inheritdoc
     */
    getTemplate(view, callback) {
        let path = this.getTemplateFilePath(view);

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
