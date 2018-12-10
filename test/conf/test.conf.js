require('dotenv').config();
var devices = require('./devices.conf.js');

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACC_KEY',

  updateJob: false,
  specs: [
    './test/wd-test.js'
  ],
  exclude: [],
  capabilities: devices.capabilities,
  /*
  capabilities: [
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
      'browser_version': '11.0',
      'resolution': '1024x768'
    },
    {
      'browser': 'safari'
    },
    {
      'os': 'Windows',
      'os_version': '10',
      'browser': 'Edge',
      'browser_version': '17.0',
      'resolution': '1024x768'
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
  ],
  */

  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: './.tmp/screenshots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: 'hub.browserstack.com',

  framework: 'mocha',
  mochaOpts: {
      ui: 'bdd',
    timeout: 99999999
  }
}
