@echo off

set /p val="Please input the app path: "

set controllerPath=%val%/app/controllers/index
set viewPath=%val%/app/views/index

md "%controllerPath%"
md "%viewPath%"

echo 'use strict';> %controllerPath%/IndexController.js
echo var YNode = require('ynode');>> %controllerPath%/IndexController.js
echo class IndexController extends YNode.WebController {>> %controllerPath%/IndexController.js
echo   run(req, res) {>> %controllerPath%/IndexController.js
echo     res.end('hello ynode');>> %controllerPath%/IndexController.js
echo   }>> %controllerPath%/IndexController.js
echo }>> %controllerPath%/IndexController.js
echo module.exports = IndexController;>> %controllerPath%/IndexController.js

echo var YNode = require('ynode');> %val%/index.js
echo var app = new YNode({>> %val%/index.js
echo   'id': 1,>> %val%/index.js
echo   'debug': true,>> %val%/index.js
echo   'appPath': __dirname + '/app',>> %val%/index.js
echo   'assets': 'public'>> %val%/index.js
echo });>> %val%/index.js
echo app.listen(8090, function(){console.log('listen on 8090');});>> %val%/index.js

echo done