var UglifyJS = require("uglify-es");
var babel = require("@babel/core");
var fs = require('fs');

const PACKAGE_NAME = process.env.npm_package_name;
const PACKAGE_VERSION = process.env.npm_package_version;
const COMPONENT_NAME = PACKAGE_NAME.replace("@exa/", "");

function getExtension(filename) {
  var i = filename.lastIndexOf('.');
  return (i < 0) ? '' : filename.substr(i);
}

function isJSFile(filename) {
  return getExtension(filename) === '.js';
}

fs.readdir('./src', function(err, filenames) {
  if (err)
    console.log(err);
  filenames = filenames.filter(isJSFile);
  filenames.map(filename => {
    var file = fs.readFileSync('src/' + filename, 'utf8');
    // append version
    filename = filename.replace('.js', '');
    var output = '/* ' + PACKAGE_NAME + ' version ' + PACKAGE_VERSION + ' */\n' + file;
    var dest = './dist/js/';
    // copy over
    fs.writeFile(dest + filename + '.js', output, (err) => {
      if (err) console.log('Error:', err);
    });
    // minify
    var minifiedFile = UglifyJS.minify(output);
    if (minifiedFile.error) {
      console.log(minifiedFile.error);
    }
    fs.writeFile(dest + filename + '.min.js', minifiedFile.code, (err) => {
      if (err) console.log('Error:', err);
    });
    // legacy
    var legacyFile = babel.transformSync(output, {
      filename,
      babelrc: true,
    });
    fs.writeFile(dest + filename + '.legacy.js', legacyFile.code, (err) => {
      if (err) console.log('Error:', err);
    });
  });
});
