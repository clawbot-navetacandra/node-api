const tinyurl = require(__dirname + '/../helper/tinyurl');

async function m(app) {
    app.get('/tinyurl', async function (req, res) {
        req.setTimeout(1000*3600)
        const url = req.query['url'];
        if (url) {
            const result = await tinyurl(decodeURIComponent(url))
            res.json({
                status: "success",
                result: result.join('')
            })
        } else {
            res.json({
                status: "error",
                message: "Mohon isi parameter url!",
                hint: "/tinyurl?url=https://example.com"
            })
        }
    })
}

module.exports = m