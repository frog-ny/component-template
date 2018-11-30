var prettyBytes = require('pretty-bytes');
var fs = require('fs');
var path = require('path');
var colors = require('colors');

function getExtension(filename) {
  var i = filename.lastIndexOf('.');
  return (i < 0) ? '' : filename.substr(i);
}

function outputSize(dir, ext){
  if (!fs.existsSync(dir)){
    console.log(("no dir " + dir + ' found').red);
    return;
  }
  var totalSize = 0;
  // get all files with exact extension
  var filenames = fs.readdirSync(dir).filter(function(filename){
    return getExtension(filename) === ext
  });
  // loop through all matched files to get file size
  for(var i=0; i<filenames.length; i++) {
    filename = path.join(dir, filenames[i]);
    var file = fs.readFileSync(filename, 'utf8');
    console.log((dir + filename + ': ' + prettyBytes(file.length)).green);
    totalSize += file.length;
  }
  console.log(('TOTAL ' + ext + ' FILE SIZE:' + prettyBytes(totalSize) + '\n').bold.blue);
}

outputSize('./dist/js', '.js');
outputSize('./dist/css', '.css');
