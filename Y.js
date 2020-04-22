/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * 辅助类
 */
class Y {

    /**
     * @ 别名路径转换真实路径
     *
     * @param {String} alias 路径别名
     * @return {String} 路径
     */
    static getPathAlias(alias) {
        if('@' !== alias.charAt(0)) {
            return alias;
        }

        // 截取开头作为别名
        let pos = alias.indexOf('/');
        let root = -1 === pos ? alias : alias.substring(0, pos);
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
     * @param {String} alias 路径别名
     * @param {String} path 路径
     */
    static setPathAlias(alias, path) {
        if('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }

        if(null === path) {
            delete Y.pathAliases[alias];

            return;
        }

        if('/' === path.charAt(path.length - 1)) {
            path = path.substring(0, path.length - 1);
        }

        Y.pathAliases[alias] = path;
    }

    /**
     * 创建对象 系统类路径约定以 y 开头 应用类以项目目录开头
     *
     * @param {String | Object} clazz 以某个已经定义的别名开头的类全名或带 'classPath' 键的配置
     *
     * eg.
     * 'some/path/Class'
     * or
     * {classPath: 'some/path/Class', ...}
     *
     * @param {any} parameters 构造函数参数
     * @return {Object} 类实例
     */
    static createObject(clazz, ...parameters) {
        if('string' === typeof clazz) {
            return Y.createObjectAsString(clazz, ...parameters);
        }

        return Y.createObjectAsDefinition(clazz, ...parameters);
    }

    /**
     * 字符串方式创建对象
     *
     * @param {String} classPath
     */
    static createObjectAsString(classPath, ...parameters) {
        let realClass = Y.getPathAlias('@' + classPath);

        let ClassName = require(realClass + Y.defaultExtension);

        return new ClassName(...parameters);
    }

    /**
     * 配置方式创建对象
     *
     * @param {Object} definition
     */
    static createObjectAsDefinition(definition, ...parameters) {
        let realClass = Y.getPathAlias('@' + definition.classPath);
        let properties = Y.config({}, definition);

        let ClassName = require(realClass + Y.defaultExtension);
        let instance = new ClassName(...parameters);

        delete properties.classPath;

        if(null !== properties) {
            Y.config(instance, properties);
        }

        return instance;
    }

    /**
     * 导入一个类文件
     *
     * @param {String} clazz 类全名
     */
    static include(clazz) {
        let file = Y.getPathAlias('@' + clazz);

        // 文件不存在抛出异常
        // todo

        return require(file + Y.defaultExtension);
    }

    /**
     * 对象配置
     *
     * @param {Object} object 需要配置的对象
     * @param {Object} properties 配置项
     * @return {Object} 源对象
     */
    static config(object, properties) {
        for(let key in properties) {
            object[key] = properties[key];
        }

        return object;
    }

}

/**
 * @property {Application} app 应用实例
 */
Y.app = null;

/**
 * @property {Object} pathAliases 路径别名
 */
Y.pathAliases = {'@y': __dirname};

/**
 * @property {String} defaultExtension 默认文件扩展名
 */
Y.defaultExtension = '.js';

module.exports = Y;
