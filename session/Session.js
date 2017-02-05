/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Y = require('../Y');
var InvalidConfigException = require('../core/InvalidConfigException');

class Session {
    
    /**
     * 获取 Session 类实例
     *
     * @param Object request 请求
     * @param Object response 响应
     */
    static factorySync(request, response) {
        if(undefined === Y.app.session) {
            throw new InvalidConfigException('The session configuration is not found');
        }
        
        var clazz = Y.app.session['class'];
        var instance = Y.createObject(clazz, request, response);
        instance.init(Y.app.session);
        instance.open();
        
        return instance;
    }
    
}

module.exports = Session;
