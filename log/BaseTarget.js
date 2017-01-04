'use strict';

var Event = require('../core/Event');

/**
 * base target
 */
class BaseTarget extends Event {
    
    /**
     * constructor
     */
    constructor() {
        super();
        
        /**
         * 事件
         */
        this.EVENT_FLUSH = 'flush';
    }
    
    /**
     * flush log
     *
     * @param Array message the message to be logged
     */
    flush(messages) {}
    
    /**
     * 事件
     */
    trigger(eventName, param) {
        if(undefined !== this.handlers[eventName]) {
            for(let handler of this.handlers[eventName]) {
                handler.flush(param);
            }
        }
    }
    
}

module.exports = BaseTarget;
