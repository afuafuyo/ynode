/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var BaseTarget = require('../BaseTarget');

/**
 * 文件 session
 *
 * 'session': {
 *     'target': {
 *         'class': 'y/session/file/Target'
 *     }
 * }
 */
class Target extends BaseTarget {
    
    /**
     * constructor
     */
    constructor() {
        super();
        
        /**
         * @var String session id
         */
        this.sessionId = '';
        
        /**
         * @var String The session cookie name
         */
        this.sessionCookieName = 'ynode_session';
        
        /**
         * @var String The location to save sessions to
         */
        this.sessionSavePath = '';
        
    }
    
    /**
     * @inheritdoc
     */
    init(config) {}
    
    /**
     * @inheritdoc
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

module.exports = Target;
