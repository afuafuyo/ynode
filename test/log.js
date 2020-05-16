const Logger = require('../log/Logger');

const config = {
    'targets': {
        'file': {
            'classPath': 'y/log/file/Log',
            'logPath': __dirname + '/tmp_logs',
            'logFile': 'system.log',
            'maxFileSize': 1  // 1KB
        }
    },
    'flushInterval': 1
};
const log = Logger.newInstance(config);

// 写日志
log.error('这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容');
