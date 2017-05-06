/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Y = require('../Y');
var Behavior = require('./Behavior');

/**
 * 组件是实现 属性 (property) 行为 (behavior) 事件 (event) 的基类
 */
class Component {
    
    /**
     * constructor
     */
    constructor() {
        this.ensureDeclaredBehaviorsAttached();
        
        // 注入
        // 相对于其他编程语言来说这种处理方式并不是很好
        // 但在 javascript 中没找到更好的解决方式 暂时写成这样了
        var ret = null;
        for(let name in Component._behaviors) {
            // 属性
            ret = Object.getOwnPropertyNames(Component._behaviors[name]);
            for(let i=0,len=ret.length; i<len; i++) {
                if(undefined !== this[ret[i]]) {
                    continue;
                }
                
                this[ret[i]] = Component._behaviors[name][ret[i]];
            }
            
            // 方法
            ret = Object.getOwnPropertyNames(Object.getPrototypeOf(Component._behaviors[name]));
            for(let i=0,len=ret.length; i<len; i++) {
                if('constructor' === ret[i] || undefined !== this[ret[i]]) {
                    continue;
                }
                
                this[ret[i]] = Component._behaviors[name][ret[i]];
            }
        }
    }
    
    /**
     * 返回该组件的行为列表
     *
     * 子类组件可以重写该方法去指定要附加的行为类
     *
     * @return {JSON}
     *
     * {
     *     'behaviorName': {
     *         'class': 'BehaviorClass'
     *     },
     *     'behaviorName2': 'BehaviorClass2'
     *     'behaviorName3': BehaviorClassInstance
     * }
     *
     */
    behaviors() {
        return {};
    }
    
    /**
     * 确保 behaviors() 声明的行为已经附加到组件
     */
    ensureDeclaredBehaviorsAttached() {
        // 只执行一次
        if(null === Component._behaviors) {
            Component._behaviors = {};
            
            var behaviors = this.behaviors();
            for(let name in behaviors) {
                this.attachBehaviorInternal(name, behaviors[name]);
            }
        }
    }
    
    /**
     * 向组件附加一个行为
     *
     * @param {String} name 行为的名称
     * @param {String | Object | JSON} behavior
     */
    attachBehavior(name, behavior) {
        this.ensureDeclaredBehaviorsAttached();
        
        this.attachBehaviorInternal(name, behavior);
    }
    
    /**
     * 向组件附加一个行为
     *
     * @param {String} name 行为的名称
     * @param {String | Object | JSON} behavior
     */
    attachBehaviorInternal(name, behavior) {
        if(!(behavior instanceof Behavior)) {
            behavior = Y.createObject(behavior);
        }
        
        if(undefined !== Component._behaviors[name]) {
            Component._behaviors[name].detach();
        }
        
        behavior.attach(this);
        Component._behaviors[name] = behavior;
    }
    
    /**
     * 注册事件
     *
     * @param {String} eventName 事件名称
     * @param {Function} handler 回调函数
     */
    on(eventName, handler) {
        if(undefined === Component._events[eventName]) {
            Component._events[eventName] = [];
        }
        
        Component._events[eventName].push(handler);
    }
    
    /**
     * 注销事件
     *
     * @param {String} eventName 事件名称
     * @param {Function} handler 回调函数
     */
    off(eventName, handler) {
        if(undefined !== Component._events[eventName]) {
            if(undefined === handler) {
                delete Component._events[eventName];
                
            } else {
                for(let i=0,len=Component._events[eventName].length; i<len; i++) {
                    if(handler === Component._events[eventName][i]) {
                        Component._events[eventName].splice(i, 1);
                    }
                }
            }
        }
    }
    
    /**
     * 触发
     *
     * @param {String} eventName 事件名称
     * @param {Array} param 参数
     */
    trigger(eventName, param) {
        if(undefined !== Component._events[eventName]) {
            for(let i=0,len=Component._events[eventName].length; i<len; i++) {
                undefined === param ? Component._events[eventName][i]() :
                    Component._events[eventName][i].apply(null, param);
            }
        }
    }
    
}

/**
 * @var {JSON} _events the attached event handlers
 *
 * {
 *     'eventName': [fn1, fn2...]
 *     'eventName2': [fn1, fn2...]
 * }
 *
 */
Component._events = {};

/**
 * @var {JSON} _behaviors the attached behaviors
 */
Component._behaviors = null;

module.exports = Component;
