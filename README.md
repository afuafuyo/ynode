<pre>
__  ___   __          __
\ \/ / | / /___  ____/ /__
 \  /  |/ / __ \/ __  / _ \
 / / /|  / /_/ / /_/ /  __/
/_/_/ |_/\____/\__,_/\___/
</pre>

# 一个面向对象的高效 node.js mvc and REST 框架

# [English Readme](./README_EN.md)
# [文档](./doc/index.html)

###### Node 版本

+ 大于等于 6.0.0

###### 源码 source code

+ https://github.com/yulipu/ynode

###### 版本更新

+ 2017-05-17

    * npm 包 2.1.3 修复并发变量被覆盖问题

+ 2017-05-12

    * 从 npm 包 2.1.1 开始 session 的 ```read() 改为 get() readSync() 改为 getSync()  write() 改为 set() writeSync() 改为 setSync()```

+ 2017-05-11

    * 从 npm 包 2.1.0 开始 controller 中获取模板使用 ```this.getView().getTemplate(...)```

+ 2017-05-08

    * npm 包 2.0.0 发布 去掉了 mvc 模式下的正则路由 并修复了一些模板读取失败 bug

+ 2017-05-03

    * 1.5.9 优化 session 和 静态资源代码

+ 2017-05-02

    * 1.5.8 修改 ```TimeHelper.pad(str, length) to TimeHelper.stringLPad(str, pad, length)```

+ 2017-05-01

    * 1.5.6 优化合并正则路由

+ 2017-04-11

    * 1.5.2 将静态资源处理器分离 移动到 midwares 目录

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

# 已知问题

+ 异步异常没做处理

+ 由于变量缓存修改问题 高并发下存在读取错误模板 bug 正在修复中 -- 已解决
