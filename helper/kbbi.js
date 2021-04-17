const puppeteer = require('puppeteer');
const rp = require('request-promise');
const cheerio = require('cheerio');

async function h(entri) {
    let url = `https://kbbi.kemdikbud.go.id/entri/${entri}`;
    const html = cheerio.load(await rp(url))('div[class="container body-content"]').html();
    const _ = cheerio.load(html);
    let existRes = _('ol').html() ? true : false;
    if (existRes) {
        let arti = []
        _('ol').find('font[color="red"]').remove().html();

        _('ol > li').each((i, el) => {
            return arti.push(_(el).text())
        });
        
        return arti
    } else {
        return 404
    }
};

// (async function () {
//     console.log(await h('khuasda'));
// })();
module.exports = h