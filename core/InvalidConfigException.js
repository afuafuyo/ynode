/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Exception = require('./Exception');

/**
 * 配置异常
 */
class InvalidConfigException extends Exception {}

module.exports = InvalidConfigException;
