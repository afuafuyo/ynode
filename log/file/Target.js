/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var fs = require('fs');

var Y = require('../../Y');
var Logger = require('../Logger');
var ITarget = require('../ITarget');
var FileHelper = require('../../helpers/FileHelper');
var TimeHelper = require('../../helpers/TimeHelper');

/**
 * 文件日志
 *
 * 'log': {
 *     'targets': {
 *         'file': {
 *             'class': 'y/log/file/Target',
 *             'logPath': __dirname + '/logs'
 *         },
 *         'other': {...}
 *     },
 *     'flushInterval': 10
 * }
 *
 */
class Target extends ITarget {
    
    /**
     * constructor
     */
    constructor(config) {
        super();
        
        this.config = config;
        
        /**
         * @property {String} fileExtension 文件扩展名
         */
        this.fileExtension = undefined === config.fileExtension
            ? '.log'
            : config.fileExtension;
        
        /**
         * @property {String} logPath 日志路径
         */
        this.logPath = undefined === config.logPath
            ? Y.getPathAlias('@runtime/logs')
            : config.logPath;
    }
    
    /**
     * 获取日志文件
     */
    generateFile() {
        if(undefined !== this.config.logFile) {
            return this.logPath + '/' + this.config.logFile;
        }
        
        var date = new Date();
        
        return this.logPath
            + '/'
            + date.getFullYear()
            + '-'
            + (date.getMonth() + 1)
            + '-'
            + date.getDate()
            + this.fileExtension;
    }
    
    /**
     * @inheritdoc
     */
    flush(messages) {
        var msg = this.formatMessage(messages);
        var file = this.generateFile();
        
        // 检查目录
        fs.access(this.logPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if(null === err) {
                fs.appendFile(file, msg, Y.app.encoding, (err) => {});
                
                return;
            }
            
            FileHelper.createDirectory(this.logPath, 0o777, (err) => {
                fs.appendFile(file, msg, Y.app.encoding, (err) => {});
            });
        });
    }
    
    /**
     * 格式化内容
     */
    formatMessage(messages) {
        var msg = '';
        for(let i=0,len=messages.length; i<len; i++) {
            msg += TimeHelper.format('y-m-d h:i:s', messages[i][2])
                + ' -- '
                + Logger.getLevelName(messages[i][1])
                + ' -- '
                + messages[i][0]
                + '\n';
        }
        
        return msg;
    }
    
}

module.exports = Target;
