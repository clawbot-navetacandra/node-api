const puppeteer = require('puppeteer');

async function helper(url) {
    let link;
    const browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disk-cache-size=0'
        ],
        product: 'chrome'
    });
    let ctx = await browser.createIncognitoBrowserContext()
    const page = await ctx.newPage();
    await page.setDefaultNavigationTimeout(1000 * 3600)
    await page.goto('https://bitly.com/', {
        waitUntil: 'networkidle2'
    })
        .then(async () => {
            await page.type('#shorten_url', url, {delay: 0});
            await page.click('#shorten_btn');
            await new Promise(resolve => setTimeout(resolve, 2000))

            const element = await page.$('#shortened_url');
            const shortened = await (await element.getProperty('value')).jsonValue();
            link = shortened
        })
        .catch(err => console.log(err))
    await browser.close()
    return link
}

// (async () => {
//     console.log(await helper('https://youtube.com'));
// })();
module.exports = helper