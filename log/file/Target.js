'use strict';

var fs = require('fs');

var Y = require('../../Y');
var Logger = require('../Logger');
var BaseTarget = require('../BaseTarget');
var FileHelper = require('../../helpers/FileHelper');
var TimeHelper = require('../../helpers/TimeHelper');

/**
 * 文件日志
 *
 * 'log': {
 *     'targets': {
 *         'file': {
 *             'class': 'y/log/file/Target',
 *             'logPath': '@runtime/logs'
 *         },
 *         'other': {...}
 *     },
 *     'flushInterval': 10
 * }
 *
 */
class Target extends BaseTarget {
    
    /**
     * constructor
     */
    constructor(config) {
        super();
        
        /**
         * @var String 日志路径
         */
        this.logPath = undefined !== config.logPath ? Y.getPathAlias(config.logPath) :
            Y.getPathAlias('@runtime/logs');
        
        /**
         * @var String 日志文件名
         */
        this.logFile = this.generateTimeLogFile();
        
        // 目录不存在就创建
        if(!fs.existsSync(this.logPath)) {
            FileHelper.createDirectorySync(this.logPath);
        }
    }
    
    /**
     * @inheritdoc
     */
    flush(messages) {
        var msg = this.formatMessage(messages);
        var file = this.logPath + '/' + this.logFile;
        
        fs.appendFile(file, msg, 'utf8', (err) => {});
    }
    
    /**
     * 生成日志文件名
     */
    generateTimeLogFile() {
        var date = new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + this.fileExtension;
    }
    
    /**
     * 格式化内容
     */
    formatMessage(messages) {
        var msg = '';
        for(let i=0,len=messages.length; i<len; i++) {
            msg += TimeHelper.format(messages[i][2]) + ' -- '
                + Logger.getLevelName(messages[i][1]) + ' -- '
                + messages[i][0] + '\n';
        }
        
        return msg;
    }
}

module.exports = Target;
