/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Y = require('../Y');
var CoreApp = require('../core/Application');
var Request = require('./Request');
var StringHelper = require('../helpers/StringHelper');
var Router = require('./Router');
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
        var controller = this.createController(request);
        
        if(null === controller || !'run' in controller) {
            throw new InvalidCallException('The Controller.run is not a function');
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
        
        // 检测非法
        if(!Router.isValidRoute(route)) {
            return null;
        }
        
        // 解析路由
        var router = Router.resolve(this, route, request);
        var moduleId = router.moduleId;
        var controllerId = router.controllerId;
        var routePrefix = router.routePrefix;  // 前缀目录
        
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
