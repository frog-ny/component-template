const {Builder, By, until} = require('selenium-webdriver');

var capabilities = {
 'browserName' : 'Chrome',
 'browser_version' : '62.0',
 'os' : 'Windows',
 'os_version' : '10',
 'resolution' : '1024x768',
 'browserstack.user' : 'helenealonso1',
 'browserstack.key' : 'j8jtBKptErZH2kzqx66T'
}

let driver = new Builder()
.usingServer('http://hub-cloud.browserstack.com/wd/hub')
.withCapabilities(capabilities)
.build();

driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnK')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();
