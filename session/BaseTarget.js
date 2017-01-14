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
     * init
     */
    init(config) {}
    
    /**
     * 打开 session
     */
    open() {}
	
    /**
     * 打开 session
     */
    close() {}
    
    /**
     * 读取
     *
     * @param String sessionId session id
     */
	read(sessionId) {}
    
    /**
     * 写入
     *
     * @param String sessionId session id
     * @param String data session data
     */
	write(sessionId, data) {}
    
    /**
     * 删除
     *
     * @param String sessionId session id
     */
	destroy(sessionId) {}
    
    /**
     * 回收
     *
     * @param Integer maxLifetime 生命周期毫秒数
     */
	gc(maxLifetime) {}
    
}

module.exports = BaseTarget;
