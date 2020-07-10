/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * Response
 */
class Response {

    /**
     * constructor
     *
     * @param {any} response
     */
    constructor(response) {
        this.response = response;
    }

    /**
     * sends data to client and end response
     *
     * @param {String} content
     */
    send(content = '') {}

}

module.exports = Response;
