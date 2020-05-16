/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Component = require('./Component');
const ActionEvent = require('./ActionEvent');

/**
 * 控制器基类
 */
class Controller extends Component {

    /**
     * constructor
     */
    constructor(context) {
        super();

        /**
         * @property {Object} context 上下文环境 用于保存当前请求相关的信息
         */
        this.context = context;
    }

    /**
     * 控制器方法执行前
     *
     * @param {Object} request
     * @param {Object} response
     * @return {Boolean}
     */
    beforeAction(request, response) {
        let actionEvent = new ActionEvent(request, response);

        this.trigger(Controller.EVENT_BEFORE_ACTION, actionEvent);

        return actionEvent.valid;;
    }

    /**
     * 控制器方法执行后
     *
     * @param {Object} request
     * @param {Object} response
     */
    afterAction(request, response) {
        this.trigger(Controller.EVENT_AFTER_ACTION, null);
    }

    /**
     * 执行控制器的方法
     *
     * @param {Object} request
     * @param {Object} response
     */
    runControllerAction(request, response) {
        if( true !== this.beforeAction(request, response) ) {
            return;
        }

        this.run(request, response);

        this.afterAction(request, response);
    }

    /**
     * 执行控制器
     */
    run(request, response) {}

    /**
     * 渲染文件
     *
     * @param {String} view 视图名
     * @param {Object} parameters 参数
     * @return string | undefined
     */
    render(view, parameters = null) {}

}

/**
 * @property {String} EVENT_BEFORE_ACTION
 */
Controller.EVENT_BEFORE_ACTION = 'beforeAction';

/**
 * @property {String} EVENT_AFTER_ACTION
 */
Controller.EVENT_AFTER_ACTION = 'afterAction';

module.exports = Controller;
