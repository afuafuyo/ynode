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
            /*
            {
                pattern: '(abc\\/(\\d+))|(abc)|(xyz\\/other)',
                params: [ [ 'id' ], null, null ],
                handlers: [ { controllerId: '' }, { moduleId: '' }, { routePrefix: '' } ]
            }
            */
            var combine = Router.combineRoutes(app.routes);
            
            // [ 'xyz/other', undefined, undefined, undefined, 'xyz/other']
            var matches = route.match( new RegExp('(?:' + combine.pattern + ')$') );
            
            if(null !== matches) {
                var subPatternIndex = -1;
                var index = -1;
                var verticalLine = null;
                
                // 计算匹配到的子模式
                for(let i=1,len=matches.length; i<len; i++) {
                    if(undefined !== matches[i]) {
                        subPatternIndex = i;
                        break;
                    }
                }
                
                // '(' 在 pattern 中第 subPatternIndex 次出现的位置
                // 用于确定当前路由匹配的是第几部分
                index = StringHelper.indexOfN(combine.pattern, '(', subPatternIndex);
                verticalLine = combine.pattern.substring(0, index).match(/\|/g);
                // 没有匹配到竖线 说明匹配的是第一部分
                index = null === verticalLine ? 0 : verticalLine.length;
                
                if(undefined !== combine.handlers[index].moduleId) {
                    moduleId = combine.handlers[index].moduleId;
                }
                if(undefined !== combine.handlers[index].controllerId) {
                    controllerId = combine.handlers[index].controllerId;
                }
                if(undefined !== combine.handlers[index].routePrefix) {
                    routePrefix = combine.handlers[index].routePrefix;
                }
                
                // 参数
                if(null !== combine.params[index]) {
                    let requestInstance = new Request(request);
                        
                    for(let i=0,len=combine.params[index].length; i<len; i++) {
                        requestInstance.setQueryString(combine.params[index][i],
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
