/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Request = require('./Request');
var StringHelper = require('../helpers/StringHelper');

class Router {
    
    /**
     * 解析路由
     *
     * @param Object app
     * @param String route
     * @param Object request
     */
    static resolve(app, route, request) {
        var ret = Route.resolveUserroute(app, route, request);
        
        if(null !== ret) {
            return ret;
        }
        
        return Route.resolveRoute(route, request);
    }
    
    // 用户自定义路由
    static resolveUserroute(app, route, request) {
        var moduleId = '';
        var controllerId = '';
        var routePrefix = '';
        
        if(null !== app.routes) {            
            var mapping = null;
            var matches = null;
            
            for(let reg in app.routes) {
                mapping = app.routes[reg];
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
                            
                            let requestInstance = new Request(request);
                            if(Array.isArray(mapping.params.key)) {
                                for(let j=0,len=mapping.params.key.length; j<len; j++) {
                                    requestInstance.setGetParam(mapping.params.key[j],
                                        matches[mapping.params.segment[j]]);
                                }
                            
                            } else {
                                requestInstance.setGetParam(mapping.params.key,
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
