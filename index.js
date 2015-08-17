#!/usr/bin/env node

/*
 * @Author: haoyang.li
 * @Date:   2015-08-07 11:42:26
 * @Last Modified by:   haoyang.li
 * @Last Modified time: 2015-08-17 14:31:43
 */
var fs = require('fs'),
    images = require('images'),
    path = require('path'),
    localPath = path.join(__dirname, './'),
    imagePath = localPath + 'css/img/origin/',
    originPath = localPath + 'css/img/changed/';

function explorer(imagePath) {
    fs.readdir(imagePath, function (err, files) {
        if (err) {
            console.log('error:\n' + err);
            return;
        }
        files.forEach(function (file) {
            fs.stat(imagePath + '/' + file, function (err, stat) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (stat.isDirectory()) {
                    // explorer(imagePath + '/' + file);
                } else {
                    if (!fs.existsSync(originPath)) {
                        fs.mkdirSync(originPath);
                    }
                    if (file.match(/\.jpg/)) {
                        images(imagePath + '/' + file)
                            .size(160)
                            .save(originPath + file, {
                                quality: 10
                            });
                        console.log(file + "change success;");
                    }
                }
            });
        });
    });
}
explorer(imagePath);