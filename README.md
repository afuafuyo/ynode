# A small node.js mvc web framework

# 注意 开发中 未完成

###### node 版本
* > 5

###### 本程序特点
* 采用控制器单一入口执行程序 解决单一文件过大不好维护问题
* 以控制器目录分组的方式组织代码 结构清晰 支持无限级子目录 (模块控制器除外)

###### 系统内置别名
* @y  系统目录
* @app  项目目录 由 appPath 指定
* @runtime  缓存目录 默认指向 @app/runtime

###### 项目目录示例
<pre>
app 项目目录
  |
  --- controllers 普通控制器目录
    |
    |--- user 用户组目录
    |   |
    |   |--- IndexController.js 用户组下的控制器
    |   |--- OtherController.js
    |
    |--- goods 商品组目录
    |   |
    |   |--- IndexController.js
    |   |--- OtherController.js
    |
  --- views 普通控制器模板目录
    |
    |--- user 用户组模板 对应上面用户组
    |   |
    |   |--- index.js
    |   |--- other.js
    |
    --- goods 商品组模板
    |   |
    |   |--- index.js
    |   |--- other.js
    |
  --- modules 模块
    |
    |--- reg
    |   |
    |   |--- controllers 模块控制器目录 其下无子目录
    |   |   |
    |   |   |--- IndexController.js
    |   |
    |   |--- views 模块模板目录
    |   |   |
    |   |   |--- index.js
    |   |
    |   |--- 其他目录
    |
  --- runtime 缓存目录
    |
</pre>

```javascript
路由格式

http://xxx.com/{ROUTE}
```

```javascript
约定

所有系统类路径都以 y 开头 eg. y/log/file/Target
所有应用类路径都以 app 开头 eg. app/controllers/index/IndexController
```

```javascript
index.js

var YNode = require('YNode');

new YNode({
    'id': 1,
    'debug': true,
    'appPath': __dirname + '/app',
    
    'log': {
        'targets': {
            'file': {
                'class': 'y/log/file/Target'
            }
        }
    },
    'modules': {
        'bbs': 'app/modules/bbs'
    },
    'routes': {
        // 访问此正则路径跳转到 bbs 模块
        '/userdefineroute/(\\d+)': {
            'moduleId': 'bbs'
        }
    }
    
}).listen(8080, function(){
    console.log('listen on 8080');
});
```

```javascript
app\controllers\index\IndexController.js

'use strict';

var YNode = require('YNode');

class IndexController extends YNode.WebController {
    
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
