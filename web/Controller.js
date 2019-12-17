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
     */
    constructor(context) {
        super(context);

        /**
         * @property {String} defaultViewHandler
         */
        this.defaultViewHandler = 'y/web/View';

        /**
         * @property {View} view
         */
        this.view = null;
    }

    /**
     * @inheritdoc
     */
    getView() {
        if(null === this.view) {
            this.view = Y.createObject('' === Y.app.viewHandler
                ? this.defaultViewHandler
                : Y.app.viewHandler, this.context);
        }

        return this.view;
    }

}

module.exports = Controller;
