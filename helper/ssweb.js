const puppeteer = require('puppeteer');

async function helper(url, fname) {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disk-cache-size=0'
        ],
        headless: true,
        product: 'chrome'
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(1000 * 3600);
    await page.setViewport({
        width: 2048,
        height: 1080,
        isLandscape: true
    })

    await page.goto(url, {
        waitUntil: ['domcontentloaded', 'load'],
    });

    await page.screenshot({
        type: 'jpeg',
        path: `${__dirname}/../src/${fname}.jpg`
    });

    await browser.close();
}
module.exports = helper