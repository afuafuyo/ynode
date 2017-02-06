/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var StringHelper = require('../helpers/StringHelper');
var InvalidArgumentException = require('./InvalidArgumentException');

class Router {
    
    /**
     * 解析正则路由
     *
     * @param String pattern 路由模式
     *
     * pattern: /abc/{id:\d+} -> /abc/(\d+) -> abc/(\d+)
     * pattern: /abc/{id:} -> /abc/() -> abc/(\w+)
     * pattern: /abc/{\d+} -> abc/(\d+)
     * pattern: /abc/def -> abc/def
     *
     */
    static parse(pattern) {
        if('string' !== typeof pattern) {
            throw new InvalidArgumentException('The argument must be a string');
        }
        var ret = null;
        
        pattern = pattern.replace(/\{/g, '(').replace(/\}/g, ')');
        // search key
        var matches = pattern.match(/\(\w+:/g);
        // replace
        if(null !== matches) {
            ret = [];
            
            for(let i=0,len=matches.length; i<len; i++) {
                pattern = pattern.replace(matches[i], '(');
                pattern = pattern.replace('()', '(\\w+)');
                
                ret.push( matches[i].substring(1, matches[i].indexOf(':')) );
            } 
        }
        
        pattern = StringHelper.trimChar(pattern, '/');
        
        return {
            pattern: pattern,
            params: ret
        };
    }
    
}

module.exports = Router;
