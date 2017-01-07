/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * server response
 */
class Response {
    
    /**
     * constructor
     *
     * @param Object response
     */
    constructor(response) {
        this.response = response;
    }
    
    /**
     * sends the response to client
     */
    send() {}
    
}

module.exports = Response;
