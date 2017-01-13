/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * 异常
 */
class Exception extends Error {
    
    /**
     * constructor
     *
     * @param String message 错误信息
     */
    constructor(message) {
        super(message);
        
        this.name = this.constructor.name;
    }
    
    /**
     * 获得错误名
     */
    getName() {
        return this.name;
    }
    
}

module.exports = Exception;
