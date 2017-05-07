#! /usr/bin/env node

var fs = require("fs");
var browserify = require("browserify");
var watchify = require("watchify");

var browserifyInstance = browserify("./app/index.js", {
  extensions: [".js"],
  plugin: [watchify],
  debug: true,
  cache: {},
  packageCache: {}
});

function makeBundle(){
  browserifyInstance
    .bundle()
    .on("error", handleErrors)
    .pipe(fs.createWriteStream("./public/index.js"))
}

function handleErrors(error){
  if(error.stack)
    console.log(error.stack);
}

browserifyInstance
  .transform("babelify")
  .on("update", makeBundle);

makeBundle();
