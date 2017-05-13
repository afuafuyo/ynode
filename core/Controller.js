/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Component = require('./Component');

/**
 * 控制器基类
 */
class Controller extends Component {
    
    /**
     * constructor
     */
    constructor() {
        super();
        
        /**
         * @property {String} EVENT_BEFORE_ACTIONCALL
         */
        this.EVENT_BEFORE_ACTIONCALL = 'beforeActionCall';
        
        /**
         * @property {String} EVENT_AFTER_ACTIONCALL
         */
        this.EVENT_AFTER_ACTIONCALL = 'afterActionCall';
    }
    
    /**
     * 获取视图类
     *
     * @return {Object}
     */
    getView() {}
    
    /**
     * 执行控制器的方法
     *
     * @param {Object} request
     * @param {Object} response
     */
    runControllerAction(request, response) {
        this.trigger(this.EVENT_BEFORE_ACTIONCALL);
        
        this.run(request, response);
        
        this.trigger(this.EVENT_AFTER_ACTIONCALL);
    }
    
}

module.exports = Controller;
