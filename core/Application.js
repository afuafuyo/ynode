/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Y = require('../Y');
var Fate = require('./Fate');
var InvalidConfigException = require('./InvalidConfigException');

/**
 * 应用基类
 */
class Application extends Fate {
    
    /**
     * constructor
     *
     * @param {Object} config 配置信息
     */
    constructor(config) {
        super();
        
        /**
         * @property {String} encoding 编码
         */
        this.encoding = 'UTF-8';
        
        /**
         * @property {Boolean} debug 调试
         */
        this.debug = false;
        
        /**
         * @property {String} exceptionHandler 异常处理类
         */
        this.exceptionHandler = '';
        
        Y.app = this;
        this.init(config);
        Y.config(this, config);
    }
    
    /**
     * 初始化应用
     *
     * @param {Object} config 应用配置
     * @throws {InvalidConfigException} 当丢失必要配置项目时
     */
    init(config) {
        if(undefined === config.id) {
            throw new InvalidConfigException('The "id" configuration is required');
        }
        
        if(undefined !== config.appPath) {
            this.setAppPath(config.appPath);
            delete config.appPath;
            
        } else {
            throw new InvalidConfigException('The "appPath" configuration is required');
        }
        
        if(undefined !== config.runtimePath) {
            this.setRuntimePath(config.runtimePath);
            delete config.runtimePath;
            
        } else {
            // set "app/runtime"
            this.setRuntimePath( this.getAppPath() + '/runtime');
        }
        
        if(undefined !== config.rootPath) {
            this.setRootPath(config.rootPath);
            delete config.rootPath;
            
        } else {
            this.setRootPath(process.env.PWD);
        }
    }
    
    /**
     * 设置应用路径
     *
     * @param {String} path 应用路径
     */
    setAppPath(path) {
        Y.setPathAlias('@app', path);
    }
    
    /**
     * 得到应用目录
     *
     * @return {String} 路径
     */
    getAppPath() {
        return Y.getPathAlias('@app');
    }
    
    /**
     * 设置 runtime 路径
     *
     * @param {String} path 路径
     */
    setRuntimePath(path) {
        Y.setPathAlias('@runtime', path);
    }
    
    /**
     * 得到 runtime 目录
     *
     * @return {String} 路径
     */
    getRuntimePath() {
        return Y.getPathAlias('@runtime');
    }
    
    /**
     * 设置 root 路径
     *
     * @param {String} path 路径
     */
    setRootPath(path) {
        Y.setPathAlias('@root', path);
    }
    
    /**
     * 得到 root 目录
     *
     * @return {String} 路径
     */
    getRootPath() {
        return Y.getPathAlias('@root');
    }
    
    /**
     * handler request
     *
     * @param {Object} request
     * @param {Object} response
     */
    requestListener(request, response) {}
    
    /**
     * 异常处理
     *
     * @param {Object} response 输出类
     * @param {Exception} exception 异常类
     */
    handlerException(response, exception) {}
    
}

module.exports = Application;
