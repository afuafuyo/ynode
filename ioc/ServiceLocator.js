/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Y = require('../Y');
const InvalidConfigException = require('../core/InvalidConfigException');

/**
 * 服务定位器 [service locator](//en.wikipedia.org/wiki/Service_locator_pattern)
 *
 * eg.
 * const serviceLocator = new ServiceLocator();
 * serviceLocator.setServicesAsDefinition({
 *     service1: {
 *         "class": "somePath/Service1",
 *         "property1": "value1",
 *         "property2": "value2"
 *     },
 *     service2: {
 *         "class": "somePath/Service2"
 *     }
 * });
 *
 * const instanceService1 = serviceLocator.getService('service1');
 *
 */
class ServiceLocator {

    constructor() {
        /**
         * @property {Map<String, any>} services
         */
        this.services = new Map();

        /**
         * @property {Map<String, any>} definitions
         */
        this.definitions = new Map();
    }

    /**
     * 设置服务
     *
     * @param {String} key
     * @param {any} service
     */
    setService(key, service) {
        if(null === service) {
            this.services.delete(key);

            return;
        }

        this.services.set(key, service);
    }

    /**
     * 以定义方式设置服务
     *
     * @param {any} definition
     *
     * {
     *     'service1': {...},
     *     'service2': {...}
     * }
     *
     */
    setServicesAsDefinition(definition) {
        for(let key in definition) {
            if(null === definition[key]) {
                this.definitions.delete(key);

                continue;
            }

            if(undefined === definition[key].classPath) {
                throw new InvalidConfigException('The service configuration must contain a "classPath" key');
            }

            this.definitions.set(key, definition[key]);
        }
    }

    /**
     * 检查服务是否存在
     *
     * @param {String} key
     * @return {Boolean}
     */
    hasService(key) {
        return this.services.has(key) || this.definitions.has(key);
    }

    /**
     * 获取服务
     *
     * @param {String} key
     * @return {any | null}
     */
    getService(key) {
        if(this.services.has(key)) {
            return this.services.get(key);
        }

        if(this.definitions.has(key)) {
            return Y.createObject(this.definitions.get(key));
        }

        return null;
    }

}

module.exports = ServiceLocator;
