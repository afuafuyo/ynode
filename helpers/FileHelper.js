/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var fs = require('fs');

/**
 * 文件处理
 */
class FileHelper {
    
    /**
     * 获取 dirname
     *
     * @param String dir 目录路径
     */
    static getDirname(dir) {
        dir = dir.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');
        
        return '' === dir ? '/' : dir;
    }
    
    /**
     * 创建文件夹
     *
     * @param String dir 目录路径
     * @param Integer mode 目录权限
     * @param Function callback 回调函数
     */
    static createDirectory(dir, mode = 0o777, callback = null) {
        fs.access(dir, fs.constants.F_OK, (err) => {
            if(null === err) {
                null !== callback && callback();
                return true;
            }
            
            let parentDir = FileHelper.getDirname(dir);
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
    static createDirectorySync(dir, mode = 0o777) {
        if(fs.existsSync(dir)) {
            return true;
        }
        
        if(FileHelper.createDirectorySync(FileHelper.getDirname(dir))) {
            fs.mkdirSync(dir, mode);
        }
        
        return true;
    }
    
}

module.exports = FileHelper;
