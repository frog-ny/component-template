var assert = require('assert');
require('it-each')();

var viewports = [
  {title:'(viewport large)',size:[1280,1024]},
  {title:'(viewport medium)',size:[1024,768]},
];

var arr = browser.desiredCapabilities.realMobile === true ? [] : viewports;

describe('Google\'s Search Functionality', function() {

  it('can find search results', function () {
    browser
      .url('https://www.google.com/ncr')
      .setValue('*[name="q"]','BrowserStack\n')
      .pause(5000);

    assert(browser.getTitle().match(/BrowserStack - Google Search/i));
  });

});
