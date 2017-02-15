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
        this.index = 0;
        this.handlers = [];
        this.callback = null;
    }
    
    /**
     * 获取 Hook 实例
     */
    static getInstance() {
        if(null === Hook._instance) {
            Hook._instance = new Hook();
        }
        
        return Hook._instance;
    }
    
    /**
     * 注册
     *
     * @param Function handler
     */
    addHook(handler) {
        this.handlers.push(handler);
    }
    
    /**
     * 获取一个 handler
     */
    takeHook() {
        if(this.index === this.handlers.length) {
            this.index = 0;
            
            return null;
        }
        
        var ret = this.handlers[this.index];
        this.index++;
        
        return ret;
    }
    
    /**
     * 触发
     */
    trigger(req, res, callback) {
        var first = this.takeHook();
        
        this.callback = callback;
        
        // 没有插件
        if(null === first || 'function' !== typeof first) {
            callback(req, res, null);
            return;
        }
        
        this.triggerHook(req, res, first);
    }
    
    triggerHook(req, res, next) {
        var _self = this;
        
        next(req, res, () => {
            var nextHandler = _self.takeHook();
            
            if(null !== nextHandler && 'function' === typeof nextHandler) {
                _self.triggerHook(req, res, nextHandler);
                return;
            }
            
            _self.callback(req, res, null);
            _self = null;
        });
    }
    
}

/**
 * instance
 */
Hook._instance = null;

module.exports = Hook;
