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

    constructor() {
        super();

        /**
         * @property {any} request
         */
        this.request = null;

        /**
         * @property {any} response
         */
        this.response = null;

        /**
         * @property {any} data
         */
        this.data = null;

        /**
         * @property {Boolean} 状态
         */
        this.valid = true;
    }

}

module.exports = ActionEvent;
