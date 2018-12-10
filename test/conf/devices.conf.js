const resolutions = ['1280x768','1024x768','768x768'];

const browsers = [
  {
    browser: 'chrome'
  },
  {
    browser: 'firefox'
  },
  {
    'os': 'Windows',
    'os_version': '10',
    'browser': 'IE',
    'browser_version': '11.0'
  },
  {
    'browser': 'safari'
  },
  {
    'os': 'Windows',
    'os_version': '10',
    'browser': 'Edge',
    'browser_version': '17.0'
  },
  {
    'device': 'iPhone 8',
    'os_version': '11.0',
    'browser': 'safari',
    'realMobile': true
  },
  {
    'device': 'Samsung Galaxy S8',
    'os_version': '7.0',
    'browser': 'chrome',
    'realMobile': true
  }
];

var capabilities = [];

var len = browsers.length;
for(var ii = 0; ii < len; ii++){
  var cur = browsers[ii];
  if(cur.hasOwnProperty('resolution')){
    resolutions.forEach(function(resolution) {
      var item = Object.assign({}, cur);
      delete item.resolutions;
      item.resolution = resolution;
      capabilities.push(item);
    });
  }else{
    capabilities.push(cur);
  }
}

exports.capabilities = capabilities;

//console.log(capabilities);
