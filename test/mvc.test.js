// node >= 6.0.0

const request = require('supertest');
const assert = require('assert');

const YNode = require('../index.js');
const Application = require('../web/Application.js');

const app = new Application({
    'id': 1,
    'appPath': __dirname + '/app',
    'debug': true,

    'modules': {
        'bbs': 'app/modules/bbs'
    }
});

const yNode = new YNode(app);
const server = yNode.getServer();

// test
describe('MVC: ', function() {
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

    it('beforeaction get', function(done) {
        request(server)
            .get('/before')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text.trim(), 'before action call');

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
