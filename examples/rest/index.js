var YNode = require('ynode');

var app = new YNode({
    'id': 1,
    'debug': true,
    'appPath': __dirname + '/app',

    'useRestful': true
});

var Restful = YNode.Y.include('y/web/Restful');
// get 路由
Restful.get('/abc/{id:\\d+}', function(req, res, id){
    res.end('Hello, id is: ' + id)
});

// get 路由
Restful.get('/', 'app/apis/Xyz@index');

app.listen(8090, function(){
    console.log('listen on 8090');
});