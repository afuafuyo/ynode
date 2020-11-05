/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Y = require('../Y');
const InvalidConfigException = require('../core/InvalidConfigException');
const InvalidArgumentException = require('../core/InvalidArgumentException');
const ICache = require('./ICache');

class Cache {

    /**
     * 获取缓存实例
     *
     * @param {Object} cacheFlag
     * @return {ICache}
     */
    static getCache(cacheFlag) {
        if(undefined === cacheFlag) {
            throw new InvalidArgumentException('Argument must be provide for getCache()');
        }

        if(undefined === Y.app.cache || undefined === Y.app.cache[cacheFlag]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }

        if(undefined === Y.app.cache[cacheFlag].classPath) {
            throw new InvalidConfigException('The classPath of cache configuration is not found');
        }

        if(undefined === Cache._caches[cacheFlag] || null === Cache._caches[cacheFlag]) {
            Cache._caches[cacheFlag] = Y.createObject(Y.app.cache[cacheFlag].classPath,
                Y.app.cache[cacheFlag]);

            Cache._caches[cacheFlag].init();
        }

        return Cache._caches[cacheFlag];
    }

}

/**
 * @var {Map<String, ICache>} _caches
 */
Cache._caches = {};

module.exports = Cache;
