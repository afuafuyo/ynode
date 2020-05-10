<pre>
__  ___   __          __
\ \/ / | / /___  ____/ /__
 \  /  |/ / __ \/ __  / _ \
 / / /|  / /_/ / /_/ /  __/
/_/_/ |_/\____/\__,_/\___/
</pre>

# 一个面向对象的高效 node.js mvc and REST 框架

# [English Readme](./README_EN.md)

### Node 版本

+ 大于等于 6.0.0

### 源码 source code

+ https://github.com/afuafuyo/ynode

### 说明

ynode 是一个个人项目，推荐在项目中使用 candyjs ， candyjs 是从 ynode 演化而成并采用 MIT 许可的一个与 ynode 保持同步的项目。可在托管平台搜索 candyjs 了解

### 为什么是 YNode

+ YNode 实现了 MVC (Model-View-Controller) 设计模式并基于该模式组织代码

+ YNode 实现了自动路由映射

+ YNode 高可扩展和高可配置

+ YNode 的代码简洁优雅 这是它的编程哲学

### 示例 Hello world

使用 YNode 你只需要从一个入口文件开始，入口文件的内容可以使用自带的工具来生成，详情参见 doc 目录中的文档

```javascript
var YNode = require('ynode');
var App = require('ynode/web/Application');

var app = new App({
    'id': 1,

    // 定义调试应用
    'debug': true,

    // 定义应用路径
    'appPath': __dirname + '/app'

});

new YNode(app).listen(8090, function(){
    console.log('listen on 8090');
});
```

### 系统内置别名

+ @y  系统目录
+ @app  项目目录 由 appPath 指定 `Y.app.getAppPath()` 可得到该值
+ @runtime  缓存目录 默认指向 @app/runtime `Y.app.getRuntimePath()` 可得到该值
+ @root  网站根目录 `Y.app.getRootPath()` 可得到该值

### 项目目录示例

<pre>
|- index.js
|
|- node_modules 目录
|
|- public 目录
|
|- app 项目目录
|   |
|   |-- apis
|   |
|   |-- controllers 普通控制器目录
|       |
|       |-- user 用户组目录
|       |   |
|       |   |-- IndexController.js  - host:port/user/index 可以访问到该类
|       |   |-- OtherController.js  - host:port/user/other 可以访问到该类
|       |
|       |-- goods 商品组目录
|       |   |
|       |   |-- IndexController.js  - host:port/goods/index 可以访问到该类
|       |   |-- OtherController.js  - host:port/goods/other 可以访问到该类
|       |
|   -- views 普通控制器模板目录
|       |
|       |-- user 用户组模板 对应上面用户组
|       |   |
|       |   |-- index.html
|       |   |-- other.html
|       |
|   -- goods 商品组模板
|       |   |
|       |   |-- index.html
|       |   |-- other.html
|       |
|   -- modules 模块
|       |
|       |-- reg
|       |   |
|       |   |-- controllers 模块控制器目录 其下无子目录
|       |   |   |
|       |   |   |-- IndexController.js
|       |   |
|       |   |-- views 模块模板目录
|       |   |   |
|       |   |   |-- index.html
|       |   |
|       |   |-- 其他目录
|       |
|   -- runtime 缓存目录
|
</pre>

### 版本更新

+ 2020-05-10

    * 由于设计缺陷 npm 包 4.3.0 对控制器切面进行了重构，当 `beforeAction()` 返回值不为 true 时将阻止程序的运行
    * `beforeActionCall()` 更名为 `beforeAction()`
    * `afterActionCall()` 更名为 `afterAction()`

+ 2020-04-22

    * npm 包 4.2.0 对模板系统进行了重构
    * View 类的 `getTemplate(view, callback)` 更名为 `getTemplateContent(view, callback)`
    * View 类的 `getTemplateFilePath(view)` 更名为 `findViewFile(view)`
    * 去除 View 类的 `getTemplateFromPath()`

+ 2020-04-03

    * npm 包 4.1.0 将 `Component` 的 `inject` 方法改名为 `injectBehaviors`
    * 对 rest 路由系统进行了重构

+ 2019-12-23

    * npm 包 4.0.0 移除了 `YNode.Y` 属性
    * 对系统进行了重构

+ 2019-02-25

    * npm 包 3.2.2 优化系统代码

+ 2018-09-27

    * npm 包 3.2.0 优化日志系统

+ 2018-08-22

    * npm 包发布 3.1.4 去除 y/web/Request 类的 setQueryString() 方法

+ 2018-08-02

    * npm 包发布 3.1.2 项目中 `class` 配置项修改为 `classPath`

+ 2018-06-15

    * npm 包发布 3.1.0 更新了 web/Request 和 web/URL 两个类 web/URL 类中的大部分方法移动到了 web/Request 中

+ 2018-05-10

    * npm 包发布 3.0.0 对 REST 模式进行了重构

+ 2018-03-21

    * npm 包 2.4.0 修复 rest 模式运行异常 bug

+ 2018-03-15

    * npm 包 2.3.2 StringHelper.indexOfN() 方法名字修改为 StringHelper.nIndexOf()

+ 2018-03-02

    * npm 包 2.3.1 优化代码 系统事件变量由实例变量改为静态变量

+ 2018-01-24

    * npm 包 2.3.0 优化代码 修正部分 bug

+ 2018-01-12

    * npm 包 2.2.9 util/LinkedQueue 添加 `each()` 方法

+ 2018-01-11

    * npm 包 2.2.8 util/LinkedQueue 添加 `iterator()` 和 `remove(data)` 方法

+ 2017-08-20

    * 由于设计的不够优雅 YNode 从 npm 包 2.2.6 开始将 session 模块移除

+ 2017-06-20

    * npm 包 2.2.3 添加缓存功能

+ 2017-05-17

    * npm 包 2.1.3 修复并发变量被覆盖问题

+ 2017-05-12

    * 从 npm 包 2.1.1 开始 session 的 `read() 改为 get() readSync() 改为 getSync()  write() 改为 set() writeSync() 改为 setSync()`

+ 2017-05-11

    * 从 npm 包 2.1.0 开始 controller 中获取模板使用 `this.getView().getTemplate(...)`

+ 2017-05-08

    * npm 包 2.0.0 发布 去掉了 mvc 模式下的正则路由 并修复了一些模板读取失败 bug

+ 2017-05-03

    * 1.5.9 优化 session 和 静态资源代码

+ 2017-05-02

    * 1.5.8 修改 `TimeHelper.pad(str, length) to TimeHelper.stringLPad(str, pad, length)`

+ 2017-05-01

    * 1.5.6 优化合并正则路由

+ 2017-04-11

    * 1.5.2 将静态资源处理器分离 移动到 midwares 目录

+ 2017-04-07

    * 发布 1.5.0 代码结构变更 去除 YNode 上挂载的类

+ 2017-04-07

    * 1.4.1 `Y` 辅助类增加 include 方法以方便加载一个类 `var Logger = Y.include('y/log/Logger');`

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

