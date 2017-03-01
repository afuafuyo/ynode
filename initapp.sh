#!/bin/bash

# This file used to create base dir of a project
# sudo ./initapp.sh /www/mypro

tip() {
	echo -e "\033[31m $1 \033[0m";
}

makedirs() {
	if [ -z $1 -o $1 == '/' -o $1 == '.' ] ; then
		return
	fi

	parent_dir=`dirname $1`
	
	makedirs $parent_dir

	if [ ! -d $1 ] ; then
		 mkdir $1
	fi
}

echo -n 'Please input the app path: '

read val

if [ -z "$val" ] ; then
	tip "Command error: The app path can not be empty"
	exit
fi

if [ ! -d $val ] ; then
    makedirs $val
fi

#
# project structor
#
# prject
#	app
#		controllers
#			index
#				IndexController.js
#		views
#			index
#				index.html
#		modules
#		runtime
#

controllerPath=$val/app/controllers/index
viewPath=$val/app/views/index

makedirs $controllerPath
makedirs $viewPath

c=$controllerPath/IndexController.js
echo "'use strict';" > $c
echo "var YNode = require('ynode');" >> $c
echo "class IndexController extends YNode.WebController {" >> $c
echo "  run(req, res) {" >> $c
echo "    res.end('hello ynode');" >> $c
echo "  }" >> $c
echo "}" >> $c
echo "module.exports = IndexController;" >> $c

v=$val/index.js
echo "var YNode = require('ynode');" > $v
echo "var app = new YNode({" >> $v
echo "  'id': 1," >> $v
echo "  'debug': true," >> $v
echo "  'appPath': __dirname + '/app'," >> $v
echo "  'assets': 'public'" >> $v
echo "});" >> $v
echo "app.listen(8090, function(){console.log('listen on 8090');});" >> $v

echo done
