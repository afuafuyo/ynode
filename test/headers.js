const Headers = require('../http/Headers');

const h = new Headers();

h.add('token', '123');
h.add('x-token', '456');

for(let [k, v] of h) {
    console.log(k, v)
}
