:: This file use to make base app structor
@echo off

set /p val="Please input the app path: "

if not exist "%val%" md "%val%"

set controllerPath=%val%/app/controllers/index
set viewPath=%val%/app/views/index

md "%controllerPath%"
md "%viewPath%"

:: init file
set c=%controllerPath%/IndexController.js
echo 'use strict';> %c%
echo var YNode = require('ynode');>> %c%
echo class IndexController extends YNode.WebController {>> %c%
echo   run(req, res) {>> %c%
echo     res.end('hello ynode');>> %c%
echo   }>> %c%
echo }>> %c%
echo module.exports = IndexController;>> %c%

set v=%val%/index.js
echo var YNode = require('ynode');> %v%
echo var app = new YNode({>> %v%
echo   'id': 1,>> %v%
echo   'debug': true,>> %v%
echo   'appPath': __dirname + '/app',>> %v%
echo   'assets': 'public'>> %v%
echo });>> %v%
echo app.listen(8090, function(){console.log('listen on 8090');});>> %v%

echo done
