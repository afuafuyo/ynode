/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Y = require('../Y');
var CoreController = require('../core/Controller');

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
         * @property {String} viewHandler
         */
        this.viewHandler = 'y/web/View';
        
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
            this.view = Y.createObject(this.viewHandler, this.context);
        }
        
        return this.view;
    }
    
}

module.exports = Controller;
