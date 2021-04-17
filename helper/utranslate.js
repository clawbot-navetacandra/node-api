const puppeteer = require('puppeteer');
const cheerio = require('cheerio')

const lang = {
    indonesia: 'id',
    indonesian: 'id',
    id: 'id',
    inggris: 'en',
    english: 'en',
    en: 'en'
}
async function render(from, to, text) {
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

    await page.goto(`http://www.u-dictionary.com/home/word/${text}/from/${from}/to/${to}`, {
        waitUntil: ['domcontentloaded', 'load', 'networkidle2']
    });

    let htmlString = await page.evaluate(() => {
        return document.querySelector('html').innerHTML
    })

    await browser.close();

    return htmlString
}

async function helper(from, to, text) {
    let lang_from = lang[from];
    let lang_to = lang[to];
    let _text = encodeURIComponent(text);

    let html = await render(lang_from, lang_to, _text);

    const $ = cheerio.load(html)

    /* ENGLISH RESULTS */
    let translated_en = $('li[class="word-exp"]').text()
    let en_a = $('li[class="word-exp"]').toArray();
    let en_b = en_a.length;
    let _en = []
    en_b > 1 ? $('li[class="word-exp"]').each((i, el) => {
        _en.push($(el).text())
    }) : $('li[class="word-exp"]').text();

    /* INDONESIAN RESULTS */
    let translated_id = $('p[class="pos"] > a').text()
    let id_a = $('p[class="pos"] > a').toArray();
    let id_b = id_a.length;
    let _id = []
    id_b > 1 ? $('p[class="pos"] > a').each((i, el) => {
        _id.push($(el).text())
    }) : $('p[class="pos"] > a').text();

    if (lang_from === 'id') {
        if (_id.length >= 1) {
            return _id
        } else {
            return [translated_id]
        }
    } else {
        if (_en.length >= 1) {
            return _en
        } else {
            return [translated_en]
        }
    }

}

module.exports = helper