var sass = require('node-sass');
var fs = require('fs');
var colors = require('colors');

const PACKAGE_NAME = process.env.npm_package_name;
const PACKAGE_VERSION = process.env.npm_package_version;
const COMPONENT_NAME = PACKAGE_NAME.replace("@exa/", "");

function compileSass(options = {}) {
  // set default options
  options = Object.assign({
    style: 'expanded'
  }, options);

  var isCompressed = options.style === 'compressed';

  // render the result
  var result = sass.renderSync({
    file: 'src/output.scss',
    outputStyle: options.style
  });

  // write the result to file
  var output = (isCompressed ? '' : '/* '+ PACKAGE_NAME +' version '+ PACKAGE_VERSION +' */\n') + result.css;
  var dest = 'dist/css/exa-' + COMPONENT_NAME + (isCompressed ? '.min' : '') + '.css';
  fs.writeFile(dest, output, (err) => {
    if (err) console.log(err.red);
  });
  // log successful compilation to terminal
  console.log((' ' + dest + ' compiled.').green);
};

// Expanded
compileSass();

// Minified
compileSass({
  style: 'compressed'
});
