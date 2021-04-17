let helper = async function () {
    
    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({
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
        headless: true,
        product: 'chrome'
    });

    
    const page = await browser.newPage()
    await page.emulate(puppeteer.devices['Pixel 2 XL'])
    await page.goto('https://brainly.co.id/app/ask?q=tes',
        { waitUntil: ['domcontentloaded', 'load', 'networkidle0'] })
        .then(async function () {
            await page.goto('https://brainly.co.id/app/ask?q=tes')
            await page.screenshot({
                fullPage: true,
                quality: 100,
                type: "jpeg",
                path: `${__dirname}/../src/brainly.jpg`
            })
        })
        .catch(err => console.log(err))
        .finally(async () => await browser.close())
}

module.exports = helper