# A small node.js mvc and REST framework

# [English doc](./README_EN.md)

###### Node 版本

+ >= 6.0.0

###### 源码 source code

+ https://github.com/yulipu/ynode

###### 本程序特点

+ 采用控制器单一入口执行程序 解决单一文件过大不好维护问题
+ 以控制器目录分组的方式组织代码 结构清晰 支持无限级子目录 (模块控制器除外)

###### 系统内置别名

+ @y  系统目录
+ @app  项目目录 由 appPath 指定
+ @runtime  缓存目录 默认指向 @app/runtime
+ @root  网站根目录

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
|      |   |-- IndexController.js 用户组下的控制器
|      |   |-- OtherController.js
|      |
|      |-- goods 商品组目录
|      |   |
|      |   |-- IndexController.js
|      |   |-- OtherController.js
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
http://xxx.com/[route_prefix|moduleId]/[controllerId]

// restful api
http://xxx.com/[pattern]
```

###### 控制器查找顺序

模块控制器 --> 普通控制器

###### 路由解析顺序

有用户自定义路由优先解析

###### 约定

+ 所有系统类路径都以 y 开头 eg. y/log/file/Target
+ 所有应用类路径都以项目目录名开头 eg. app/controllers/index/IndexController

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
    
    'assets': 'public',
    'log': {
        'targets': {
            'file': {
                'class': 'y/log/file/Target'
            }
        }
    }
    
}).listen(8080, function(){
    console.log('listen on 8080');
});
```

```javascript
app\controllers\index\IndexController.js

'use strict';

var YNode = require('ynode');

class IndexController extends YNode.WebController {
    // 控制器单入口
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

# 模板引擎

使用 ejs 集成

```javascript
npm install ejs
```

在控制器中可以这样做

```javascript
'use strict';

var YNode = require('ynode');
var ejs = require('ejs');

class IndexController extends YNode.WebController {
    
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

// get 路由 并指定 id 参数必须为数字
YNode.WebRestful.get('/abc/{id:\\d+}', function(req, res, id){
    var r = new YNode.WebRequest(req);
    
    console.log(r.getQueryString('id'));
    console.log(id);
    
    res.end('api get');
});

// 多方法路由 id 参数可为字母或数字
YNode.WebRestful.addRoute(['GET', 'POST'], '/def/{id:}', function(req, res, id){
    res.end(id);
});

// 使用 app/api/User 类的 index 方法处理请求
YNode.WebRestful.get('/xyz/{id:}', 'app/apis/User@index');

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
YNode.Hook.getInstance().addHook(bodyParser.urlencoded({ extended: false }));

结果会存放到 req.body
```

# 已知问题

+ 异步异常没做处理

# 思考

关于何时使用 const var 以及 let 一直思考 但一直没定夺