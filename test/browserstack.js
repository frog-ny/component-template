var webdriver = require('selenium-webdriver');

// Input capabilities
var capabilities = {
 'browserName' : 'Chrome',
 'browser_version' : '62.0',
 'os' : 'Windows',
 'os_version' : '10',
 'resolution' : '1024x768',
 'browserstack.user' : 'helenealonso1',
 'browserstack.key' : 'j8jtBKptErZH2kzqx66T'
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

driver.get('http://www.google.com');
driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack');
driver.findElement(webdriver.By.name('btnK')).click();

driver.getTitle().then(function(title) {
  console.log(title);
});

function closeBrowser(driver){
    if (driver == null) {
        return;
    }
    driver.quit();
    driver = null;
}

closeBrowser(driver);
