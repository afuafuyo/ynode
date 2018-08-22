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
    }
});
var server = app.getServer();

// test
describe('MVC', function() {
    it('simple get', function(done) {
        request(server)
            .get('/')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                assert.equal(res.text.trim(), 'mvc');
                
                done();
            });
    });
    
    it('module get', function(done) {
        request(server)
            .get('/bbs')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                assert.equal(res.text.trim(), 'module');
                
                done();
            });
    });
    
    it('get with params', function(done) {
        request(server)
            .get('/param?name=jack&age=20')
            //.expect(200)
            .end(function(err, res){
                if (err) {return done(err);}
                
                assert.equal(res.text.trim(), 'jack');
                
                done();
            });
    });
    
});
