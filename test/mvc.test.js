// node >= 6.0.0

var request = require('supertest');
var assert = require('assert');

var YNode = require('../index.js');

var app = new YNode({
    'id': 1,
    'appPath': __dirname + '/app',
    'debug': true,
    
    'modules': {
        'bbs': 'app/modules/bbs'
    },
    'routes': {
        // 访问此自定义路径跳转到 bbs 模块 参数为数字 id
        '/abc/{id:\\d+}': {
            'moduleId': 'bbs'
        }
    },
});
var server = app.getServer();

// test mvc
describe('MVC', function() {
    it('simple get', function(done) {
        request(server)
            .get('/')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                assert.equal(res.text, 'mvc ok');
                
                done();
            });
    });
    
    it('module get', function(done) {
        request(server)
            .get('/bbs')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                assert.equal(res.text, 'module ok');
                
                done();
            });
    });
    
    it('customer route redirect to module bbs', function(done) {
        request(server)
            .get('/abc/1')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                assert.equal(res.text, 'module ok');
                
                done();
            });
    });
});
