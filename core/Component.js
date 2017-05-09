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
        /**
         * @var {JSON} _events the attached event handlers
         *
         * {
         *     'eventName': [fn1, fn2...]
         *     'eventName2': [fn1, fn2...]
         * }
         *
         */
        this._events = {};
        
        /**
         * @var {JSON} _behaviors the attached behaviors
         *
         * {
         *     'behaviorName': BehaviorInstance
         *     ...
         * }
         *
         */
        this._behaviors = {};
        
        this.ensureDeclaredBehaviorsAttached();
        this.init();
    }
    
    // 行为注入组件
    init() {
        if(0 === Object.keys(this._behaviors).length) return;
        
        // 相对于其他编程语言来说这种处理方式并不是很好
        // 但在 javascript 中没找到更好的解决方式 暂时写成这样了
        var ret = null;
        for(let name in this._behaviors) {
            // 本身
            ret = Object.getOwnPropertyNames(this._behaviors[name]);
            for(let i=0,len=ret.length; i<len; i++) {
                if(undefined !== this[ret[i]]) {
                    continue;
                }
                
                this[ret[i]] = this._behaviors[name][ret[i]];
            }
            
            // 原型链
            ret = Object.getOwnPropertyNames(Object.getPrototypeOf(this._behaviors[name]));
            for(let i=0,len=ret.length; i<len; i++) {
                if('constructor' === ret[i] || undefined !== this[ret[i]]) {
                    continue;
                }
                
                this[ret[i]] = this._behaviors[name][ret[i]];
            }
        }
    }
    
    /**
     * 声明该组件的行为列表
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
     * 确保 behaviors() 声明的行为已保存到组件
     */
    ensureDeclaredBehaviorsAttached() {
        var behaviors = this.behaviors();
        for(let name in behaviors) {
            this.attachBehaviorInternal(name, behaviors[name]);
        }
    }
    
    /**
     * 向组件附加一个行为
     *
     * @param {String} name 行为的名称
     * @param {String | Object | JSON} behavior
     */
    attachBehavior(name, behavior) {        
        this.attachBehaviorInternal(name, behavior);
    }
    
    /**
     * 删除组件的行为
     *
     * @param {String} name 行为的名称
     * @return {Object | null}
     */
    detachBehavior(name) {
        if(undefined !== this._behaviors[name]) {
            var behavior = this._behaviors[name];
            
            delete this._behaviors[name];
            behavior.unListen();
            
            return behavior;
        }
        
        return null;
    }
    
    /**
     * 保存行为类到组件
     *
     * @param {String} name 行为的名称
     * @param {String | Object | JSON} behavior
     */
    attachBehaviorInternal(name, behavior) {
        if(!(behavior instanceof Behavior)) {
            behavior = Y.createObject(behavior);
        }
        
        if(undefined !== this._behaviors[name]) {
            this._behaviors[name].unListen();
        }
        
        // 行为类可以监听组件的事件并处理
        behavior.listen(this);
        this._behaviors[name] = behavior;
    }
    
    /**
     * 注册事件
     *
     * @param {String} eventName 事件名称
     * @param {Function} handler 回调函数
     */
    on(eventName, handler) {
        if(undefined === this._events[eventName]) {
            this._events[eventName] = [];
        }
        
        this._events[eventName].push(handler);
    }
    
    /**
     * 注销事件
     *
     * @param {String} eventName 事件名称
     * @param {Function} handler 回调函数
     */
    off(eventName, handler) {
        if(undefined !== this._events[eventName]) {
            if(undefined === handler) {
                delete this._events[eventName];
                
            } else {
                for(let i=0,len=this._events[eventName].length; i<len; i++) {
                    if(handler === this._events[eventName][i]) {
                        this._events[eventName].splice(i, 1);
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
        if(undefined !== this._events[eventName]) {
            for(let i=0,len=this._events[eventName].length; i<len; i++) {
                undefined === param ? this._events[eventName][i]() :
                    this._events[eventName][i].apply(null, param);
            }
        }
    }
    
}

module.exports = Component;
