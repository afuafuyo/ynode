/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Component = require('./Component');

/**
 * 控制器基类
 */
class Controller extends Component {
    
    /**
     * 获取视图类
     *
     * @return {Object}
     */
    getView() {}
    
}

module.exports = Controller;
