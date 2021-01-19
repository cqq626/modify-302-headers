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
                'Link': '<https://pbs.twimg.com>; rel="preconnect"'
              }
            });
        });
    }

    await page._client.send('Network.clearBrowserCache');
    await page.setCacheEnabled(false);

    const start = Date.now();
    let url = 'http://localhost:3000/302';
    if (scene === 'withlink') {
        url = 'http://localhost:3000';
    }
    await page.goto(url, {waitUntil: 'networkidle0' });
    const end = Date.now();
    console.log(`done: load=${end - start}ms`);
})();