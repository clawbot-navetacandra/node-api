const puppeteer = require('puppeteer');
const fs = require('fs')

const lang = {
    indonesia: 'id',
    indonesian: 'id',
    id: 'id',
    inggris: 'en',
    english: 'en',
    en: 'en'
}

async function helper(from, target, text) {
    let lang_from = lang[from];
    let lang_target = lang[target];
    const URI = `https://translate.google.co.id/?hl=id&sl=${lang_from}&tl=${lang_target}&text=${text}&op=translate`
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
    await page.goto(URI, { waitUntil: ['domcontentloaded', 'load', 'networkidle2'] });
    let translated = await page.evaluate(() => {
        return document.querySelector('span[jsname="W297wb"]').innerHTML
    });
    await browser.close();
    return translated

}

module.exports = helper