/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Request = require('./Request');
var StringHelper = require('../helpers/StringHelper');

class Userroute {
    
    /**
     * 执行
     */
    static resolve(app, route, request) {
        if(null !== app.routes) {
            var moduleId = '';
            var controllerId = '';
            var routePrefix = '';
            
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
    
}

module.exports = Userroute;
