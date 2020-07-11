/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Event = require('./Event');

/**
 * 控制器动作事件
 */
class ActionEvent extends Event {

    /**
     * constructor
     *
     * @param {any} request
     * @param {any} response
     */
    constructor(request, response) {
        super();

        /**
         * @property {any} request
         */
        this.request = request;

        /**
         * @property {any} response
         */
        this.response = response;

        /**
         * @property {Boolean} 状态
         */
        this.valid = true;
    }

}

module.exports = ActionEvent;
