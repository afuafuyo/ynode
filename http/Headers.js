/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * HTTP headers collection
 */
class Headers {

    constructor() {
        /**
         * @property Map<String, String[]> headers the headers in this collection
         */
        this.headers = new Map();
    }

    /**
     * 获取一条 header
     *
     * 由于某些 header 头可能重复出现 所以这里以数组形式返回
     *
     * @param {String} name the name of the header
     * @param {any} defaultValue
     * @return {String[] | null}
     */
    getHeader(name, defaultValue = null) {
        name = name.toLowerCase();

        if(this.headers.has(name)) {
            return this.headers.get(name);
        }

        return defaultValue;
    }

    /**
     * 添加一条 header
     *
     * @param {String} name the name of the header
     * @param {String} value the value of the header
     */
    addHeader(name, value) {
        name = name.toLowerCase();

        if(this.headers.has(name)) {
            this.headers.get(name).push(value);
            return;
        }

        let list = [value];
        this.headers.set(name, list);
    }

    /**
     * 删除一条 header
     *
     * @param {String} name the name of the header
     * @return {Boolean}
     */
    removeHeader(name) {
        name = name.toLowerCase();

        return this.headers.delete(name);
    }

    /**
     * 删除所有 header
     */
    clearHeaders() {
        this.headers.clear();
    }

}

module.exports = Headers;
