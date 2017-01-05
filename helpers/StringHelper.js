/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * String Helper
 */
class StringHelper {
    
    /**
     * 删除两端字符
     *
     * @param String str 待处理的字符串
     * @param String character 要删除的字符
     * @return String 处理后的字符串
     */
    static trimChar(str, character) {
        if(character === str.charAt(0)) {
            str = str.substring(1);
        }
        if(character === str.charAt(str.length - 1)) {
            str = str.substring(0, str.length - 1);
        }
        
        return str;
    }
    
    /**
     * 删除左侧字符
     *
     * @param String str 待处理的字符串
     * @param String character 要删除的字符
     * @return String 处理后的字符串
     */
    static lTrimChar(str, character) {
        if(character === str.charAt(0)) {
            str = str.substring(1);
        }
        
        return str;
    }
    
    /**
     * 删除右侧字符
     *
     * @param String str 待处理的字符串
     * @param String character 要删除的字符
     * @return String 处理后的字符串
     */
    static rTrimChar(str, character) {
        if(character === str.charAt(str.length - 1)) {
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
