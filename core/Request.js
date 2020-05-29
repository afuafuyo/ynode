/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * Request
 */
class Request {

    /**
     * constructor
     *
     * @param {Object} request
     */
    constructor(request) {
        this.request = request;

        this._scriptFile = '';
    }

    /**
     * 返回入口文件名
     *
     * @return {String}
     */
    getScriptFile() {
        if ('' === this._scriptFile) {
            this._scriptFile = process.mainModule.filename;
        }

        return this._scriptFile;
    }

}

module.exports = Request;
