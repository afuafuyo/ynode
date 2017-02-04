/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Y = require('../Y');
var CoreApp = require('../core/Application');
var Request = require('./Request');
var Resource = require('./Resource');
var StringHelper = require('../helpers/StringHelper');
var Userroute = require('./Userroute');
var InvalidCallException = require('../core/InvalidCallException');

/**
 * web 应用
 */
class Application extends CoreApp {
    
    /**
     * @inheritdoc
     */
    constructor(config) {
        super(config);
    }
    
    /**
     * @inheritdoc
     */
    requestListener(request, response) {
        var pathname = Request.parseUrl(request).pathname;
        if(Resource.isStatic(pathname)) {
            Resource.handler(request, response);
            return;
        }
        
        var controller = this.createController(request);
        
        if(null === controller || !'run' in controller) {
            throw new InvalidCallException('The Controller.run is not a function')
        }
        
        controller.run(request, response);
    }
    
    /**
     * @inheritdoc
     */
    createController(request) {
        var route = Request.parseUrl(request).pathname;
        route = StringHelper.lTrimChar(route, '/');
        
        // route eg. index/index
        if('' === route || '/' === route) {
            route = this.defaultRoute;
        }
        
        // 检测非法 与 路径中不能有双斜线 '//'
        if(!/^[\w\-\/]+$/.test(route) || route.indexOf('//') >= 0) {
            return null;
        }
        
        var moduleId = '';
        var controllerId = '';
        var routePrefix = '';  // 前缀目录
        
        var userroute = Userroute.resolve(this, route, request);
        // 有用户自定义路由 优先解析自定义路由
        if(null !== userroute) {
            moduleId = userroute.moduleId;
            controllerId = userroute.controllerId;
            routePrefix = userroute.routePrefix;
            
        } else {
            // 解析路由
            let pos = route.indexOf('/');
            if(-1 !== pos) {
                moduleId = route.substring(0, pos);
                controllerId = route.substring(pos + 1);
            } else {
                moduleId = route;
            }
            
            // 解析前缀目录和控制器 id
            routePrefix = moduleId;
            if( -1 !== (pos = controllerId.lastIndexOf('/')) ) {
                routePrefix += '/' + controllerId.substring(0, pos);
                controllerId = controllerId.substring(pos + 1);
            }
        }
        
        // 保存当前控制器标示
        this.controllerId = '' === controllerId ? this.defaultControllerId : controllerId;
        
        // 搜索顺序 模块控制器 -> 普通控制器
        // 模块没有前缀目录
        if('' !== moduleId && null !== this.modules && undefined !== this.modules[moduleId]) {
            var clazz = StringHelper.trimChar(this.modules[moduleId], '/') + '/controllers/' +
                StringHelper.ucFirst(this.controllerId) + 'Controller';
            this.moduleId = moduleId;
            
            return Y.createObject(clazz);
        }
        
        // 普通控制器有前缀目录
        this.routePrefix = '' === routePrefix ? this.controllerId : routePrefix;

        return Y.createObject( this.defaultControllerNamespace + '/' +
            this.routePrefix + '/' + StringHelper.ucFirst(this.controllerId) + 'Controller' );
    }
     
}

module.exports = Application;
