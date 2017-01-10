/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var fs = require('fs');
var path = require('path');

/**
 * 文件处理
 */
class FileHelper {
    
    /**
     * 创建文件夹
     *
     * @param String dir 目录路径
     * @param Integer mode 目录权限
     * @param Function callback 回调函数
     */
    static createDirectory(dir, mode /* = 0o777 */, callback /* = null */) {
        fs.access(dir, fs.F_OK, (err) => {
            if(null === err) {
                callback();
                return true;
            }
            
            let parentDir = path.dirname(dir);
            FileHelper.createDirectory(parentDir, mode, () => {
                fs.mkdir(dir, mode, callback);
            });
        });
    }
    
    /**
     * 同步创建文件夹
     *
     * @param String dir 目录路径
     * @param Integer mode 目录权限
     */
    static createDirectorySync(dir, mode /* = 0o777 */) {
        
    }

}

module.exports = FileHelper;
