var prettyBytes = require('pretty-bytes');
var fs = require('fs');

function getExtension(filename) {
  var i = filename.lastIndexOf('.');
  return (i < 0) ? '' : filename.substr(i);
}

fs.readdir('./dist/js', function(err, filenames) {
  if (err)
    console.log(err);
  filenames = filenames.filter(function(filename){
    return getExtension(filename) === '.js'
  });
  filenames.map(filename => {
    var file = fs.readFileSync('./dist/js/' + filename, 'utf8');
    console.log(filename + ': ' + prettyBytes(file.length));
  });
});


fs.readdir('./dist/css', function(err, filenames) {
  if (err)
    console.log(err);
  filenames = filenames.filter(function(filename){
    return getExtension(filename) === '.css'
  });
  filenames.map(filename => {
    var file = fs.readFileSync('./dist/css/' + filename, 'utf8');
    console.log(filename + ': ' + prettyBytes(file.length));
  });
});
