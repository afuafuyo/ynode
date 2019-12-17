/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Exception = require('./Exception');

/**
 * 文件找不到异常
 */
class FileNotFoundException extends Exception {}

module.exports = FileNotFoundException;
