/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var StringHelper = require('../helpers/StringHelper');

class Router {
    
    /**
     * 合并路由
     *
     * @param {JSON} routes
     *
     * { pattern: string 处理程序 | JSON 路由配置 | other }
     *
     * eg.
     *
     * { '/abc': 'app/api/Abc@index' ... }
     * { '/abc': {'controllerId': 'index'} ... }
     *
     * @return {JSON}
     *
     * {
     *   pattern: '(abc\\/(\\d+))|(abc)|(xyz\\/other)',
     *   params: [ [ 'id' ], null, null ],
     *   handler: [ { controllerId: '' }, { moduleId: '' }, { routePrefix: '' } ]
     *   or
     *   handler: [ Function, Function, 'Abc@index' ]
     * }
     *
     */
    static combineRoutes(routes) {
        var ret = {};
        var patternArray = [];
        var paramArray = [];
        var handler = [];  // 路由配置
        
        var parsedRoute = null;
        for(let reg in routes) {
            parsedRoute = Router.parse(reg);
            
            // 为每个模式添加一个括号 用于定位匹配到的是哪一个模式
            patternArray.push( '(' + parsedRoute.pattern + ')' );
            paramArray.push(parsedRoute.params);
            handler.push(routes[reg]);
        }
        
        ret.pattern = patternArray.join('|');
        ret.params = paramArray;
        ret.handler = handler;
        
        return ret;
    }
    
    /**
     * 查找匹配的路由的位置
     *
     * @param {JSON} combinedRoute 合并的路由
     * @param {Array} matches 路由匹配结果
     * @return {Array}
     */
    static combinedRouteMatchPosition(combinedRoute, matches) {
        // 匹配到第几个路由
        var matchedRouteSegment = -1;
        // 匹配到第几个子模式
        var subPatternPosition = -1;
        var tmpLine = null;
        
        // matches: [ 'xyz/other', undefined, undefined, undefined, 'xyz/other']
        for(let i=1,len=matches.length; i<len; i++) {
            if(undefined !== matches[i]) {
                subPatternPosition = i;
                break;
            }
        }
        
        // '(' 在 pattern 中第 subPatternPosition 次出现的位置
        // 用于确定当前路由匹配的是第几部分
        matchedRouteSegment = StringHelper.indexOfN(combinedRoute.pattern, '(', subPatternPosition);
        tmpLine = combinedRoute.pattern.substring(0, matchedRouteSegment).match(/\|/g);
        // 没有匹配到竖线 说明匹配的是第一部分
        matchedRouteSegment = null === tmpLine ? 0 : tmpLine.length;
        
        return [matchedRouteSegment, subPatternPosition];
    }
    
    /**
     * 解析正则路由
     *
     * @param {String} pattern 路由模式
     *
     * pattern: /abc/{id:\d+} -> /abc/(id:\d+) -> /abc/(\d+) -> abc\/(\d+)
     * pattern: /abc/{id:} -> /abc/(id:) -> /abc/() -> abc\/(\w+)
     * pattern: /abc/{\w+} -> /abc/(\w+) -> abc\/(\w+)
     * pattern: /abc/def -> abc\/def
     *
     * @return {JSON}
     */
    static parse(pattern) {
        var ret = null;
        
        // format
        pattern = pattern.replace(/\{/g, '(').replace(/\}/g, ')');
        // search params
        var matches = pattern.match(/\(\w+:/g);
        // replace params
        if(null !== matches) {
            ret = new Array(matches.length);
            
            for(let i=0,len=matches.length; i<len; i++) {
                pattern = pattern.replace(matches[i], '(');
                pattern = pattern.replace('()', '(\\w+)');
                
                ret[i] = matches[i].substring(1, matches[i].indexOf(':'));
            }
        }
        
        pattern = StringHelper.trimChar(pattern, '/');
        pattern = pattern.replace(/\//g, '\\/');
        
        return {
            pattern: pattern,
            params: ret
        };
    }
    
}

module.exports = Router;
