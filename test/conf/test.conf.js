require('dotenv').config();

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACC_KEY',

  updateJob: false,
  specs: [
    './test/wd-test.js'
  ],
  exclude: [],
/*
  capabilities: [{
    browser: 'chrome',
    name: 'single_test',
    build: 'webdriver-browserstack'
  },
  {
    browser: 'chrome',
    name: 'single_test',
    build: 'webdriver-browserstack'
  }
],*/
capabilities: [{
  browser: 'chrome'
},{
  browser: 'firefox'
},{
  'os': 'Windows',
  'os_version': '10',
  'browser': 'IE',
  'browser_version': '11.0',
  'resolution': '1024x768'
},{
  browser: 'safari'
},
{
  'os': 'Windows',
  'os_version': '10',
  'browser': 'Edge',
  'browser_version': '17.0',
  'resolution': '1024x768'
}],

  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: './errorShots/',
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
