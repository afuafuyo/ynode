/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Y = require('../Y');
const CoreController = require('../core/Controller');

/**
 * 控制器
 */
class Controller extends CoreController {

    /**
     * constructor
     *
     * @param {any} context
     */
    constructor(context) {
        super(context);

        /**
         * @property {View} view
         */
        this.view = null;
    }

    /**
     * 获取视图类
     *
     * @return {any}
     */
    getView() {
        if(null === this.view) {
            this.view = Y.createObject(Y.app.defaultView, this.context);
        }

        return this.view;
    }

    /**
     * 设置视图类
     *
     * @param {any} view
     */
    setView(view) {
        this.view = view;
    }

    /**
     * @inheritdoc
     */
    run(request, response) {
        response.end('Controller must implements the run() method');
    }

    /**
     * @inheritdoc
     */
    render(view, parameters = null) {
        return this.getView().render(view, parameters);
    }

}

module.exports = Controller;
