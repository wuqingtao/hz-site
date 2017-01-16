'use strict';

var path = require("path");
var fs = require("fs-extra");
var str = require("string");
var markdown = require('markdown-it');

function copyTemplateRes() {
	fs.copySync('template/css', 'public/css');
	fs.copySync('template/img', 'public/img');
	fs.copySync('template/js', 'public/js');
}

function copySourceRes(html) {
	fs.copySync(path.join('source', html, 'img'), 'public/img');
}

function fetchTemplateHtmlFiles() {
	var htmlFiles = [];
	var dirs = fs.readdirSync('template');
	for (var i in dirs) {
		var properties = path.parse(path.join('template', dirs[i]));
		if (properties.ext == '.html') {
			htmlFiles.push(properties.name);
		}
	}
	return htmlFiles;
}

function fetchFileName(dir) {
	var properties = path.parse(dir);
	return htmlFiles.push(properties.name);
}

function fetchSourceMdFiles(html) {
	var mdFiles = [];
	var dirs = fs.readdirSync(path.join('source', html));
	for (var i in dirs) {
		var dir = path.join('source', html, dirs[i]);
		var properties = path.parse(dir);
		if (properties.ext == '.md') {
			mdFiles.push(dir);
		}
	}
	return mdFiles;
}

function parseMdFileToHeaders(mdFile) {
	var headers = {};
	var mdData = fs.readFileSync(mdFile, 'utf-8');
	var tag = '---';
	var lines = str(mdData).between(tag, tag).trim().lines();
	for (var i in lines) {
		var line = lines[i];
		var cells = str(line).splitLeft(':', 1);
		var key = cells[0].trim();
		var val = cells[1].trim();
		headers[key] = val;
	}
	return headers;
}

function parseMdFileToBody(mdFile) {
	var mdData = fs.readFileSync(mdFile, 'utf-8');
	var tag = '---';
	var mdBody = mdData.substr(mdData.indexOf(tag) + tag.length);
	var mdBody = mdBody.substr(mdBody.indexOf(tag) + tag.length);
	var md = new markdown();
	var body = md.render(mdBody);
	return body;
}

function renderHtmlFile

copyTemplateRes();
copySourceRes('index');
console.log(fetchTemplateHtmlName());
console.log(fetchSourceMdFiles('index'));
console.log(JSON.stringify(parseMdFileToHeaders(fetchSourceMdFiles('index')[0])));
console.log(parseMdFileToBody(fetchSourceMdFiles('index')[0]));
