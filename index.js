const puppeteer = require('puppeteer');
const scene = process.env.SCENE || 'direct';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        devtools: true,
        // executablePath: './chrome-mac/Chromium.app/Contents/MacOS/Chromium'
    });
    const page = await browser.newPage();

    if (scene !== 'direct') {
        await page.setRequestInterception(true);
        page.on('request', interceptedRequest => {
            const url = interceptedRequest.url();
            if (!url.includes('302')) {
              interceptedRequest.continue();
              return;
            }
    
            console.log('mock:', url);
            interceptedRequest.respond({
              status: 302,
              headers: {
                'Location': 'http://localhost:3000',
                'Link': '<https://lh3.googleusercontent.com>; rel="preconnect"'
              }
            });
        });
    }

    await page._client.send('Network.clearBrowserCache');
    await page.setCacheEnabled(false);

    const start = Date.now();
    await page.goto('http://localhost:3000/302', {waitUntil: 'networkidle0' });
    const end = Date.now();
    console.log(`done: load=${end - start}ms`);
})();