// node >= 6.0.0

const request = require('supertest');
const assert = require('assert');

const YNode = require('../index.js');
const App = require('../web/RestApplication.js');

const app = new App({
    id: 1,
    appPath: __dirname + '/app'
});


// api
app.get('/abc', (req, res) => {
    res.end('get ok');
});
app.get('/user/{id:\\d+}', (req, res, params) => {
    res.end( 'number_' + params.id );
});
app.get('/user/{name}', (req, res, params) => {
    res.end( 'str_' + params.name );
});
app.get('/user/{name}/{page}', (req, res, params) => {
    res.end( params.name + '_' + params.page );
});
app.get('/path/{sub}/path2/{sub2:\\w+}', (req, res, params) => {
    res.end(params.sub + '_' + params.sub2);
});
app.post('/posts/add', (req, res) => {
    res.end('post ok');
});
app.get('/xyz', 'app/api/Demo');
app.get('/xyz/{id}', 'app/api/Demo@testParam');


const yNode = new YNode(app);
const server = yNode.getServer();

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

    it('get with number param', function(done) {
        request(server)
            .get('/user/123')
            //.expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'number_123');

                done();
            });
    });

    it('get with string param', function(done) {
        request(server)
            .get('/user/zhangsan')
            //.expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'str_zhangsan');

                done();
            });
    });

    it('get with multi params', function(done) {
        request(server)
            .get('/user/zhangsan/1')
            //.expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'zhangsan_1');

                done();
            });
    });

    it('get with multi params 2', function(done) {
        request(server)
            .get('/path/1/path2/img')
            //.expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, '1_img');

                done();
            });
    });

    it('simple post', function(done) {
        request(server)
            .post('/posts/add')
            //.expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'post ok');

                done();
            });
    });

    it('class get', function(done) {
        request(server)
            .get('/xyz')
            //.expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'restful class ok');

                done();
            });
    });

    it('class get with param', function(done) {
        request(server)
            .get('/xyz/123')
            //.expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, '123');

                done();
            });
    });

});
