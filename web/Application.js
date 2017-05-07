/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Y = require('../Y');
var CoreApp = require('../core/Application');
var Request = require('./Request');
var InvalidRouteException = require('../core/InvalidRouteException');
var InvalidCallException = require('../core/InvalidCallException');

/**
 * web 应用
 */
class Application extends CoreApp {
    
    /**
     * @inheritdoc
     */
    constructor(config) {
        super(config);
    }
    
    /**
     * @inheritdoc
     */
    requestListener(request, response) {
        var route = Request.parseUrl(request).pathname;
        
        var controller = this.createController(route);
        
        if(null === controller) {
            throw new InvalidRouteException('The route requested is invalid');
        }
        if(!('run' in controller)) {
            throw new InvalidCallException('The Controller.run is not a function');
        }
        
        controller.run(request, response);
    }
    
}

module.exports = Application;
