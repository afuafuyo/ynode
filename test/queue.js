var Q = require('../util/LinkedQueue');

var q = new Q();

q.add({age: 1});
q.add({age: 2});
q.add({age: 3});

//console.log(q.toString());

var data = null;
while(null !== (data = q.iterator())) {
    console.log(data);
}
