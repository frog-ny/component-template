describe('Browser tests',function(){
  // let page;
  // let loader;
  //
  // let loadedImage;
  // let loadedArray = [];
  // let errorArray = [];
  // let completed = false;
  //
  // const SELECTOR = '#loader';
  //
  // function listenFor(type) {
  //   return page.evaluateOnNewDocument(type => {
  //     document.addEventListener(type, e => {
  //       window.onCustomEvent({type, detail: e.detail});
  //     });
  //   }, type);
  // }
  //
  // async function pause(duration){
  //   return new Promise(resolve => setTimeout(resolve, duration));
  // }
  //
  // before (async function () {
  //   page = await browser.newPage();
  //   await listenFor('ui.error.image-loader');
  //   await listenFor('ui.load.image-loader');
  //   await listenFor('ui.complete.image-loader');
  //   await page.goto('http://localhost:3000/test',{waitUntil: 'domcontentloaded'});
  //   await page.exposeFunction('onCustomEvent', e => {
  //     //console.log(`${e.type} fired`, e.detail || '');
  //     //console.log('image ',e.detail.image);
  //     if(e.type === 'ui.load.image-loader' && e.detail.image){
  //       loadedImage = e.detail.image;
  //       loadedArray.push(e.detail.image);
  //     }
  //     if(e.type === 'ui.error.image-loader'){
  //       errorArray.push(e.detail.image);
  //     }
  //     if(e.type === 'ui.complete.image-loader'){
  //       completed = true;
  //     }
  //   })
  //
  //   beforeEach(function(){
  //
  //     page.evaluate((str) => {
  //       var loader = document.getElementById('loader');
  //       loader.clear();
  //     },'');
  //
  //     loadedArray = [];
  //     errorArray = [];
  //     completed = false;
  //
  //   });
  //
  //   page.on('console', msg => {
  //     for (let i = 0; i < msg.args().length; ++i)
  //       console.log(`${i}: ${msg.args()[i]}`);
  //   });
  // })
  //
  // after (async function () {
  //   await page.close();
  // })
  //
  // it('should have aria-hidden set to true', async function(){
  //   await page.waitFor(SELECTOR);
  //   var hidden = await page.evaluate((str) => {
  //     var loader = document.getElementById('loader');
  //     return loader.getAttribute('aria-hidden');
  //   },'');
  //   await pause(300);
  //   expect(hidden).to.equal('true');
  // })
  //
  // it('should load a single image passed to the data-images attribute', async function(){
  //   var images = ['images/file-exists.png'];
  //   await page.waitFor(SELECTOR);
  //   await page.evaluate((str) => {
  //     var loader = document.getElementById('loader');
  //     loader.setAttribute('data-images',str);
  //   },images.join(','));
  //   await pause(300);
  //   expect(images.join(',')).to.equal(loadedImage);
  // })
  //
  // it('should be able to load a single image via .push()', async function(){
  //   var images = ['images/push/push.png'];
  //   await page.waitFor(SELECTOR);
  //   await page.evaluate((str) => {
  //     var loader = document.getElementById('loader');
  //     loader.push(str);
  //   },images.join(','));
  //   await pause(300);
  //   expect(images.join(',')).to.equal(loadedArray.join(','));
  // })
  //
  // it('should be able to load a single image via .unshift()', async function(){
  //   var images = ['images/push/unshift.png'];
  //   await page.waitFor(SELECTOR);
  //   await page.evaluate((str) => {
  //     var loader = document.getElementById('loader');
  //     loader.unshift(str);
  //   },images.join(','));
  //   await pause(300);
  //   expect(images.join(',')).to.equal(loadedArray.join(','));
  // })
  //
  // it('should load a comma separated list of images passed to the data-images attribute', async function(){
  //   var images = [
  //     'images/image-list-01.png',
  //     'images/image-list-02.png'
  //   ];
  //   await page.waitFor(SELECTOR);
  //   await page.evaluate((str) => {
  //     var loader = document.getElementById('loader');
  //     loader.setAttribute('data-images',str);
  //   },images.join(','));
  //   await pause(300);
  //   expect(images.join(',')).to.equal(loadedArray.join(','));
  // })
  //
  // it('should be able to load multiple image types', async function(){
  //   var images = [
  //     'images/mixed-image-formats/file.svg',
  //     'images/mixed-image-formats/file.gif',
  //     'images/mixed-image-formats/file.png',
  //     'images/mixed-image-formats/file.jpg'
  //   ];
  //   await page.waitFor(SELECTOR);
  //   await page.evaluate((str) => {
  //     var loader = document.getElementById('loader');
  //     loader.setAttribute('data-images',str);
  //   },images.join(','));
  //   await pause(300);
  //   expect(images.join(',')).to.equal(loadedArray.join(','));
  // })
  //
  // it('should dispatch a CustomEvent when the queue is complete', async function(){
  //   var images = [
  //     'images/complete-event/image-01.png',
  //     'images/complete-event/image-02.png',
  //     'images/complete-event/image-03.png'
  //   ];
  //   await page.waitFor(SELECTOR);
  //   await page.evaluate((str) => {
  //     var loader = document.getElementById('loader');
  //     loader.setAttribute('data-images',str);
  //   },images.join(','));
  //   await pause(300);
  //   expect(completed).to.equal(true);
  // })
  //
  // it('should continue loading if a missing image is added to the beginning of the list', async function(){
  //   var images = [
  //     'images/start-with-missing-image/image-DOES-NOT-EXIST.png',
  //     'images/start-with-missing-image/image-01.png',
  //     'images/start-with-missing-image/image-02.png',
  //     'images/start-with-missing-image/image-03.png'
  //   ];
  //   await page.waitFor(SELECTOR);
  //   await page.evaluate((str) => {
  //     var loader = document.getElementById('loader');
  //     loader.setAttribute('data-images',str);
  //   },images.join(','));
  //   await pause(300);
  //   expect(loadedArray.length).to.equal(3);
  // })
  //
  // it('should continue loading if multiple missing images are added to the middle of the list', async function(){
  //   var images = [
  //     'images/missing-middle-images/image-01.png',
  //     'images/missing-middle-images/image-02.png',
  //     'missing.png',
  //     'nope.png',
  //     'images/missing-middle-images/image-03.png',
  //     'images/missing-middle-images/image-04.png'
  //   ];
  //   await page.waitFor(SELECTOR);
  //   await page.evaluate((str) => {
  //     var loader = document.getElementById('loader');
  //     loader.setAttribute('data-images',str);
  //   },images.join(','));
  //   await pause(300);
  //   expect(loadedArray.length).to.equal(4);
  // })

});
