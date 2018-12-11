const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);

// puppeteer options
const opts = {
  headless: true,
  slowMo: 100,
  timeout: 10000,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
};

// this runs before all tests
before (async function () {
  global.expect = expect;
  global.browser = await puppeteer.launch(opts);
});

// cleanup runs after all tests
after (function () {
  browser.close();
  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
});
