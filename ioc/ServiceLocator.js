/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * 服务定位器 [service locator](//en.wikipedia.org/wiki/Service_locator_pattern)
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
        
        /**
         * @property {Map} definitions
         */
        this.definitions = new Map();
    }
    
    /**
     * 设置服务
     *
     * @param {String} key
     * @param {Object} service
     */
    setService(key, service) {
        
    }
    
    /**
     * 以定义方式设置服务
     *
     * @param {String} key
     * @param {JSON} definition
     */
    setServiceAsDefinition(key, definition) {
        
    }
    
    /**
     * 获取服务
     *
     * @param {String} key
     * @return {Object}
     */
    getService(key) {
        
    }
    
}

module.exports = ServiceLocator;
