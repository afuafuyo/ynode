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
     */
    static getSession() {
        if(undefined === Y.app.session) {
            throw new InvalidConfigException('The session configuration is not found');
        }
        
        if(null === Session._instance) {
            var clazz = Y.app.session.target['class'];
            Session._instance = Y.createObject(clazz);
            Session._instance.init(Y.app.session.target);
        }
        
        return Session._instance;
    }
    
}

/**
 * 实例
 */
Session._instance = null;

module.exports = Session;
