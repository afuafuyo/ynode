/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Event = require('../core/Event');

/**
 * base target
 */
class ITarget extends Event {

    /**
     * constructor
     */
    constructor() {
        super();
    }

    /**
     * flush log
     *
     * @param {Array} message the message to be logged
     */
    flush(messages) {}

    /**
     * 触发事件
     *
     * @param {String} eventName 事件名称
     * @param {Array} parameter 参数
     */
    trigger(eventName, parameter) {
        if(!this.eventsMap.has(eventName)) {
            return;
        }

        const handlers = this.eventsMap.get(eventName);
        for(let handler of handlers) {
            handler.flush(parameter);
        }
    }

}

/**
 * @property {String} EVENT_FLUSH 事件
 */
ITarget.EVENT_FLUSH = 'flush';

module.exports = ITarget;
