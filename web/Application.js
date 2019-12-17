/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Y = require('../Y');
const CoreApp = require('../core/Application');
const Request = require('./Request');
const WebController = require('./Controller');
const InvalidRouteException = require('../core/InvalidRouteException');

/**
 * web 应用
 */
class Application extends CoreApp {

    /**
     * @inheritdoc
     */
    constructor(config) {
        super(config);

        this.defaultExceptionHandler = 'y/web/ExceptionHandler';
    }

    /**
     * @inheritdoc
     */
    requestListener(request, response) {
        let route = Request.parseUrl(request).pathname;

        let controller = this.createController(route);

        if(null === controller) {
            throw new InvalidRouteException('The route requested is invalid');
        }

        // 是否继承自框架控制器
        if( !(controller instanceof WebController) ) {
            controller.run(request, response);

            return;
        }

        controller.runControllerAction(request, response);
    }

    /**
     * @inheritdoc
     */
    handlerException(response, exception) {
        let handler = Y.createObject('' === this.exceptionHandler
            ? this.defaultExceptionHandler
            : this.exceptionHandler);

        handler.handlerException(response, exception);
    }

}

module.exports = Application;
