describe('Example test',function(){

  /* this will be a reference to the page we'll be testing on */
  let page;

  /* use this to capture custom events from the page */
  let EVENTS = [];

  const SELECTOR = '#exa-foo';

  /* If you need to test for custom events
   * this function adds an event listener to
   * to the page which will call a custom function that
   * mocha will handle.
   */
  function listenForCustomEvent(type) {
    return page.evaluateOnNewDocument(type => {
      document.addEventListener(type, e => {
        window.onCustomEvent({type, detail: e.detail});
      });
    }, type);
  }

  /* a helper for putting a delay in a series of async calls. */
  async function wait(duration){
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  /* this runs before all tests in the file. */
  before (async function () {
    page = await browser.newPage();
    await listenForCustomEvent('foo');
    await page.goto('http://localhost:3000/test',{waitUntil: 'domcontentloaded'});

    /* here is where you capture the response
     * from our the custom event handler you attached to the page
     */
    await page.exposeFunction('onCustomEvent', e => {
      if(e.type === 'foo'){
        EVENTS.push(e);
      }
    })

    /*
     * if you want to bubble console logs from Puppeteer to mocha
    page.on('console', msg => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });
    */

  })

  beforeEach(function(){

    /*
     * if you need to do DOM manipulation/cleanup before each test
     */
    page.evaluate((str) => {
      // you're in the page now.
      // var foo = document.getElementById('foo');
    },'');

    EVENTS = [];
  })

  /* this runs after all tests in the file. */
  after (async function () {
    await page.close();
  })

  /* this is a test */
  it('should be able to select a DOM element ', async function(){

    /* don't do anything until the page is loaded and puppeteer
     * can find this selector
     */
    await page.waitFor(SELECTOR);

    /* do something in the DOM and return a value to mocha */
    var length = await page.evaluate((str) => {
      var el = document.querySelectorAll('exa-foo');
      return el.length;
    },'');

    /* await wait(300); <- don't need to wait for anything here. just an example */

    /* tests end with a pass/fail assertion */
    expect(length).to.equal(1);
  })

  /* you'd never write a test that fails intentionally.
   * just demoing what happens if an assertion fails.
   */
  it('should fail', async function(){
    expect('foo').to.not.equal('bar');
    /* if you wanted this to pass you'd write
     * expect('foo').to.not.equal('bar');
     */
  })

});
