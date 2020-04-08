const assert = require('assert');

const RegExpRouter = require('../utils/RegExpRouter');

const r = ['/home/{uid}', '/posts/{id}', '/user/{name}/{page}', '/abc'];
const reg = new RegExpRouter();

const com = reg.combineRoutes(r);
//const match = new RegExp(com.pattern).exec('/posts/1');

describe('RegExpRouter Test: ', function() {
    it('single param', function(done) {
        assert.equal(com.params[0][0], 'uid');
        done();
    });

    it('mutiple param', function(done) {
        assert.equal(com.params[2][1], 'page');
        done();
    });

    it('no param', function(done) {
        assert.equal(com.params[3], null);
        done();
    });
});

