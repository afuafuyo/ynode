var YNode = require('ynode');

new YNode({
    'id': 1,
    'debug': true,
    'appPath': __dirname + '/app',
    'assets': 'public'

}).listen(8090, function(){
    console.log('listen on 8090');
});
