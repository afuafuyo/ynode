/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * 异常错误处理基类
 */
class ExceptionHandler {

    /**
     * 异常处理
     *
     * @param {Object} response 输出类
     * @param {Error} exception 异常类
     */
    handlerException(response, exception) {}

}

module.exports = ExceptionHandler;
