const assert = require('assert');

const RegExpRouter = require('../utils/RegExpRouter');

const noop = () => {};
const r = [
    {route: '/', handler: noop},
    {route: '/user/{uid}/{page}', handler: () => {}},
    {route: '/posts/{id}', handler: () => {}}
];
const reg = new RegExpRouter(r);
reg.combineRoutes();
const match = reg.exec('/posts/1');
const match2 = reg.exec('/user/20/1');
const match3 = reg.exec('/');


describe('RegExpRouter Test: ', function() {
    it('single param', function(done) {
        assert.equal(match.parameters.id, '1');
        done();
    });

    it('mutiple param', function(done) {
        assert.equal(match2.parameters.page, '1');
        done();
    });

    it('no param', function(done) {
        assert.equal(match3.handler, noop);
        done();
    });
});

