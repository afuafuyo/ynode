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
        var pathname = Request.getInstance().parse(request).pathname;
        if(Resource.isStatic(pathname)) {
            Resource.handler(request, response);
            return;
        }
        
        var controller = this.createController(request);
        
        if(null === controller || !'run' in controller) {
            throw new TypeError('The Controller.run is not a function')
        }
        
        controller.run(request, response);
    }
    
    /**
     * @inheritdoc
     */
    createController(request) {
        var route = Request.getInstance().parse(request).pathname;
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
        
        var userRoute = this.resolveUserRoute(route, request);
        // 有用户自定义路由 优先解析自定义路由
        if(null !== userRoute) {
            moduleId = userRoute.moduleId;
            controllerId = userRoute.controllerId;
            routePrefix = userRoute.routePrefix;
            
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
            
            return Y.createAppObject(clazz);
        }
        
        // 普通控制器有前缀目录
        this.routePrefix = '' === routePrefix ? this.controllerId : routePrefix;

        return Y.createAppObject( this.defaultControllerNamespace + '/' +
            this.routePrefix + '/' + StringHelper.ucFirst(this.controllerId) + 'Controller' );
    }
    
    /**
     * 解析自定义路由 自定义路由会明确给出模块或控制器 id
     *
     * @param String route 路由
     * @param Object request 请求对象
     */
    resolveUserRoute(route, request) {
        if(null !== this.routes) {
            var moduleId = '';
            var controllerId = '';
            var routePrefix = '';
            
            var mapping = null;
            var matches = null;
            var requestInstance = Request.getInstance();
            
            for(let reg in this.routes) {
                mapping = this.routes[reg];
                // reg: /abc/(\d+) -> abc\/(\d+)
                matches = route.match( new RegExp(StringHelper.trimChar(reg, '/')
                    .replace('/', '\\/')) );
                    
                if(null !== matches) {
                    if(undefined !== mapping.moduleId) {
                        moduleId = mapping.moduleId;
                    }
                    if(undefined !== mapping.controllerId) {
                        controllerId = mapping.controllerId;
                    }
                    if(undefined !== mapping.prefix) {
                        routePrefix = mapping.prefix;
                    }
                    // 用户自定义路由需要处理参数
                    if(undefined !== mapping.params && null !== mapping.params && 'object' === typeof mapping.params) {
                        if(undefined !== mapping.params.key &&
                            undefined !== mapping.params.segment) {
                            
                            if(Array.isArray(mapping.params.key)) {
                                for(let j=0,len=mapping.params.key.length; j<len; j++) {
                                    requestInstance.setGetParam(request,
                                        mapping.params.key[j],
                                        matches[mapping.params.segment[j]]);
                                }
                            
                            } else {
                                requestInstance.setGetParam(request,
                                    mapping.params.key,
                                    matches[mapping.params.segment]);
                            }
                        }
                    }
                    
                    break;
                }
            }
            
            return ('' !== moduleId || '' !== controllerId) ? {
                moduleId: moduleId,
                controllerId: controllerId,
                routePrefix: routePrefix
            } : null;
        }
        
        return null;
    }
    
}

module.exports = Application;
