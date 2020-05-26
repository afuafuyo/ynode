/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const fs = require('fs');

const Y = require('../../Y');
const ICache = require('../ICache');
const FileHelper = require('../../helpers/FileHelper');
const CacheException = require('../../core/CacheException');

/**
 * 文件缓存
 *
 * 'cache': {
 *      'file': {
 *          'classPath': 'y/cache/file/Cache',
 *          'cachePath': 'some/path'
 *      }
 * }
 *
 */
class Cache extends ICache {

    /**
     * constructor
     *
     * @param {Object} config
     */
    constructor(config) {
        super();

        /**
         * @property {String} fileExtension 缓存文件后缀
         */
        this.fileExtension = undefined === config.fileExtension
            ? '.bin'
            : config.fileExtension;

        /**
         * @property {String} cachePath 缓存目录
         */
        this.cachePath = undefined === config.cachePath
            ? Y.getPathAlias('@runtime/caches')
            : config.cachePath;
    }

    /**
     * 获取缓存文件
     *
     * @param {String} key
     */
    getCacheFile(key) {
        return this.cachePath + '/' + key + this.fileExtension;
    }

    /**
     * @inheritdoc
     */
    setSync(key, value, duration = 31536000000/* one year */) {
        let cacheFile = this.getCacheFile(key);

        let life = (Date.now() + duration) / 1000;

        // 目录不存在就创建
        if(!fs.existsSync(this.cachePath)) {
            FileHelper.createDirectorySync(this.cachePath);
        }

        fs.writeFileSync(cacheFile, value, Y.app.encoding);

        fs.utimesSync(cacheFile, life, life);
    }

    /**
     * @inheritdoc
     */
    set(key, value, duration = 31536000000/* one year */) {
        return new Promise((resolve, reject) => {
            let cacheFile = this.getCacheFile(key);
            let life = (Date.now() + duration) / 1000;

            // 检查目录
            fs.access(this.cachePath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
                if(null === err) {
                    fs.writeFile(cacheFile, value, Y.app.encoding, (err) => {
                        if(null !== err) {
                            reject(err);
                            return;
                        }

                        fs.utimes(cacheFile, life, life, () => {
                            resolve();
                        });
                    });

                    return;
                }

                // 目录不存在就创建
                FileHelper.createDirectory(this.cachePath, 0o777, (err) => {
                    fs.writeFile(cacheFile, value, Y.app.encoding, (err) => {
                        if(null !== err) {
                            reject(err);
                            return;
                        }

                        fs.utimes(cacheFile, life, life, () => {
                            resolve();
                        });
                    });
                });
            });
        });
    }

    /**
     * @inheritdoc
     */
    getSync(key) {
        let ret = null;
        let cacheFile = this.getCacheFile(key);

        if(fs.existsSync(cacheFile) && fs.statSync(cacheFile).mtime.getTime() > Date.now()) {
            ret = fs.readFileSync(cacheFile, Y.app.encoding);
        }

        return ret;
    }

    /**
     * @inheritdoc
     */
    get(key) {
        return new Promise((resolve, reject) => {
            let cacheFile = this.getCacheFile(key);

            fs.stat(cacheFile, (err, stats) => {
                if(null !== err) {
                    reject(err);
                    return;
                }

                if(stats.mtime.getTime() < Date.now()) {
                    resolve(null);
                    return;
                }

                fs.readFile(cacheFile, Y.app.encoding, (err, data) => {
                    if(null !== err) {
                        reject(err);
                        return;
                    }

                    resolve(data);
                });
            });
        });
    }

    /**
     * @inheritdoc
     */
    deleteSync(key) {
        let cacheFile = this.getCacheFile(key);

        fs.unlinkSync(cacheFile);
    }

    /**
     * @inheritdoc
     */
    delete(key) {
        return new Promise((resolve, reject) => {
            let cacheFile = this.getCacheFile(key);

            fs.unlink(cacheFile, (err) => {
                if(null !== err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    }

}

module.exports = Cache;
