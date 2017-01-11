/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * 时间工具
 */
class TimeHelper {
    
    /**
     * 格式化时间
     *
     * @param Integer timestamp 时间戳
     * @param String format 格式化参数
     */
    static format(timestamp, format = 'y-m-d h:i:s') {
        var d = new Date(timestamp),
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            date = d.getDate(),
            hour = d.getHours(),
            minute = d.getMinutes(),
            second = d.getSeconds();
        
        return format.replace('y', year)
            .replace('m', month)
            .replace('d', date)
            .replace('h', hour)
            .replace('i', minute)
            .replace('s', second);
    }
    
}

module.exports = TimeHelper;
