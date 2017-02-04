/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

class Hook {
    
    /**
     * constructor
     */
    constructor() {
        /**
         * {
         *     'hookName': class
         *     'hookName2': class
         * }
         */
        this.handlers = {};
    }
    
    /**
     * 注册
     *
     * @param String hookName
     * @param Object handler 实现了 run 方法的类实例对象
     */
    on(hookName, handler) {
        this.handlers[hookName] = handler;
    }
    
    /**
     * 触发
     *
     * @param String hookName
     * @param Any params 参数
     */
    trigger(hookName, ...params) {
        if(undefined !== this.handlers[hookName]) {
            this.handlers[hookName].run(...params);
        }
    }
    
    /**
     * 执行
     */
    run(...params) {
        return null;
    }
    
}

module.exports = Hook;
