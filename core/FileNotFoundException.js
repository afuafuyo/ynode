/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Exception = require('./Exception');

/**
 * HTTP 异常
 */
class FileNotFoundException extends Exception {}

module.exports = FileNotFoundException;
