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
     * 填充 0
     *
     * @param {String} str 待处理字符串
     * @param {Number} length 处理后字符串长度
     * @return {String} 处理后的字符串
     */
    static pad(str, length) {
        while(str.length < length) {
            str = '0' + str;
        }
        
        return str;
    }
    
    /**
     * 格式化时间
     *
     * @param {String} formats 格式化参数
     * @param {Number} timestamp 时间戳
     *
     * 用法
     * var str = TimeHelper.format('y-m-d h:i:s');
     *
     * @return {String}
     */
    static format(formats, timestamp) {
        var d = undefined === timestamp ? new Date() : new Date(timestamp);
        var funs = {
            y: () => d.getFullYear()
            ,m: () => TimeHelper.pad(String(d.getMonth() + 1), 2)
            ,d: () => TimeHelper.pad(String(d.getDate()), 2)
            ,h: () => TimeHelper.pad(String(d.getHours()), 2)
            ,i: () => TimeHelper.pad(String(d.getMinutes()), 2)
            ,s: () => TimeHelper.pad(String(d.getSeconds()), 2)
        };
        
        return formats.replace(/(.?)/ig, (match, p/* , offset, string */) => {
            return undefined !== funs[match] ?
                funs[match]() :
                p;
        });
    }
    
}

module.exports = TimeHelper;
