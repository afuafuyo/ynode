/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var StringHelper = require('../helpers/StringHelper');

class Router {
    
    /**
     * 检测路由合法性
     *
     * @param {String} route 路由
     * @return {Boolean}
     */
    static isValidRoute(route) {
        // 检测非法 与 路径中不能有双斜线 '//'
        if(!/^[\w\-\/]+$/.test(route) || route.indexOf('//') >= 0) {
            return false;
        }
        
        return true;
    }
    
    /**
     * 合并路由
     *
     * @param {JSON} routes
     *
     * { pattern: any ... }
     *
     * @return {JSON}
     *
     * eg.
     *
     * {
     *   pattern: '(abc\\/(\\d+))|(abc)|(xyz\\/other)',
     *   params: [ [ 'id' ], null, null ],
     *   handler: any
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
     * @param {Number} subPatternPosition 匹配的子模式位置
     * @return {Number}
     */
    static getMatchedSegmentBySubPatternPosition(combinedRoute, subPatternPosition) {
        // '(' 在 pattern 中第 subPatternPosition 次出现的位置
        // 用于确定当前路由匹配的是第几部分
        var segment = StringHelper.indexOfN(combinedRoute.pattern, '(', subPatternPosition);
        var tmpLine = combinedRoute.pattern.substring(0, segment).match(/\|/g);
        // 没有匹配到竖线 说明匹配的是第一部分
        segment = null === tmpLine ? 0 : tmpLine.length;
        
        return segment;
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
