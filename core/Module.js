/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Y = require('../Y');
var StringHelper = require('../helpers/StringHelper');

/**
 * MVC 基类
 */
class Module {
    
    /**
     * constructor
     */
    constructor() {
        /**
         * @property {JSON} modules 注册的模块
         *
         * 'modules': {
         *     'bbs': 'app/modules/bbs'
         * }
         */
        this.modules = null;
        
        /**
         * @property {String} defaultRoute 默认路由
         */
        this.defaultRoute = 'index/index';
        
        /**
         * @property {String} defaultControllerNamespace 默认控制器命名空间
         */
        this.defaultControllerNamespace = 'app/controllers';
        
        /**
         * @property {String} defaultControllerId 默认控制器
         */
        this.defaultControllerId = 'index';
        
        /**
         * @property {String} moduleId 当前的模块
         */
        this.moduleId = '';
        
        /**
         * @property {String} controllerId 当前的控制器
         */
        this.controllerId = '';
        
        /**
         * @property {String} subRoute 子目录
         *
         * eg. subRoute = ''  ->  app/views/xxx.html
         * eg. subRoute = 'subdir'  ->  app/views/subdir/xxx.html
         *
         */
        this.subRoute = '';
    }
    
    /**
     * 创建控制器实例
     *
     * @param {String} route 路由
     */
    createController(route) {
        this.moduleId = this.controllerId = this.subRoute = '';
        
        route = StringHelper.lTrimChar(route, '/');
        
        // route eg. index/index
        if('' === route || '/' === route) {
            route = this.defaultRoute;
        }
        
        // 检测非法
        if(!/^[\w\-\/]+$/.test(route) || route.indexOf('//') >= 0) {
            return null;
        }
        
        // 解析路由
        // 目录前缀或模块 id
        var id = '';
        var pos = route.indexOf('/');
        if(-1 !== pos) {
            id = route.substring(0, pos);
            route = route.substring(pos + 1);
            this.controllerId = route;
            
        } else {
            id = route;
            route = '';
        }
        
        // 保存前缀
        this.subRoute = id;
        
        // 保存当前控制器标识
        if( -1 !== (pos = route.lastIndexOf('/')) ) {
            this.subRoute = this.subRoute + '/' + route.substring(0, pos);
            
            this.controllerId = route.substring(pos + 1);
        }
        if('' === this.controllerId) {
            this.controllerId = this.defaultControllerId;
        }
        
        // 搜索顺序 模块控制器 -> 普通控制器
        // 模块没有前缀目录
        var clazz = '';
        if(null !== this.modules && undefined !== this.modules[id]) {
            this.moduleId = id;
            
            clazz = StringHelper.trimChar(this.modules[id], '/')
                + '/controllers/'
                + StringHelper.ucFirst(this.controllerId) + 'Controller';
            
            return Y.createObject(clazz);
        }
        
        clazz = this.defaultControllerNamespace
            + '/'
            + this.subRoute
            + '/'
            + StringHelper.ucFirst(this.controllerId) + 'Controller';
        
        return Y.createObject(clazz);
    }
    
}

module.exports = Module;
