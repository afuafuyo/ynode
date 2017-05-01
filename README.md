<pre>
__  ___   __          __
\ \/ / | / /___  ____/ /__
 \  /  |/ / __ \/ __  / _ \
 / / /|  / /_/ / /_/ /  __/
/_/_/ |_/\____/\__,_/\___/
</pre>

# A small node.js mvc and REST framework

# [English doc](./README_EN.md)

###### Node 版本

+ 大于等于 6.0.0

###### 源码 source code

+ https://github.com/yulipu/ynode

###### 版本更新

+ 2017-05-01

    * 1.5.5 优化合并正则路由

+ 2017-04-11

    * 1.5.2 将静态资源处理器分离 移动到 midware 目录

+ 2017-04-07

    * 发布 1.5.0 代码结构变更 去除 YNode 上挂载的类

+ 2017-04-07

    * 1.4.1 ```Y``` 辅助类增加 include 方法以方便加载一个类 ```var Logger = YNode.Y.include('y/log/Logger');```

+ 2017-04-06

    * 1.4.0 调整 TimeHelper.format(formats[, timestamp]) 方法参数

+ 2017-03-31

    * 优化 web 部分正则

+ 2017-03-23

    * 添加系统工具

+ 2017-02-28

    * 优化代码

+ 2017-02-22

    * 重命名 util/LinkedList to LinkedQueue

+ 2017-02-20

    * 修改 web/Restful's className to Restful

+ 2017-02-18

    * 修改 core/Hook::takeHook() to core/Hook::getHook()

+ 2017-02-17

    * 修改 web/Request::getGetParam() to web/Request::getQueryString()
    * 修改 web/Request::getPostParam() to web/Request::getParameter()

###### 系统内置别名

+ @y  系统目录
+ @app  项目目录 由 appPath 指定 ```YNode.Y.app.getAppPath()``` 可得到该值
+ @runtime  缓存目录 默认指向 @app/runtime ```YNode.Y.app.getRuntimePath()``` 可得到该值
+ @root  网站根目录 ```YNode.Y.app.getRootPath()``` 可得到该值

###### 项目目录示例

<pre>
|- index.js
|
|- node_modules 目录
|
|- public 目录
|
|- app 项目目录
|  |
|  |-- apis
|  |
|  |-- controllers 普通控制器目录
|      |
|      |-- user 用户组目录
|      |   |
|      |   |-- IndexController.js  - host:port/user/index 可以访问到该类
|      |   |-- OtherController.js  - host:port/user/other 可以访问到该类
|      |
|      |-- goods 商品组目录
|      |   |
|      |   |-- IndexController.js  - host:port/goods/index 可以访问到该类
|      |   |-- OtherController.js  - host:port/goods/other 可以访问到该类
|      |
|   -- views 普通控制器模板目录
|      |
|      |-- user 用户组模板 对应上面用户组
|      |   |
|      |   |-- index.html
|      |   |-- other.html
|      |
|   -- goods 商品组模板
|      |   |
|      |   |-- index.html
|      |   |-- other.html
|      |
|   -- modules 模块
|      |
|      |-- reg
|      |   |
|      |   |-- controllers 模块控制器目录 其下无子目录
|      |   |   |
|      |   |   |-- IndexController.js
|      |   |
|      |   |-- views 模块模板目录
|      |   |   |
|      |   |   |-- index.html
|      |   |
|      |   |-- 其他目录
|      |
|   -- runtime 缓存目录
|
</pre>

```javascript
路由格式

// mvc
http://xxx.com/[route_prefix | moduleId]/[controllerId]

// restful api
http://xxx.com/[pattern]
```

###### 控制器查找顺序

模块控制器 --> 普通控制器

###### 路由解析顺序

有用户自定义路由优先解析

###### 约定

+ 所有系统类路径都以 y 开头 eg. y/log/file/Target 其中 y 是系统定义的路径别名
+ 所有应用类路径都以 app 开头 eg. app/controllers/index/IndexController 其中 app 是系统定义的路径别名
+ 要想让系统识别其他路径 需要手动添加别名 eg.

```javascript
// 首先添加别名
Y.setPathAlias('@libs', '/www/libs');
// 这时就可以使用别名创建某一个类的对象了
Y.createObject('libs/Mylib');
```

# 按照 mvc 框架使用

```shell
npm install ynode

或者

通过 github 下载源码放置到 node_modules 目录即可
```

```javascript
项目入口 index.js

var YNode = require('ynode');

new YNode({
    'id': 1,
    'debug': true,
    'appPath': __dirname + '/app',
    
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
var Controller = YNode.Y.include('y/web/Controller');

class IndexController extends Controller {
    // 控制器单入口
    run(req, res) {
        this.getTemplate('index', (err, str) => {
            res.end(str);
        });
    }
    
}

module.exports = IndexController;
```

# 模板引擎

使用 ejs 集成

```javascript
npm install ejs
```

在控制器中可以这样做

```javascript
'use strict';

var YNode = require('ynode');
var Controller = YNode.Y.include('y/web/Controller');

var ejs = require('ejs');

class IndexController extends Controller {
    
    run(req, res) {
        // 获取 index 模板内容用 ejs 渲染输出
        this.getTemplate('index', (err, str) => {
            str = ejs.render(str, {user: {name:'张三'}});
            res.end(str);
        });
        
        // 获取模板全路径使用 ejs 渲染输出
        //ejs.renderFile(this.getTemplateFilePath('index'), {user: {name:'张三'}}, function(err, str){
        //    res.end(str);
        //});
    }
    
}

module.exports = IndexController;
```

# 按照 RESTful 框架使用

###### restful 和 mvc 现在不能同时使用

###### 可用请求方式

+ get(route, handler)
+ post(route, handler)
+ put(route, handler)
+ delete(route, handler)
+ patch(route, handler)
+ head(route, handler)
+ options(route, handler)

```javascript
// 增加 useRestful 参数启用 RESTful
var app = new YNode({
    'id': 1,
    'debug': true,
    'appPath': __dirname + '/app',
    
    'useRestful': true
});
app.listen(8090, function(){
    console.log(8090)
});

var Restful = YNode.Y.include('y/web/Restful');
// get 路由 并指定 id 参数必须为数字
Restful.get('/abc/{id:\\d+}', function(req, res, id){
    var Request = YNode.Y.include('y/web/Request');
    var r = new Request(req);
    
    console.log(r.getQueryString('id'));
    console.log(id);
    
    res.end('api get');
});

// 多方法路由 id 参数可为字母或数字
Restful.addRoute(['GET', 'POST'], '/def/{id:}', function(req, res, id){
    res.end(id);
});

// 使用 app/api/User 类的 index 方法处理请求
Restful.get('/xyz/{id:}', 'app/apis/User@index');

// 其中 User 的定义如下
'use strict';
class User {
    index(req, res, id) {
        res.end(id);
    }
}
module.exports = User;
```

# 获取 post 参数

可以使用 express 的 body-parser 中间件

```javascript
var Hook = YNode.Y.include('y/core/Hook');
Hook.getInstance().addHook(bodyParser.urlencoded({ extended: false }));

结果会存放到 req.body
```

# 处理图片等的静态资源

```javascript
var R = YNode.Y.include('y/midware/Resource');
Hook.getInstance().addHook(new R(__dirname + '/public').serve());

或者使用其他中间件

var serveStatic = require('serve-static');
Hook.getInstance().addHook( serveStatic('public') );
```

# 利用工具初始化应用

安装完 ynode 后可以使用程序自带工具来初始化应用

```shell
./node_modules/.bin/_ynode PROJECT_NAME
```

# 已知问题

+ 异步异常没做处理
