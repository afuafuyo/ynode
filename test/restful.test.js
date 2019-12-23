// node >= 6.0.0

const request = require('supertest');
const assert = require('assert');

const Restful = require('../restful.js');
const App = require('../web/RestApplication.js');

const app = new App({
    appPath: __dirname + '/app'
});
const rest = new Restful(app);
const server = rest.getServer();

// api
rest.get('/abc', function(req, res){
    res.end('get ok');
});
rest.get('/abc/{id:\\d+}', function(req, res, id){
    res.end(String(id));
});
rest.post('/def', function(req, res){
    res.end('post ok');
});
rest.get('/xyz', 'app/api/Demo@index');

// test restful api
describe('RESTful api', function() {
    it('simple get', function(done) {
        request(server)
            .get('/abc')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'get ok');

                done();
            });
    });

    it('get with param', function(done) {
        request(server)
            .get('/abc/123')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, '123');

                done();
            });
    });

    it('simple post', function(done) {
        request(server)
            .post('/def')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'post ok');

                done();
            });
    });

    it('simple class get', function(done) {
        request(server)
            .get('/xyz')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'restful class ok');

                done();
            });
    });

});
