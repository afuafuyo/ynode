/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var CoreSession = require('../core/Session');

/**
 * Session
 */
class Session extends CoreSession {
    
    /**
     * constructor
     */
    constructor() {
        super();
    }
    
    /**
     * 打开 session
     */
    open() {}
	
    /**
     * @inheritdoc
     */
    close() {}
    
    /**
     * @inheritdoc
     */
	read(sessionId) {}
    
    /**
     * @inheritdoc
     */
	write(sessionId, data) {}
    
    /**
     * @inheritdoc
     */
	destroy(sessionId) {}
    
    /**
     * @inheritdoc
     */
	gc(maxLifetime) {}
    
}

module.exports = Session;
