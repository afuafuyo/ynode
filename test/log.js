var fs = require('fs');

var YNode = require('../index.js');

var config = {
    'targets': {
        'file': {
            'classPath': 'y/log/file/Target',
            'logPath': __dirname + '/_logs',
            'logFile': 'system.log',
            'maxFileSize': 1  // 1KB
        }
    },
    'flushInterval': 1
};
var Logger = YNode.Y.include('y/log/Logger');
var log = Logger.newInstance(config);

// 写日志
log.error('这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容');

