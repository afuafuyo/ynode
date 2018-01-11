var Q = require('../util/LinkedQueue');

var q = new Q();

var d1 = {age: 1};
var d2 = {age: 2};
var d3 = {age: 3};

q.add(d1);
q.add(d2);
q.add(d3);

//console.log(q.toString());

//var data = null;
//while(null !== (data = q.iterator())) {
//    console.log(data);
//}

//while(null !== (data = q.iterator())) {
//    console.log(data);
//}

q.remove(d3);
console.log(q)
