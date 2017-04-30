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
     * 查找某字符在一个字符串中第 N 次出现的位置
     *
     * @param {String} str 待查找的字符串
     * @param {String} find 要查找的字符串
     * @param {Number} n 第几次出现
     * @return {Number}
     */
    static indexOfN(str, find, n) {
        var x = str.indexOf(find);
        for(let i = 1; i < n; i++) {
            x = str.indexOf(find, x + 1);
        }
        
        return x;
    }
    
    /**
     * 删除两端字符
     *
     * @param {String} str 待处理的字符串
     * @param {String} character 要删除的字符
     * @return {String} 处理后的字符串
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
     * @param {String} str 待处理的字符串
     * @param {String} character 要删除的字符
     * @return {String} 处理后的字符串
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
     * @param {String} str 待处理的字符串
     * @param {String} character 要删除的字符
     * @return {String} 处理后的字符串
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
     * @param {String} str 待处理的字符串
     * @return {String} 处理后的字符串
     */
    static ucFirst(str) {
        var ret = str.charAt(0).toUpperCase();
        
        return ret + str.substring(1);
    }
    
    /**
     * 转化特殊 html 字符到实体
     *
     * @param {String} str
     * @param {Number} flag
     * @param {Boolean} doubleEncode
     * @return {String}
     */
    static htmlSpecialChars(str, flag = 0, doubleEncode = true) {
        var OPTIONS = {
            'ALL_QUOTES': 0,
            'SINGLE_QUOTE': 1,
            'DOUBLE_QUOTE': 2
        };
        
        // 放到最前面 防止多次转义
        if(doubleEncode !== false) {
            str = str.replace(/&/g, '&amp;');
        }
        
        str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        if(flag === OPTIONS.ALL_QUOTES) {
            str = str.replace(/'/g, '&#039;').replace(/"/g, '&quot;');
            
        } else if(flag === OPTIONS.SINGLE_QUOTE) {
            str = str.replace(/'/g, '&#039;');
            
        } else if(flag === OPTIONS.DOUBLE_QUOTE) {
            str = str.replace(/"/g, '&quot;');
            
        }
        
        return str;
    }
    
}

module.exports = StringHelper;
