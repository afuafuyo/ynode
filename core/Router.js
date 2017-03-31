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
     * @param JSON routes
     *
     * @return JSON
     */
    static combineRoutes(routes) {
        var ret = {};
        var patternArray = [];
        var paramArray = [];
        var handlerArray = [];
        
        var parsedRoute = null;
        for(let reg in routes) {
            parsedRoute = Router.parse(reg);
            
            // 为每个模式添加一个括号 用于定位匹配到的是哪一个模式
            patternArray.push( '(' + parsedRoute.pattern + ')' );
            paramArray.push(parsedRoute.params);
            handlerArray.push(routes[reg])
        }
        
        ret.pattern = patternArray.join('|');
        ret.params = paramArray;
        ret.handlers = handlerArray;
        
        return ret;
    }
    
    /**
     * 解析正则路由
     *
     * @param String pattern 路由模式
     *
     * pattern: /abc/{id:\d+} -> /abc/(id:\d+) -> /abc/(\d+) -> abc\/(\d+)
     * pattern: /abc/{id:} -> /abc/(id:) -> /abc/() -> abc\/(\w+)
     * pattern: /abc/{\w+} -> /abc/(\w+) -> abc\/(\w+)
     * pattern: /abc/def -> abc\/def
     *
     * @return JSON
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
