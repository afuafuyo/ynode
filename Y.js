/**
 * 辅助类
 */
'use strict';

var fs = require('fs');
var path = require('path');

class Y {
    
    /**
     * @ 别名路径转换真实路径
     *
     * @param String alias 路径别名
     * @return String 路径
     */
    static getPathAlias(alias) {
        if('@' !== alias.charAt(0)) {
            return alias;
        }

        // 截取开头作为别名
        var pos = alias.indexOf('/');
        var root = -1 === pos ? alias : alias.substring(0, pos);
        if(undefined !== Y.pathAliases[root]) {
            return -1 === pos ?
                Y.pathAliases[root] :
                Y.pathAliases[root] + alias.substring(pos);
        }

        return '';
    }
    
    /**
     * 设置路径别名
     *
     * @param String alias 路径别名
     * @param String path 路径
     */
    static setPathAlias(alias, path) {
        if('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }

        if(null === path) {
            delete Y.pathAliases[alias];

        } else {
            Y.pathAliases[alias] = path;
        }
    }
    
    /**
     * 创建 app 对象
     *
     * @param String clazz 类全名 eg. app/controllers/index/IndexController
     * @param Array params 参数
     * @return Object 类实例
     */
    static createAppObject(clazz) {
        var appPath = Y.app.getAppPath();
        var realPath = path.dirname(appPath) + '/' + clazz;
        
        // 文件不存在抛出异常
        fs.accessSync(realPath + Y.app.fileExtention, fs.F_OK);
        
        var Obj = require(realPath);
        
        return new Obj();
    }
    
    /**
     * 对象配置
     *
     * @param Object object 需要配置的对象
     * @param JSON propertys 配置项
     * @return Object 源对象
     */
    static config(object, propertys) {
        for(let key in propertys) {
            object[key] = propertys[key];
        }

        return object;
    }
    
}

/**
 * @var Application 应用实例
 */
Y.app = null;

/**
 * @var JSON 路径别名
 */
Y.pathAliases = {'@y': __dirname};

module.exports = Y;
