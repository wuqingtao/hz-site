'use strict';

var copy = require('copy');
var fs = require("fs");
var path = require("path");

// 复制template/[css,img,js]/*至public
copy('template/css/*', 'public/css', function() {});
copy('template/img/*', 'public/img', function() {});
copy('template/js/*', 'public/js', function() {});

// 复制source/*/img/*至public
var htmls = [];
var filepaths = fs.readdirSync('template');
for (var i in filepaths) {
	var filepath = path.join('template', filepaths[i]);
	var properties = path.parse(filepath);
	if (properties.ext == '.html') {
		htmls.push(properties.name);
	}
}

for (var i in htmls) {
	var html = htmls[i];
	var filepath = path.join('source', html, 'img', '*');
	copy(filepath, 'public/img', function() {});
}

// MD文件渲染
