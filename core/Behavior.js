/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * 所有行为类的基类
 *
 * 一个行为类可以用于在不改变原组件代码的情况下增强其功能
 */
class Behavior /* extends Object */ {
    
    constructor() {
        /**
         * @property {Component} component 拥有行为的组件
         */
        this.component = null;
    }
    
    /**
     * 声明组件的事件回调
     *
     * @return {JSON}
     */
    events() {
        return {};
    }
    
    /**
     * 向组件附加行为
     *
     * @param {Component} component 组件
     */
    attach(component) {
        this.component = component;
        
        var events = this.events();
        
        for(let eventName in events) {
            this.component.on(eventName, events[eventName]);
        }
    }
    
    /**
     * 删除组件的行为
     */
    detach() {
        if(null !== this.component) {
            var events = this.events();
            
            for(let eventName in events) {
                this.component.off(eventName, events[eventName]);
            }
            
            this.component = null;
        }
    }
    
}

module.exports = Behavior;
