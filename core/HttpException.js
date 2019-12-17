/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Exception = require('./Exception');

/**
 * HTTP 异常
 */
class HttpException extends Exception {}

module.exports = HttpException;
