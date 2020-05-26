/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * 缓存接口
 */
class ICache {

    /**
     * 进行初始化
     */
    init() {}

    /**
     * 同步写入缓存
     *
     * @param {String} key 缓存键
     * @param {String} value 缓存值
     * @param {Number} duration 缓存时间 毫秒
     */
    setSync(key, value, duration) {}

    /**
     * 异步写入缓存
     *
     * @param {String} key 缓存键
     * @param {String} value 缓存值
     * @param {Number} duration 缓存时间 毫秒
     * @return {Promise}
     * @throws {Error}
     */
    set(key, value, duration) {}

    /**
     * 同步读取缓存
     *
     * @param {String} key 缓存键
     * @return {any}
     */
    getSync(key) {}

    /**
     * 异步读取缓存
     *
     * @param {String} key 缓存键
     * @return {Promise}
     * @throws {Error}
     */
    get(key) {}

    /**
     * 同步删除缓存
     *
     * @param {String} key 缓存键
     */
    deleteSync(key) {}

    /**
     * 异步删除缓存
     *
     * @param {String} key 缓存键
     * @return {Promise}
     * @throws {Error}
     */
    delete(key) {}

}

module.exports = ICache;
