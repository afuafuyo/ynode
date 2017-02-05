/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var fs = require('fs');
var crypto = require('crypto');

var Y = require('../../Y');
var BaseTarget = require('../BaseTarget');
var Cookie = require('../../web/Cookie');
var Request = require('../../web/Request');
var FileHelper = require('../../helpers/FileHelper');

/**
 * 文件 session
 *
 * 'session': {
 *     'class': 'y/session/file/Target',
 *     'secretKey': 'xxx',
 *     'sessionCookieName': 'ynode_session',
 *     'sessionCookieExpiresMinutes': 20,
 *     'sessionCookiePath': '/',
 *     'sessionCookieDomain': '',
 *     'sessionCookieSecure': false,
 *     'sessionSavePath': '/tmp/sessions'
 * }
 */
class Target extends BaseTarget {
    
    /**
     * constructor
     */
    constructor(request, response) {
        super();
        
        /**
         * @var Object
         */
        this.request = request;
        
        /**
         * @var Object
         */
        this.response = response;
        
        /**
         * @var String session id
         */
        this.sessionId = '';
        
        /**
         * @var String secret key for generate session id
         */
        this.secretKey = '';
        
        /**
         * @var String The session cookie name
         */
        this.sessionCookieName = 'ynode_session';
        
        /**
         * @var Integer session 过期时间分钟
         */
        this.sessionCookieExpiresMinutes = 20;
        
        /**
         * @var String session path
         */
        this.sessionCookiePath = '/';
        
        /**
         * @var String session domain
         */
        this.sessionCookieDomain = '';
        
        /**
         * @var Boolean session secure for https
         */
        this.sessionCookieSecure = false;
        
        /**
         * @var Boolean readOnly session http only
         */
        this.sessionCookieHttpOnly = true;
        
        /**
         * @var String The location to save sessions to
         */
        this.sessionSavePath = '/tmp/sessions';
        
        /**
         * @var String Session file prefix and extension name
         */
        this.sessionFilePrefix = 's_';
        this.sessionFileExtension = '.bin';
        
        // 目录不存在就创建
        if(!fs.existsSync(this.sessionSavePath)) {
            FileHelper.createDirectorySync(this.sessionSavePath, 0o750);
        }
    }
    
    /**
     * 生成 session id
     */
    generateSessionId() {
        var data = Request.getClientIp(this.request) + this.secretKey + Date.now();
        var md5 = crypto.createHash('md5');
        md5.update(data);
        
        return md5.digest('hex');
    }
    
    /**
     * @inheritdoc
     */
    init(config) {
        if(undefined !== config.secretKey) {
            this.secretKey = config.secretKey;
        }
        if(undefined !== config.sessionCookieName) {
            this.sessionCookieName = config.sessionCookieName;
        }
        if(undefined !== config.sessionCookieExpiresMinutes) {
            this.sessionCookieExpiresMinutes = config.sessionCookieExpiresMinutes;
        }
        if(undefined !== config.sessionCookiePath) {
            this.sessionCookiePath = config.sessionCookiePath;
        }
        if(undefined !== config.sessionCookieDomain) {
            this.sessionCookieDomain = config.sessionCookieDomain;
        }
        if(undefined !== config.sessionCookieSecure) {
            this.sessionCookieSecure = config.sessionCookieSecure;
        }
        if(undefined !== config.sessionSavePath) {
            this.sessionSavePath = config.sessionSavePath;
        }
    }
    
    /**
     * @inheritdoc
     */
    open() {
        var v = Cookie.getCookie(this.request, this.sessionCookieName);
        if(null === v) {
            this.sessionId = this.generateSessionId();
            Cookie.setCookie(this.response, [new Cookie(this.sessionCookieName,
                this.sessionId,
                Date.now() + this.sessionCookieExpiresMinutes * 60 * 1000,
                this.sessionCookiePath,
                this.sessionCookieDomain,
                this.sessionCookieSecure,
                this.sessionCookieHttpOnly).toString()]);
        
        } else {
            this.sessionId = v
        }
    }
	
    /**
     * @inheritdoc
     */
    close() {}
    
    /**
     * @inheritdoc
     */
    readSync(key) {
        var file = this.sessionSavePath + '/' + this.sessionFilePrefix + this.sessionId + this.sessionFileExtension;
        
        if(fs.existsSync(file)) {
            var rs = fs.readFileSync(file);
            rs = JSON.parse(rs);
            
            return undefined === rs[key] ? null : rs[key];
        }
        
        return null;
    }
    
    /**
     * @inheritdoc
     */
    writeSync(key, data) {
        var file = this.sessionSavePath + '/' + this.sessionFilePrefix + this.sessionId + this.sessionFileExtension;
        
        // 已经存在
        if(fs.existsSync(file)) {
            var rs = fs.readFileSync(file);
            rs = JSON.parse(rs);
            rs[key] = data;
            fs.writeFileSync(file, JSON.stringify(rs));
            
        } else {
            fs.writeFileSync(file, JSON.stringify( {[key]: data} ));
        }
    }
    
    /**
     * @inheritdoc
     */
    destroySync(key) {
        var file = this.sessionSavePath + '/' + this.sessionFilePrefix + this.sessionId + this.sessionFileExtension;
        
        if(fs.existsSync(file)) {
            var rs = fs.readFileSync(file);
            rs = JSON.parse(rs);
            delete rs[key];
            
            fs.writeFileSync(file, JSON.stringify(rs));
        }
    }
    
    /**
     * @inheritdoc
     */
    gc() {}
    
}

module.exports = Target;
