const puppeteer = require('puppeteer');

var fs = require('fs'),
    request = require('request');

var download = function (uri, filename) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', () => { return });
    });
}


async function helper(type, _text, fname) {
    let typeId = {
        gold: '#radio0-radio-h093supm4',
        silver: '#radio0-radio-jlady2un1'
    };
    let id = typeId[type]
    let browser = await puppeteer.launch({
        headless: true,
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
    })
    let page = await browser.newPage();
    await page.setDefaultNavigationTimeout(1000 * 3600);
    await page.goto('https://en.ephoto360.com/create-silver-button-gold-button-social-network-online-450.html', {
        waitUntil: ['networkidle2']
    })
        .then(async () => {
            await page.click(id);
            await page.type('#text-0.form-control', _text, {delay: 25});
            await page.click('#submit');
            await new Promise(resolve => setTimeout(resolve, 4000))
            const element = await page.$('div.thumbnail > img')
            const url = await (await element.getProperty('src')).jsonValue();
            // console.log(url);
            download(url, `${__dirname}/../src/${fname}.jpg`)
        })
        .catch(err => console.log(err))
    await page.close()
    await browser.close()

}

// helper('silver', 'clawbot')
module.exports = helper