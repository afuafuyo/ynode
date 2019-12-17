/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Exception = require('./Exception');

/**
 * 路由异常
 */
class InvalidRouteException extends Exception {}

module.exports = InvalidRouteException;
