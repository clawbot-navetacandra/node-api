const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function handler(q) {
    let data = [];
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
    const page = await browser.newPage();
    await page.goto(`https://www.google.com`, { waitUntil: ['domcontentloaded', 'load'] })
        .then(async () => {
            await page.goto(`https://www.google.com/search?q=${encodeURIComponent(q)}`)
                .then(async () => {
                    let h = await page.$('html')
                    let _h = await h.evaluate(n => n.innerHTML);
                    let $ = cheerio.load(_h);
                    let link = [];
                    let linkT = [];
                    let snippet = [];
                    $('div[class="yuRUbf"] > a').each((i, el) => {
                        link.push($(el).attr('href'))
                    })
                    $('div[class="yuRUbf"] > a > h3').each((i, el) => {
                        linkT.push($(el).text())
                    })
                    $('span[class="aCOpRe"]').each((i, el) => {
                        snippet.push($(el).text())
                    })
                    for (let i = 0; i < link.length; i++) {
                        let d = { title: linkT[i], snippet: snippet[i], link: link[i]}
                        data.push(d)
                    };
                    // console.log(data);
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    await browser.close()
    return data
}

module.exports = handler