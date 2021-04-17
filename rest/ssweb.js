const ssweb = require(__dirname + '/../helper/ssweb');
const fs = require('fs');
const path = require('path')

async function modules(app) {
    app.get('/ssweb', async function (req, res) {
        req.setTimeout(1000*3600)
        const url = req.query['url'];
        const json = req.query['json'];
        if (url) {
            let fname = 'ss-' + new Date().getTime()
            await ssweb(decodeURIComponent(url), fname);
            if (decodeURIComponent(json) === 'true') {
                setTimeout(() => {
                    let _b = fs.readFileSync(`${__dirname}/../src/${fname}.jpg`, 'base64')
                    res.json({
                        status: "success",
                        results: {
                            url: 'data:image/jpeg;base64,' + _b,
                            data: {
                                mimetype: 'image/jpeg',
                                base64: _b
                            }
                        }
                    })
                }, 2000);
            } else {
                res.sendFile(path.resolve(`${__dirname}/../src/${fname}.jpg`))
            }
        } else {
            res.json({
                status: "error",
                message: 'Mohon isi parameter url',
                hint: '/ssweb?url=https://example.com'
            })
        }
    });
}

module.exports = modules