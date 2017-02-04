/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

class Hook {
    
    /**
     * 注册
     *
     * @param String hookName
     * @param Object handler 实现了 run 方法的对象
     */
    static on(hookName, handler) {
        Hook.handlers[hookName] = handler;
    }
    
    /**
     * 触发
     *
     * @param String hookName
     * @param Any params 参数
     */
    static trigger(hookName, ...params) {
        if(undefined !== Hook.handlers[hookName]) {
            Hook.handlers[hookName].run(...params);
        }
    }
    
    /**
     * 执行
     */
    static run(...params) {
        return null;
    }
    
}

/**
 * Hooks
 *
 * {
 *     'hookName': class
 *     'hookName2': class
 * }
 *
 */
Hook.handlers = {};

module.exports = Hook;
