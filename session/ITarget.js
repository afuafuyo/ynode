/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * Session base
 */
class ITarget {
    
    /**
     * init 进行一些配置操作
     */
    init(config) {}
    
    /**
     * 打开 session 前置工作
     */
    open() {}
	
    /**
     * 关闭 session
     */
    close() {}
    
    /**
     * 读取
     *
     * @param {String} key
     * @param {Function} callback
     */
    get(key, callback) {}
    
    /**
     * 同步读取
     *
     * @param {String} key
     */
    getSync(key) {}
    
    /**
     * 写入
     *
     * @param {String} key
     * @param {String} data session data
     * @param {Function} callback
     */
    set(key, data, callback) {}
    
    /**
     * 同步写入
     *
     * @param {String} key
     * @param {String} data session data
     */
    setSync(key, data) {}
    
    /**
     * 删除
     *
     * @param {String} key
     * @param {Function} callback
     */
    destroy(key, callback) {}
    
    /**
     * 同步删除
     *
     * @param {String} key
     */
    destroySync(key) {}
    
    /**
     * 回收
     */
    gc() {}
    
}

module.exports = ITarget;
