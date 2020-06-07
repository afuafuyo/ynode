const Q = require('../utils/LinkedQueue');

const q = new Q();

const d1 = {age: 1};
const d2 = {age: 2};
const d3 = {age: 3};

q.add(d1);
q.add(d2);
q.add(d3);

for(let data of q) {
    console.log(data)
}

