<pre>
__  ___   __          __
\ \/ / | / /___  ____/ /__
 \  /  |/ / __ \/ __  / _ \
 / / /|  / /_/ / /_/ /  __/
/_/_/ |_/\____/\__,_/\___/
</pre>

# A small node.js mvc and REST framework

###### Node version

+ no less than 6.0.0

###### Source code

+ https://github.com/yulipu/ynode

###### Version change

+ 2017-03-23

    * add system util

+ 2017-02-28

    * optimize system code

+ 2017-02-22

    * rename util/LinkedList to LinkedQueue

+ 2017-02-20

    * change web/Restful's className to Restful

+ 2017-02-18

    * change core/Hook::takeHook() to core/Hook::getHook()

+ 2017-02-17

    * change web/Request::getGetParam() to web/Request::getQueryString()
    * change web/Request::getPostParam() to web/Request::getParameter()

###### Build in system variable

+ @y  system dir
+ @app  app dir
+ @runtime  cache dir default to @app/runtime
+ @root  website root dir

###### Application structure demo

<pre>
|- index.js
|
|- node_modules
|
|- public
|
|- app
|  |
|  |-- apis
|  |
|  |-- controllers
|      |
|      |-- user
|      |   |
|      |   |-- IndexController.js
|      |   |-- OtherController.js
|      |
|      |-- goods
|      |   |
|      |   |-- IndexController.js
|      |   |-- OtherController.js
|      |
|   -- views
|      |
|      |-- user
|      |   |
|      |   |-- index.html
|      |   |-- other.html
|      |
|   -- goods
|      |   |
|      |   |-- index.html
|      |   |-- other.html
|      |
|   -- modules
|      |
|      |-- reg
|      |   |
|      |   |-- controllers
|      |   |   |
|      |   |   |-- IndexController.js
|      |   |
|      |   |-- views
|      |   |   |
|      |   |   |-- index.html
|      |   |
|      |   |-- otherdir
|      |
|   -- runtime
|
</pre>

```javascript
route example

// mvc
http://xxx.com/[route_prefix | moduleId]/[controllerId]

// restful api
http://xxx.com/[pattern]
```

###### Controller search order

module controller --> general controller

###### Route search order

user define route will be given priority

###### Appointment

+ all system class begin with 'y' eg. y/log/file/Target
+ all user application class begin with 'app' eg. app/controllers/index/IndexController

# Use as mvc

```shell
npm install ynode

or

download source code from github and place it into node_modules dir
```

```javascript
index.js

var YNode = require('ynode');

new YNode({
    'id': 1,
    'debug': true,
    'appPath': __dirname + '/app',
    'assets': 'public',
    
    'modules': {
        'bbs': 'app/modules/bbs'
    },
    'routes': {
        // 访问此自定义路径跳转到 bbs 模块 参数为数字 id 及字符串 name
        '/abc/{id:\\d+}/{name:\\w+}': {
            'moduleId': 'bbs'
        }
    },
    'log': {
        'targets': {
            'file': {
                'class': 'y/log/file/Target'
            }
        }
    }
    
}).listen(8090, function(){
    console.log('listen on 8090');
});
```

```javascript
app\controllers\index\IndexController.js

'use strict';

var YNode = require('ynode');

class IndexController extends YNode.WebController {
    // the controller has only one method
    run(req, res) {
        this.getTemplate('index', (err, str) => {
            res.end(str);
            
            YNode.Logger.getLogger().error('this is a error log');
            YNode.Logger.getLogger().flush();
        });
    }
    
}

module.exports = IndexController;
```

# Template engine

use ejs

```javascript
npm install ejs
```

you can use like follow in your controller

```javascript
'use strict';

var YNode = require('ynode');
var ejs = require('ejs');

class IndexController extends YNode.WebController {
    
    run(req, res) {
        // get the content of template file and render with ejs
        this.getTemplate('index', (err, str) => {
            str = ejs.render(str, {user: {name:'张三'}});
            res.end(str);
        });
        
        // get the path of template file and render with ejs
        //ejs.renderFile(this.getTemplateFilePath('index'), {user: {name:'张三'}}, function(err, str){
        //    res.end(str);
        //});
    }
    
}

module.exports = IndexController;
```

# Use as RESTful

###### at this stage restful and mvc can not coexist

###### usable method

+ get(route, handler)
+ post(route, handler)
+ put(route, handler)
+ delete(route, handler)
+ patch(route, handler)
+ head(route, handler)
+ options(route, handler)

```javascript
// add useRestful param start using RESTful
var app = new YNode({
    'id': 1,
    'debug': true,
    'appPath': __dirname + '/app',
    
    'useRestful': true
});
app.listen(8090, function(){
    console.log(8090)
});

// get request with a id param and id must be a number
YNode.WebRestful.get('/abc/{id:\\d+}', function(req, res, id){
    var r = new YNode.WebRequest(req);
    
    console.log(r.getQueryString('id'));
    console.log(id);
    
    res.end('api get');
});

// multiple request with a id param and the id can be number or string
YNode.WebRestful.addRoute(['GET', 'POST'], '/def/{id:}', function(req, res, id){
    res.end(id);
});

// use app/api/User::index method process the request
YNode.WebRestful.get('/xyz/{id:}', 'app/apis/User@index');

// User define like follow
'use strict';
class User {
    index(req, res, id) {
        res.end(id);
    }
}
module.exports = User;
```

# Get the post param

you can use express's body-parser midware

```javascript
YNode.Hook.getInstance().addHook(bodyParser.urlencoded({ extended: false }));

the result will added to req.body
```

# use sysutil to create a structure of app

when installed ynode you can use _ynode to create a app

```shell
./node_modules/.bin/_ynode PROJECT_NAME
```

# 已知问题

+ 异步异常没做处理

