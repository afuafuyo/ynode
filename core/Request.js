/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * 请求
 */
class Request {
    
    /**
     * 解析 request
     *
     * @param Object request 请求对象
     */
    static parse(request) {}

    /**
     * 返回入口文件名
     *
     * @return String
     */
    static getScriptFile() {
        if (null === Request._scriptFile) {
            Request._scriptFile = process.mainModule.filename;
        }
        
        return Request._scriptFile;
    }

}

/**
 * @var String 入口文件名
 */
Request._scriptFile = null;

module.exports = Request;
