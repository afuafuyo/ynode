#!/bin/bash

# This file used to create base dir of a project
# sudo ./initapp.sh /www/mypro

tip() {
	echo -e "\033[31m $1 \033[0m";
}

makedirs() {
	if [ -z $1 -o $1 == '/' ] ; then
		return
	fi

	parent_dir=`dirname $1`
	
	makedirs $parent_dir

	if [ ! -d $1 ] ; then
		 mkdir $1
	fi
}

user_path=$1

if [ -z "$user_path" ] ; then
	tip "Command error: sudo ./initapp.sh /www/mypro"
	exit
fi

if [ ${user_path:0:1} = "." ] ; then
	tip "The path must be absolute"
	exit
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

full_path="$user_path""/app/controllers/index"
makedirs $full_path
echo -e  "'use strict';\n\nclass IndexController {\nrun(req, res) {\nres.end('hello ynode');\n}\n}\nmodule.exports=IndexController;" 1> $full_path/IndexController.js

full_path="$user_path""/app/views/index"
makedirs $full_path

# start file
echo -e "var YNode = require('ynode');\n\nvar app = new YNode({\n'id': 1,\n'appPath': __dirname + '/app'\n});\n\napp.listen(8090);" 1> "$user_path"/index.js


