/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * Session base
 */
class BaseTarget {
    
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
     * @param String key
     */
	read(key) {}
    
    /**
     * 写入
     *
     * @param String key
     * @param String data session data
     */
	write(key, data) {}
    
    /**
     * 删除
     *
     * @param String key
     */
	destroy(key) {}
    
    /**
     * 回收
     */
	gc() {}
    
}

module.exports = BaseTarget;
