/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Y = require('../Y');
var InvalidConfigException = require('../core/InvalidConfigException');
var InvalidArgumentException = require('../core/InvalidArgumentException');

class Cache {
    
    /**
     * 获取缓存实例
     *
     * @param {Object} cacheFlag
     */
    static getCache(cacheFlag) {
        if(undefined === cacheFlag) {
            throw new InvalidArgumentException('Invalid param: cacheFlag');
        }
        
        if(undefined === Y.app.cache || undefined === Y.app.cache[cacheFlag]) {
            throw new InvalidConfigException('No cache config found');
        }
        
        if(undefined === Y.app.cache[cacheFlag]['class']) {
            throw new InvalidConfigException('The cache config lost key: class');
        }
        
        if(undefined === Cache._caches[cacheFlag] || null === Cache._caches[cacheFlag]) {
            Cache._caches[cacheFlag] = Y.createObject(Y.app.cache[cacheFlag]['class'],
                Y.app.cache[cacheFlag]);
            
            Cache._caches[cacheFlag].init();
        }
        
        return Cache._caches[cacheFlag];
    }
    
}

/**
 * @var {Map<String, Object>} _caches
 */
Cache._caches = {};

module.exports = Cache;
