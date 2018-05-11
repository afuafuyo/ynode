<pre>
__  ___   __          __
\ \/ / | / /___  ____/ /__
 \  /  |/ / __ \/ __  / _ \
 / / /|  / /_/ / /_/ /  __/
/_/_/ |_/\____/\__,_/\___/
</pre>

# An Object-Oriented node.js mvc and REST framework

###### Node version

+ no less than 6.0.0

###### Source code

+ https://github.com/yulipu/ynode

###### Version change

+ 2018-05-10

    * npm package release 3.0.0 and redesigned rest system

+ 2018-03-21

    * npm package 2.4.0 fix rest mode bug

+ 2018-03-15

    * npm package 2.3.2 change method name StringHelper.indexOfN() to StringHelper.nIndexOf()

+ 2018-03-02

    * npm package 2.3.1 change system event instance variable to static variable

+ 2018-01-24

    * npm package 2.3.0 fix some bug

+ 2018-01-12

    * npm package 2.2.9 util/LinkedQueue added ```each()``` method

+ 2018-01-11

    * npm package 2.2.8 util/LinkedQueue added ```iterator()``` add ```remove(data)``` method


+ 2017-08-20

    * Because the design is not elegant enough. Since npm package 2.2.6 YNode removed session module

+ 2017-06-20

    * npm package 2.2.3 add cache system

+ 2017-05-17

    * npm package 2.1.3 fix variable override under concurrency request

+ 2017-05-12

    * since npm package 2.1.0 session methods ```read() change to get() readSync() change to getSync()  write() change to set() writeSync() change to setSync()```

+ 2017-05-11

    * since npm package 2.1.0 get template html file change to use ```this.getView().getTemplate(...)```

+ 2017-05-08

    * npm package 2.0.0 published. remove mvc regexp route and fix some template read bug

+ 2017-05-03

    * 1.5.9 optimize session and resource class code

+ 2017-05-02

    * 1.5.8 change ```TimeHelper.pad(str, length) to TimeHelper.stringLPad(str, pad, length)```

+ 2017-05-01

    * 1.5.6 optimize combine regular expression

+ 2017-04-11

    * 1.5.2 static handler class split from core framework and moved to midwares dir

+ 2017-04-07

    * publish 1.5.0 change code structure remove class mount on YNode

+ 2017-04-07

    * 1.4.1 ```Y``` class add include() method to import a class ```var Logger = YNode.Y.include('y/log/Logger');```

+ 2017-04-06

    * 1.4.0 adjust TimeHelper.format(formats[, timestamp]) function params

+ 2017-03-31

    * optimize some regular expression

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
+ @app  app dir ```YNode.Y.app.getAppPath()``` can get the value
+ @runtime  cache dir default to @app/runtime ```YNode.Y.app.getRuntimePath()``` can get the value
+ @root  website root dir ```YNode.Y.app.getRootPath()``` can get the value

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
