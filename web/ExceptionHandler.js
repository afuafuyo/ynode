/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Y = require('../Y');
var CoreExceptionHandler = require('../core/ExceptionHandler');

/**
 * web 异常错误处理
 */
class ExceptionHandler extends CoreExceptionHandler {
    
    /**
     * @inheritdoc
     */
    handlerException(response, exception) {
        response.setHeader('Content-Type', 'text/plain');
        response.writeHead(500);
        
        response.end((true === Y.app.debug || true === Y.rest.debug)
            ? exception.message + '\n' + exception.stack
            : 'The server encountered an internal error');
    }
    
}

module.exports = ExceptionHandler;
