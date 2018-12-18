var UglifyJS = require("uglify-es");
var babel = require("@babel/core");
var fs = require('fs');
var colors = require('colors');

const PACKAGE_NAME = process.env.npm_package_name;
const PACKAGE_VERSION = process.env.npm_package_version;
const COMPONENT_NAME = PACKAGE_NAME.replace("@exa/", "");

function getExtension(filename) {
  var i = filename.lastIndexOf('.');
  return (i < 0) ? '' : filename.substr(i);
}

function saveFile(path, data) {
  fs.writeFile(path, data, (err) => {
    if (err) console.log(err.red);
  });
  // log successful compilation to terminal
  console.log((path + ' built.').green);
}

fs.readdir('./src', function(err, filenames) {
  if (err)
    console.log(err.red);
  // filter no .js files
  filenames = filenames.filter(function(filename){
    return getExtension(filename) === '.js';
  });

  var baseElFile = fs.readFileSync('node_modules/@exa/common/dist/js/exa-base-element.js', 'utf8') + '\n';
  var dest = './dist/js/';

  // loop through all .js files
  filenames.map(filename => {
    var file = fs.readFileSync('src/' + filename, 'utf8');
    filename = filename.replace('.js', '');

    // append version
    var output = '/* ' + PACKAGE_NAME + ' version ' + PACKAGE_VERSION + ' */\n' + file;

    // copy over
    saveFile(dest + filename + '.js', output);
    // minify
    var minifiedFile = UglifyJS.minify(output);
    if (minifiedFile.error) {
      console.log(minifiedFile.error);
    }
    saveFile(dest + filename + '.min.js', minifiedFile.code);

    // legacy
    if(file.indexOf('extends HTMLBaseElement') > 0) {
      output = '/* ' + PACKAGE_NAME + ' version ' + PACKAGE_VERSION + ' */\n' + baseElFile + file;
    }
    var legacyFile = babel.transformSync(output, {
      filename,
      babelrc: true,
    });
    saveFile(dest + filename + '.legacy.js', legacyFile.code);
    // minify
    var minifiedFile = UglifyJS.minify(output);
    if (minifiedFile.error) {
      console.log(minifiedFile.error);
    }
    saveFile(dest + filename + '.legacy.min.js', minifiedFile.code);


  });

});
