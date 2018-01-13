var Q = require('../util/LinkedQueue');

var q = new Q();

var d1 = {age: 1};
var d2 = {age: 2};
var d3 = {age: 3};

q.add(d1);
q.add(d2);
q.add(d3);

//var data = null;
//while(null !== (data = q.iterator())) {
//    console.log('1', data);
//}

//while(null !== (data = q.iterator())) {
//    console.log('1', data);
//}

q.each((data) => {
    console.log('1', data)
    
    if(2 === data.age) {
        return false;
    }
    
});

q.remove(d2);

q.each((data) => {
    console.log('2', data)
});

console.log(q.toString());
