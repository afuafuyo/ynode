/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * 服务定位器
 */
class ServiceLocator {
    
    /**
     * constructor
     */
    constructor() {
        /**
         * @property {Map} services
         */
        this.services = new Map();
    }
    
    /**
     * 注册一个服务
     *
     */
    setService(key, service) {
        
    }
    
    getService(key) {}
    
}

module.exports = ServiceLocator;
