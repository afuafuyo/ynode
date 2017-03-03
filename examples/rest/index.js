var YNode = require('ynode');

var app = new YNode({
    'id': 1,
    'debug': true,
    'appPath': __dirname + '/app',

    'useRestful': true
});

// get 路由
YNode.WebRestful.get('/abc/{id:\\d+}', function(req, res, id){
    res.end('Hello, id is: ' + id)
});

// get 路由
YNode.WebRestful.get('/', 'app/apis/Xyz@index');

app.listen(8090, function(){
    console.log('listen on 8090');
});