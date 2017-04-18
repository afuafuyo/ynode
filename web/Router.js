/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Request = require('./Request');
var CoreRouter = require('../core/Router');
var StringHelper = require('../helpers/StringHelper');

class Router extends CoreRouter {
    
    /**
     * 解析路由
     *
     * @param {Object} app
     * @param {String} route
     * @param {Object} request
     */
    static resolve(app, route, request) {
        var ret = true === app.combineRoutes ?
            Router.resolveUserroutesCombine(app, route, request) :
            Router.resolveUserroutesOneByOne(app, route, request);
        
        if(null !== ret) {
            return ret;
        }
        
        return Router.resolveRoute(route, request);
    }
    
    // 合并解析用户路由
    static resolveUserroutesCombine(app, route, request) {
        var moduleId = '';
        var controllerId = '';
        var routePrefix = '';
        
        if(null !== app.routes) {
            var combinedRoute = Router.combineRoutes(app.routes);
            var matches = route.match( new RegExp('(?:' + combinedRoute.pattern + ')$') );
            
            if(null !== matches) {
                var [index, subPatternIndex] = Router.combinedRouteMatchPosition(combinedRoute, matches);
                
                if(undefined !== combinedRoute.handler[index].moduleId) {
                    moduleId = combinedRoute.handler[index].moduleId;
                }
                if(undefined !== combinedRoute.handler[index].controllerId) {
                    controllerId = combinedRoute.handler[index].controllerId;
                }
                if(undefined !== combinedRoute.handler[index].routePrefix) {
                    routePrefix = combinedRoute.handler[index].routePrefix;
                }
                
                // 参数
                if(null !== combinedRoute.params[index]) {
                    let requestInstance = new Request(request);
                        
                    for(let i=0,len=combinedRoute.params[index].length; i<len; i++) {
                        requestInstance.setQueryString(combinedRoute.params[index][i],
                            matches[subPatternIndex + i + 1]);
                    }
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
    
    // 依次解析用户路由
    static resolveUserroutesOneByOne(app, route, request) {
        var moduleId = '';
        var controllerId = '';
        var routePrefix = '';
        
        if(null !== app.routes) {
            var mapping = null;
            var parsedRoute = null;
            var matches = null;
            
            for(let pattern in app.routes) {
                mapping = app.routes[pattern];
                
                parsedRoute = Router.parse(pattern);
                mapping.params = parsedRoute.params;  // null or array
                
                // 路由 end with $ 精确匹配
                matches = route.match( new RegExp(parsedRoute.pattern + '$') );
                    
                if(null !== matches) {
                    if(undefined !== mapping.moduleId) {
                        moduleId = mapping.moduleId;
                    }
                    if(undefined !== mapping.controllerId) {
                        controllerId = mapping.controllerId;
                    }
                    if(undefined !== mapping.routePrefix) {
                        routePrefix = mapping.routePrefix;
                    }
                    
                    // 用户自定义路由需要处理参数
                    if(null !== mapping.params) {
                        let requestInstance = new Request(request);
                        
                        for(let i=0,len=mapping.params.length; i<len; i++) {
                            requestInstance.setQueryString(mapping.params[i],
                                matches[i+1]);
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
    
    // 基本路由
    static resolveRoute(route, request) {
        var moduleId = '';
        var controllerId = '';
        var routePrefix = '';
        
        // 解析路由
        var pos = route.indexOf('/');
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
        
        return {
            moduleId: moduleId,
            controllerId: controllerId,
            routePrefix: routePrefix
        }
    }
    
}

module.exports = Router;
