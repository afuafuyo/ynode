/**
 * String Helper
 */
'use strict';

class StringHelper {
    
    /**
     * 删除两端字符
     *
     * @param String str 待处理的字符串
     * @param String char 要删除的字符
     * @return String 处理后的字符串
     */
    static trimChar(str, char) {
        if(char === str.charAt(0)) {
            str = str.substring(1);
        }
        if(char === str.charAt(str.length - 1)) {
            str = str.substring(0, str.length - 1);
        }
        
        return str;
    }
    
    /**
     * 删除左侧字符
     *
     * @param String str 待处理的字符串
     * @param String char 要删除的字符
     * @return String 处理后的字符串
     */
    static lTrimChar(str, char) {
        if(char === str.charAt(0)) {
            str = str.substring(1);
        }
        
        return str;
    }
    
    /**
     * 删除右侧字符
     *
     * @param String str 待处理的字符串
     * @param String char 要删除的字符
     * @return String 处理后的字符串
     */
    static rTrimChar(str, char) {
        if(char === str.charAt(str.length - 1)) {
            str = str.substring(0, str.length - 1);
        }
        
        return str;
    }
    
    /**
     * 首字母大写
     *
     * @param String str 待处理的字符串
     * @return String 处理后的字符串
     */
    static ucFirst(str) {
        var ret = str.charAt(0).toUpperCase();
        
        return ret + str.substring(1);
    }
    
}

module.exports = StringHelper;
