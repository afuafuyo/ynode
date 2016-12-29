/**
 * 请求
 */
'use strict';

class Request {

    /**
     * constructor
     */
    constructor() {
        this._scriptFile = null;
    }
    
    /**
     * 解析 request
     *
     * @param Object request 请求对象
     */
    parse(request) {}

    /**
     * 返回入口文件名
     * @return string
     */
    getScriptFile() {
        if (null === this._scriptFile) {
            this._scriptFile = process.mainModule.filename;
        }
        
        return this._scriptFile;
    }

}

module.exports = Request;
